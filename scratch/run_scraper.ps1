# ServiceScopeHQ - Live Business Scraper (PowerShell)
# Mirrors scrape_businesses.js logic, writes live_listings.js

$locations = @(
    "Byron, GA", "Atlanta, GA", "Miami, FL", "Houston, TX",
    "Dallas, TX", "Orlando, FL", "Charlotte, NC", "Tampa, FL"
)

# Niche -> API category mapping (mirrors mapNicheToAPICategory in scrape_businesses.js)
function Get-APICategory($serviceName, $category) {
    $s = $serviceName.ToLower()
    $c = $category.ToLower()
    if ($s -match "quickbooks|accounting|finance" -or $c -match "accounting|finance") { return "accountant" }
    if ($s -match "insurance") { return "insurance" }
    if ($s -match "legal|contract|notary" -or $c -match "legal") { return "lawyer" }
    if ($s -match "receptionist|cybersecurity|ai" -or $c -match "tech|it|saas|b2b tech") { return "electronics" }
    if ($s -match "school|apprentice" -or $c -match "education|edtech") { return "school" }
    if ($s -match "maintenance|dumpster|junk|appliance|moving|well|septic") { return "parking" }
    if ($s -match "hotel|airbnb|short-term|str|short.term rental") { return "guest_house" }
    if ($s -match "dentist") { return "dentist" }
    if ($s -match "doctor|care|handicap|aging") { return "doctor" }
    return "real_estate"
}

