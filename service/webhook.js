'use strict'
const axios = require('axios')
const callWebhook = async (webhookUrl, payload) => {
    try {
        console.log(`📡 Calling Webhook: ${webhookUrl}`);
        await axios.post(webhookUrl, payload, { timeout: 5000 });
        console.log("✅ Webhook successfully sent.");
    } catch (error) {
        console.error("❌ Webhook call failed:", error.message);
    }
};

module.exports = callWebhook;