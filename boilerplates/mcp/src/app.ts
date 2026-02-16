import { Request, Response } from 'express';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createMcpExpressApp } from '@modelcontextprotocol/sdk/server/express.js';
import { type McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

// Create Express app

export const createApp = async (server: McpServer) => {

  const app = createMcpExpressApp();

  // MCP endpoint
  app.post('/mcp', async (req: Request, res: Response) => {
    try {
      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined
      });
      
      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
      
      res.on('close', () => {
        console.log('MCP request closed');
        transport.close();
        server.close();
      });
    } catch (error) {
      console.error('Error handling MCP request:', error);
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: '2.0',
          error: {
            code: -32603,
            message: 'Internal server error'
          },
          id: null
        });
      }
    }
  });

  // Health check endpoint
  app.get('/health', (_: Request, res: Response) => {
    res.json({ status: 'ok', service: 'boilerplate-context-mcp' });
  });

  // Disallow GET/DELETE on /mcp
  app.get('/mcp', async (_: Request, res: Response) => {
    res.status(405).json({
      jsonrpc: '2.0',
      error: {
        code: -32000,
        message: 'Method not allowed. Use POST.'
      },
      id: null
    });
  });

  app.delete('/mcp', async (_: Request, res: Response) => {
    res.status(405).json({
      jsonrpc: '2.0',
      error: {
        code: -32000,
        message: 'Method not allowed.'
      },
      id: null
    });
  });
return app
}