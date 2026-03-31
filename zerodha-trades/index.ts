// import { KiteConnect } from "kiteconnect";


// Silence ALL stdout that isn't valid JSON (MCP protocol)
// const _write = process.stdout.write.bind(process.stdout);
// (process.stdout as any).write = function(chunk: any, encoding?: any, callback?: any) {
//   try {
//     const str = typeof chunk === 'string' ? chunk : chunk.toString();
//     const trimmed = str.trim();
//     if (trimmed === '' || trimmed.startsWith('{') || trimmed.startsWith('[')) {
//       return _write(chunk, encoding, callback);
//     }
//     console.error('[STDERR]', str); // Explicit error log
//     process.stderr.write(chunk, encoding);
//     return true;
//   } catch (e) {
//     console.error('STDOUT_FILTER_ERROR:', e);
//     process.stderr.write(chunk, encoding);
//     return true;
//   }
// };
import { placeOrder, get_positions } from "./trade.ts";
// placeOrder("INFY", "BUY", 1);

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "trades",
  version: "1.0.0"
});

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT_ERROR:', err);
  process.exit(1);
});

// Add an addition tool

server.tool("buy_stock","Buys the stock on the zerodha exchange for the user. It executes a market order to buy the specified quantity of the stock.",
  { stock: z.string(), qty:z.number() },
  async({ stock,qty })=>{
    placeOrder(stock,"BUY",qty);
    return {
      content: [{ type: "text", text: `Placed order to buy ${qty} shares of ${stock}` }]
    }
  }
)
server.tool("sell_stock","Sells the stock on the zerodha exchange for the user. It executes a market order to sell the specified quantity of the stock.",
  { stock: z.string(), qty:z.number() },
  async({ stock,qty })=>{
    placeOrder(stock,"SELL",qty);
    return {
      content: [{ type: "text", text: `Placed order to sell ${qty} shares of ${stock}` }]
    }
  }
)
server.tool("get_positions","Retrieves the list of stocks currently held by the user.",
  {  },
  async()=>{
    return {
      content: [{ type: "text", text: await get_positions() }]
    }
  }
)

const transport = new StdioServerTransport();
await server.connect(transport);
// // const apiKey = "so5b9vhwbh7t6p4g";
// // const apiSecret = "526mdawwi4l62yxlbhrqc3tdt4ai4lun";
// // const requestToken = "vEnDvm6YoLUrXRi7aPETBimdywR17FNI";
// // let accessToken="CSl4edqOb02Miwn3v5GOWH731m30TJ8P";

// // const kc = new KiteConnect({ api_key: apiKey });
// // console.log(kc.getLoginURL());

// // async function init() {
// //   try {
// //     kc.setAccessToken(accessToken);
// //     // await getProfile();
// //     await kc.placeOrder("amo",{
// //       "exchange": "NSE",
// //       "tradingsymbol": "INFY",
// //       "transaction_type": "BUY",
// //       "quantity": 1,
// //       "product": "CNC",
// //       "order_type": "MARKET"
// //     });
// //   } catch (err) {
// //     console.error(err);
// //   }
// // }

// // async function generateSession() {
// //   try {
// //     const response = await kc.generateSession(requestToken, apiSecret);
// //     console.log("Access Token:", response.access_token);
// //     kc.setAccessToken(response.access_token);
// //     console.log("Session generated:", response);
// //   } catch (err) {
// //     console.error("Error generating session:", err);
// //   }
// // }

// // async function getProfile() {
// //   try {
// //     const profile = await kc.getProfile();
// //     console.log("Profile:", profile);
// //   } catch (err) {
// //     console.error("Error getting profile:", err);
// //   }
// // }
// // // Initialize the API calls
// // init();