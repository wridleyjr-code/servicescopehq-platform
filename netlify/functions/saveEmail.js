const axios = require('axios');

exports.handler = async (event, context) => {
    // 1. Enforce strict POST request security checks
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed. Submit requests via POST.' })
        };
    }

    try {
        // 2. Extract expanded payload elements out of frontend form streams
        const payload = JSON.parse(event.body);
        const { companyName, name, email, niche, zip, city, status, phone, budget, timeline, certs } = payload;
        
        if (!email) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Email parameter is required.' })
            };
        }

        // 3. Retrieve our Google Sheet Webhook target location safely out of system memory
        const googleWebhookTarget = process.env.GOOGLE_SHEET_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbxV_GPgeTqhWw_yIzX4WvY1S8w95FjIQL3u3iwcpwNm5aI5sQmEx7FCqw2S0uQVKo0a5w/exec";

        console.log(`📤 Syncing captured subscriber [${email}] from company [${companyName || name || "N/A"}] directly to Google Sheet...`);

        // Format standard payload keys for explicit companyName and niche column routing
        const postData = {
            companyName: companyName || name || "",
            name: name || companyName || "",
            email: email,
            niche: niche || payload.target_niche_name || "",
            target_niche_name: niche || payload.target_niche_name || "",
            zip: zip || payload.ZIP || payload.zipcode || "",
            city: city || payload.City || "",
            status: status || 'FREE ADD',
            phone: phone || "",
            budget: budget || "",
            timeline: timeline || "",
            certs: certs || ""
        };

        // 4. Stream expanded data payload directly to Google's macro engine
        // Note: Google Script redirects POST requests with a 302/307 status.
        // Axios in Node.js by default converts 302 redirects from POST to GET and drops the body.
        // To prevent this, we handle the redirect manually.
        let response;
        try {
            response = await axios.post(googleWebhookTarget, postData, {
                maxRedirects: 0,
                validateStatus: (status) => status >= 200 && status < 400
            });
        } catch (error) {
            if (error.response && [301, 302, 307, 308].includes(error.response.status)) {
                const redirectUrl = error.response.headers.location;
                console.log(`↪️ Redirecting to Google Content server (catch): ${redirectUrl}`);
                try {
                    response = await axios.post(redirectUrl, postData);
                } catch (reErr) {
                    // Fall back to GET if redirect endpoint rejects POST
                    response = await axios.get(redirectUrl, { params: postData });
                }
            } else {
                throw error;
            }
        }

        // If it resolved with a 3xx redirect status code, follow it manually
        if (response.status >= 300 && response.status < 400 && response.headers.location) {
            const redirectUrl = response.headers.location;
            console.log(`↪️ Redirecting to Google Content server (resolve): ${redirectUrl}`);
            try {
                response = await axios.post(redirectUrl, postData);
            } catch (reErr) {
                response = await axios.get(redirectUrl, { params: postData });
            }
        }

        // 5. Robust response parsing & status evaluation
        let responseData = response.data;
        if (typeof responseData === 'string') {
            try {
                responseData = JSON.parse(responseData);
            } catch (pErr) {
                if (responseData.includes('success')) {
                    responseData = { result: 'success' };
                }
            }
        }

        const isSuccess = responseData && (
            responseData.result === 'success' || 
            responseData.status === 'success' || 
            responseData.success === true
        );

        if (isSuccess || response.status === 200) {
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ success: true, message: 'Data perfectly synchronized to Google Sheet!' })
            };
        } else {
            throw new Error((responseData && (responseData.error || responseData.message)) || 'Google Script execution pipeline error.');
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
