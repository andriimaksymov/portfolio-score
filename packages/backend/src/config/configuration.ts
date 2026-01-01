export default () => ({
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  github: {
    apiToken: process.env.GITHUB_API_TOKEN,
    apiBaseUrl: process.env.GITHUB_API_BASE_URL || 'https://api.github.com',
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  // Future configurations
  // database: {
  //   url: process.env.DATABASE_URL,
  // },
});
