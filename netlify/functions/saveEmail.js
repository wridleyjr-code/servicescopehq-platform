const axios = require('axios');

exports.handler = async (event, context) => {
    // 1. Enforce strict POST request security checks
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed.' })
        };
    }

    try {
        // 2. Extract payload elements out of frontend form streams
        const payload = JSON.parse(event.body);
        const { email } = payload;
        
        if (!email) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Email parameter is required.' })
            };
        }

        // 3. Retrieve our Google Sheet Webhook target location safely out of system memory
        // Fallback to the active sheet URL to ensure out-of-the-box functionality
        const googleWebhookTarget = process.env.GOOGLE_SHEET_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbxV_GPgeTqhWw_yIzX4WvY1S8w95FjIQL3u3iwcpwNm5aI5sQmEx7FCqw2S0uQVKo0a5w/exec";

        console.log(`📤 Syncing captured subscriber [${email}] directly to Google Sheet...`);

        // 4. Stream data payload directly across the web straight to Google's macro engine
        // Note: Google Script redirects POST requests with a 302/307 status.
        // Axios in Node.js by default converts 302 redirects from POST to GET and drops the body.
        // To prevent this, we handle the redirect manually.
        let response;
        try {
            response = await axios.post(googleWebhookTarget, payload, {
                maxRedirects: 0,
                validateStatus: (status) => status >= 200 && status < 400
            });
        } catch (error) {
            if (error.response && [301, 302, 307, 308].includes(error.response.status)) {
                const redirectUrl = error.response.headers.location;
                console.log(`↪️ Redirecting to Google Content server (catch): ${redirectUrl}`);
                response = await axios.post(redirectUrl, payload);
            } else {
                throw error;
            }
        }

        // If it resolved with a 3xx redirect status code, follow it manually
        if (response.status >= 300 && response.status < 400 && response.headers.location) {
            const redirectUrl = response.headers.location;
            console.log(`↪️ Redirecting to Google Content server (resolve): ${redirectUrl}`);
            response = await axios.post(redirectUrl, payload);
        }

        // 5. Evaluate response signals returned by Google's background execution scripts
        if (response.data && response.data.result === 'success') {
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ success: true, message: 'Data perfectly synchronized to Google Sheet!' })
            };
        } else {
            throw new Error(response.data.error || 'Google Script execution pipeline error.');
        }

    } catch (pipelineException) {
        console.error('❌ Direct Spreadsheet Integration Sync Fault:', pipelineException.message);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Failed to write record to Google sheet tracking grids.', details: pipelineException.message })
        };
    }
};
