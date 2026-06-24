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
        const { email, niche } = JSON.parse(event.body);
        
        if (!email) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Email parameter is required.' })
            };
        }

        // 3. Retrieve our Google Sheet Webhook target location safely out of system memory
        const googleWebhookTarget = process.env.GOOGLE_SHEET_WEBHOOK_URL;
        if (!googleWebhookTarget) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'System variable mismatch. Hook address is unconfigured.' })
            };
        }

        console.log(`📤 Syncing captured subscriber [${email}] directly to Google Sheet...`);

        // 4. Stream data payload directly across the web straight to Google's macro engine
        const response = await axios.post(googleWebhookTarget, {
            email: email,
            niche: niche
        });

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
