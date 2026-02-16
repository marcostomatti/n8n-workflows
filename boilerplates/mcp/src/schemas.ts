import * as z from 'zod';
import { config } from './config.js';


const GET_BOILERPLATE_STRUCTURE_SCHEMA = z.object({
  platform: z.enum(config.platforms as [string, ...string[]])
    .describe('The platform to get structure for (backend, frontend, or mobile)')
});

const SEARCH_BEST_PRACTICES_SCHEMA = GET_BOILERPLATE_STRUCTURE_SCHEMA.extend({
  query: z.string().describe('The search query to find relevant best practices or patterns')
});

const GET_ALL_CONTEXTS_SCHEMA = z.object({});
export {
  GET_BOILERPLATE_STRUCTURE_SCHEMA,
  SEARCH_BEST_PRACTICES_SCHEMA,
  GET_ALL_CONTEXTS_SCHEMA
}