import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "test-server", version: "1.0.0" });

server.tool("test_tool", { msg: z.string() }, async ({ msg }) => {
  return { content: [{ type: "text", text: `Echo: ${msg}` }] };
});

const transport = new StdioServerTransport();
await server.connect(transport);