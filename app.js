let activeCategoryFilter = "";
let activeDatabase = [];

// Geographic State
const geoState = {
    state: "",
    city: "",
    zip: "",
    keyword: ""
};

document.addEventListener("DOMContentLoaded", () => {
    // Merge localDatabase and liveDatabaseOverride if present
    activeDatabase = [...(typeof localDatabase !== 'undefined' ? localDatabase : [])];
    if (typeof liveDatabaseOverride !== 'undefined' && Array.isArray(liveDatabaseOverride)) {
        activeDatabase = [...activeDatabase, ...liveDatabaseOverride];
    }
    
    initializeUIFilters();
    executePlatformSearchFilter();
    setupMRRListeners();
    setupCalculatorListeners();
    initializeGeographicListeners();
    setupNewsletterFormListener();
});

function initializeUIFilters() {
    if (activeDatabase.length === 0) {
        console.error("Critical database routing exception: activeDatabase is empty.");
        return;
    }

    const categories = [...new Set(activeDatabase.map(item => item.category))];
    const container = document.getElementById("categoryContainer");
    if(!container) return;
    
    container.innerHTML = "";
    
    // Add "All Sectors" logic
    const filterAllBtn = document.getElementById("filter-all");
    if(filterAllBtn) {
        filterAllBtn.addEventListener("click", () => {
            activeCategoryFilter = "";
            resetFilterButtons();
            filterAllBtn.className = "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all bg-indigo-50 text-indigo-700";
            executePlatformSearchFilter();
        });
    }

    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all text-slate-600 hover:bg-slate-100 hover:text-slate-900";
        btn.textContent = cat;
        btn.onclick = () => setCategoryFilter(cat, btn);
        container.appendChild(btn);
    });
}

function setCategoryFilter(category, clickedButton) {
    activeCategoryFilter = category;
    resetFilterButtons();
    clickedButton.className = "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all bg-indigo-50 text-indigo-700";
    executePlatformSearchFilter();
}

function resetFilterButtons() {
    const filterAllBtn = document.getElementById("filter-all");
    if(filterAllBtn) filterAllBtn.className = "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all text-slate-600 hover:bg-slate-100 hover:text-slate-900";
    
    const buttons = document.querySelectorAll("#categoryContainer button");
    buttons.forEach(b => b.className = "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all text-slate-600 hover:bg-slate-100 hover:text-slate-900");
}

function initializeGeographicListeners() {
    const stateInput = document.getElementById("stateFilter");
    const cityInput = document.getElementById("cityFilter");
    const zipInput = document.getElementById("zipFilter");
    const searchInput = document.getElementById("dirSearch");

    // Dynamic city populating function
    function populateCitiesForState(stateCode) {
        if (!cityInput) return;
        
        // Clear previous options
        cityInput.innerHTML = '<option value="">All Cities</option>';
        
        if (!stateCode) {
            cityInput.disabled = true;
            cityInput.className = "w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-500 disabled:opacity-50";
            cityInput.innerHTML = '<option value="">Select State First</option>';
            geoState.city = "";
            return;
        }

        // Extract unique cities for this state from activeDatabase
        const cities = [...new Set(
            activeDatabase
                .filter(item => item.state && item.state.toUpperCase() === stateCode.toUpperCase() && item.city)
                .map(item => item.city)
        )].sort();

        if (cities.length > 0) {
            cities.forEach(city => {
                const opt = document.createElement("option");
                opt.value = city;
                opt.textContent = city;
                cityInput.appendChild(opt);
            });
            cityInput.disabled = false;
            cityInput.className = "w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-300";
        } else {
            cityInput.disabled = true;
            cityInput.className = "w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-500 disabled:opacity-50";
            cityInput.innerHTML = '<option value="">No Cities Found</option>';
        }
    }

    if(stateInput) {
        stateInput.addEventListener("change", (e) => {
            const selectedState = e.target.value.trim().toUpperCase();
            geoState.state = selectedState;
            populateCitiesForState(selectedState);
            geoState.city = ""; // Reset city selection
            updateLocationBadge();
            executePlatformSearchFilter();
        });
    }

    if(cityInput) {
        cityInput.addEventListener("change", (e) => {
            geoState.city = e.target.value.trim();
            updateLocationBadge();
            executePlatformSearchFilter();
        });
    }

    if(searchInput) {
        searchInput.addEventListener("input", (e) => {
            geoState.keyword = e.target.value.toLowerCase();
            executePlatformSearchFilter();
        });
    }
    
    if(zipInput) {
        zipInput.addEventListener("input", (e) => {
            geoState.zip = e.target.value.trim();
            updateLocationBadge();
            executePlatformSearchFilter();
        });
    }

    const priceFilter = document.getElementById("priceFilter");
    if(priceFilter) priceFilter.addEventListener("change", executePlatformSearchFilter);
    
    // Initial run to ensure correct disabled state for city selector
    if (stateInput) {
        populateCitiesForState(stateInput.value);
    }
}

