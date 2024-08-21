module.exports = {
  apps: [
    {
      name: `d3-user`,
      script: "serve",
      env: {
        PM2_SERVE_PATH: "./dist",
        PM2_SERVE_PORT: 5005,
        PM2_SERVE_SPA: "true",
        NODE_ENV: 'production',
      },
    },
  ],
};