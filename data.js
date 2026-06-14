const nichesData = [
  {
    "id": "niche_01",
    "rank": 1,
    "complexity": "Medium",
    "field_example": false,
    "service_name": "Commercial Roofing",
    "category": "B2B",
    "customer_type": "Business Owner / Property Manager",
    "urgency_level": "Emergency / Planned",
    "price_level": "Ultra High Ticket",
    "average_price_range": { "min": 25000, "max": 150000, "currency": "USD" },
    "labor_pricing_method": "Per square / Per project",
    "best_monetization": "Lead generation",
    "related_services": ["Roof coating", "Flat roof repair", "Commercial gutters"],
    "local_seo": {
      "title_template": "Commercial Roofing Contractors in [City], [State_Abbr]",
      "example_title": "Commercial Roofing Contractors in Houston, TX",
      "primary_keywords": ["commercial roof repair", "tpo roofing cost"]
    },
    "downloadable_resource": {
      "title": "Commercial Roof Maintenance Plan Template",
      "type": "PDF Guide"
    },
    "call_to_action": "Request a Commercial Bid"
  },
  {
    "id": "niche_02",
    "rank": 2,
    "complexity": "High",
    "field_example": false,
    "service_name": "Managed IT Services",
    "category": "Tech",
    "customer_type": "Small to Medium Business",
    "urgency_level": "Planned",
    "price_level": "High Ticket MRR",
    "average_price_range": { "min": 1500, "max": 10000, "currency": "USD" },
    "labor_pricing_method": "Per user / Per month",
    "best_monetization": "Lead generation / Commission",
    "related_services": ["Cybersecurity", "Cloud Migration", "Helpdesk Support"],
    "local_seo": {
      "title_template": "Managed IT Services in [City], [State_Abbr]",
      "example_title": "Managed IT Services in Austin, TX",
      "primary_keywords": ["IT support for business", "managed service provider"]
    },
    "downloadable_resource": {
      "title": "Cybersecurity Audit Checklist",
      "type": "PDF Checklist"
    },
    "call_to_action": "Get a Free IT Audit"
  },
  {
    "id": "niche_03_01",
    "rank": 3,
    "complexity": "Medium",
    "field_example": true,
    "service_name": "Tile Shower Installation",
    "category": "Real Estate",
    "customer_type": "Homeowner / Landlord",
    "urgency_level": "Planned / Emergency",
    "price_level": "High Ticket",
    "average_price_range": { "min": 3500, "max": 9500, "currency": "USD" },
    "labor_pricing_method": "Per project / per sq ft / per hour",
    "best_monetization": "Lead generation",
    "related_services": ["Shower pan", "Tile floor", "Waterproofing"],
    "local_seo": {
      "title_template": "Tile Shower Installation Cost in [City], [State_Abbr]",
      "example_title": "Tile Shower Installation Cost in Byron, GA",
      "primary_keywords": ["tile shower cost", "custom shower installer"]
    },
    "downloadable_resource": {
      "title": "Shower scope-of-work template",
      "type": "PDF / Excel Template"
    },
    "call_to_action": "Request a quote"
  },
  {
    "id": "niche_04",
    "rank": 4,
    "complexity": "High",
    "field_example": false,
    "service_name": "Foundation Repair",
    "category": "Real Estate",
    "customer_type": "Homeowner / Real Estate Investor",
    "urgency_level": "Emergency",
    "price_level": "High Ticket",
    "average_price_range": { "min": 4500, "max": 15000, "currency": "USD" },
    "labor_pricing_method": "Per pier / Per project",
    "best_monetization": "Lead generation / Commission",
    "related_services": ["Basement waterproofing", "Crawl space encapsulation", "Mudjacking"],
    "local_seo": {
      "title_template": "Foundation Repair Services in [City], [State_Abbr]",
      "example_title": "Foundation Repair Services in Dallas, TX",
      "primary_keywords": ["foundation repair cost", "slab leak repair"]
    },
    "downloadable_resource": {
      "title": "Signs of Foundation Failure Checklist",
      "type": "PDF Checklist"
    },
    "call_to_action": "Book an Evaluation"
  },
  {
    "id": "niche_05",
    "rank": 5,
    "complexity": "High",
    "field_example": false,
    "service_name": "Solar Panel Installation",
    "category": "Tech",
    "customer_type": "Homeowner / Commercial",
    "urgency_level": "Planned",
    "price_level": "High Ticket",
    "average_price_range": { "min": 15000, "max": 40000, "currency": "USD" },
    "labor_pricing_method": "Per watt / Per project",
    "best_monetization": "Lead generation / Revenue share",
    "related_services": ["Battery backup", "Roof repair", "Energy audit"],
    "local_seo": {
      "title_template": "Solar Panel Installation Cost in [City], [State_Abbr]",
      "example_title": "Solar Panel Installation Cost in Phoenix, AZ",
      "primary_keywords": ["solar panel installation", "solar cost per watt"]
    },
    "downloadable_resource": {
      "title": "Solar ROI Calculator",
      "type": "Excel Template"
    },
    "call_to_action": "See If You Qualify"
  },
  {
    "id": "niche_06",
    "rank": 6,
    "complexity": "High",
    "field_example": false,
    "service_name": "Commercial HVAC Retrofitting",
    "category": "B2B",
    "customer_type": "Facility Managers",
    "urgency_level": "Planned / Emergency",
    "price_level": "Ultra High Ticket",
    "average_price_range": { "min": 20000, "max": 100000, "currency": "USD" },
    "labor_pricing_method": "Per project",
    "best_monetization": "Lead generation",
    "related_services": ["Ductwork overhaul", "Energy efficiency tuning", "Chiller maintenance"],
    "local_seo": {
      "title_template": "Commercial HVAC Retrofit in [City], [State_Abbr]",
      "example_title": "Commercial HVAC Retrofit in Chicago, IL",
      "primary_keywords": ["commercial HVAC installation", "building HVAC upgrade"]
    },
    "downloadable_resource": {
      "title": "HVAC Energy Savings Calculator",
      "type": "Excel Template"
    },
    "call_to_action": "Request a Free Estimate"
  },
  {
    "id": "niche_07",
    "rank": 7,
    "complexity": "Medium",
    "field_example": false,
    "service_name": "Water Damage Restoration",
    "category": "Real Estate",
    "customer_type": "Homeowner / Commercial",
    "urgency_level": "Extreme Emergency",
    "price_level": "High Ticket",
    "average_price_range": { "min": 3000, "max": 10000, "currency": "USD" },
    "labor_pricing_method": "Per sq ft / Per hour",
    "best_monetization": "Pay-per-call / Lead generation",
    "related_services": ["Mold remediation", "Carpet cleaning", "Drywall repair"],
    "local_seo": {
      "title_template": "24/7 Water Damage Restoration in [City], [State_Abbr]",
      "example_title": "24/7 Water Damage Restoration in Miami, FL",
      "primary_keywords": ["water damage restoration", "flooded basement cleanup"]
    },
    "downloadable_resource": {
      "title": "What to Do When Your House Floods",
      "type": "PDF Checklist"
    },
    "call_to_action": "Call for Immediate Help"
  },
  {
    "id": "niche_08",
    "rank": 8,
    "complexity": "Low",
    "field_example": false,
    "service_name": "Commercial Landscaping",
    "category": "B2B",
    "customer_type": "Property Manager / HOA",
    "urgency_level": "Planned",
    "price_level": "Mid Ticket MRR",
    "average_price_range": { "min": 1000, "max": 5000, "currency": "USD" },
    "labor_pricing_method": "Per month / Per property",
    "best_monetization": "Lead generation",
    "related_services": ["Irrigation repair", "Tree removal", "Snow removal"],
    "local_seo": {
      "title_template": "Commercial Landscaping in [City], [State_Abbr]",
      "example_title": "Commercial Landscaping in Seattle, WA",
      "primary_keywords": ["HOA landscaping", "commercial lawn care"]
    },
    "downloadable_resource": {
      "title": "Yearly Grounds Maintenance Checklist",
      "type": "PDF Checklist"
    },
    "call_to_action": "Get a Free Quote"
  },
  {
    "id": "niche_09",
    "rank": 9,
    "complexity": "Medium",
    "field_example": false,
    "service_name": "SaaS Implementation Consulting",
    "category": "Tech",
    "customer_type": "B2B Enterprises",
    "urgency_level": "Planned",
    "price_level": "High Ticket",
    "average_price_range": { "min": 10000, "max": 50000, "currency": "USD" },
    "labor_pricing_method": "Per project / Retainer",
    "best_monetization": "Lead generation",
    "related_services": ["CRM setup", "ERP migration", "Data integration"],
    "local_seo": {
      "title_template": "SaaS Implementation Consultants in [City], [State_Abbr]",
      "example_title": "SaaS Implementation Consultants in Denver, CO",
      "primary_keywords": ["Salesforce implementation partner", "ERP consulting"]
    },
    "downloadable_resource": {
      "title": "SaaS Migration Roadmap",
      "type": "PDF Guide"
    },
    "call_to_action": "Book a Discovery Call"
  },
  {
    "id": "niche_10",
    "rank": 10,
    "complexity": "Medium",
    "field_example": false,
    "service_name": "Plumbing Re-piping",
    "category": "Real Estate",
    "customer_type": "Homeowner / Landlord",
    "urgency_level": "Planned / Emergency",
    "price_level": "High Ticket",
    "average_price_range": { "min": 4000, "max": 15000, "currency": "USD" },
    "labor_pricing_method": "Per fixture / Per project",
    "best_monetization": "Lead generation",
    "related_services": ["Water heater replacement", "Leak detection", "Drywall patching"],
    "local_seo": {
      "title_template": "Whole House Repiping Cost in [City], [State_Abbr]",
      "example_title": "Whole House Repiping Cost in Orlando, FL",
      "primary_keywords": ["house repiping", "polybutylene pipe replacement"]
    },
    "downloadable_resource": {
      "title": "Signs You Need PEX Repiping",
      "type": "PDF Guide"
    },
    "call_to_action": "Schedule an Inspection"
  },
  {
    "id": "niche_11",
    "rank": 11,
    "complexity": "High",
    "field_example": false,
    "service_name": "Asbestos Removal",
    "category": "Real Estate",
    "customer_type": "Homeowner / Commercial",
    "urgency_level": "Planned / Urgent",
    "price_level": "High Ticket",
    "average_price_range": { "min": 2000, "max": 10000, "currency": "USD" },
    "labor_pricing_method": "Per sq ft / Per project",
    "best_monetization": "Lead generation",
    "related_services": ["Asbestos testing", "Insulation replacement", "Demolition"],
    "local_seo": {
      "title_template": "Certified Asbestos Abatement in [City], [State_Abbr]",
      "example_title": "Certified Asbestos Abatement in Boston, MA",
      "primary_keywords": ["asbestos removal cost", "asbestos testing companies"]
    },
    "downloadable_resource": {
      "title": "Asbestos Safety Protocols",
      "type": "PDF Guide"
    },
    "call_to_action": "Get a Safe Estimate"
  },
  {
    "id": "niche_12",
    "rank": 12,
    "complexity": "Medium",
    "field_example": false,
    "service_name": "Custom Software Development",
    "category": "Tech",
    "customer_type": "Startups / Enterprises",
    "urgency_level": "Planned",
    "price_level": "Ultra High Ticket",
    "average_price_range": { "min": 25000, "max": 200000, "currency": "USD" },
    "labor_pricing_method": "Per sprint / Per project",
    "best_monetization": "Lead generation",
    "related_services": ["App development", "UX/UI design", "API integration"],
    "local_seo": {
      "title_template": "Custom Software Developers in [City], [State_Abbr]",
      "example_title": "Custom Software Developers in Raleigh, NC",
      "primary_keywords": ["software development company", "hire app developers"]
    },
    "downloadable_resource": {
      "title": "Software Requirements Document Template",
      "type": "Word Template"
    },
    "call_to_action": "Request a Technical Consultation"
  },
  {
    "id": "niche_13",
    "rank": 13,
    "complexity": "Medium",
    "field_example": false,
    "service_name": "Commercial Epoxy Flooring",
    "category": "B2B",
    "customer_type": "Warehouse Managers",
    "urgency_level": "Planned",
    "price_level": "High Ticket",
    "average_price_range": { "min": 10000, "max": 40000, "currency": "USD" },
    "labor_pricing_method": "Per sq ft",
    "best_monetization": "Lead generation",
    "related_services": ["Concrete polishing", "Floor striping", "Warehouse organization"],
    "local_seo": {
      "title_template": "Commercial Epoxy Flooring Contractors in [City]",
      "example_title": "Commercial Epoxy Flooring Contractors in Charlotte, NC",
      "primary_keywords": ["warehouse floor coating", "industrial epoxy flooring"]
    },
    "downloadable_resource": {
      "title": "Industrial Flooring Durability Guide",
      "type": "PDF Guide"
    },
    "call_to_action": "Get a Concrete Quote"
  },
  {
    "id": "niche_14",
    "rank": 14,
    "complexity": "High",
    "field_example": false,
    "service_name": "In-Ground Pool Installation",
    "category": "Real Estate",
    "customer_type": "Homeowner",
    "urgency_level": "Planned",
    "price_level": "Ultra High Ticket",
    "average_price_range": { "min": 40000, "max": 100000, "currency": "USD" },
    "labor_pricing_method": "Per project",
    "best_monetization": "Lead generation",
    "related_services": ["Pool deck installation", "Landscaping", "Pool fencing"],
    "local_seo": {
      "title_template": "In-Ground Pool Builders in [City], [State_Abbr]",
      "example_title": "In-Ground Pool Builders in Las Vegas, NV",
      "primary_keywords": ["pool installation cost", "custom pool builders"]
    },
    "downloadable_resource": {
      "title": "Fiberglass vs Gunite Pool Comparison",
      "type": "PDF Guide"
    },
    "call_to_action": "Schedule Pool Design"
  },
  {
    "id": "niche_15",
    "rank": 15,
    "complexity": "Medium",
    "field_example": false,
    "service_name": "Janitorial Services",
    "category": "B2B",
    "customer_type": "Office Managers",
    "urgency_level": "Planned",
    "price_level": "Mid Ticket MRR",
    "average_price_range": { "min": 500, "max": 4000, "currency": "USD" },
    "labor_pricing_method": "Per sq ft / Per month",
    "best_monetization": "Lead generation / Subscription",
    "related_services": ["Window cleaning", "Carpet cleaning", "Post-construction cleaning"],
    "local_seo": {
      "title_template": "Office Cleaning Services in [City], [State_Abbr]",
      "example_title": "Office Cleaning Services in Tampa, FL",
      "primary_keywords": ["commercial cleaning company", "janitorial services near me"]
    },
    "downloadable_resource": {
      "title": "Office Cleaning Checklist",
      "type": "PDF Guide"
    },
    "call_to_action": "Get a Cleaning Quote"
  },
  {
    "id": "niche_16",
    "rank": 16,
    "complexity": "High",
    "field_example": false,
    "service_name": "Data Analytics Consulting",
    "category": "Tech",
    "customer_type": "Mid-Market Businesses",
    "urgency_level": "Planned",
    "price_level": "High Ticket",
    "average_price_range": { "min": 10000, "max": 30000, "currency": "USD" },
    "labor_pricing_method": "Retainer / Per project",
    "best_monetization": "Lead generation",
    "related_services": ["Business Intelligence", "Data Warehouse Setup", "Machine Learning Models"],
    "local_seo": {
      "title_template": "Data Analytics Consultants in [City], [State_Abbr]",
      "example_title": "Data Analytics Consultants in Columbus, OH",
      "primary_keywords": ["business intelligence consulting", "data analytics firm"]
    },
    "downloadable_resource": {
      "title": "Data Maturity Assessment",
      "type": "PDF Guide"
    },
    "call_to_action": "Request an Assessment"
  },
  {
    "id": "niche_17",
    "rank": 17,
    "complexity": "Medium",
    "field_example": false,
    "service_name": "Electrical Panel Upgrade",
    "category": "Real Estate",
    "customer_type": "Homeowner / Commercial",
    "urgency_level": "Planned / Urgent",
    "price_level": "Mid Ticket",
    "average_price_range": { "min": 1500, "max": 4000, "currency": "USD" },
    "labor_pricing_method": "Per project / Per hour",
    "best_monetization": "Lead generation",
    "related_services": ["House rewiring", "EV charger installation", "Generator installation"],
    "local_seo": {
      "title_template": "Electrical Panel Upgrade Cost in [City], [State_Abbr]",
      "example_title": "Electrical Panel Upgrade Cost in San Jose, CA",
      "primary_keywords": ["200 amp panel upgrade", "electrician near me"]
    },
    "downloadable_resource": {
      "title": "Is My Electrical Panel Safe?",
      "type": "PDF Checklist"
    },
    "call_to_action": "Book an Electrician"
  },
  {
    "id": "niche_18",
    "rank": 18,
    "complexity": "Medium",
    "field_example": false,
    "service_name": "Property Management",
    "category": "Real Estate",
    "customer_type": "Real Estate Investors",
    "urgency_level": "Planned",
    "price_level": "Mid Ticket MRR",
    "average_price_range": { "min": 1000, "max": 5000, "currency": "USD" },
    "labor_pricing_method": "Percentage of rent",
    "best_monetization": "Lead generation",
    "related_services": ["Tenant screening", "Maintenance coordination", "Rent collection"],
    "local_seo": {
      "title_template": "Property Management Companies in [City], [State_Abbr]",
      "example_title": "Property Management Companies in Portland, OR",
      "primary_keywords": ["property managers near me", "residential property management"]
    },
    "downloadable_resource": {
      "title": "Landlord Guide to Tenant Screening",
      "type": "PDF Guide"
    },
    "call_to_action": "Discuss Your Properties"
  },
  {
    "id": "niche_19",
    "rank": 19,
    "complexity": "Medium",
    "field_example": false,
    "service_name": "Aging-in-Place Mod",
    "category": "Home Improvement",
    "customer_type": "Seniors / Homeowners",
    "urgency_level": "Planned / Urgent",
    "price_level": "High Ticket",
    "average_price_range": { "min": 3000, "max": 15000, "currency": "USD" },
    "labor_pricing_method": "Per project",
    "best_monetization": "Lead generation",
    "related_services": ["Ramp installation", "Door widening", "Stairlifts"],
    "local_seo": {
      "title_template": "Aging in Place Contractors in [City], [State_Abbr]",
      "example_title": "Aging in Place Contractors in Houston, TX",
      "primary_keywords": ["aging in place home modifications", "senior home safety"]
    },
    "downloadable_resource": {
      "title": "Home Safety Assessment Checklist",
      "type": "PDF Guide"
    },
    "call_to_action": "Request a Safety Audit"
  },
  {
    "id": "niche_20",
    "rank": 20,
    "complexity": "High",
    "field_example": false,
    "service_name": "Handicap Bathroom Costs",
    "category": "Home Improvement",
    "customer_type": "Homeowners / Caregivers",
    "urgency_level": "Planned",
    "price_level": "High Ticket",
    "average_price_range": { "min": 5000, "max": 20000, "currency": "USD" },
    "labor_pricing_method": "Per project",
    "best_monetization": "Lead generation",
    "related_services": ["Walk-in tubs", "Roll-in showers", "Grab bar installation"],
    "local_seo": {
      "title_template": "Handicap Bathroom Remodel Cost in [City], [State_Abbr]",
      "example_title": "Handicap Bathroom Remodel Cost in Minneapolis, MN",
      "primary_keywords": ["handicap bathroom contractors", "ADA compliant bathroom remodel"]
    },
    "downloadable_resource": {
      "title": "Accessible Bathroom Layout Ideas",
      "type": "PDF Guide"
    },
    "call_to_action": "Get a Remodel Quote"
  },
  {
    "id": "niche_21",
    "rank": 21,
    "complexity": "High",
    "field_example": false,
    "service_name": "Medical Spa Buildout",
    "category": "B2B",
    "customer_type": "Healthcare Providers",
    "urgency_level": "Planned",
    "price_level": "Ultra High Ticket",
    "average_price_range": { "min": 50000, "max": 250000, "currency": "USD" },
    "labor_pricing_method": "Per project",
    "best_monetization": "Lead generation",
    "related_services": ["Medical plumbing", "Exam room framing", "HVAC specialized"],
    "local_seo": {
      "title_template": "Medical Spa Buildout Contractors in [City], [State_Abbr]",
      "example_title": "Medical Spa Buildout Contractors in Dallas, TX",
      "primary_keywords": ["medical spa construction", "healthcare facility contractors"]
    },
    "downloadable_resource": {
      "title": "Medical Facility Buildout Checklist",
      "type": "PDF Guide"
    },
    "call_to_action": "Request a Construction Bid"
  },
  {
    "id": "niche_22",
    "rank": 22,
    "complexity": "Medium",
    "field_example": false,
    "service_name": "Commercial Paving",
    "category": "B2B",
    "customer_type": "Property Managers",
    "urgency_level": "Planned",
    "price_level": "High Ticket",
    "average_price_range": { "min": 10000, "max": 100000, "currency": "USD" },
    "labor_pricing_method": "Per sq ft",
    "best_monetization": "Lead generation",
    "related_services": ["Sealcoating", "Line striping", "Pothole repair"],
    "local_seo": {
      "title_template": "Commercial Paving Contractors in [City], [State_Abbr]",
      "example_title": "Commercial Paving Contractors in Atlanta, GA",
      "primary_keywords": ["parking lot paving", "commercial asphalt repair"]
    },
    "downloadable_resource": {
      "title": "Asphalt Maintenance Schedule",
      "type": "PDF Guide"
    },
    "call_to_action": "Get a Paving Estimate"
  },
  {
    "id": "niche_23",
    "rank": 23,
    "complexity": "High",
    "field_example": false,
    "service_name": "Custom Home Building",
    "category": "Real Estate",
    "customer_type": "Homeowners",
    "urgency_level": "Planned",
    "price_level": "Ultra High Ticket",
    "average_price_range": { "min": 300000, "max": 1500000, "currency": "USD" },
    "labor_pricing_method": "Cost plus / Fixed price",
    "best_monetization": "Lead generation",
    "related_services": ["Architectural design", "Lot clearing", "Interior design"],
    "local_seo": {
      "title_template": "Custom Home Builders in [City], [State_Abbr]",
      "example_title": "Custom Home Builders in Austin, TX",
      "primary_keywords": ["custom home contractors", "luxury home builders"]
    },
    "downloadable_resource": {
      "title": "Custom Home Planning Guide",
      "type": "PDF Book"
    },
    "call_to_action": "Schedule a Design Consultation"
  },
  {
    "id": "niche_24",
    "rank": 24,
    "complexity": "High",
    "field_example": false,
    "service_name": "Elevator Maintenance",
    "category": "B2B",
    "customer_type": "Building Owners",
    "urgency_level": "Emergency / Planned",
    "price_level": "High Ticket MRR",
    "average_price_range": { "min": 2000, "max": 15000, "currency": "USD" },
    "labor_pricing_method": "Annual contract",
    "best_monetization": "Lead generation",
    "related_services": ["Elevator modernization", "Safety inspections", "Hydraulic repair"],
    "local_seo": {
      "title_template": "Elevator Maintenance Companies in [City], [State_Abbr]",
      "example_title": "Elevator Maintenance Companies in New York, NY",
      "primary_keywords": ["commercial elevator repair", "elevator service contract"]
    },
    "downloadable_resource": {
      "title": "Elevator Safety Audit Form",
      "type": "PDF Checklist"
    },
    "call_to_action": "Request a Service Plan"
  },
  {
    "id": "niche_25",
    "rank": 25,
    "complexity": "Medium",
    "field_example": false,
    "service_name": "ERP Software Licensing",
    "category": "Tech",
    "customer_type": "Mid-Market / Enterprise",
    "urgency_level": "Planned",
    "price_level": "Ultra High Ticket",
    "average_price_range": { "min": 50000, "max": 500000, "currency": "USD" },
    "labor_pricing_method": "Per user / Annual",
    "best_monetization": "Commission / Rev Share",
    "related_services": ["Implementation", "Training", "Custom modules"],
    "local_seo": {
      "title_template": "ERP Software Solutions in [City], [State_Abbr]",
      "example_title": "ERP Software Solutions in Chicago, IL",
      "primary_keywords": ["enterprise resource planning software", "ERP vendors"]
    },
    "downloadable_resource": {
      "title": "ERP Vendor Comparison Chart",
      "type": "Excel Template"
    },
    "call_to_action": "Request a Demo"
  },
  {
    "id": "niche_26",
    "rank": 26,
    "complexity": "Low",
    "field_example": false,
    "service_name": "Fleet Maintenance",
    "category": "B2B",
    "customer_type": "Logistics / Delivery Companies",
    "urgency_level": "Planned / Urgent",
    "price_level": "High Ticket MRR",
    "average_price_range": { "min": 5000, "max": 20000, "currency": "USD" },
    "labor_pricing_method": "Per vehicle / Retainer",
    "best_monetization": "Lead generation",
    "related_services": ["Mobile mechanic", "Tire replacement", "Diagnostics"],
    "local_seo": {
      "title_template": "Commercial Fleet Maintenance in [City], [State_Abbr]",
      "example_title": "Commercial Fleet Maintenance in Denver, CO",
      "primary_keywords": ["fleet repair services", "mobile truck mechanic"]
    },
    "downloadable_resource": {
      "title": "Fleet Preventative Maintenance Log",
      "type": "Excel Template"
    },
    "call_to_action": "Get a Fleet Service Quote"
  },
  {
    "id": "niche_27",
    "rank": 27,
    "complexity": "High",
    "field_example": false,
    "service_name": "Structural Engineering",
    "category": "B2B",
    "customer_type": "Developers / Architects",
    "urgency_level": "Planned",
    "price_level": "High Ticket",
    "average_price_range": { "min": 5000, "max": 40000, "currency": "USD" },
    "labor_pricing_method": "Per project / Hourly",
    "best_monetization": "Lead generation",
    "related_services": ["Foundation design", "Seismic retrofitting", "Building inspections"],
    "local_seo": {
      "title_template": "Structural Engineering Firms in [City], [State_Abbr]",
      "example_title": "Structural Engineering Firms in San Francisco, CA",
      "primary_keywords": ["structural engineer consulting", "commercial building engineer"]
    },
    "downloadable_resource": {
      "title": "Commercial Structural Assessment Guide",
      "type": "PDF Guide"
    },
    "call_to_action": "Consult an Engineer"
  },
  {
    "id": "niche_28",
    "rank": 28,
    "complexity": "Medium",
    "field_example": false,
    "service_name": "Luxury Kitchen Remodeling",
    "category": "Real Estate",
    "customer_type": "Homeowners",
    "urgency_level": "Planned",
    "price_level": "High Ticket",
    "average_price_range": { "min": 40000, "max": 120000, "currency": "USD" },
    "labor_pricing_method": "Cost plus / Fixed price",
    "best_monetization": "Lead generation",
    "related_services": ["Custom cabinetry", "Countertop fabrication", "Appliance installation"],
    "local_seo": {
      "title_template": "Luxury Kitchen Remodeling Cost in [City], [State_Abbr]",
      "example_title": "Luxury Kitchen Remodeling Cost in Miami, FL",
      "primary_keywords": ["high end kitchen remodel", "custom kitchen contractors"]
    },
    "downloadable_resource": {
      "title": "Kitchen Design Material Cheatsheet",
      "type": "PDF Guide"
    },
    "call_to_action": "Schedule a Design Call"
  },
  {
    "id": "niche_29",
    "rank": 29,
    "complexity": "High",
    "field_example": false,
    "service_name": "Environmental Remediation",
    "category": "B2B",
    "customer_type": "Industrial / Commercial Property Owners",
    "urgency_level": "Emergency / Planned",
    "price_level": "Ultra High Ticket",
    "average_price_range": { "min": 50000, "max": 500000, "currency": "USD" },
    "labor_pricing_method": "Per project",
    "best_monetization": "Lead generation",
    "related_services": ["Soil testing", "Groundwater cleanup", "Hazardous waste removal"],
    "local_seo": {
      "title_template": "Environmental Remediation Companies in [City], [State_Abbr]",
      "example_title": "Environmental Remediation Companies in Seattle, WA",
      "primary_keywords": ["contaminated soil removal", "industrial site cleanup"]
    },
    "downloadable_resource": {
      "title": "Phase 1 ESA Checklist",
      "type": "PDF Checklist"
    },
    "call_to_action": "Request a Site Evaluation"
  }
];
