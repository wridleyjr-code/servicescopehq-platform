const localDatabase = [
  {
    "id": "niche_01",
    "category": "Elder Care / Remodeling",
    "service_name": "Aging-in-Place Home Mod",
    "price_level": "High Ticket",
    "listing_tier": "Premium",
    "related_services": ["Wheelchair ramp installation", "Grab bars", "Door widening"],
    "local_seo": { "title_template": "Aging-in-Place Modifications in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Home Safety Assessment Checklist", "price": 0 }
  },
  {
    "id": "niche_02",
    "category": "Healthcare / Construction",
    "service_name": "Handicap Bathroom Costs",
    "price_level": "High Ticket",
    "listing_tier": "Premium",
    "related_services": ["Walk-in tubs", "Roll-in showers", "Anti-slip flooring"],
    "local_seo": { "title_template": "Handicap Bathroom Remodel Cost in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "ADA Bathroom Layout Guide", "price": 0 }
  },
  {
    "id": "niche_03",
    "category": "Home Services",
    "service_name": "Local Remodeling Labor Costs",
    "price_level": "Mid Ticket",
    "listing_tier": "Standard",
    "related_services": ["Drywall labor", "Framing costs", "Carpenter rates"],
    "local_seo": { "title_template": "Average Remodeling Labor Rates in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Labor Hours Estimation Sheet", "price": 29 }
  },
  {
    "id": "niche_04",
    "category": "Real Estate / B2B",
    "service_name": "Rental Turnover Repairs",
    "price_level": "Mid Ticket",
    "listing_tier": "Standard",
    "related_services": ["Painting", "Carpet replacement", "Punch-list repair"],
    "local_seo": { "title_template": "Rental Turnover Repair Services in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Turnover Maintenance Checklist", "price": 0 }
  },
  {
    "id": "niche_05",
    "category": "FinTech / Restoration",
    "service_name": "Insurance Claim Repair Scope",
    "price_level": "Ultra High Ticket",
    "listing_tier": "Premium",
    "related_services": ["Fire damage rebuild", "Flood restoration", "Storm repair"],
    "local_seo": { "title_template": "Insurance Claim Repair Contractors in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Claim Adjuster Scope Template", "price": 99 }
  },
  {
    "id": "niche_06",
    "category": "Environmental / Emergency",
    "service_name": "Mold Remediation Pricing",
    "price_level": "High Ticket",
    "listing_tier": "Standard",
    "related_services": ["Mold inspection", "Air quality testing", "Water damage cleanup"],
    "local_seo": { "title_template": "Mold Remediation Pricing & Services in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Mold Remediation Cost Guide", "price": 0 }
  },
  {
    "id": "niche_07",
    "category": "Professional Services",
    "service_name": "Small Contractor Templates",
    "price_level": "Low Ticket",
    "listing_tier": "Standard",
    "related_services": ["Invoice templates", "Contract templates", "Change orders"],
    "local_seo": { "title_template": "Small Contractor Templates in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Pro Contractor Document Bundle", "price": 49 }
  },
  {
    "id": "niche_08",
    "category": "SaaS / Accounting",
    "service_name": "QuickBooks Service Tags",
    "price_level": "Mid Ticket",
    "listing_tier": "Standard",
    "related_services": ["Chart of accounts setup", "Job costing", "Payroll integration"],
    "local_seo": { "title_template": "QuickBooks Setup for Contractors in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Contractor Chart of Accounts Template", "price": 39 }
  },
  {
    "id": "niche_09",
    "category": "GovTech / Compliance",
    "service_name": "Permit Requirements by City",
    "price_level": "High Ticket",
    "listing_tier": "Premium",
    "related_services": ["Zoning laws", "Building codes", "Permit expediting"],
    "local_seo": { "title_template": "Building Permit Requirements in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Municipal Permit Expediter Guide", "price": 79 }
  },
  {
    "id": "niche_10",
    "category": "Legal / Real Estate",
    "service_name": "Code Violation Repairs",
    "price_level": "High Ticket",
    "listing_tier": "Standard",
    "related_services": ["Electrical upgrades", "Structural repair", "Plumbing compliance"],
    "local_seo": { "title_template": "Code Violation Repair Contractors in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Code Violation Resolution Checklist", "price": 0 }
  },
  {
    "id": "niche_11",
    "category": "B2B Tech / Agency",
    "service_name": "AI Setup for Local Biz",
    "price_level": "Mid Ticket",
    "listing_tier": "Standard",
    "related_services": ["Chatbot integration", "Automated booking", "CRM setup"],
    "local_seo": { "title_template": "AI Setup Services for Local Biz in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Local Biz AI Automation Blueprint", "price": 149 }
  },
  {
    "id": "niche_12",
    "category": "B2B Tech / SaaS",
    "service_name": "AI Receptionist Database",
    "price_level": "Mid Ticket",
    "listing_tier": "Standard",
    "related_services": ["Voice AI", "Call routing", "Virtual assistant"],
    "local_seo": { "title_template": "AI Receptionist Services in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Voice Agent Prompt Library", "price": 29 }
  },
  {
    "id": "niche_13",
    "category": "Cybersecurity / IT",
    "service_name": "SMB Cybersecurity Checklist",
    "price_level": "High Ticket",
    "listing_tier": "Premium",
    "related_services": ["Network security", "Phishing training", "Data backups"],
    "local_seo": { "title_template": "SMB Cybersecurity Consulting in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Small Business Cybersecurity Audit", "price": 0 }
  },
  {
    "id": "niche_14",
    "category": "HR / Operations",
    "service_name": "Subcontractor Onboarding",
    "price_level": "Low Ticket",
    "listing_tier": "Standard",
    "related_services": ["W-9 processing", "Insurance verification", "Safety compliance"],
    "local_seo": { "title_template": "Subcontractor Onboarding Services in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Complete Subcontractor Onboarding Packet", "price": 59 }
  },
  {
    "id": "niche_15",
    "category": "Government Housing",
    "service_name": "Section 8 Repair Checklist",
    "price_level": "Low Ticket",
    "listing_tier": "Standard",
    "related_services": ["HQS inspection prep", "Safety upgrades", "Window repairs"],
    "local_seo": { "title_template": "Section 8 Housing Repairs in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Section 8 HQS Inspection Checklist", "price": 19 }
  },
  {
    "id": "niche_16",
    "category": "Probate / Junk Removal",
    "service_name": "Estate Cleanout Services",
    "price_level": "High Ticket",
    "listing_tier": "Premium",
    "related_services": ["Hoarder cleanouts", "Furniture removal", "Trash hauling"],
    "local_seo": { "title_template": "Estate Cleanout Services in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Probate Cleanout Pricing Guide", "price": 0 }
  },
  {
    "id": "niche_17",
    "category": "Hospitality / Ops",
    "service_name": "STR Maintenance (AirBnB)",
    "price_level": "Mid Ticket",
    "listing_tier": "Standard",
    "related_services": ["Turnover cleaning", "Handyman repairs", "Smart lock install"],
    "local_seo": { "title_template": "AirBnB Maintenance Services in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "STR Preventative Maintenance Schedule", "price": 0 }
  },
  {
    "id": "niche_18",
    "category": "Infrastructure / Rural",
    "service_name": "Well Water / Septic Service",
    "price_level": "High Ticket",
    "listing_tier": "Premium",
    "related_services": ["Septic pumping", "Well pump repair", "Water testing"],
    "local_seo": { "title_template": "Well Water & Septic Services in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Septic System Maintenance Guide", "price": 0 }
  },
  {
    "id": "niche_19",
    "category": "B2G (Gov)",
    "service_name": "Gov Contract Readiness",
    "price_level": "Ultra High Ticket",
    "listing_tier": "Premium",
    "related_services": ["SAM.gov registration", "Capability statements", "RFP writing"],
    "local_seo": { "title_template": "Gov Contract Readiness Consulting in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "B2G Capability Statement Template", "price": 199 }
  },
  {
    "id": "niche_20",
    "category": "EdTech / Careers",
    "service_name": "Trade School / Apprentices",
    "price_level": "Mid Ticket",
    "listing_tier": "Standard",
    "related_services": ["Plumbing apprenticeships", "HVAC training", "Electrician school"],
    "local_seo": { "title_template": "Trade Schools & Apprenticeships in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Trade School Application Checklist", "price": 0 }
  },
  {
    "id": "niche_21",
    "category": "Legal & Compliance",
    "service_name": "Small Biz Legal & Incorporation",
    "price_level": "Low Ticket",
    "listing_tier": "Standard",
    "related_services": ["LLC formation", "Operating agreements", "Registered agent"],
    "local_seo": { "title_template": "Small Biz Legal & Incorporation in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Operating Agreement Template", "price": 49 }
  },
  {
    "id": "niche_22",
    "category": "Document & Admin Help",
    "service_name": "Apostille & Notary Admin Hub",
    "price_level": "Low Ticket",
    "listing_tier": "Standard",
    "related_services": ["Mobile notary", "Apostille processing", "Document translation"],
    "local_seo": { "title_template": "Apostille & Notary Services in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "International Document Checklist", "price": 29 }
  },
  {
    "id": "niche_23",
    "category": "Legal Tech",
    "service_name": "Contract Review & Scope Audit",
    "price_level": "Mid Ticket",
    "listing_tier": "Premium",
    "related_services": ["Subcontractor agreements", "Scope of work audit", "Lien waivers"],
    "local_seo": { "title_template": "Contract Review & Scope Audit in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Bulletproof Subcontractor Agreement", "price": 149 }
  },
  {
    "id": "niche_24",
    "category": "Senior, Family & Household",
    "service_name": "Junk Removal Pricing",
    "price_level": "Mid Ticket",
    "listing_tier": "Standard",
    "related_services": ["Appliance removal", "Yard waste", "Garage cleanout"],
    "local_seo": { "title_template": "Junk Removal Pricing in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Junk Volume Estimator", "price": 0 }
  },
  {
    "id": "niche_25",
    "category": "Senior, Family & Household",
    "service_name": "Appliance Removal & Recycle",
    "price_level": "Low Ticket",
    "listing_tier": "Standard",
    "related_services": ["Refrigerator recycling", "Washer/dryer removal", "HVAC disposal"],
    "local_seo": { "title_template": "Appliance Removal & Recycle in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Safe Freon Disposal Guide", "price": 0 }
  },
  {
    "id": "niche_26",
    "category": "Property & Convenience",
    "service_name": "Dumpster Rental Cost Index",
    "price_level": "Mid Ticket",
    "listing_tier": "Premium",
    "related_services": ["Roll-off dumpsters", "Construction waste", "Concrete recycling"],
    "local_seo": { "title_template": "Dumpster Rental Cost Index in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Dumpster Sizing Chart", "price": 0 }
  },
  {
    "id": "niche_27",
    "category": "Senior, Family & Household",
    "service_name": "Moving Labor / On-Demand Loading",
    "price_level": "Mid Ticket",
    "listing_tier": "Standard",
    "related_services": ["Truck loading", "Furniture assembly", "Packing services"],
    "local_seo": { "title_template": "Moving Labor & On-Demand Loading in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "Ultimate Moving Day Checklist", "price": 0 }
  },
  {
    "id": "niche_28",
    "category": "Property & Convenience",
    "service_name": "Short-Term Rental Listing Optimization",
    "price_level": "High Ticket",
    "listing_tier": "Premium",
    "related_services": ["Photography", "Pricing strategy", "Listing SEO"],
    "local_seo": { "title_template": "STR Listing Optimization Services in [City], [State_Abbr]" },
    "downloadable_resource": { "title": "AirBnB High-Conversion Listing Formula", "price": 99 }
  }
];
