

```
PORT=3030 curl -X POST http://localhost:${PORT:-3000}/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "tools/call",
    "params": {
      "name": "get_boilerplate_structure",
      "arguments": {
        "platform": "backend"
      }
    }
  }'
```