let localDatabase = [];
let activeCategoryFilter = "";

// Geographic State
const geoState = {
    state: "",
    city: "",
    zip: "",
    keyword: ""
};

const stateCityMap = {
    "GA": ["Atlanta", "Byron", "Macon", "Savannah"],
    "FL": ["Miami", "Orlando", "Tampa", "Jacksonville"],
    "TX": ["Austin", "Dallas", "Houston", "San Antonio"]
};

document.addEventListener("DOMContentLoaded", () => {
    fetchDatabasePayload();
    setupMRRListeners();
    initializeGeographicListeners();
});

async function fetchDatabasePayload() {
    try {
        const response = await fetch('./data/niches.json');
        if (!response.ok) throw new Error("Network payload fetch failed");
        localDatabase = await response.json();
        
        initializeUIFilters();
        executePlatformSearchFilter();
    } catch (error) {
        console.error("Critical database routing exception:", error);
        const grid = document.getElementById('directoryGrid');
        if (grid) {
            grid.innerHTML = `
                <div class="bg-red-50 border border-red-200 p-6 rounded-xl text-center text-red-800 text-sm font-semibold">
                    Critical Synchronization Halt: Unable to resolve local directory data layers.
                </div>`;
        }
    }
}

function initializeUIFilters() {
    const categories = [...new Set(localDatabase.map(item => item.category))];
    const container = document.getElementById("categoryContainer");
    if(!container) return;
    
    container.innerHTML = "";
    
    // Add "All Sectors" logic to existing button if present
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
    const stateMenu = document.getElementById("stateFilter");
    const cityMenu = document.getElementById("cityFilter");
    const zipInput = document.getElementById("zipFilter");
    const searchInput = document.getElementById("dirSearch");

    // Cascading effect: Changing state alters visible cities
    if(stateMenu) {
        stateMenu.addEventListener("change", () => {
            geoState.state = stateMenu.value;
            geoState.city = "";
            
            if (geoState.state && stateCityMap[geoState.state]) {
                cityMenu.disabled = false;
                cityMenu.className = "w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-200";
                cityMenu.innerHTML = '<option value="">All Cities</option>';
                stateCityMap[geoState.state].forEach(city => {
                    const opt = document.createElement("option");
                    opt.value = city;
                    opt.textContent = city;
                    cityMenu.appendChild(opt);
                });
            } else {
                cityMenu.disabled = true;
                cityMenu.className = "w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-500 disabled:opacity-50";
                cityMenu.innerHTML = '<option value="">Select State First</option>';
            }
            updateLocationBadge();
            executePlatformSearchFilter();
        });
    }

    if(cityMenu) {
        cityMenu.addEventListener("change", (e) => {
            geoState.city = e.target.value;
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
            if (geoState.zip.length > 0) {
                if(stateMenu) stateMenu.value = "";
                geoState.state = "";
                geoState.city = "";
                if(cityMenu) {
                    cityMenu.innerHTML = '<option value="">Select State First</option>';
                    cityMenu.disabled = true;
                    cityMenu.className = "w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-500 disabled:opacity-50";
                }
            }
            updateLocationBadge();
            executePlatformSearchFilter();
        });
    }

    const priceFilter = document.getElementById("priceFilter");
    if(priceFilter) priceFilter.addEventListener("change", executePlatformSearchFilter);
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

    const matches = localDatabase.filter(item => {
        // Keyword checks across core strings
        const matchesKeyword = geoState.keyword === "" || 
                               item.service_name.toLowerCase().includes(geoState.keyword) || 
                               item.category.toLowerCase().includes(geoState.keyword) ||
                               item.related_services.some(s => s.toLowerCase().includes(geoState.keyword));
                               
        const matchesCategory = activeCategoryFilter === "" || item.category === activeCategoryFilter;
        const matchesPrice = priceVal === "" || item.price_level === priceVal;
        
        // Location acts ONLY as a contextual badge, it does NOT filter out records!
        return matchesKeyword && matchesCategory && matchesPrice;
    });

    // Update Counter Badges
    const displayedCount = document.getElementById("displayedCount");
    const totalCount = document.getElementById("totalCount");
    if(displayedCount) displayedCount.textContent = matches.length;
    if(totalCount) totalCount.textContent = localDatabase.length;

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

        const card = document.createElement("div");
        card.className = "bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between hover:border-indigo-500 transition-all cursor-pointer";
        card.innerHTML = `
            <div class="space-y-1">
                <span class="text-[10px] font-bold text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/40 uppercase tracking-wider">${item.category}</span>
                <h3 class="text-sm font-bold text-slate-100">${displayTitle}</h3>
                <div class="flex items-center space-x-2 text-xs text-slate-400 pt-0.5">
                    <span class="text-slate-300 font-semibold">📍 Coverage area:</span>
                    <span>${displayCity}, ${displayState} (${displayZip})</span>
                </div>
            </div>
            <span class="text-xs font-bold px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">${item.price_level}</span>
        `;
        
        card.addEventListener('click', () => openLeadModal(item, displayTitle));
        
        outputArea.appendChild(card);
    });
}

function openLeadModal(record, displayTitle) {
    const leadModal = document.getElementById("leadModal");
    if(!leadModal) return;

    let locString = "";
    if (geoState.zip) locString = geoState.zip;
    else if (geoState.city && geoState.state) locString = `${geoState.city}, ${geoState.state}`;
    else if (geoState.state) locString = geoState.state;

    document.getElementById("formNicheId").value = record.id;
    document.getElementById("formNicheName").value = displayTitle;
    document.getElementById("modalNicheName").textContent = displayTitle;
    document.getElementById("modalCategory").textContent = record.category;
    document.getElementById("modalResourceName").textContent = record.downloadable_resource.title;
    document.getElementById("formLocationInput").value = locString;
    
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
    
    if(mrrOutput) mrrOutput.innerHTML = \`$\${mrr.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}<span class="text-xs text-indigo-500 font-bold ml-1">/mo</span>\`;
    if(arrOutput) arrOutput.textContent = \`$\${arr.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}\`;
}
