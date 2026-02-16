import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { repoTools } from './utils/repository';
import {
  CallToolResult,
  ReadResourceResult,
} from '@modelcontextprotocol/sdk/types.js';

import {
  GET_ALL_CONTEXTS_SCHEMA,
  GET_BOILERPLATE_STRUCTURE_SCHEMA,
  SEARCH_BEST_PRACTICES_SCHEMA
} from './schemas';

import { config, PLATFORMS } from './config';
import { tr } from 'zod/locales';

const getMcpServer = async () => {
  const {
     ensureRepo, 
     getDirectoryStructure,
     readAgentsMd
    } = await repoTools(config.repoUrl, config.repoDir);
  
  const server = new McpServer(
      {
        name: 'boilerplate-context-server',
        version: '1.0.0'
      },
      {
        capabilities: {
          resources: {},
          tools: {},
          logging: {}
        }
      }
    );

    config.platforms.forEach((platform: PLATFORMS) => {
      server.registerResource(
        `${platform}-agents`,
        `boilerplate://${platform}/agents.md`,
        {
          title: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Boilerplate AGENTS.md`,
          description: `Best practices and guidelines for ${platform} development`,
          mimeType: 'text/markdown'
        },
        async (): Promise<ReadResourceResult> => {
          await ensureRepo();
          const content = await readAgentsMd(platform);
          
          return {
            contents: [
              {
                uri: `boilerplate://${platform}/agents.md`,
                mimeType: 'text/markdown',
                text: content
              }
            ]
          };
        });
      });

    server.registerTool(
      'get_boilerplate_structure',
      {
        description: 'Get the file structure of a boilerplate project',
        inputSchema: GET_BOILERPLATE_STRUCTURE_SCHEMA
      },
      async ({ platform }): Promise<CallToolResult> => {
        const structure = await getDirectoryStructure(platform as PLATFORMS);
        return {
          content: [
            {
              type: 'text',
              text: `File structure for ${platform} boilerplate:\n\n${structure.join('\n')}`
            }
          ]
        };
      }
    );

    server.registerTool(
      'search_best_practices',
      {
        description: 'Search for specific best practices or patterns in AGENTS.md',
        inputSchema: SEARCH_BEST_PRACTICES_SCHEMA
      },
      async ({ platform, query }): Promise<CallToolResult> => {
        const content = await readAgentsMd(platform as PLATFORMS);
        const lines = content.split('\n');
        const matches: string[] = [];
        
        const queryLower = query.toLowerCase();
        lines.forEach((line, index) => {
          if (line.toLowerCase().includes(queryLower)) {
            const start = Math.max(0, index - 2);
            const end = Math.min(lines.length, index + 3);
            const context = lines.slice(start, end).join('\n');
            matches.push(`\n--- Line ${index + 1} ---\n${context}\n`);
          }
        });
      
        return {
          content: [
            {
              type: 'text',
              text: matches.length > 0
                ? `Found ${matches.length} matches for "${query}" in ${platform} AGENTS.md:\n${matches.join('\n')}`
                : `No matches found for "${query}" in ${platform} AGENTS.md`
            }
          ]
        };
      }
    );

    server.registerTool(
    'get_all_contexts',
    {
      description: 'Get AGENTS.md content for all platforms at once (useful for cross-platform features)',
      inputSchema: GET_ALL_CONTEXTS_SCHEMA
    },
    async (): Promise<CallToolResult> => {
      const contexts = await Promise.all(
        config.platforms.map(async (platform) => {
          const content = await readAgentsMd(platform);
          return `## ${platform.toUpperCase()} AGENTS.md\n\n${content}`;
        })
      );
      
      return {
        content: [
          {
            type: 'text',
            text: contexts.join('\n\n---\n\n')
          }
        ]
      };
    }
  );

   return server;
}

export { getMcpServer };