function updateLocationBadge() {
    const badge = document.getElementById("currentLocationBadge");
    if(!badge) return;
    
    if (geoState.zip) {
        badge.textContent = `ZIP ${geoState.zip} Scopes`;
    } else if (geoState.city && geoState.state) {
        badge.textContent = `${geoState.city}, ${geoState.state} Scopes`;
    } else if (geoState.state) {
        badge.textContent = `${geoState.state} Scopes`;
    } else {
        badge.textContent = "Live Estimates & Scopes";
    }
}

function executePlatformSearchFilter() {
    const priceFilterEl = document.getElementById("priceFilter");
    const priceVal = priceFilterEl ? priceFilterEl.value : "";

    const matches = activeDatabase.filter(item => {
        // Keyword checks across core strings
        const matchesKeyword = geoState.keyword === "" || 
                               item.service_name.toLowerCase().includes(geoState.keyword) || 
                               item.category.toLowerCase().includes(geoState.keyword) ||
                               item.related_services.some(s => s.toLowerCase().includes(geoState.keyword));
                               
        const matchesCategory = activeCategoryFilter === "" || item.category === activeCategoryFilter;
        const matchesPrice = priceVal === "" || item.price_level === priceVal;
        
        // Match location (for scraped listings)
        let matchesLocation = true;
        if (geoState.state || geoState.city) {
            // Static items from localDatabase don't have explicit city/state property, so they match all
            const itemState = item.state ? item.state.toUpperCase() : "";
            const itemCity = item.city ? item.city.toLowerCase() : "";
            
            if (geoState.state && itemState && itemState !== geoState.state) matchesLocation = false;
            if (geoState.city && itemCity && !itemCity.includes(geoState.city.toLowerCase())) matchesLocation = false;
        }

        return matchesKeyword && matchesCategory && matchesPrice && matchesLocation;
    });

    // Sort: Premium tiers pin to the top
    matches.sort((a, b) => {
        if (a.listing_tier === 'Premium' && b.listing_tier !== 'Premium') return -1;
        if (a.listing_tier !== 'Premium' && b.listing_tier === 'Premium') return 1;
        return 0;
    });

    // Update Counter Badges
    const displayedCount = document.getElementById("displayedCount");
    const totalCount = document.getElementById("totalCount");
    if(displayedCount) displayedCount.textContent = matches.length;
    if(totalCount) totalCount.textContent = activeDatabase.length;

    renderFilteredDirectory(matches);
}

