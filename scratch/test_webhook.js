const axios = require('axios');

async function testWebhook() {
    const url = "https://script.google.com/macros/s/AKfycbxV_GPgeTqhWw_yIzX4WvY1S8w95FjIQL3u3iwcpwNm5aI5sQmEx7FCqw2S0uQVKo0a5w/exec";
    const payload = {
        email: "test_subscriber_antigravity@example.com",
        niche: "Newsletter"
    };

    console.log("Sending payload to Google Script Webhook...");
    try {
        const response = await axios.post(url, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Status:", response.status);
        console.log("Response headers:", response.headers);
        console.log("Response data:", response.data);
    } catch (error) {
        console.error("Error sending to webhook:", error.message);
        if (error.response) {
            console.error("Response status:", error.response.status);
            console.error("Response data:", error.response.data);
        }
    }
}

testWebhook();
