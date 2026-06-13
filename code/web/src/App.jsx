import About from './components/About'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Header from './components/Header'
import Hero from './components/Hero'
import Location from './components/Location'
import { useHomePageContent } from './hooks/useHomePageContent'

function App() {
  const { content, isLoading, isUsingFallback } = useHomePageContent()

  return (
    <div className={isLoading ? 'site is-loading' : 'site'}>
      <Header primaryCta={content.primaryCta} />
      <main>
        <Hero content={content} />
        <About content={content} />
        <Experience content={content} />
        <Gallery content={content} />
        <Location content={content} />
        <Contact content={content} />
      </main>
      <Footer content={content} />
      {isUsingFallback && <span className="sr-only">Showing local website content.</span>}
    </div>
  )
}

export default App