$niches = @(
    @{ id="niche_01"; service_name="Aging-in-Place Home Modification"; category="Senior, Family & Household Services"; price_level="High Ticket"; listing_tier="Premium"; related_services=@("Wheelchair ramps","Grab bar install","Door widening"); local_seo=@{title_template="Aging-in-Place Home Modifications in [City], [State_Abbr]"; primary_keywords=@("senior home modifications","handicap accessible home installer")}; downloadable_resource=@{title="Comprehensive Home Accessibility Audit Checklist";price=0}; call_to_action="Download Checklist & Get Quotes" },
    @{ id="niche_02"; service_name="Handicap Bathroom Costs"; category="Senior, Family & Household Services"; price_level="High Ticket"; listing_tier="Premium"; related_services=@("Walk-in tubs","Roll-in showers","Anti-slip flooring"); local_seo=@{title_template="Handicap Bathroom Remodel Cost in [City], [State_Abbr]"; primary_keywords=@("accessible bathroom cost","walk in tub installers")}; downloadable_resource=@{title="ADA Bathroom Layout Planning Worksheet";price=0}; call_to_action="Request High-Ticket Quotes" },
    @{ id="niche_03"; service_name="Tile Shower Installation"; category="Remodeling"; price_level="High Ticket"; listing_tier="Standard"; related_services=@("Shower pan","Tile floor","Waterproofing"); local_seo=@{title_template="Tile Shower Installation Cost in [City], [State_Abbr]"; primary_keywords=@("tile shower cost","custom shower installer")}; downloadable_resource=@{title="Shower scope-of-work template";price=49}; call_to_action="Request a quote" },
    @{ id="niche_04"; service_name="Local Remodeling Labor Costs"; category="Remodeling"; price_level="Mid Ticket"; listing_tier="Standard"; related_services=@("Drywall installation","Framing labor","Finish carpentry"); local_seo=@{title_template="Average Remodeling Labor Rates in [City], [State_Abbr]"; primary_keywords=@("carpenter hourly rate","handyman local labor cost")}; downloadable_resource=@{title="Labor Hours Estimation Sheet";price=29}; call_to_action="Browse Cost Index" },
    @{ id="niche_05"; service_name="Rental Turnover Repairs"; category="Property & Convenience Services"; price_level="Mid Ticket"; listing_tier="Standard"; related_services=@("Patch & paint","Lock rekeying","Deep cleaning"); local_seo=@{title_template="Fast Rental Turnover Repair Services in [City], [State_Abbr]"; primary_keywords=@("apartment turnover repair","property maintenance punchlist")}; downloadable_resource=@{title="100-Point Move-Out Restoration Checklist";price=0}; call_to_action="Find Turnover Help" },
    @{ id="niche_06"; service_name="Insurance Claim Repair Scope"; category="FinTech / Restoration"; price_level="High Ticket"; listing_tier="Premium"; related_services=@("Water mitigation","Fire restoration","Roof supplements"); local_seo=@{title_template="Insurance Property Claim Scope Auditing in [City], [State_Abbr]"; primary_keywords=@("Xactimate estimate line items","supplemental repair scope")}; downloadable_resource=@{title="Standard Supplement Scoping Guide";price=99}; call_to_action="Submit Scope for Audit" },
    @{ id="niche_07"; service_name="Mold Remediation Pricing"; category="Environmental / Emergency"; price_level="High Ticket"; listing_tier="Standard"; related_services=@("Spore air testing","Crawlspace encapsulation","Dehumidification"); local_seo=@{title_template="Certified Mold Remediation Costs in [City], [State_Abbr]"; primary_keywords=@("black mold removal cost","emergency mold abatement near me")}; downloadable_resource=@{title="Post-Mitigation Air Clearance Protocol";price=0}; call_to_action="Connect with Certified Pros" },
    @{ id="niche_08"; service_name="Small Contractor Templates"; category="Professional Services"; price_level="Low Ticket"; listing_tier="Standard"; related_services=@("Change orders","Subcontractor agreements","Lien waivers"); local_seo=@{title_template="Downloadable Construction Contract Templates for [City] Builders"; primary_keywords=@("independent contractor agreement template","remodeling estimate printable")}; downloadable_resource=@{title="Master Service Agreement Shell (Lite)";price=49}; call_to_action="Download Agreement Pack" },
    @{ id="niche_09"; service_name="QuickBooks Service Tag Structure"; category="SaaS / Accounting"; price_level="Low Ticket"; listing_tier="Standard"; related_services=@("Job costing setup","Chart of accounts config","Progress invoicing setup"); local_seo=@{title_template="Optimized QuickBooks Class Tag Setup for Tradesmen"; primary_keywords=@("quickbooks job costing structure","construction chart of accounts template")}; downloadable_resource=@{title="Trades Chart-of-Accounts Import Matrix";price=39}; call_to_action="Get Clean Books Setup" },
    @{ id="niche_10"; service_name="Permit Requirements by City"; category="GovTech / Compliance"; price_level="Mid Ticket"; listing_tier="Premium"; related_services=@("Zoning variances","Plan checks","Occupancy applications"); local_seo=@{title_template="Building Permit Requirements & Steps in [City], [State_Abbr]"; primary_keywords=@("do i need a permit for a deck","city residential building code lookup")}; downloadable_resource=@{title="Permit Application Package Guide";price=79}; call_to_action="Verify Permit Rules" },
    @{ id="niche_11"; service_name="Code Violation Repairs"; category="Legal / Real Estate"; price_level="High Ticket"; listing_tier="Standard"; related_services=@("Structural bracing","Unpermitted work removal","Electrical updates"); local_seo=@{title_template="Fix Code Violations Fast in [City], [State_Abbr]"; primary_keywords=@("city code compliance extension","stop work order resolution contractor")}; downloadable_resource=@{title="Municipal Inspector Pre-Audit Matrix";price=0}; call_to_action="Clear My Violation Notice" },
    @{ id="niche_12"; service_name="AI Setup for Local Biz"; category="B2B Tech / Agency"; price_level="High Ticket"; listing_tier="Premium"; related_services=@("CRM custom integrations","LLM database tuning","Legacy system scraping"); local_seo=@{title_template="Custom Business Workflow Automation in [City], [State_Abbr]"; primary_keywords=@("local small business workflow optimization","automate customer onboarding")}; downloadable_resource=@{title="AI Opportunity Matrix for Brick & Mortar Teams";price=149}; call_to_action="Book Operational Audit" },
    @{ id="niche_13"; service_name="AI Receptionist Database"; category="B2B Tech / SaaS"; price_level="Mid Ticket"; listing_tier="Standard"; related_services=@("Twilio phone configuration","Voice prompt system mapping","VAPI testing"); local_seo=@{title_template="Automated Phone Receptionist Setups for [City] Tradesmen"; primary_keywords=@("missed call auto text back system","virtual ai booking agent for plumbers")}; downloadable_resource=@{title="High-Conversion Voice Response Script Framework";price=29}; call_to_action="Deploy Phone Agent Now" },
    @{ id="niche_14"; service_name="SMB Cybersecurity Checklist"; category="Cybersecurity / IT"; price_level="High Ticket"; listing_tier="Premium"; related_services=@("Endpoint configuration tracking","Secure VPN systems","Phishing simulations"); local_seo=@{title_template="Small Business Data Compliance Audits in [City], [State_Abbr]"; primary_keywords=@("FTC safeguards compliance check","local business cyber security protection")}; downloadable_resource=@{title="Internal Employee Password & Access Protocol Deck";price=0}; call_to_action="Run Security Risk Check" },
    @{ id="niche_15"; service_name="Subcontractor Onboarding Pack"; category="HR / Operations"; price_level="Low Ticket"; listing_tier="Standard"; related_services=@("W9 processing checklists","COI verification procedures","Safety logs"); local_seo=@{title_template="Standard Subcontractor Packet Requirements for [City] Builders"; primary_keywords=@("subcontractor onboarding manual template","construction safety verification form")}; downloadable_resource=@{title="Subcontractor Jobsite Rules Sign-Off Form";price=59}; call_to_action="Get Onboarding Assets" },
    @{ id="niche_16"; service_name="Section 8 Repair Checklist"; category="Government Housing"; price_level="Low Ticket"; listing_tier="Standard"; related_services=@("HUD habitability audits","Lead paint clearances","HQS checklist checks"); local_seo=@{title_template="How to Pass Section 8 Inspections in [City], [State_Abbr]"; primary_keywords=@("Section 8 inspection failure list","HUD rental compliance adjustments")}; downloadable_resource=@{title="Pre-Inspection 50-Point Compliance Tracking Sheet";price=19}; call_to_action="Download Section 8 Form" },
    @{ id="niche_17"; service_name="Estate Cleanout Services"; category="Senior, Family & Household Services"; price_level="High Ticket"; listing_tier="Premium"; related_services=@("Appraisal sourcing","Donation routing logs","Deep clean scrubs"); local_seo=@{title_template="Compassionate Estate Liquidation Clears in [City], [State_Abbr]"; primary_keywords=@("probate asset junk clear out","estate content disposal specialists")}; downloadable_resource=@{title="Executor Property Liquidation Item Tracker Log";price=0}; call_to_action="Request Discrete Site Audit" },
    @{ id="niche_18"; service_name="Short-Term Rental Maintenance"; category="Property & Convenience Services"; price_level="Mid Ticket"; listing_tier="Standard"; related_services=@("Hot tub chemical logs","Emergency locksmith overrides","Linens processing"); local_seo=@{title_template="Same-Day Airbnb Emergency Maintenance in [City], [State_Abbr]"; primary_keywords=@("short term rental fast handymen","airbnb emergency repair tech")}; downloadable_resource=@{title="Turnover Maintenance Check Logs for Cleaners";price=0}; call_to_action="Hire On-Call Support" },
    @{ id="niche_19"; service_name="Well Water / Septic Service"; category="Infrastructure / Rural"; price_level="High Ticket"; listing_tier="Premium"; related_services=@("Submersible pump diagnostics","Drainfield rejuvenation jetting","Filter swap"); local_seo=@{title_template="Emergency Septic Pumping & Well Repair in [City], [State_Abbr]"; primary_keywords=@("septic backup emergency service","well water pump testing near me")}; downloadable_resource=@{title="Rural Utility Annual Maintenance Planner Blueprint";price=0}; call_to_action="Dispatch Field Engineer" },
    @{ id="niche_20"; service_name="Gov Contract Readiness"; category="B2G (Government)"; price_level="High Ticket"; listing_tier="Premium"; related_services=@("SAM.gov filing configuration","UEI registration sweeps","Capability briefs"); local_seo=@{title_template="Federal RFP Response & Bidding Consultants in [City], [State_Abbr]"; primary_keywords=@("small business government certification","SAM lookup assistance team")}; downloadable_resource=@{title="One-Page Corporate Capability Statement Grid Framework";price=199}; call_to_action="Run Procurement Check" },
    @{ id="niche_21"; service_name="Trade School / Apprenticeships"; category="EdTech / Careers"; price_level="Low Ticket"; listing_tier="Standard"; related_services=@("HVAC field basic schools","Welding line certifications","CDL licensing checks"); local_seo=@{title_template="Top Paid Trade Apprenticeship Programs in [City], [State_Abbr]"; primary_keywords=@("electrical apprenticeship listings","local vocational tech directories")}; downloadable_resource=@{title="Trades Resume Template & Core Interview Framework Guide";price=0}; call_to_action="Browse Training Portals" },
    @{ id="niche_22"; service_name="Small Biz Legal & Incorporation"; category="Legal"; price_level="Mid Ticket"; listing_tier="Standard"; related_services=@("LLC Formation","EIN Registration","Operating Agreements"); local_seo=@{title_template="How to Start an LLC in [City], [State_Abbr] Checklist"; primary_keywords=@("local LLC filing steps","business license cost")}; downloadable_resource=@{title="State-by-state compliance tracking sheet";price=49}; call_to_action="Launch your business" },
    @{ id="niche_23"; service_name="Apostille & Notary Admin Hub"; category="Document & Admin Help"; price_level="Low Ticket"; listing_tier="Standard"; related_services=@("Power of Attorney legalization","Translation certification"); local_seo=@{title_template="Fast Apostille Services in [City], [State_Abbr]"; primary_keywords=@("emergency notary near me","document legalization cost")}; downloadable_resource=@{title="International document preparation checklist";price=29}; call_to_action="Find an emergency notary" },
    @{ id="niche_24"; service_name="Contract Review & Scope Audit"; category="Legal"; price_level="Mid Ticket"; listing_tier="Premium"; related_services=@("Indemnity review","Retainage verification","Scope conflict maps"); local_seo=@{title_template="Commercial Subcontract Agreement Audits in [City], [State_Abbr]"; primary_keywords=@("construction contract lawyer review","verify scope of work legal traps")}; downloadable_resource=@{title="5 Red-Flag Contract Clauses Checklist";price=149}; call_to_action="Submit Contract for Review" },
    @{ id="niche_25"; service_name="Junk Removal Pricing"; category="Senior, Family & Household Services"; price_level="Mid Ticket"; listing_tier="Standard"; related_services=@("Estate cleanout","Hoarder sorting","Garage clearing"); local_seo=@{title_template="Affordable Junk Removal Costs in [City], [State_Abbr]"; primary_keywords=@("haul away junk price","trash removal near me")}; downloadable_resource=@{title="Decluttering checklist & property sorting layout";price=0}; call_to_action="Request a haul quote" },
    @{ id="niche_26"; service_name="Appliance Removal & Recycle"; category="Senior, Family & Household Services"; price_level="Low Ticket"; listing_tier="Standard"; related_services=@("Refrigerator disposal","Freon recovery logs","Dryer hauling"); local_seo=@{title_template="Refrigerator & Washer Bulk Pickups in [City], [State_Abbr]"; primary_keywords=@("old appliance disposal crew","free appliance recycling pickup lookup")}; downloadable_resource=@{title="Appliance Disconnection & Drainage Safety Sheet";price=0}; call_to_action="Clear Old Unit Now" },
    @{ id="niche_27"; service_name="Dumpster Rental Cost Index"; category="Property & Convenience Services"; price_level="High Ticket"; listing_tier="Premium"; related_services=@("Construction waste disposal","Roofing tear-off bins"); local_seo=@{title_template="Best Roll-Off Dumpster Rental Prices in [City], [State_Abbr]"; primary_keywords=@("15 yard dumpster rental","roll off container cost")}; downloadable_resource=@{title="Dumpster sizing calculator & weight allowance sheet";price=0}; call_to_action="Check local availability" },
    @{ id="niche_28"; service_name="Moving Labor / On-Demand Loading"; category="Senior, Family & Household Services"; price_level="Mid Ticket"; listing_tier="Standard"; related_services=@("U-Haul truck packing","Furniture pad wrapping","Heavy piano lifts"); local_seo=@{title_template="Hire Local Moving Labor Crews in [City], [State_Abbr]"; primary_keywords=@("load moving truck help online","local hands for furniture lifting")}; downloadable_resource=@{title="Truck Packing Optimization Space Calculation Matrix";price=0}; call_to_action="Reserve Loading Hands" },
    @{ id="niche_29"; service_name="Short-Term Rental Listing Optimization"; category="Property & Convenience Services"; price_level="Mid Ticket"; listing_tier="Premium"; related_services=@("Listing copywriting","SEO photo sorting","Pricing algorithm setup"); local_seo=@{title_template="How to Increase Airbnb Bookings in [City], [State_Abbr]"; primary_keywords=@("short term rental seo","optimize airbnb listing")}; downloadable_resource=@{title="High-conversion listing description framework";price=99}; call_to_action="Audit my listing" }
)

