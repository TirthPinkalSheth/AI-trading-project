import { KiteConnect } from "kiteconnect";
import { Position } from "kiteconnect"

const apiKey = "so5b9vhwbh7t6p4g";
const apiSecret = "526mdawwi4l62yxlbhrqc3tdt4ai4lun";
const requestToken = "CawfJ9Ogv6PuyJ3n7UXE1439I01k8eMO";
let accessToken="9YLXZTK32j0w0hauNyGBXHKFFIfH3Ko5";

// const kc = new KiteConnect({ api_key: apiKey });
// console.error(kc.getLoginURL());
const kc = new KiteConnect({ api_key: apiKey });
kc.setAccessToken(accessToken);
export async function placeOrder(tradingsymbol: string, type: "BUY" | "SELL", quantity: number) {
  
  try {
    
    // await getProfile();
    await kc.placeOrder("amo",{
      exchange: "NSE",
      tradingsymbol,
      transaction_type: type,
      quantity,
      product: "CNC",
      order_type: "MARKET"
    });
  } catch (err) {
    console.error(err);
  }
}

export async function get_positions() {
  const holdings= await kc.getPositions()
  let allHoldings="";
  holdings.net.map((holding: Position) => {
    allHoldings+=`stock: ${holding.tradingsymbol}, qty: ${holding.quantity} , currentPrice:${holding.last_price}\n`}
  )
  return allHoldings;
}

// async function generateSession() {
//   try {
//     const response = await kc.generateSession(requestToken, apiSecret);
//     console.log("Access Token:", response.access_token);
//     kc.setAccessToken(response.access_token);
//     console.log("Session generated:", response);
//   } catch (err) {
//     console.error("Error generating session:", err);
//   }
// }

// async function getProfile() {
//   try {
//     const profile = await kc.getProfile();
//     console.log("Profile:", profile);
//   } catch (err) {
//     console.error("Error getting profile:", err);
//   }
// }
// Initialize the API calls
// init();