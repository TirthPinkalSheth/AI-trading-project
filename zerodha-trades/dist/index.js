"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kiteconnect_1 = require("kiteconnect");
const apiKey = "so5b9vhwbh7t6p4g";
const apiSecret = "526mdawwi4l62yxlbhrqc3tdt4ai4lun";
const requestToken = "your_request_token";
const kc = new kiteconnect_1.KiteConnect({ api_key: apiKey });
console.log(kc.getLoginURL());
async function init() {
    try {
        await generateSession();
        await getProfile();
    }
    catch (err) {
        console.error(err);
    }
}
async function generateSession() {
    try {
        const response = await kc.generateSession(requestToken, apiSecret);
        kc.setAccessToken(response.access_token);
        console.log("Session generated:", response);
    }
    catch (err) {
        console.error("Error generating session:", err);
    }
}
async function getProfile() {
    try {
        const profile = await kc.getProfile();
        console.log("Profile:", profile);
    }
    catch (err) {
        console.error("Error getting profile:", err);
    }
}
// Initialize the API calls
init();