$scrapedListings = [System.Collections.Generic.List[object]]::new()
$totalQueries = 0
$totalFound = 0

foreach ($location in $locations) {
    Write-Host "`n======================================"
    Write-Host "SCRAPING LOCATION: $location"
    Write-Host "======================================"

    $locParts = $location -split ","
    $city  = $locParts[0].Trim()
    $state = if ($locParts.Count -gt 1) { $locParts[1].Trim() } else { "GA" }

    foreach ($niche in $niches) {
        $apiCat = Get-APICategory $niche.service_name $niche.category
        $encodedLoc = [Uri]::EscapeDataString($location)
        $url = "https://bizdata-web.vercel.app/api/businesses?location=$encodedLoc&category=$apiCat&limit=3"

        Write-Host "  [$($niche.service_name)] -> [$apiCat]..." -NoNewline
        $totalQueries++

        try {
            $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 12
            $json = $response.Content | ConvertFrom-Json

            $businesses = if ($json.businesses) { $json.businesses } elseif ($json -is [array]) { $json } else { @() }

            if ($businesses.Count -gt 0) {
                Write-Host " $($businesses.Count) found"
                $totalFound += $businesses.Count
                foreach ($biz in $businesses) {
                    $randomTier = if ((Get-Random -Minimum 0 -Maximum 100) -gt 75) { "Premium" } else { $niche.listing_tier }
                    $bizId = if ($biz.osm_id) { $biz.osm_id } else { [System.Guid]::NewGuid().ToString("N").Substring(0,9) }
                    $scrapedListings.Add([PSCustomObject]@{
                        id                   = "live_$bizId"
                        service_name         = if ($biz.name) { $biz.name } else { $niche.service_name }
                        category             = $niche.category
                        price_level          = $niche.price_level
                        listing_tier         = $randomTier
                        related_services     = $niche.related_services
                        local_seo            = [PSCustomObject]@{
                            title_template   = if ($biz.name) { "$($biz.name) in [City], [State_Abbr]" } else { $niche.local_seo.title_template }
                            example_title    = if ($biz.name) { "$($biz.name) in $city, $state" } else { "" }
                            primary_keywords = $niche.local_seo.primary_keywords
                        }
                        downloadable_resource = $niche.downloadable_resource
                        call_to_action       = $niche.call_to_action
                        phone                = if ($biz.phone) { $biz.phone } else { "N/A" }
                        website              = if ($biz.website) { $biz.website } else { "N/A" }
                        address              = if ($biz.address) { $biz.address } else { "N/A" }
                        city                 = $city
                        state                = $state
                    })
                }
            } else {
                Write-Host " 0 found"
            }
        } catch {
            Write-Host " ERROR: $($_.Exception.Message)"
        }

        Start-Sleep -Milliseconds 600
    }
}

Write-Host "`n======================================"
Write-Host "Scraping complete!"
Write-Host "Total queries: $totalQueries"
Write-Host "Total businesses found: $totalFound"
Write-Host "======================================"

# Serialize to JSON and write live_listings.js
$jsonContent = $scrapedListings | ConvertTo-Json -Depth 10 -Compress:$false
$outputPath = Join-Path $PSScriptRoot "..\live_listings.js"
$fileContent = "// Auto-generated live business directory database`nconst liveDatabaseOverride = $jsonContent;`n"
Set-Content -Path $outputPath -Value $fileContent -Encoding UTF8
Write-Host "Saved $($scrapedListings.Count) live listings to: $outputPath"
