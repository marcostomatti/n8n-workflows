import { getMcpServer } from './mcpServer';
import { createApp } from './app';
import {config } from './config';

const startServer = async () => {

  const { port, repoUrl, repoDir } = config;

  if (!repoUrl || !repoDir) {
    console.error('Repository URL and directory must be specified in the configuration.');
    process.exit(1);
  }
  const mcpServer = await getMcpServer();
  const app = await createApp(mcpServer);
  
  app.listen(port, () => {
    console.log(`Boilerplate Context MCP Server listening on port ${port}`);
    console.log(`Health check: http://localhost:${port}/health`);
    console.log(`MCP endpoint: http://localhost:${port}/mcp`);
  });

// Graceful shutdown
  process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    process.exit(0);
  });
};

startServer().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});