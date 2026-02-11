# n8n Workflows

An automation setup, using Docker-based n8n with Traefik and MCP server.

## Quick Start

1. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env file with your domain and email
   ```

2. **Add domain to hosts file** (for local development)
   ```bash
   sudo echo "127.0.0.1 n8n.example.com" >> /etc/hosts
   ```
   Replace `n8n.example.com` with your actual domain from the `.env` file.

3. **Start the services**
   ```bash
   docker compose up -d
   ```

4. **Access n8n**
   - Local: http://localhost:5678
   - Domain: https://n8n.example.com (replace with your configured domain)

## Configuration

Edit the `.env` file to configure:
- `DOMAIN_NAME`: Your domain (e.g., example.com)
- `SUBDOMAIN`: n8n subdomain (e.g., n8n)
- `SSL_EMAIL`: Email for SSL certificates
- `GENERIC_TIMEZONE`: Timezone for scheduling nodes

## Services

- **n8n**: Workflow automation platform
- **Traefik**: Reverse proxy with automatic SSL
- **n8n-mcp**: Model Context Protocol server for n8n

## File Storage

Local files can be placed in the `local-files/` directory and will be accessible within n8n workflows at `/files/`.

## Stopping Services

```bash
docker compose down
```