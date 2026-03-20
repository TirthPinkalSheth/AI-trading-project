import { KiteConnect } from "kiteconnect";

const apiKey = "so5b9vhwbh7t6p4g";
const apiSecret = "526mdawwi4l62yxlbhrqc3tdt4ai4lun";
const requestToken = "Q0wJ0ub65oW4jKZ4t50JK9sX5CvGb5hy";
let accessToken="ZHWOEg2IFCrxqsoC3Tr6yursOqvhADm0";

const kc = new KiteConnect({ api_key: apiKey });
console.log(kc.getLoginURL());

async function init() {
  try {
    kc.setAccessToken(accessToken);
    // await generateSession();
    await getProfile();
  } catch (err) {
    console.error(err);
  }
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

async function getProfile() {
  try {
    const profile = await kc.placeOrder("amo",{
      "exchange": "NSE",
      "tradingsymbol": "INFY",
      "transaction_type": "BUY",
      "quantity": 1,
      "product": "CNC",
      "order_type": "MARKET"
    });
    console.log("Profile:", profile);
  } catch (err) {
    console.error("Error getting profile:", err);
  }
}
// Initialize the API calls
init();