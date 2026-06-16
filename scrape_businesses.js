const fs = require('fs');
const path = require('path');
const https = require('https');

// Helper to make native HTTP GET requests returning JSON
function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        }, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                if (res.statusCode !== 200) {
                    return reject(new Error(`HTTP ${res.statusCode}: ${data}`));
                }
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(new Error("Failed to parse JSON: " + data));
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// Category mapper for bizdata-web.vercel.app API
function mapNicheToAPICategory(niche) {
    const service = niche.service_name.toLowerCase();
    const category = niche.category.toLowerCase();
    
    if (service.includes("quickbooks") || category.includes("accounting") || category.includes("finance")) return "accountant";
    if (service.includes("insurance")) return "insurance";
    if (service.includes("legal") || service.includes("contract") || service.includes("notary") || category.includes("legal")) return "lawyer";
    if (service.includes("receptionist") || service.includes("cybersecurity") || service.includes("ai") || category.includes("tech") || category.includes("it")) return "electronics";
    if (service.includes("school") || service.includes("apprentice") || category.includes("education")) return "school";
    if (service.includes("maintenance") || service.includes("dumpster") || service.includes("junk") || service.includes("appliance") || service.includes("moving") || service.includes("well") || service.includes("septic")) return "parking";
    if (service.includes("hotel") || service.includes("airbnb") || service.includes("short-term") || service.includes("str")) return "guest_house";
    if (service.includes("dentist")) return "dentist";
    if (service.includes("doctor") || service.includes("care") || service.includes("handicap") || service.includes("aging")) return "doctor";
    
    // Default fallback to real_estate for contractor/remodeling/property services
    return "real_estate";
}

async function startScraper() {
    console.log("Loading niches from data.js...");
    
    // Read localDatabase array by executing data.js in a sandboxed context or parsing
    const dataPath = path.join(__dirname, 'data.js');
    if (!fs.existsSync(dataPath)) {
        console.error("Error: data.js not found at " + dataPath);
        return;
    }
    
    const dataContent = fs.readFileSync(dataPath, 'utf8');
    // Simple sandbox loading of localDatabase variable
    let localDatabase = [];
    try {
        const tempFunc = new Function(dataContent + '; return localDatabase;');
        localDatabase = tempFunc();
    } catch (e) {
        console.error("Failed to parse localDatabase: ", e);
        return;
    }
    
    console.log(`Loaded ${localDatabase.length} niches successfully.`);
    
    const targetLocations = [
        "Byron, GA",
        "Atlanta, GA",
        "Miami, FL",
        "Houston, TX",
        "Dallas, TX",
        "Orlando, FL",
        "Charlotte, NC",
        "Tampa, FL"
    ];
    
    const scrapedListings = [];
    
    for (const location of targetLocations) {
        console.log(`\n======================================`);
        console.log(`SCRAPING LOCATION: ${location}`);
        console.log(`======================================`);
        
        for (const niche of localDatabase) {
            const apiCategory = mapNicheToAPICategory(niche);
            const encodedLoc = encodeURIComponent(location);
            const url = `https://bizdata-web.vercel.app/api/businesses?location=${encodedLoc}&category=${apiCategory}&limit=3`;
            
            console.log(`Querying [${niche.service_name}] -> API Category [${apiCategory}]...`);
            
            try {
                const results = await fetchJson(url);
                
                if (Array.isArray(results)) {
                    console.log(`  Found ${results.length} active listings.`);
                    results.forEach(biz => {
                        // Extract state abbreviation and city name from location string
                        const locParts = location.split(',');
                        const city = locParts[0].trim();
                        const state = locParts[1] ? locParts[1].trim() : "GA";
                        
                        scrapedListings.push({
                            id: `live_${biz.id || Math.random().toString(36).substr(2, 9)}`,
                            service_name: biz.name || niche.service_name,
                            category: niche.category,
                            price_level: niche.price_level,
                            listing_tier: Math.random() > 0.75 ? "Premium" : "Standard",
                            related_services: niche.related_services,
                            local_seo: {
                                title_template: `${biz.name || niche.service_name} in [City], [State_Abbr]`,
                                example_title: `${biz.name || niche.service_name} in ${city}, ${state}`,
                                primary_keywords: niche.local_seo.primary_keywords || []
                            },
                            downloadable_resource: niche.downloadable_resource,
                            call_to_action: niche.call_to_action,
                            phone: biz.phone || "N/A",
                            website: biz.website || "N/A",
                            address: biz.address || "N/A",
                            city: city,
                            state: state
                        });
                    });
                } else if (results.error) {
                    console.log(`  API Error: ${results.error}`);
                }
            } catch (err) {
                console.log(`  Network/API Request Failed: ${err.message}`);
            }
            
            // Add a 1-second breather to remain completely clear of rate limits
            console.log("  Breathing for 1 second...");
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    console.log(`\nScraping complete! Found ${scrapedListings.length} total live listings.`);
    
    // Write out the scraped listings to live_listings.js
    const outputFilePath = path.join(__dirname, 'live_listings.js');
    const outputContent = `// Auto-generated live business directory database\nconst liveDatabaseOverride = ${JSON.stringify(scrapedListings, null, 2)};\n`;
    fs.writeFileSync(outputFilePath, outputContent, 'utf8');
    console.log(`Saved live data successfully to: ${outputFilePath}`);
}

startScraper();
