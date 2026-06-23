const axios = require('axios');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { email, niche } = JSON.parse(event.body);
        
        if (!email) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Email is required' }) };
        }

        // Send data directly to Airtable's REST API
        // You'll grab these variable tokens from your free Airtable Developer account
        await axios.post(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Subscribers`, {
            fields: {
                "EmailAddress": email,
                "TargetNiche": niche || "General",
                "DateJoined": new Date().toISOString().split('T')[0]
            }
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.AIRTABLE_PAT_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: true, message: 'Contact successfully archived!' })
        };

    } catch (error) {
        console.error('❌ Database Sync Failure:', error.response?.data || error.message);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to write to data store' }) };
    }
};
