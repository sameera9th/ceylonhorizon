import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '5c55dqxe',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  project: {
    basePath: '/admin',
  },
  deployment: {
    appId: 'b3j3st9x7dys307d2d3huvdy',
  },
})
