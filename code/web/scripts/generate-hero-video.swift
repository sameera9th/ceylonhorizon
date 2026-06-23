import AVFoundation
import CoreGraphics
import CoreImage
import Foundation
import ImageIO

let inputPath = CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : "public/images/ceylon-horizon-hero.jpg"
let outputPath = CommandLine.arguments.count > 2 ? CommandLine.arguments[2] : "public/videos/ceylon-horizon-hero.mp4"

let width = 1600
let height = 900
let fps: Int32 = 24
let durationSeconds = 12
let frameCount = Int(fps) * durationSeconds
let bitrate = 5_500_000

let inputURL = URL(fileURLWithPath: inputPath)
let outputURL = URL(fileURLWithPath: outputPath)

try? FileManager.default.removeItem(at: outputURL)

guard
  let imageSource = CGImageSourceCreateWithURL(inputURL as CFURL, nil),
  let sourceImage = CGImageSourceCreateImageAtIndex(imageSource, 0, nil)
else {
  fatalError("Could not read source image at \(inputPath)")
}

let writer = try AVAssetWriter(outputURL: outputURL, fileType: .mp4)
let compressionProperties: [String: Any] = [
  AVVideoAverageBitRateKey: bitrate,
  AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
  AVVideoExpectedSourceFrameRateKey: fps
]
let settings: [String: Any] = [
  AVVideoCodecKey: AVVideoCodecType.h264,
  AVVideoWidthKey: width,
  AVVideoHeightKey: height,
  AVVideoCompressionPropertiesKey: compressionProperties
]

let input = AVAssetWriterInput(mediaType: .video, outputSettings: settings)
input.expectsMediaDataInRealTime = false

let attributes: [String: Any] = [
  kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
  kCVPixelBufferWidthKey as String: width,
  kCVPixelBufferHeightKey as String: height,
  kCVPixelBufferCGImageCompatibilityKey as String: true,
  kCVPixelBufferCGBitmapContextCompatibilityKey as String: true
]

let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: attributes)

guard writer.canAdd(input) else {
  fatalError("Could not add video input")
}

writer.add(input)
writer.startWriting()
writer.startSession(atSourceTime: .zero)

let colorSpace = CGColorSpaceCreateDeviceRGB()
let sourceWidth = CGFloat(sourceImage.width)
let sourceHeight = CGFloat(sourceImage.height)
let outputWidth = CGFloat(width)
let outputHeight = CGFloat(height)
let coverScale = max(outputWidth / sourceWidth, outputHeight / sourceHeight)

func smoothLoop(_ progress: CGFloat) -> CGFloat {
  0.5 - 0.5 * cos(progress * .pi * 2)
}

func appendFrame(_ index: Int) {
  guard let pool = adaptor.pixelBufferPool else {
    fatalError("No pixel buffer pool")
  }

  var optionalBuffer: CVPixelBuffer?
  CVPixelBufferPoolCreatePixelBuffer(nil, pool, &optionalBuffer)
  guard let buffer = optionalBuffer else {
    fatalError("Could not create pixel buffer")
  }

  CVPixelBufferLockBaseAddress(buffer, [])
  defer { CVPixelBufferUnlockBaseAddress(buffer, []) }

  guard
    let baseAddress = CVPixelBufferGetBaseAddress(buffer),
    let context = CGContext(
      data: baseAddress,
      width: width,
      height: height,
      bitsPerComponent: 8,
      bytesPerRow: CVPixelBufferGetBytesPerRow(buffer),
      space: colorSpace,
      bitmapInfo: CGImageAlphaInfo.premultipliedFirst.rawValue | CGBitmapInfo.byteOrder32Little.rawValue
    )
  else {
    fatalError("Could not create drawing context")
  }

  let progress = CGFloat(index) / CGFloat(frameCount)
  let angle = progress * .pi * 2
  let loop = smoothLoop(progress)
  let zoom = CGFloat(1.045) + CGFloat(0.055) * loop
  let driftX = CGFloat(54) * sin(angle)
  let driftY = CGFloat(20) * cos(angle + 0.7)
  let drawWidth = sourceWidth * coverScale * zoom
  let drawHeight = sourceHeight * coverScale * zoom
  let drawX = (outputWidth - drawWidth) / 2 + driftX
  let drawY = (outputHeight - drawHeight) / 2 + driftY

  context.setFillColor(CGColor(red: 0.03, green: 0.12, blue: 0.10, alpha: 1))
  context.fill(CGRect(x: 0, y: 0, width: outputWidth, height: outputHeight))
  context.interpolationQuality = .high
  context.draw(sourceImage, in: CGRect(x: drawX, y: drawY, width: drawWidth, height: drawHeight))

  let lightX = outputWidth * (0.66 + 0.09 * sin(angle - 0.4))
  let lightY = outputHeight * (0.30 + 0.04 * cos(angle + 0.2))
  let lightRadius = outputWidth * (0.38 + 0.02 * sin(angle))
  let warm = CGColor(red: 0.95, green: 0.75, blue: 0.42, alpha: 0.18)
  let clearWarm = CGColor(red: 0.95, green: 0.75, blue: 0.42, alpha: 0)
  if let glow = CGGradient(colorsSpace: colorSpace, colors: [warm, clearWarm] as CFArray, locations: [0, 1]) {
    context.drawRadialGradient(
      glow,
      startCenter: CGPoint(x: lightX, y: lightY),
      startRadius: 0,
      endCenter: CGPoint(x: lightX, y: lightY),
      endRadius: lightRadius,
      options: .drawsAfterEndLocation
    )
  }

  let topShade = CGColor(red: 0.02, green: 0.09, blue: 0.08, alpha: 0.22)
  let clearShade = CGColor(red: 0.02, green: 0.09, blue: 0.08, alpha: 0)
  if let shade = CGGradient(colorsSpace: colorSpace, colors: [topShade, clearShade] as CFArray, locations: [0, 0.52]) {
    context.drawLinearGradient(
      shade,
      start: CGPoint(x: 0, y: 0),
      end: CGPoint(x: 0, y: outputHeight),
      options: []
    )
  }

  let time = CMTime(value: CMTimeValue(index), timescale: fps)
  while !input.isReadyForMoreMediaData {
    Thread.sleep(forTimeInterval: 0.002)
  }
  adaptor.append(buffer, withPresentationTime: time)
}

for index in 0..<frameCount {
  appendFrame(index)
}

input.markAsFinished()
let group = DispatchGroup()
group.enter()
writer.finishWriting {
  group.leave()
}
group.wait()

if writer.status != .completed {
  fatalError("Video writer failed: \(writer.error?.localizedDescription ?? "unknown error")")
}

print("Generated \(outputPath)")