function renderFilteredDirectory(records) {
    const outputArea = document.getElementById("directoryGrid"); 
    if(!outputArea) return;
    
    outputArea.innerHTML = "";

    if (records.length === 0) {
        outputArea.innerHTML = `<div class="text-center p-6 text-xs text-slate-500 font-semibold border border-dashed border-slate-800 rounded-xl">No subcontractors or active listings found operating in that location bracket.</div>`;
        return;
    }

    records.forEach(item => {
        // Dynamic Title Customization based on Geographic Console
        let displayTitle = item.service_name;
        if (geoState.city && geoState.state) {
            displayTitle = item.local_seo.title_template
                .replace('[City]', geoState.city)
                .replace('[State_Abbr]', geoState.state);
        } else if (geoState.state) {
            displayTitle = item.local_seo.title_template
                .replace('[City]', 'Local')
                .replace('[State_Abbr]', geoState.state);
        } else if (geoState.zip) {
            displayTitle = `ZIP ${geoState.zip} ${item.service_name}`;
        }

        // Fill mapping variables for the dark card
        const displayState = geoState.state || "National";
        const displayCity = geoState.city || "All Cities";
        const displayZip = geoState.zip || "N/A";

        const isTileNiche = item.id === "niche_03";
        const isAdaNiche = item.id === "niche_01" || item.id === "niche_02";
        const isPremium = item.listing_tier === "Premium";
        
        let cardClass = "";
        if (isTileNiche || isAdaNiche) {
            cardClass = "bg-slate-950 border border-slate-800 p-5 rounded-xl flex flex-col hover:border-slate-600 transition-all cursor-pointer gap-4 w-full";
        } else if (isPremium) {
            cardClass = "bg-slate-950 border-2 border-indigo-500/80 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:border-indigo-400 transition-all cursor-pointer relative overflow-hidden gap-4";
        } else {
            cardClass = "bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between hover:border-slate-600 transition-all cursor-pointer gap-4";
        }

        const premiumBadge = isPremium 
            ? `<div class="absolute -right-8 top-3 bg-gradient-to-r from-amber-400 to-amber-600 text-[9px] font-black uppercase tracking-widest text-slate-900 py-1 px-8 rotate-45 shadow-sm">Premium</div>` 
            : "";

        const resourcePrice = item.downloadable_resource.price > 0 ? `$${item.downloadable_resource.price}` : "FREE";
        const resourceButtonColor = item.downloadable_resource.price > 0 ? "bg-amber-500 text-slate-900 hover:bg-amber-400" : "bg-slate-800 text-slate-300 hover:bg-slate-700";

        let takeoffHtml = "";
        if (isTileNiche) {
            takeoffHtml = `
            <!-- Takeoff Estimator UI markup card -->
            <div class="bg-slate-900/60 p-4 rounded-lg border border-slate-800 space-y-4 max-w-xl text-slate-200 mt-2 w-full" onclick="event.stopPropagation()">
                <div>
                    <h4 class="text-xs font-bold uppercase tracking-wider text-amber-400">Tile Shower Material Takeoff & Slope Engine</h4>
                    <p class="text-[10px] text-slate-400 mt-0.5">TCNA-compliant material scaling and pre-slope calculator for custom tile bays.</p>
                </div>
                
                <div class="space-y-3 text-[11px]">
                    <div class="grid grid-cols-3 gap-2">
                        <div>
                            <label class="block text-slate-300 mb-1 font-semibold text-[9px] uppercase">Pan Width (ft)</label>
                            <input type="number" id="panWidth" value="3" oninput="runTileCalculator()" class="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500">
                        </div>
                        <div>
                            <label class="block text-slate-300 mb-1 font-semibold text-[9px] uppercase">Pan Length (ft)</label>
                            <input type="number" id="panLength" value="5" oninput="runTileCalculator()" class="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500">
                        </div>
                        <div>
                            <label class="block text-slate-300 mb-1 font-semibold text-[9px] uppercase">Wall Height (ft)</label>
                            <input type="number" id="wallHeight" value="8" oninput="runTileCalculator()" class="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500">
                        </div>
                    </div>

                    <div>
                        <label class="block text-slate-300 mb-1 font-semibold text-[9px] uppercase">Waste Allowance Layer</label>
                        <select id="wasteFactor" onchange="runTileCalculator()" class="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500">
                            <option value="1.10" selected>10% Standard (Straight Grid Layout)</option>
                            <option value="1.15">15% Modified (Diagonal / Large Format Cuts)</option>
                            <option value="1.20">20% High Waste (Herringbone / Chevron Patterns)</option>
                        </select>
                    </div>

                    <!-- Takeoff Quantities Summary Display Grid -->
                    <div class="bg-slate-950/60 p-3 rounded border border-slate-800/80 space-y-2 mt-2">
                        <h5 class="font-bold text-slate-400 uppercase text-[9px] tracking-wider mb-1">Required Material Takeoff Quantities</h5>
                        
                        <div class="grid grid-cols-2 gap-2 text-[10px]">
                            <div class="bg-slate-950/80 p-2 rounded border border-slate-800/40">
                                <p class="text-slate-400 text-[8px] uppercase">Backer Board Sheets (3'x5')</p>
                                <p id="takeoffBoards" class="text-xs font-black text-slate-200 mt-0.5">0 Sheets</p>
                            </div>
                            <div class="bg-slate-950/80 p-2 rounded border border-slate-800/40">
                                <p class="text-slate-400 text-[8px] uppercase">Waterproofing Membrane</p>
                                <p id="takeoffMembrane" class="text-xs font-black text-slate-200 mt-0.5">0 Sq Ft</p>
                            </div>
                            <div class="bg-slate-950/80 p-2 rounded border border-slate-800/40">
                                <p class="text-slate-400 text-[8px] uppercase">Thinset Mortar (50lb Bags)</p>
                                <p id="takeoffThinset" class="text-xs font-black text-slate-200 mt-0.5">0 Bags</p>
                            </div>
                            <div class="bg-slate-950/80 p-2 rounded border border-slate-800/40">
                                <p class="text-slate-400 text-[8px] uppercase">Est. Center Slope Drop</p>
                                <p id="takeoffSlope" class="text-xs font-black text-amber-400 mt-0.5">0.00 inches</p>
                            </div>
                        </div>
                        
                        <div class="bg-amber-950/20 border border-amber-900/40 p-2.5 rounded mt-2 text-[10px] text-amber-300 leading-normal">
                            ⚠️ <strong>TCNA Standard Compliance Rule:</strong> Shower pan slope calculations assume a minimum required drop of <strong>1/4-inch per linear foot</strong> traveling from the furthest perimeter framing wall edge straight to the center weep hole drain tracking throat.
                        </div>
                    </div>
                </div>
            </div>
            `;
        }

        let adaHtml = "";
        if (isAdaNiche) {
            adaHtml = `
            <!-- Niche 01 & 02: ADA Grab Bar & Roll-In Clearance Verifier -->
            <div class="bg-slate-900/60 p-4 rounded-lg border border-slate-800 space-y-4 max-w-xl text-slate-200 mt-2 w-full" onclick="event.stopPropagation()">
                <div>
                    <h4 class="text-xs font-bold uppercase tracking-wider text-teal-400">ADA Grab Bar & Roll-In Clearance Verifier</h4>
                    <p class="text-[10px] text-slate-400 mt-0.5">Instant code clearance checking tool for residential aging-in-place remodeling operations.</p>
                </div>
                
                <div class="space-y-3 text-[11px]">
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <label class="block text-slate-300 mb-1 font-semibold text-[9px] uppercase">Clear Width (Inches)</label>
                            <input type="number" id="adaWidth-${item.id}" value="72" oninput="runAdaVerifier('${item.id}')" class="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-teal-500">
                        </div>
                        <div>
                            <label class="block text-slate-300 mb-1 font-semibold text-[9px] uppercase">Clear Length (Inches)</label>
                            <input type="number" id="adaLength-${item.id}" value="84" oninput="runAdaVerifier('${item.id}')" class="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-teal-500">
                        </div>
                    </div>

                    <div class="space-y-2 pt-1 bg-slate-950/40 p-2.5 rounded border border-slate-800/60">
                        <label class="flex items-center space-x-2 text-slate-300 select-none cursor-pointer">
                            <input type="checkbox" id="adaObstructions-${item.id}" onchange="runAdaVerifier('${item.id}')" class="rounded border-slate-800 bg-slate-950 text-teal-600 focus:ring-0 focus:ring-offset-0">
                            <span>Fixed Obstructions Encroaching on Floor (Vanities, Cabinets)</span>
                        </label>
                        <label class="flex items-center space-x-2 text-slate-300 select-none cursor-pointer">
                            <input type="checkbox" id="adaDoorSwing-${item.id}" onchange="runAdaVerifier('${item.id}')" class="rounded border-slate-800 bg-slate-950 text-teal-600 focus:ring-0 focus:ring-offset-0">
                            <span>Bathroom Door Swings Inward into the Room Footprint</span>
                        </label>
                    </div>

                    <div class="bg-slate-950/60 p-3 rounded border border-slate-800/80 space-y-2 mt-2">
                        <div class="flex justify-between items-center">
                            <h5 class="font-bold text-slate-400 uppercase text-[9px] tracking-wider">ADA Clearance Status</h5>
                            <span id="adaBadge-${item.id}" class="text-[10px] font-black uppercase px-2.5 py-0.5 rounded border">Checking...</span>
                        </div>
                        
                        <p id="adaMessage-${item.id}" class="text-[10px] text-slate-300 leading-relaxed bg-slate-950/80 p-2.5 rounded border border-slate-800/40"></p>

                        <div class="border-t border-slate-800 pt-2 space-y-1 text-[9px] text-slate-400">
                            <p class="font-bold uppercase text-[8px] text-teal-500 tracking-wider mb-1">Standard Grab Bar Code Guidelines:</p>
                            <p>✓ <strong>Sidewall Bars:</strong> Min 42 inches long, mounted max 12 inches out from the back wall face.</p>
                            <p>✓ <strong>Rearwall Bars:</strong> Min 36 inches long, extending min 12 inches from center line on one side.</p>
                            <p>✓ <strong>Height Rule:</strong> All safety bars must lock in securely between <strong>33 and 36 inches</strong> above finished flooring.</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }

        const card = document.createElement("div");
        card.className = cardClass;
        card.innerHTML = `
            ${premiumBadge}
            <div class="space-y-1 z-10 w-full ${isTileNiche || isAdaNiche ? '' : 'md:w-auto'} flex-grow">
                <div class="flex items-center space-x-2">
                    <span class="text-[10px] font-bold text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/40 uppercase tracking-wider">${item.category}</span>
                    ${isPremium ? `<span class="text-[10px] font-bold text-amber-400 bg-amber-950/30 px-2 py-0.5 rounded border border-amber-900/50 uppercase tracking-wider">Verified Pro</span>` : ''}
                </div>
                <h3 class="text-sm font-bold text-slate-100">${displayTitle}</h3>
                <div class="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 text-xs text-slate-400 pt-0.5">
                    <div class="flex items-center space-x-1">
                        <span class="text-slate-300 font-semibold">📍 Coverage:</span>
                        <span>${displayCity}, ${displayState} (${displayZip})</span>
                    </div>
                    <div class="hidden sm:block text-slate-700">•</div>
                    <span class="font-semibold text-slate-300">${item.price_level}</span>
                </div>
                ${takeoffHtml}
                ${adaHtml}
            </div>
            
            <div class="flex items-center space-x-3 z-10 w-full md:w-auto mt-2 md:mt-0 ${isTileNiche || isAdaNiche ? 'border-t border-slate-800 pt-3' : 'md:border-0 md:pt-0'}">
                <button onclick="openLeadModal('${item.id}', '${displayTitle}', '${item.category}', '${item.downloadable_resource.title}', ${item.downloadable_resource.price})" class="flex-grow md:flex-grow-0 whitespace-nowrap text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded shadow-sm transition-all ${resourceButtonColor}">
                    ${item.downloadable_resource.price > 0 ? `Buy Asset (${resourcePrice})` : `Download Template (${resourcePrice})`}
                </button>
                <button onclick="openLeadModal('${item.id}', '${displayTitle}', '${item.category}', 'RFQ Routing', 0)" class="flex-grow md:flex-grow-0 whitespace-nowrap text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded shadow-sm transition-all bg-indigo-600 text-white hover:bg-indigo-500">
                    Dispatch RFQ
                </button>
            </div>
        `;
        
        outputArea.appendChild(card);
    });

    if (document.getElementById('panWidth')) {
        runTileCalculator();
    }
    ['niche_01', 'niche_02'].forEach(id => {
        if (document.getElementById(`adaWidth-${id}`)) {
            runAdaVerifier(id);
        }
    });
}

function openLeadModal(id, displayTitle, category, resourceTitle, price) {
    const leadModal = document.getElementById("leadModal");
    if(!leadModal) return;

    // Restore RFQ-only sections and default text in case they were hidden by the listing modal
    const rfqEnhancements = document.getElementById("rfqEnhancementsSection");
    if (rfqEnhancements) rfqEnhancements.classList.remove("hidden");
    const certsSection = document.getElementById("certsSection");
    if (certsSection) certsSection.classList.remove("hidden");
    
    const infoBoxDesc = document.querySelector("#leadModal .bg-indigo-50 p.opacity-90");
    if (infoBoxDesc) {
        infoBoxDesc.textContent = "Fill out your routing parameters below to fetch your resource file and direct quotes from verification checked contractors.";
    }

    let locString = "";
    if (geoState.zip) locString = geoState.zip;
    else if (geoState.city && geoState.state) locString = `${geoState.city}, ${geoState.state}`;
    else if (geoState.state) locString = geoState.state;

    document.getElementById("formNicheId").value = id;
    document.getElementById("subscriberNicheInput").value = displayTitle;
    document.getElementById("modalNicheName").textContent = displayTitle;
    document.getElementById("modalCategory").textContent = category;
    
    // Toggle between Buy Asset and Lead Capture based on pricing / intent
    const formSubmitBtn = document.getElementById("formSubmitBtn");
    if (price > 0 && resourceTitle !== 'RFQ Routing') {
        document.getElementById("modalResourceName").textContent = `${resourceTitle} - Buy for $${price}`;
        formSubmitBtn.textContent = `Checkout via Stripe ($${price})`;
        formSubmitBtn.className = "w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-4 rounded-lg shadow-md transition-all uppercase tracking-wider text-xs";
    } else if (resourceTitle === 'RFQ Routing') {
        document.getElementById("modalResourceName").textContent = `High-Intent Project RFQ`;
        formSubmitBtn.textContent = "Securely Dispatch RFQ to Pro Network";
        formSubmitBtn.className = "w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all uppercase tracking-wider text-xs";
    } else {
        document.getElementById("modalResourceName").textContent = `${resourceTitle} (FREE)`;
        formSubmitBtn.textContent = "Authorize Request & Download Template";
        formSubmitBtn.className = "w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all uppercase tracking-wider text-xs";
    }

    document.getElementById("formLocationInput").value = locString;
    document.getElementById("formLocationInput").placeholder = "";
    
    leadModal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
}

function openBusinessListingModal() {
    const leadModal = document.getElementById("leadModal");
    if(!leadModal) return;

    // Set modal headers specifically for claiming/listing a business
    document.getElementById("formNicheId").value = "niche_business_listing";
    document.getElementById("subscriberNicheInput").value = "Business Listing";
    document.getElementById("modalNicheName").textContent = "Claim / Add Your Business";
    document.getElementById("modalCategory").textContent = "Service Provider Network";
    document.getElementById("modalResourceName").textContent = "Directory Partner Placement";
    
    // Set customized onboarding message
    const infoBoxDesc = document.querySelector("#leadModal .bg-indigo-50 p.opacity-90");
    if (infoBoxDesc) {
        infoBoxDesc.textContent = "Submit your business details below to secure a local directory listing, claim your profile, and receive regional RFQ routing requests.";
    }

    // Set specialized submit button
    const formSubmitBtn = document.getElementById("formSubmitBtn");
    if (formSubmitBtn) {
        formSubmitBtn.textContent = "Request Partner Directory Listing";
        formSubmitBtn.className = "w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all uppercase tracking-wider text-xs";
    }

    // Hide project-specific inputs (Budget, Timeline, Certifications)
    const rfqEnhancements = document.getElementById("rfqEnhancementsSection");
    if (rfqEnhancements) rfqEnhancements.classList.add("hidden");
    const certsSection = document.getElementById("certsSection");
    if (certsSection) certsSection.classList.add("hidden");

    // Reset location value with a placeholder
    document.getElementById("formLocationInput").value = "";
    document.getElementById("formLocationInput").placeholder = "e.g. Atlanta, GA or 30301";

    leadModal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
}

function closeModal() {
    const leadModal = document.getElementById("leadModal");
    if(leadModal) {
        leadModal.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
    }
}

// ==========================================
// MRR Modeling Engine Logic (Retained)
// ==========================================
function setupMRRListeners() {
    const inputs = ['mrrLeads', 'mrrCloseRate', 'mrrRetainer'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.addEventListener('input', calculateMRR);
    });
    calculateMRR();
}

function calculateMRR() {
    const leadsEl = document.getElementById('mrrLeads');
    if(!leadsEl) return;
    
    const leads = parseFloat(leadsEl.value) || 0;
    const closeRate = parseFloat(document.getElementById('mrrCloseRate').value) || 0;
    const retainer = parseFloat(document.getElementById('mrrRetainer').value) || 0;

    const monthlyClients = leads * (closeRate / 100);
    const mrr = monthlyClients * retainer;
    const arr = mrr * 12;

    const mrrOutput = document.getElementById('mrrOutput');
    const arrOutput = document.getElementById('arrOutput');
    
    if(mrrOutput) mrrOutput.innerHTML = `$${mrr.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}<span class="text-xs text-indigo-500 font-bold ml-1">/mo</span>`;
    if(arrOutput) arrOutput.textContent = `$${arr.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}`;
}

// ==========================================
// B2B Billable Hourly Rate Calculator Logic
// ==========================================
function setupCalculatorListeners() {
    const inputs = ['calcWage', 'calcBurden', 'calcMargin'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.addEventListener('input', calculateRequiredHourlyRate);
    });
    calculateRequiredHourlyRate();
    runEscalationCalculator();
}

function calculateRequiredHourlyRate() {
    const wage = parseFloat(document.getElementById('calcWage').value) || 0;
    const burdenPct = parseFloat(document.getElementById('calcBurden').value) || 0;
    const marginPct = parseFloat(document.getElementById('calcMargin').value) || 0;

    // Calculate fully burdened labor cost base
    const burdenedCost = wage * (1 + (burdenPct / 100));
    
    // Apply margin formula target: Cost / (1 - Margin)
    const minimumBillableRate = burdenedCost / (1 - (marginPct / 100));

    document.getElementById('hourlyRateResult').textContent = 
        "$" + minimumBillableRate.toFixed(2) + " / hr";
}

function runEscalationCalculator() {
    // 1. Capture and convert input values securely
    const baseCost = parseFloat(document.getElementById('baseCostInput').value) || 0;
    const durationMonths = parseInt(document.getElementById('durationInput').value) || 1;
    const volatilityRate = parseFloat(document.getElementById('volatilitySelect').value) || 0;

    // 2. Mathematical Calculation Formulations
    // Standard baseline indexing assumes a fixed 0.5% project cost deterioration index per month out
    const monthlyEscalationFactor = 0.005;
    const timeEscalationFee = baseCost * (monthlyEscalationFactor * durationMonths);
    
    // Volatility buffer compounding index markup logic
    const volatilityBufferFee = baseCost * volatilityRate;
    
    // Consolidate pricing layers
    const totalContingencyCushion = timeEscalationFee + volatilityBufferFee;
    const finalAdjustedBidValue = baseCost + totalContingencyCushion;
    const totalCushionPercentage = baseCost > 0 ? (totalContingencyCushion / baseCost) * 100 : 0;

    // 3. Inject calculated strings back to client layout rendering points
    document.getElementById('outEscalation').textContent = "$" + timeEscalationFee.toFixed(2);
    document.getElementById('outVolatility').textContent = "$" + volatilityBufferFee.toFixed(2);
    document.getElementById('outTotalCushion').textContent = "$" + totalContingencyCushion.toFixed(2);
    document.getElementById('outPercentage').textContent = totalCushionPercentage.toFixed(0) + "%";
    document.getElementById('outFinalBid').textContent = "$" + finalAdjustedBidValue.toFixed(2);
}

// Ensure the engine runs its initial setup profile load when the site page opens
document.addEventListener("DOMContentLoaded", () => {
    if(document.getElementById('baseCostInput')) {
        runEscalationCalculator();
    }
});

function setupNewsletterFormListener() {
    const form = document.querySelector('form[name="newsletter"]');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = form.querySelector('input[name="email"]');
        const submitBtn = form.querySelector('button[type="submit"]');
        if (!emailInput || !submitBtn) return;
        
        const email = emailInput.value;
        const originalBtnText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = "Subscribing...";
        
        try {
            const response = await fetch('/.netlify/functions/saveEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, niche: 'Newsletter' })
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                emailInput.value = "";
                submitBtn.textContent = "Subscribed!";
                submitBtn.className = "bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg transition-all whitespace-nowrap shadow-md text-sm";
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                    submitBtn.className = "bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg transition-all whitespace-nowrap shadow-md text-sm";
                }, 3000);
            } else {
                throw new Error(data.error || 'Subscription failed');
            }
        } catch (error) {
            console.error('Subscription Error:', error);
            submitBtn.textContent = "Error! Try again.";
            submitBtn.className = "bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 px-6 rounded-lg transition-all whitespace-nowrap shadow-md text-sm";
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                submitBtn.className = "bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg transition-all whitespace-nowrap shadow-md text-sm";
            }, 3000);
        }
    });
}

async function captureSubscriberEmail(event) {
    event.preventDefault(); // Stop page refresh
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Capture all fields from the RFQ form and parse location details
    const locationVal = formData.get('client_location') || document.getElementById('formLocationInput').value || "";
    
    let parsedCity = "";
    let parsedZip = "";
    if (/^\d{5}$/.test(locationVal.trim())) {
        parsedZip = locationVal.trim();
    } else if (locationVal.includes(',')) {
        const parts = locationVal.split(',');
        parsedCity = parts[0].trim();
        parsedZip = parts[1] ? parts[1].trim() : "";
    } else {
        parsedCity = locationVal.trim();
    }

    const payload = {
        email: formData.get('client_email') || document.getElementById('subscriberEmailInput').value,
        niche: formData.get('target_niche_name') || document.getElementById('subscriberNicheInput').value,
        name: formData.get('client_name') || "",
        phone: formData.get('client_phone') || "",
        
        // Multi-mapped location fields for maximum webhook compatibility:
        location: locationVal,
        client_location: locationVal,
        zip: parsedZip || locationVal,
        city: parsedCity || locationVal,
        ZIP: parsedZip || locationVal,
        City: parsedCity || locationVal,
        zipcode: parsedZip || locationVal,
        ZipCode: parsedZip || locationVal,
        
        budget: formData.get('client_budget') || "",
        timeline: formData.get('client_timeline') || "",
        certs: formData.get('client_certs') || ""
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.textContent : "Submit Request";
    let originalBtnClass = submitBtn ? submitBtn.className : "";

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Processing...";
    }

    try {
        const response = await fetch('/.netlify/functions/saveEmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        
        if (response.ok && result.success) {
            if (submitBtn) {
                submitBtn.textContent = "Request Sent!";
                submitBtn.className = "w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-md text-xs uppercase tracking-wider transition-all";
            }
            alert("Success! Your resource has been unlocked and your RFQ routed to our network.");
            setTimeout(() => {
                closeModal();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                    submitBtn.className = originalBtnClass;
                }
            }, 2000);
        } else {
            throw new Error(result.error || 'Submission failed');
        }
    } catch (error) {
        console.error('Lead Submission Error:', error);
        if (submitBtn) {
            submitBtn.textContent = "Error! Try again.";
            submitBtn.className = "w-full bg-rose-600 text-white font-bold py-3 px-4 rounded-lg shadow-md text-xs uppercase tracking-wider transition-all";
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                submitBtn.className = originalBtnClass;
            }, 3000);
        }
    }
}

function runTileCalculator() {
    // 1. Capture user inputs
    const width = parseFloat(document.getElementById('panWidth').value) || 0;
    const length = parseFloat(document.getElementById('panLength').value) || 0;
    const height = parseFloat(document.getElementById('wallHeight').value) || 0;
    const wasteMultiplier = parseFloat(document.getElementById('wasteFactor').value) || 1.10;

    // 2. Structural Area Computations
    const floorPanArea = width * length;
    
    // Calculates total square footage for 3 framing perimeter wet-walls
    // Assumes 1 back long wall (length x height) + 2 side walls (width x height x 2)
    const activeWallArea = (length * height) + (width * height * 2);
    const grossTotalArea = (floorPanArea + activeWallArea) * wasteMultiplier;

    // 3. Material Factor Quantities Scaling Formulas
    // 3ft x 5ft backer sheets equal 15 square feet per structural leaf unit
    const backerBoardSheetsNeeded = Math.ceil((activeWallArea * wasteMultiplier) / 15);
    
    // Waterproofing requires covering both floor pan and wet walls fully
    const waterproofingMembraneSqFt = Math.ceil(grossTotalArea);
    
    // Standard medium-bed tile trowels coverage maps to roughly 50 sq ft per 50lb dry bag mix
    const thinsetBagsNeeded = Math.ceil(grossTotalArea / 50);

    // 4. TCNA Pitch Slope Formulations
    // Finds longest path to drain (halfway across the longest span dimension out from center)
    const longestRunToDrain = Math.max(width, length) / 2;
    const verticalSlopeInchesDrop = longestRunToDrain * 0.25; // 1/4 inch per foot drop index

    // 5. Update HTML viewport display variables
    document.getElementById('takeoffBoards').textContent = backerBoardSheetsNeeded + " Sheets";
    document.getElementById('takeoffMembrane').textContent = waterproofingMembraneSqFt + " Sq Ft";
    document.getElementById('takeoffThinset').textContent = thinsetBagsNeeded + " Bags";
    document.getElementById('takeoffSlope').textContent = verticalSlopeInchesDrop.toFixed(2) + " inches";
}

// Attach a trigger to auto-fire initial values upon frontend interface boot
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('panWidth')) {
        runTileCalculator();
    }
});

function runAdaVerifier(nicheId) {
    const suffix = nicheId ? `-${nicheId}` : '';
    const widthEl = document.getElementById(`adaWidth${suffix}`);
    const lengthEl = document.getElementById(`adaLength${suffix}`);
    const obstructionsEl = document.getElementById(`adaObstructions${suffix}`);
    const doorSwingEl = document.getElementById(`adaDoorSwing${suffix}`);

    if (!widthEl || !lengthEl) return;

    // 1. Retrieve user workspace inputs
    const width = parseFloat(widthEl.value) || 0;
    const length = parseFloat(lengthEl.value) || 0;
    const hasObstructions = obstructionsEl ? obstructionsEl.checked : false;
    const hasInwardDoor = doorSwingEl ? doorSwingEl.checked : false;

    const badge = document.getElementById(`adaBadge${suffix}`);
    const message = document.getElementById(`adaMessage${suffix}`);

    if (!badge || !message) return;

    // 2. Define ADA Regulatory Evaluation Guardrails (Section 304.3.1)
    // ADA requires a continuous 60-inch unobstructed circular turning area boundary
    const minRequiredTurningDiameter = 60;
    
    let isCompliant = true;
    let failureReasons = [];

    // Evaluate fundamental spatial dimensions
    if (width < minRequiredTurningDiameter || length < minRequiredTurningDiameter) {
        isCompliant = false;
        failureReasons.push(`Room dimensions drop below the raw 60" requirement in at least one axis direction.`);
    }

    // Evaluate structural floor obstructions
    if (hasObstructions) {
        isCompliant = false;
        failureReasons.push(`Fixed floor layout obstructions block the required continuous rotation radius.`);
    }

    // Evaluate door swing conflicts
    if (hasInwardDoor) {
        isCompliant = false;
        failureReasons.push(`The door swings inward, which violates the rule banning doors from encroaching into the turning space clear zone.`);
    }

    // 3. Render Status Indicators on UI Viewport Nodes
    if (isCompliant) {
        badge.textContent = "ADA Compliant Pass";
        badge.className = "text-[10px] font-black uppercase px-2.5 py-0.5 rounded border border-emerald-900/60 bg-emerald-950/40 text-emerald-400";
        message.innerHTML = `🎉 **Clearance Approved!** The current footprint configuration maps out an unobstructed 60-inch turning circle, allowing a standard wheelchair layout assembly to execute a safe 180-degree turn sequence cleanly.`;
    } else {
        badge.textContent = "Compliance Violation Fail";
        badge.className = "text-[10px] font-black uppercase px-2.5 py-0.5 rounded border border-rose-900/60 bg-rose-950/40 text-rose-400";
        message.innerHTML = `⚠️ **Design Changes Needed:**<br><ul class="list-disc pl-4 mt-1 space-y-1 text-rose-300">` + 
            failureReasons.map(reason => `<li>${reason}</li>`).join('') + `</ul>`;
    }
}

// Map automatic execution trigger routine on standard frame page loads
document.addEventListener("DOMContentLoaded", () => {
    ['niche_01', 'niche_02'].forEach(id => {
        if (document.getElementById(`adaWidth-${id}`)) {
            runAdaVerifier(id);
        }
    });
});
