// Geographically mapped mock records data store
const regionalSubcontractorData = [
    { id: "rec_1", name: "Premium Tile Shower Finishers", cat: "Remodeling Operations", state: "GA", city: "Byron", zip: "31008", tier: "High Ticket" },
    { id: "rec_2", name: "Peach State Accessibility Builders", cat: "Senior & Household Services", state: "GA", city: "Macon", zip: "31201", tier: "High Ticket" },
    { id: "rec_3", name: "Miami Coastline Mold Mitigation", cat: "Environmental Tech", state: "FL", city: "Miami", zip: "33101", tier: "High Ticket" },
    { id: "rec_4", name: "Orlando Short-Term Turnover Pros", cat: "Property Services", state: "FL", city: "Orlando", zip: "32801", tier: "Mid Ticket" },
    { id: "rec_5", name: "Lone Star Commercial Arbitrations", cat: "Legal Tech Frameworks", state: "TX", city: "Austin", zip: "73301", tier: "Mid Ticket" }
];

// Structural layout relating valid cities to their respective states
const geographicMapping = {
    "GA": ["Byron", "Macon"],
    "FL": ["Miami", "Orlando"],
    "TX": ["Austin"]
};

document.addEventListener("DOMContentLoaded", () => {
    initializeGeographicListeners();
    setupMRRListeners();
    renderFilteredDirectory(regionalSubcontractorData);
});

function initializeGeographicListeners() {
    const stateMenu = document.getElementById("stateFilter");
    const cityMenu = document.getElementById("cityFilter");
    const zipInput = document.getElementById("zipFilter");
    const searchInput = document.getElementById("dirSearch");

    // Cascading effect: Changing state alters visible cities
    stateMenu.addEventListener("change", () => {
        const selectedState = stateMenu.value;
        cityMenu.innerHTML = '<option value="">All Cities</option>';
        
        if (selectedState && geographicMapping[selectedState]) {
            cityMenu.disabled = false;
            cityMenu.className = "w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-200";
            geographicMapping[selectedState].forEach(city => {
                const opt = document.createElement("option");
                opt.value = city;
                opt.textContent = city;
                containerSelectionPass(opt, cityMenu);
            });
        } else {
            cityMenu.disabled = true;
            cityMenu.className = "w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-500 disabled:opacity-50";
            cityMenu.innerHTML = '<option value="">Select State First</option>';
        }
        executePlatformSearchFilter();
    });

    // Run evaluations on standard filter updates
    cityMenu.addEventListener("change", executePlatformSearchFilter);
    searchInput.addEventListener("input", executePlatformSearchFilter);
    
    // Typing a ZIP resets dropdown flags to prevent search conflicts
    zipInput.addEventListener("input", (e) => {
        if (e.target.value.length > 0) {
            stateMenu.value = "";
            cityMenu.innerHTML = '<option value="">Select State First</option>';
            cityMenu.disabled = true;
        }
        executePlatformSearchFilter();
    });

    // Support Price Filtering from index.html UI
    const priceFilter = document.getElementById("priceFilter");
    if(priceFilter) priceFilter.addEventListener("change", executePlatformSearchFilter);
}

function containerSelectionPass(childNode, parentNode) {
    parentNode.appendChild(childNode);
}

function executePlatformSearchFilter() {
    const query = document.getElementById("dirSearch").value.toLowerCase();
    const stateVal = document.getElementById("stateFilter").value;
    const cityVal = document.getElementById("cityFilter").value;
    const zipVal = document.getElementById("zipFilter").value.trim();
    
    const priceFilterEl = document.getElementById("priceFilter");
    const priceVal = priceFilterEl ? priceFilterEl.value : "";

    const matches = regionalSubcontractorData.filter(item => {
        const matchesKeyword = item.name.toLowerCase().includes(query) || item.cat.toLowerCase().includes(query);
        const matchesPrice = priceVal === "" || item.tier === priceVal;
        
        // If ZIP has an entry, check it exclusively. Otherwise check State and City cascades.
        if (zipVal.length > 0) {
            return matchesKeyword && matchesPrice && item.zip.startsWith(zipVal);
        } else {
            const matchesState = stateVal === "" || item.state === stateVal;
            const matchesCity = cityVal === "" || item.city === cityVal;
            return matchesKeyword && matchesPrice && matchesState && matchesCity;
        }
    });

    // Update Counter Badges
    const displayedCount = document.getElementById("displayedCount");
    const totalCount = document.getElementById("totalCount");
    if(displayedCount) displayedCount.textContent = matches.length;
    if(totalCount) totalCount.textContent = regionalSubcontractorData.length;

    renderFilteredDirectory(matches);
}

function renderFilteredDirectory(records) {
    // Note: The HTML has id="directoryGrid", mapping it here instead of directoryOutput
    const outputArea = document.getElementById("directoryGrid"); 
    outputArea.innerHTML = "";

    if (records.length === 0) {
        outputArea.innerHTML = `<div class="text-center p-6 text-xs text-slate-500 font-semibold border border-dashed border-slate-800 rounded-xl">No subcontractors or active listings found operating in that location bracket.</div>`;
        return;
    }

    records.forEach(item => {
        const card = document.createElement("div");
        card.className = "bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between hover:border-indigo-500 transition-all cursor-pointer";
        card.innerHTML = `
            <div class="space-y-1">
                <span class="text-[10px] font-bold text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/40 uppercase tracking-wider">${item.cat}</span>
                <h3 class="text-sm font-bold text-slate-100">${item.name}</h3>
                <div class="flex items-center space-x-2 text-xs text-slate-400 pt-0.5">
                    <span class="text-slate-300 font-semibold">📍 Coverage area:</span>
                    <span>${item.city}, ${item.state} (${item.zip})</span>
                </div>
            </div>
            <span class="text-xs font-bold px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">${item.tier}</span>
        `;
        
        // Added onclick handler to support the Lead generation modal system perfectly
        card.addEventListener('click', () => openLeadModal(item));
        
        outputArea.appendChild(card);
    });
}

function openLeadModal(record) {
    const leadModal = document.getElementById("leadModal");
    if(!leadModal) return;

    document.getElementById("formNicheId").value = record.id;
    document.getElementById("formNicheName").value = record.name;
    document.getElementById("modalNicheName").textContent = record.name;
    document.getElementById("modalCategory").textContent = record.cat;
    document.getElementById("modalResourceName").textContent = "Subcontractor Direct Quote";
    
    // Auto-fill actual exact location
    document.getElementById("formLocationInput").value = `${record.city}, ${record.state} ${record.zip}`;
    
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

    document.getElementById('mrrOutput').innerHTML = \`$\${mrr.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}<span class="text-xs text-indigo-500 font-bold ml-1">/mo</span>\`;
    document.getElementById('arrOutput').textContent = \`$\${arr.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}\`;
}
