document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIconDark = document.getElementById('theme-icon-dark');
    const themeIconLight = document.getElementById('theme-icon-light');
    const htmlEl = document.documentElement;

    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlEl.classList.add('dark');
        themeIconLight.classList.remove('hidden');
    } else {
        htmlEl.classList.remove('dark');
        themeIconDark.classList.remove('hidden');
    }

    themeToggleBtn.addEventListener('click', () => {
        htmlEl.classList.toggle('dark');
        const isDark = htmlEl.classList.contains('dark');
        
        if (isDark) {
            localStorage.setItem('theme', 'dark');
            themeIconDark.classList.add('hidden');
            themeIconLight.classList.remove('hidden');
        } else {
            localStorage.setItem('theme', 'light');
            themeIconLight.classList.add('hidden');
            themeIconDark.classList.remove('hidden');
        }
    });

    // 2. Data Rendering & State Logic
    const dataGrid = document.getElementById('data-grid');
    const categoryFiltersContainer = document.getElementById('category-filters');
    const globalSearch = document.getElementById('global-search');
    const globalSearchMobile = document.getElementById('global-search-mobile');
    
    // Localization Elements & State
    const localZip = document.getElementById('local-zip');
    const localZipMobile = document.getElementById('local-zip-mobile');
    const taglineText = document.getElementById('tagline-text');
    let localCity = null;
    let localState = null;
    let activeCategory = 'All Categories';

    // Zip Code Handler
    async function handleZipInput(e) {
        const zip = e.target.value.trim();
        // Sync inputs
        if (e.target === localZip) localZipMobile.value = zip;
        else localZip.value = zip;

        if (zip.length === 5) {
            try {
                const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
                if (response.ok) {
                    const data = await response.json();
                    const place = data.places[0];
                    localCity = place['place name'];
                    localState = place['state abbreviation'];
                    
                    // Update UI Tagline
                    taglineText.textContent = `Showing local estimates for ${localCity}, ${localState}`;
                    taglineText.classList.remove('text-gray-500', 'dark:text-gray-400');
                    taglineText.classList.add('text-primary', 'font-medium');
                    
                    filterAndRender();
                }
            } catch (err) {
                console.error("Location fetch failed", err);
            }
        } else if (zip.length === 0) {
            // Reset
            localCity = null;
            localState = null;
            taglineText.textContent = "The B2B Database for Local Services, Niche Estimates & Scopes";
            taglineText.classList.add('text-gray-500', 'dark:text-gray-400');
            taglineText.classList.remove('text-primary', 'font-medium');
            filterAndRender();
        }
    }

    localZip.addEventListener('input', handleZipInput);
    localZipMobile.addEventListener('input', handleZipInput);
    
    // Modal Elements
    const modal = document.getElementById('niche-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalCategory = document.getElementById('modal-category');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalPriceLevel = document.getElementById('modal-price-level');
    const modalAudience = document.getElementById('modal-audience');
    const modalMonetization = document.getElementById('modal-monetization');
    const modalSeo = document.getElementById('modal-seo');
    const modalResource = document.getElementById('modal-resource');
    const leadForm = document.getElementById('lead-form');
    const formNicheInterest = document.getElementById('form-niche-interest');

    // Render Categories in Horizontal Scroll
    function renderCategories() {
        const categories = ['All Categories', ...new Set(nichesData.map(n => n.category))];
        
        categoryFiltersContainer.innerHTML = '';
        categories.forEach(category => {
            const btn = document.createElement('button');
            const isActive = category === activeCategory;
            
            btn.className = `whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive 
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-blue-500/30' 
                : 'bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`;
            btn.textContent = category;
            
            btn.addEventListener('click', () => {
                activeCategory = category;
                renderCategories(); // Re-render to update active state
                filterAndRender();
            });
            
            categoryFiltersContainer.appendChild(btn);
        });
    }

    // Complexity Badge Helper
    function getComplexityBadge(complexity) {
        switch(complexity?.toLowerCase()) {
            case 'low': return `<span class="px-2 py-1 text-xs font-semibold rounded-md bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400">Low</span>`;
            case 'medium': return `<span class="px-2 py-1 text-xs font-semibold rounded-md bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400">Medium</span>`;
            case 'high': return `<span class="px-2 py-1 text-xs font-semibold rounded-md bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400">High</span>`;
            default: return '';
        }
    }

    // Render Grid Cards
    function renderCards(data) {
        dataGrid.innerHTML = '';
        
        if (data.length === 0) {
            dataGrid.innerHTML = `
                <div class="col-span-full py-12 text-center">
                    <p class="text-gray-500 dark:text-gray-400 text-lg">No niches found matching your criteria.</p>
                </div>
            `;
            return;
        }

        data.forEach((niche, index) => {
            const card = document.createElement('div');
            card.style.animationDelay = `${index * 0.05}s`;
            card.className = "group bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-2xl p-4 sm:p-6 cursor-pointer hover:shadow-xl dark:hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col";
            
            // Gradient top border line
            const gradientTop = document.createElement('div');
            gradientTop.className = "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300";
            card.appendChild(gradientTop);

            // Format price
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: niche.average_price_range.currency,
                maximumFractionDigits: 0
            });
            const minPrice = formatter.format(niche.average_price_range.min);
            const maxPrice = formatter.format(niche.average_price_range.max);

            // Localization
            let displayTitle = niche.service_name;
            if (localCity && localState && niche.local_seo && niche.local_seo.title_template) {
                displayTitle = niche.local_seo.title_template
                    .replace('[City]', localCity)
                    .replace('[State_Abbr]', localState);
            }

            card.innerHTML += `
                <div class="flex justify-between items-start mb-4">
                    <div class="text-xs font-bold tracking-wider uppercase text-primary">${niche.category}</div>
                    ${getComplexityBadge(niche.complexity)}
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${displayTitle}</h3>
                
                <div class="mt-auto pt-6 flex flex-wrap gap-2">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                        <i data-lucide="tag" class="w-3 h-3"></i> ${niche.price_level}
                    </span>
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                        <i data-lucide="clock" class="w-3 h-3"></i> ${niche.urgency_level.split('/')[0].trim()}
                    </span>
                </div>
            `;
            
            card.addEventListener('click', () => openModal(niche, displayTitle, minPrice, maxPrice));
            dataGrid.appendChild(card);
        });
        lucide.createIcons();
    }

    // Filter Logic
    function filterAndRender() {
        const searchTerm = (globalSearch.value || globalSearchMobile.value || '').toLowerCase();
        
        const filtered = nichesData.filter(niche => {
            const matchesCategory = activeCategory === 'All Categories' || niche.category === activeCategory;
            // Also search the localized title if it's set, otherwise service_name
            let localizedTitle = niche.service_name;
            if (localCity && localState && niche.local_seo && niche.local_seo.title_template) {
                localizedTitle = niche.local_seo.title_template
                    .replace('[City]', localCity)
                    .replace('[State_Abbr]', localState);
            }

            const matchesSearch = localizedTitle.toLowerCase().includes(searchTerm) || 
                                  niche.category.toLowerCase().includes(searchTerm) ||
                                  niche.local_seo.primary_keywords.some(k => k.toLowerCase().includes(searchTerm));
            
            return matchesCategory && matchesSearch;
        });

        filtered.sort((a, b) => (a.rank || 99) - (b.rank || 99));
        renderCards(filtered);
    }

    // Modal Logic
    function openModal(niche, displayTitle, minPrice, maxPrice) {
        modalCategory.textContent = niche.category;
        modalTitle.textContent = displayTitle; // Uses localized title
        modalPrice.textContent = `${minPrice} - ${maxPrice}`;
        modalPriceLevel.textContent = niche.price_level;
        modalAudience.textContent = niche.customer_type;
        modalMonetization.textContent = niche.best_monetization;
        modalResource.textContent = niche.downloadable_resource.title;
        
        // SEO logic
        let seoText = niche.local_seo.title_template;
        if (localCity && localState) {
            seoText = displayTitle;
        }
        modalSeo.textContent = seoText;
        
        // Populate hidden input for Netlify form
        formNicheInterest.value = displayTitle;

        // Reset form
        leadForm.reset();

        // Show modal
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Event Listeners
    globalSearch.addEventListener('input', filterAndRender);
    globalSearchMobile.addEventListener('input', filterAndRender);
    closeModalBtn.addEventListener('click', closeModal);
    
    // Close modal on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });

    // Netlify Form Submission (AJAX POST)
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = document.getElementById('modal-cta');
        const formData = new FormData(leadForm);
        
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="loader" class="w-5 h-5 spin"></i> Processing...';
        lucide.createIcons();

        const urlEncodedData = new URLSearchParams(formData).toString();

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: urlEncodedData
        })
        .then(() => {
            const name = document.getElementById('name').value;
            btn.innerHTML = `<i data-lucide="check" class="w-5 h-5"></i> Blueprint Sent to ${name.split(' ')[0]}!`;
            lucide.createIcons();
            btn.classList.remove('from-primary', 'to-secondary');
            btn.classList.add('from-green-500', 'to-emerald-600');
            
            setTimeout(() => {
                closeModal();
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.add('from-primary', 'to-secondary');
                    btn.classList.remove('from-green-500', 'to-emerald-600');
                }, 300);
            }, 2500);
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            btn.innerHTML = `<i data-lucide="alert-circle" class="w-5 h-5"></i> Error, please try again`;
            lucide.createIcons();
            btn.classList.remove('from-primary', 'to-secondary');
            btn.classList.add('from-red-500', 'to-orange-600');
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.add('from-primary', 'to-secondary');
                btn.classList.remove('from-red-500', 'to-orange-600');
            }, 3000);
        });
    });

    const style = document.createElement('style');
    style.textContent = \`
        @keyframes fadeUp { 
            from { opacity: 0; transform: translateY(20px); } 
            to { opacity: 1; transform: translateY(0); } 
        }
        #data-grid > div {
            animation: fadeUp 0.5s ease backwards;
        }
    \`;
    document.head.appendChild(style);

    // Initial Render
    renderCategories();
    filterAndRender(); 
    lucide.createIcons();
});
