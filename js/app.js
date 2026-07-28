// ABBOSSEY OKAI MAGAZINE - E-Commerce Marketplace Client App logic

// Mock Database Taxonomy & Vehicle Configurations
// Mock Database Taxonomy & Vehicle Configurations
const FULL_VEHICLE_TAXONOMY = {
  Toyota: {
    models: [
      "Corolla", "Camry", "RAV4", "Land Cruiser", "Land Cruiser Prado", "Hilux", "Tacoma", "Tundra", 
      "Highlander", "4Runner", "Vitz", "Yaris", "Fortuner", "Sienna", "Venza", "Matrix", "Prado", 
      "Passo", "Wish", "Mark X", "Avalon", "Crown", "Harrier", "C-HR", "Belta", "Ractis", "Noah", 
      "Voxy", "Alphard", "HiAce", "Celica", "Supra", "Prius", "Sequoia"
    ],
    years: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"]
  },
  Honda: {
    models: [
      "Civic", "Accord", "CR-V", "Fit", "Pilot", "HR-V", "Odyssey", "Insight", "Ridgeline", 
      "Passport", "City", "Stream", "Vezel", "Prelude", "Legend", "Crossroad"
    ],
    years: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"]
  },
  Nissan: {
    models: [
      "Almera", "Altima", "Sentra", "Patrol", "Navara", "Rogue", "Pathfinder", "Murano", "Frontier", 
      "Micra", "Versa", "Tiida", "X-Trail", "Qashqai", "Juke", "Kicks", "Armada", "Urvan", "Maxima", "Teana", "Note"
    ],
    years: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"]
  },
  Hyundai: {
    models: [
      "Elantra", "Sonata", "Tucson", "Santa Fe", "Accent", "i10", "i20", "i30", "Kona", "Palisade", 
      "Genesis", "Grandeur", "Venue", "Terracan", "Atos", "H-1 / Starex", "Creta"
    ],
    years: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"]
  },
  Kia: {
    models: [
      "Picanto", "Rio", "Cerato", "Sportage", "Sorento", "K5", "Optima", "Stinger", "Telluride", 
      "Carnival / Sedona", "Soul", "Seltos", "Cadenza", "Mohave", "Pegas"
    ],
    years: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"]
  },
  Ford: {
    models: [
      "Focus", "Explorer", "Escape", "Ranger", "Mustang", "F-150", "Edge", "Expedition", 
      "Fiesta", "Fusion", "Transit", "Bronco", "EcoSport", "Everest", "Taurus"
    ],
    years: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"]
  },
  BMW: {
    models: [
      "1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "6 Series", "7 Series", "8 Series", 
      "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4", "M3", "M5"
    ],
    years: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"]
  },
  Mercedes: {
    models: [
      "A-Class", "B-Class", "C-Class", "E-Class", "S-Class", "CLA", "CLS", "GLA", "GLB", 
      "GLC", "GLE", "GLS", "G-Class", "ML-Class", "GL-Class", "Sprinter", "Vito"
    ],
    years: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"]
  },
  Lexus: {
    models: [
      "RX 350", "RX 300", "RX 450h", "GX 460", "GX 470", "LX 570", "LX 600", "ES 350", 
      "ES 300", "IS 250", "IS 350", "GS 350", "NX 200t", "NX 300", "CT 200h"
    ],
    years: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"]
  },
  Mitsubishi: {
    models: [
      "Pajero", "Pajero Sport", "L200", "Outlander", "Lancer", "ASX", "Eclipse Cross", "Mirage", "Montero"
    ],
    years: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"]
  },
  Suzuki: {
    models: [
      "Swift", "Vitara", "Grand Vitara", "Jimny", "Baleno", "Alto", "Dzire", "Ertiga", "S-Cross", "Ciaz"
    ],
    years: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"]
  },
  Volkswagen: {
    models: [
      "Golf", "Passat", "Jetta", "Tiguan", "Touareg", "Polo", "Amarok", "Atlas", "Arteon", "Transporter"
    ],
    years: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"]
  },
  "Land Rover": {
    models: [
      "Range Rover", "Range Rover Sport", "Range Rover Evoque", "Range Rover Velar", "Defender", "Discovery", "Discovery Sport"
    ],
    years: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"]
  },
  Audi: {
    models: [
      "A3", "A4", "A5", "A6", "A7", "A8", "Q3", "Q5", "Q7", "Q8", "TT"
    ],
    years: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"]
  }
};

// Always merge full taxonomy to ensure complete models like Tacoma are available
let storedTaxonomy = null;
try {
  storedTaxonomy = JSON.parse(localStorage.getItem("ao_vehicle_taxonomy"));
} catch (e) {}

let VEHICLE_TAXONOMY = { ...FULL_VEHICLE_TAXONOMY };
if (storedTaxonomy && typeof storedTaxonomy === "object") {
  Object.keys(FULL_VEHICLE_TAXONOMY).forEach(make => {
    if (storedTaxonomy[make] && Array.isArray(storedTaxonomy[make].models)) {
      const mergedModels = Array.from(new Set([...FULL_VEHICLE_TAXONOMY[make].models, ...storedTaxonomy[make].models]));
      VEHICLE_TAXONOMY[make] = {
        models: mergedModels,
        years: FULL_VEHICLE_TAXONOMY[make].years
      };
    }
  });
}
try {
  localStorage.setItem("ao_vehicle_taxonomy", JSON.stringify(VEHICLE_TAXONOMY));
} catch (e) {}

let SPARE_PART_CATEGORIES = JSON.parse(localStorage.getItem("ao_parts_categories")) || [
  "Brake System",
  "Engine Parts",
  "Electrical",
  "Suspension & Steering",
  "Transmission",
  "Cooling System",
  "Filters & Tune-Up",
  "Body & Styling",
  "Tires & Wheels",
  "Batteries",
  "Engine Oil",
  "Lighting",
  "Suspension",
  "Filters",
  "Radiator",
  "Shock Absorbers",
  "Ball Joints",
  "Steering Wheel",
  "Wipers",
  "Condenser"
];

let CAR_ACCESSORY_CATEGORIES = JSON.parse(localStorage.getItem("ao_accessory_categories")) || [
  "Audio",
  "Interior",
  "Exterior",
  "Safety"
];

// Initial Seed Listings for Marketplace
const DEFAULT_PRODUCTS = [
  {
    id: "prod-1",
    mainType: "parts",
    name: "Ceramic Front Brake Pads Kit",
    brand: "Akebono",
    category: "Brake System",
    condition: "New",
    price: 380,
    stock: "In Stock",
    status: "Live",
    views: 142,
    images: [],
    compatibility: [
      { make: "Toyota", model: "Corolla", years: "2015-2022" },
      { make: "Toyota", model: "Camry", years: "2016-2021" }
    ],
    merchant: {
      shopName: "Kofi Auto Spares",
      phone: "+233240123456",
      location: "Stall A12, Section 3, Abossey Okai",
      coordinates: "5.5562, -0.2284",
      verified: true,
      since: "Jan 2022"
    },
    description: "Premium Akebono ceramic brake pads offering zero noise, low dust, and exceptional stopping power. Directly imported from USA. Certified fitment for 2015-2022 Corolla models."
  },
  {
    id: "prod-2",
    mainType: "parts",
    name: "Full Set Shock Absorbers (Front & Rear)",
    brand: "KYB Excel-G",
    category: "Shock Absorbers",
    condition: "New",
    price: 1850,
    stock: "In Stock",
    status: "Live",
    views: 98,
    images: [],
    compatibility: [
      { make: "Honda", model: "Civic", years: "2012-2018" },
      { make: "Honda", model: "Accord", years: "2013-2019" }
    ],
    merchant: {
      shopName: "Abossey Okai Shocks Hub",
      phone: "+233249998887",
      location: "Near Ghana Commercial Bank, Abossey Okai",
      coordinates: "5.5558, -0.2291",
      verified: true,
      since: "Mar 2023"
    },
    description: "Original KYB Excel-G nitrogen gas charged shocks. Designed to restore your Honda's original handling and ride control. Sold as a complete set of 4."
  },
  {
    id: "prod-3",
    mainType: "parts",
    name: "Replacement Alternator 12V 90A",
    brand: "Denso",
    category: "Electrical",
    condition: "Refurbished",
    price: 750,
    stock: "In Stock",
    status: "Live",
    views: 67,
    images: [],
    compatibility: [
      { make: "Nissan", model: "Almera", years: "2010-2016" }
    ],
    merchant: {
      shopName: "Electricals Junction Store",
      phone: "+233551234567",
      location: "Stall D45, Electricals Lane, Abossey Okai",
      coordinates: "5.5570, -0.2275",
      verified: false,
      since: "Nov 2024"
    },
    description: "Fully remanufactured original Denso alternator. Bench-tested with new brushes and bearings. Guaranteed stable charging output."
  },
  {
    id: "prod-4",
    mainType: "accessories",
    name: "7-Inch Android Touchscreen Car Stereo",
    brand: "Pioneer",
    category: "Audio",
    condition: "New",
    price: 1200,
    stock: "In Stock",
    status: "Live",
    views: 203,
    images: [],
    compatibility: "Universal Fit",
    merchant: {
      shopName: "Sound Force Accessories",
      phone: "+233201112222",
      location: "Stall B9, High Street Area, Abossey Okai",
      coordinates: "5.5550, -0.2299",
      verified: true,
      since: "Jul 2021"
    },
    description: "Features double-din design, built-in GPS, Bluetooth, Apple CarPlay, and Android Auto. Supports rear view camera input and steering wheel controllers."
  },
  {
    id: "prod-5",
    mainType: "accessories",
    name: "Orthopedic Memory Foam Seat Cushion",
    brand: "Sparco",
    category: "Interior",
    condition: "New",
    price: 280,
    stock: "In Stock",
    status: "Live",
    views: 55,
    images: [],
    compatibility: "Universal Fit",
    merchant: {
      shopName: "Sound Force Accessories",
      phone: "+233201112222",
      location: "Stall B9, High Street Area, Abossey Okai",
      coordinates: "5.5550, -0.2299",
      verified: true,
      since: "Jul 2021"
    },
    description: "Ergonomic wedge shape relieves tailbone pain and improves posture during long traffic commutes. Breathable mesh cover is washable."
  },
  {
    id: "prod-6",
    mainType: "accessories",
    name: "Heavy Duty Waterproof Car Cover",
    brand: "MotorTrend",
    category: "Exterior",
    condition: "New",
    price: 350,
    stock: "Out of Stock",
    status: "Live",
    views: 31,
    images: [],
    compatibility: "Universal Fit",
    merchant: {
      shopName: "Akwasi Auto Accessories",
      phone: "+233245554443",
      location: "Opposite Police Container, Abossey Okai",
      coordinates: "5.5566, -0.2268",
      verified: false,
      since: "May 2023"
    },
    description: "Multi-layered breathable fabric protects your vehicle from dust, rain, and heavy Ghana sunshine. Fitted with wind straps and elastic hems."
  },
  {
    id: "prod-7",
    mainType: "parts",
    name: "1.8L Engine Head Gasket Kit",
    brand: "Fel-Pro",
    category: "Engine Parts",
    condition: "New",
    price: 450,
    stock: "In Stock",
    status: "Live",
    views: 79,
    images: [],
    compatibility: [
      { make: "Toyota", model: "Corolla", years: "2009-2016" }
    ],
    merchant: {
      shopName: "Kofi Auto Spares",
      phone: "+233240123456",
      location: "Stall A12, Section 3, Abossey Okai",
      coordinates: "5.5562, -0.2284",
      verified: true,
      since: "Jan 2022"
    },
    description: "Premium gasket kit provides superior sealing on uneven head surfaces. Includes valve stem seals, intake, and exhaust gaskets."
  },
  {
    id: "prod-8",
    mainType: "parts",
    name: "Front Radiator Assembly",
    brand: "KOYORAD",
    category: "Radiator",
    condition: "Used",
    price: 850,
    stock: "In Stock",
    status: "Live",
    views: 44,
    images: [],
    compatibility: [
      { make: "Hyundai", model: "Tucson", years: "2015-2020" },
      { make: "Kia", model: "Sportage", years: "2016-2021" }
    ],
    merchant: {
      shopName: "Ofori Cooling Systems",
      phone: "+233243332221",
      location: "Stall F5, Radiator Lane, Abossey Okai",
      coordinates: "5.5559, -0.2280",
      verified: true,
      since: "Sep 2020"
    },
    description: "Genuinely imported salvage (Tokunbo) radiator in excellent condition. Direct plug-and-play fitment with core pressure tested."
  },

  // ─── Elite Parts Center mock listings ───────────────────────────────────────
  {
    id: "prod-epc-1",
    mainType: "parts",
    name: "Genuine Bosch Fuel Injector Set (4 pcs)",
    brand: "Bosch",
    category: "Engine Parts",
    condition: "New",
    price: 1450,
    stock: "In Stock",
    status: "Live",
    views: 317,
    images: [],
    compatibility: [
      { make: "BMW", model: "3 Series", years: "2012-2019" },
      { make: "BMW", model: "5 Series", years: "2013-2020" }
    ],
    merchant: {
      shopName: "Elite Parts Center",
      phone: "+233244111222",
      location: "Stall E18, Main Boulevard, Abossey Okai",
      coordinates: "5.5565, -0.2282",
      verified: true,
      since: "Jun 2023"
    },
    description: "Original Bosch direct-injection injectors for BMW petrol engines. Ensures precise fuel atomisation, improved fuel economy, and smoother idle. Sold as a set of 4."
  },
  {
    id: "prod-epc-2",
    mainType: "parts",
    name: "Mercedes-Benz Air Suspension Compressor",
    brand: "Arnott",
    category: "Suspension & Steering",
    condition: "New",
    price: 3200,
    stock: "In Stock",
    status: "Live",
    views: 189,
    images: [],
    compatibility: [
      { make: "Mercedes", model: "E-Class", years: "2010-2016" },
      { make: "Mercedes", model: "S-Class", years: "2006-2013" }
    ],
    merchant: {
      shopName: "Elite Parts Center",
      phone: "+233244111222",
      location: "Stall E18, Main Boulevard, Abossey Okai",
      coordinates: "5.5565, -0.2282",
      verified: true,
      since: "Jun 2023"
    },
    description: "OEM-quality air suspension compressor pump. Restores proper ride height and comfort on air-sprung Mercedes models. Includes mounting kit and relay."
  },
  {
    id: "prod-epc-3",
    mainType: "parts",
    name: "Toyota Land Cruiser Transfer Case",
    brand: "Aisin",
    category: "Transmission",
    condition: "Used",
    price: 4800,
    stock: "In Stock",
    status: "Live",
    views: 142,
    images: [],
    compatibility: [
      { make: "Toyota", model: "Land Cruiser", years: "2008-2015" }
    ],
    merchant: {
      shopName: "Elite Parts Center",
      phone: "+233244111222",
      location: "Stall E18, Main Boulevard, Abossey Okai",
      coordinates: "5.5565, -0.2282",
      verified: true,
      since: "Jun 2023"
    },
    description: "Low-mileage Tokunbo transfer case from a UK-spec Land Cruiser. Tested and confirmed 4WD engagement in all modes. Comes with a 30-day functionality guarantee."
  },
  {
    id: "prod-epc-4",
    mainType: "parts",
    name: "BMW N52 Engine Valve Cover Gasket Kit",
    brand: "Elring",
    category: "Engine Parts",
    condition: "New",
    price: 620,
    stock: "In Stock",
    status: "Live",
    views: 205,
    images: [],
    compatibility: [
      { make: "BMW", model: "3 Series", years: "2006-2012" },
      { make: "BMW", model: "X3", years: "2007-2013" }
    ],
    merchant: {
      shopName: "Elite Parts Center",
      phone: "+233244111222",
      location: "Stall E18, Main Boulevard, Abossey Okai",
      coordinates: "5.5565, -0.2282",
      verified: true,
      since: "Jun 2023"
    },
    description: "German-made Elring gasket kit for the BMW N52 6-cylinder engine. Stops oil leaks at the valve cover completely. Includes all O-rings, spark plug seals, and bolts."
  },
  {
    id: "prod-epc-5",
    mainType: "accessories",
    name: "Premium Leather Steering Wheel Cover",
    brand: "Sparco",
    category: "Steering Wheel",
    condition: "New",
    price: 280,
    stock: "In Stock",
    status: "Live",
    views: 98,
    images: [],
    compatibility: "Universal Fit",
    merchant: {
      shopName: "Elite Parts Center",
      phone: "+233244111222",
      location: "Stall E18, Main Boulevard, Abossey Okai",
      coordinates: "5.5565, -0.2282",
      verified: true,
      since: "Jun 2023"
    },
    description: "Genuine perforated leather with non-slip grip stitching. Compatible with steering wheels 37–39 cm in diameter. Enhances driving comfort and interior aesthetics."
  },
  {
    id: "prod-epc-6",
    mainType: "parts",
    name: "Brembo Front Brake Disc Set",
    brand: "Brembo",
    category: "Brake System",
    condition: "New",
    price: 2100,
    stock: "Out of Stock",
    status: "Live",
    views: 76,
    images: [],
    compatibility: [
      { make: "Mercedes", model: "C-Class", years: "2015-2021" },
      { make: "Mercedes", model: "GLC", years: "2016-2022" }
    ],
    merchant: {
      shopName: "Elite Parts Center",
      phone: "+233244111222",
      location: "Stall E18, Main Boulevard, Abossey Okai",
      coordinates: "5.5565, -0.2282",
      verified: true,
      since: "Jun 2023"
    },
    description: "Italian-engineered Brembo vented brake discs for Mercedes AMG-Line models. Exceptional fade resistance under heavy braking. Sold as a pair (both front wheels)."
  },
  {
    id: "prod-9",
    mainType: "parts",
    name: "Front Lower Ball Joint Kit",
    brand: "Moog",
    category: "Ball Joints",
    condition: "New",
    price: 450,
    stock: "In Stock",
    status: "Live",
    views: 89,
    images: [],
    compatibility: [
      { make: "Toyota", model: "Corolla", years: "2012-2020" },
      { make: "Honda", model: "Civic", years: "2013-2021" }
    ],
    merchant: {
      shopName: "Kofi Auto Spares",
      phone: "+233240123456",
      location: "Stall A12, Section 3, Abossey Okai",
      coordinates: "5.5562, -0.2284",
      verified: true,
      since: "Jan 2022"
    },
    description: "Premium heavy-duty ball joints from Moog. Built with hardened steel and greasable design for long-lasting durability and smooth steering response."
  },
  {
    id: "prod-10",
    mainType: "parts",
    name: "Premium All-Season Windshield Wipers (Pair)",
    brand: "Bosch ICON",
    category: "Wipers",
    condition: "New",
    price: 180,
    stock: "In Stock",
    status: "Live",
    views: 124,
    images: [],
    compatibility: "Universal Fit",
    merchant: {
      shopName: "Electricals Junction Store",
      phone: "+233551234567",
      location: "Stall D45, Electricals Lane, Abossey Okai",
      coordinates: "5.5570, -0.2275",
      verified: false,
      since: "Nov 2024"
    },
    description: "Bosch ICON beam wiper blades with clearmax 365 rubber technology. Provides clean, streak-free visibility under all weather conditions."
  },
  {
    id: "prod-11",
    mainType: "parts",
    name: "A/C Condenser Assembly",
    brand: "Denso",
    category: "Condenser",
    condition: "New",
    price: 950,
    stock: "In Stock",
    status: "Live",
    views: 56,
    images: [],
    compatibility: [
      { make: "Hyundai", model: "Elantra", years: "2016-2022" },
      { make: "Kia", model: "Cerato", years: "2017-2023" }
    ],
    merchant: {
      shopName: "Ofori Cooling Systems",
      phone: "+233243332221",
      location: "Stall F5, Radiator Lane, Abossey Okai",
      coordinates: "5.5559, -0.2280",
      verified: true,
      since: "Sep 2020"
    },
    description: "Original Denso replacement A/C condenser. Manufactured with premium aluminum construction for efficient heat transfer and optimal cooling system performance."
  }
];


// Default Profile for Simulating Merchant Center login
const DEFAULT_MERCHANT_PROFILE = {
  shopName: "Elite Parts Center",
  phone: "+233244111222",
  location: "Stall E18, Main Boulevard, Abossey Okai",
  coordinates: "5.5565, -0.2282",
  description: "Direct importer of genuine spare parts and luxury car accessories. Specialist in German and Japanese brands.",
  avatar: null,
  verified: true,
  since: "Jun 2023"
};

class AbbosseyOkaiApp {
  constructor() {
    this.searchMode = "parts"; // 'parts' or 'accessories'
    this.activeMainType = "all"; // 'all', 'parts', 'accessories'
    this.selectedAccessoryCat = null;
    this.searchQuery = "";
    
    // Core states
    this.products = [];
    this.selectedFitmentsInForm = [];
    this.selectedFormImages = [];
    this.currentFormStep = 1;
    
    // Filters State
    this.activeFilters = {
      conditions: [],
      priceMin: null,
      priceMax: null,
      merchantTypes: [],
      brands: []
    };
    
    // Sorting option
    this.sortOption = "popular";
    
    // Current Active PDP Details
    this.activePdpProduct = null;
    this.activePdpImageIndex = 0;
    
    // Auth and Merchant State
    this.isMerchantLoggedIn = false;
    this.merchantProfile = null;
    this.isAdminLoggedIn = false;
    this.isCustomerLoggedIn = false;
    this.merchants = [];
    
    // PWA Install Event Handler
    this.deferredPrompt = null;
    
    // Active UI view
    this.currentView = "storefront"; // 'storefront', 'dashboard', or 'admin-dashboard'
    
    // Brand Directory States
    this.brandSearchQuery = "";
    this.activeBrandTab = "all";
    this.allBrandsData = [
      { id: "toyota", name: "Toyota", logo: "toyota.png", category: "asian" },
      { id: "nissan", name: "Nissan", logo: "nissan.png", category: "asian" },
      { id: "honda", name: "Honda", logo: "honda.png", category: "asian" },
      { id: "suzuki", name: "Suzuki", logo: "suzuki.png", category: "asian" },
      { id: "mitsubishi", name: "Mitsubishi", logo: "mitsubishi.png", category: "asian" },
      { id: "acura", name: "Acura", logo: "acura.png", category: "asian" },
      { id: "mazda", name: "Mazda", logo: "mazda.png", category: "asian" },
      { id: "subaru", name: "Subaru", logo: "subaru.png", category: "asian" },
      { id: "lexus", name: "Lexus", logo: "lexus.png", category: "asian" },
      { id: "infiniti", name: "Infiniti", logo: "infiniti.png", category: "asian" },
      { id: "isuzu", name: "Isuzu", logo: "isuzu.png", category: "asian" },
      { id: "hyundai", name: "Hyundai", logo: "hyundai.png", category: "asian" },
      { id: "kia", name: "Kia", logo: "kia.png", category: "asian" },
      { id: "daewoo", name: "Daewoo", logo: "daewoo.png", category: "asian" },
      { id: "chery", name: "Chery", logo: "chery.png", category: "asian" },
      { id: "byd", name: "BYD", logo: "byd.png", category: "asian" },
      { id: "jetour", name: "Jetour", logo: "jetour.png", category: "asian" },
      { id: "geely", name: "Geely", logo: "geely.png", category: "asian" },
      { id: "jac-motors", name: "JAC Motors", logo: "jac-motors.png", category: "asian" },
      
      { id: "mercedes-benz", name: "Mercedes-Benz", logo: "mercedes-benz.png", category: "european" },
      { id: "bmw", name: "BMW", logo: "bmw.png", category: "european" },
      { id: "audi", name: "Audi", logo: "audi.png", category: "european" },
      { id: "porsche", name: "Porsche", logo: "porsche.png", category: "european" },
      { id: "peugeot", name: "Peugeot", logo: "peugeot.png", category: "european" },
      { id: "renault", name: "Renault", logo: "renault.png", category: "european" },
      { id: "opel", name: "Opel", logo: "opel.png", category: "european" },
      { id: "land-rover", name: "Land Rover", logo: "land-rover.png", category: "european" },
      { id: "jaguar", name: "Jaguar", logo: "jaguar.png", category: "european" },
      { id: "volvo", name: "Volvo", logo: "volvo.png", category: "european" },
      
      { id: "ford", name: "Ford", logo: "ford.png", category: "american" },
      { id: "chevrolet", name: "Chevrolet", logo: "chevrolet.png", category: "american" },
      { id: "jeep", name: "Jeep", logo: "jeep.png", category: "american" },
      { id: "dodge", name: "Dodge", logo: "dodge.png", category: "american" },
      { id: "gmc", name: "GMC", logo: "gmc.png", category: "american" },
      { id: "cadillac", name: "Cadillac", logo: "cadillac.png", category: "american" },
      { id: "tesla", name: "Tesla", logo: "tesla.png", category: "american" },
      { id: "ram", name: "RAM", logo: "ram.png", category: "american" },
      { id: "chrysler", name: "Chrysler", logo: "chrysler.png", category: "american" },
      
      { id: "sinotruk", name: "Sinotruk", logo: "sinotruk.png", category: "commercial" },
      { id: "daf", name: "DAF", logo: "daf.png", category: "commercial" },
      { id: "man", name: "MAN", logo: "man.png", category: "commercial" },
      { id: "scania", name: "Scania", logo: "scania.png", category: "commercial" },
      { id: "iveco", name: "Iveco", logo: "iveco.png", category: "commercial" },
      { id: "mack", name: "Mack", logo: "mack.png", category: "commercial" },
      { id: "volvo-trucks", name: "Volvo Trucks", logo: "volvo-trucks.png", category: "commercial" },
      { id: "renault-trucks", name: "Renault Trucks", logo: "renault-trucks.png", category: "commercial" },
      { id: "ashok-leyland", name: "Ashok Leyland", logo: "ashok-leyland.png", category: "commercial" },
      { id: "shacman", name: "Shacman", logo: "shacman.png", category: "commercial" },
      { id: "faw", name: "FAW", logo: "faw.png", category: "commercial" },
      { id: "tata", name: "Tata", logo: "tata.png", category: "commercial" }
    ];
    
    // Initialize components
    this.init();
  }

  init() {
    this.loadPersistedData();
    this.setupPwaEvents();
    this.bindDomElements();
    this.populateSelectOptions();
    this.renderCatalog();
    this.renderBrandFilters();
    this.setupThemeAndStyleEnhancements();
    this.renderAnnouncementBanner();
    this.setupClickTracking();
    this.setupInteractiveMarquee();
    this.setupBrandMarquee();
  }

  setupInteractiveMarquee() {
    const scrollContainer = document.querySelector(".shop-cat-scroll");
    const track = document.querySelector(".shop-cat-track");
    const firstGroup = document.querySelector(".shop-cat-group");
    if (!scrollContainer || !track || !firstGroup) return;

    let isDown = false;
    let startX = 0;
    let startY = 0;
    let startTranslateX = 0;
    let currentTranslateX = 0;
    let isInteracting = false;
    let interactionTimeout = null;
    let wasDragging = false;

    // Recalculate groupWidth dynamically
    let groupWidth = firstGroup.getBoundingClientRect().width || 1300;
    
    const updateGroupWidth = () => {
      groupWidth = firstGroup.getBoundingClientRect().width;
    };

    updateGroupWidth();
    window.addEventListener("resize", updateGroupWidth);
    window.addEventListener("load", updateGroupWidth);

    const speed = 0.85; // Pixels per frame (extremely smooth scrolling at 60fps)

    const animate = () => {
      // Lazy load/re-calc group width if it was 0 initially
      if (groupWidth <= 100) {
        groupWidth = firstGroup.getBoundingClientRect().width;
      }
      
      // Auto-scroll loop
      if (!isInteracting && !isDown) {
        currentTranslateX -= speed;

        // Wrap around seamlessly
        if (currentTranslateX <= -groupWidth) {
          currentTranslateX += groupWidth;
        }

        // Apply GPU-accelerated translation
        track.style.transform = `translate3d(${currentTranslateX}px, 0, 0)`;
      }
      requestAnimationFrame(animate);
    };

    // Start auto-scroll marquee loop
    requestAnimationFrame(animate);

    const pauseAutoScroll = () => {
      isInteracting = true;
      clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => {
        isInteracting = false;
      }, 2500); // Resume auto-scrolling after 2.5 seconds of inactivity
    };

    // Helper to apply translation
    const setTranslation = (tx) => {
      currentTranslateX = tx;
      
      // Keep within bounds for wrap-around
      if (currentTranslateX <= -groupWidth) {
        currentTranslateX += groupWidth;
      } else if (currentTranslateX > 0) {
        currentTranslateX -= groupWidth;
      }
      
      track.style.transform = `translate3d(${currentTranslateX}px, 0, 0)`;
    };

    // Mouse drag interactions
    scrollContainer.addEventListener("mousedown", (e) => {
      isDown = true;
      wasDragging = false;
      scrollContainer.classList.add("active");
      startX = e.pageX;
      startY = e.pageY;
      startTranslateX = currentTranslateX;
      pauseAutoScroll();
    });

    scrollContainer.addEventListener("mouseleave", () => {
      isDown = false;
      scrollContainer.classList.remove("active");
    });

    scrollContainer.addEventListener("mouseup", (e) => {
      if (isDown) {
        const dist = Math.sqrt((e.pageX - startX) ** 2 + (e.pageY - startY) ** 2);
        if (dist > 6) {
          wasDragging = true;
        }
      }
      isDown = false;
      scrollContainer.classList.remove("active");
    });

    scrollContainer.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const dx = e.pageX - startX;
      const walk = dx * 1.3; // drag sensitivity multiplier
      setTranslation(startTranslateX + walk);
      pauseAutoScroll();
    });

    // Touch events for mobile swiping (translating touch movements)
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTranslateX = 0;

    scrollContainer.addEventListener("touchstart", (e) => {
      isDown = true;
      wasDragging = false;
      const touch = e.touches[0];
      touchStartX = touch.pageX;
      touchStartY = touch.pageY;
      touchStartTranslateX = currentTranslateX;
      pauseAutoScroll();
    }, { passive: true });

    scrollContainer.addEventListener("touchmove", (e) => {
      if (!isDown) return;
      const touch = e.touches[0];
      const dx = touch.pageX - touchStartX;
      const dy = touch.pageY - touchStartY;

      // If user is swiping horizontally rather than scrolling vertically
      if (Math.abs(dx) > Math.abs(dy)) {
        e.preventDefault(); // Stop default scroll of page
        wasDragging = true;
        const walk = dx * 1.3;
        setTranslation(touchStartTranslateX + walk);
        pauseAutoScroll();
      }
    }, { passive: false }); // Needs to be non-passive to allow e.preventDefault()

    scrollContainer.addEventListener("touchend", () => {
      isDown = false;
    }, { passive: true });

    // Disable browser default image and link drag ghosting
    scrollContainer.addEventListener("dragstart", (e) => {
      e.preventDefault();
    });

    // Capture phase click interceptor to prevent link activation during drag scroll
    scrollContainer.addEventListener("click", (e) => {
      if (wasDragging) {
        e.stopImmediatePropagation();
        e.preventDefault();
        wasDragging = false;
      }
    }, true);
  }

  setupBrandMarquee() {
    const scrollContainer = document.querySelector(".shop-brand-scroll");
    const track = document.querySelector(".shop-brand-track");
    const firstGroup = document.querySelector(".shop-brand-group");
    if (!scrollContainer || !track || !firstGroup) return;

    let isDown = false;
    let startX = 0;
    let startY = 0;
    let startTranslateX = 0;
    let currentTranslateX = 0;
    let isInteracting = false;
    let interactionTimeout = null;
    let wasDragging = false;

    // Recalculate groupWidth dynamically
    let groupWidth = firstGroup.getBoundingClientRect().width || 1300;
    
    const updateGroupWidth = () => {
      groupWidth = firstGroup.getBoundingClientRect().width;
      // Initialize starting position at -groupWidth
      currentTranslateX = -groupWidth;
    };

    updateGroupWidth();
    window.addEventListener("resize", updateGroupWidth);
    window.addEventListener("load", updateGroupWidth);

    // Initial position should be -groupWidth
    currentTranslateX = -groupWidth;

    const speed = 1.35; // Pixels per frame (faster than category scroll)

    const animate = () => {
      // Lazy load/re-calc group width if it was 0 initially
      if (groupWidth <= 100) {
        groupWidth = firstGroup.getBoundingClientRect().width;
        if (currentTranslateX === 0) currentTranslateX = -groupWidth;
      }
      
      // Auto-scroll loop
      if (!isInteracting && !isDown) {
        // Move left-to-right (positive translation)
        currentTranslateX += speed;

        // Wrap around seamlessly when it reaches 0
        if (currentTranslateX >= 0) {
          currentTranslateX -= groupWidth;
        }

        // Apply GPU-accelerated translation
        track.style.transform = `translate3d(${currentTranslateX}px, 0, 0)`;
      }
      requestAnimationFrame(animate);
    };

    // Start auto-scroll marquee loop
    requestAnimationFrame(animate);

    const pauseAutoScroll = () => {
      isInteracting = true;
      clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => {
        isInteracting = false;
      }, 2500); // Resume auto-scrolling after 2.5 seconds of inactivity
    };

    // Helper to apply translation and keep within bounds
    const setTranslation = (tx) => {
      currentTranslateX = tx;
      
      // Keep within bounds for wrap-around
      while (currentTranslateX >= 0) {
        currentTranslateX -= groupWidth;
      }
      while (currentTranslateX < -groupWidth) {
        currentTranslateX += groupWidth;
      }
      
      track.style.transform = `translate3d(${currentTranslateX}px, 0, 0)`;
    };

    // Mouse drag interactions
    scrollContainer.addEventListener("mousedown", (e) => {
      isDown = true;
      wasDragging = false;
      scrollContainer.classList.add("active");
      startX = e.pageX;
      startY = e.pageY;
      startTranslateX = currentTranslateX;
      pauseAutoScroll();
    });

    scrollContainer.addEventListener("mouseleave", () => {
      isDown = false;
      scrollContainer.classList.remove("active");
    });

    scrollContainer.addEventListener("mouseup", (e) => {
      if (isDown) {
        const dist = Math.sqrt((e.pageX - startX) ** 2 + (e.pageY - startY) ** 2);
        if (dist > 6) {
          wasDragging = true;
        }
      }
      isDown = false;
      scrollContainer.classList.remove("active");
    });

    scrollContainer.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const dx = e.pageX - startX;
      const walk = dx * 1.3; // drag sensitivity multiplier
      setTranslation(startTranslateX + walk);
      pauseAutoScroll();
    });

    // Touch events for mobile swiping
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTranslateX = 0;

    scrollContainer.addEventListener("touchstart", (e) => {
      isDown = true;
      wasDragging = false;
      const touch = e.touches[0];
      touchStartX = touch.pageX;
      touchStartY = touch.pageY;
      touchStartTranslateX = currentTranslateX;
      pauseAutoScroll();
    }, { passive: true });

    scrollContainer.addEventListener("touchmove", (e) => {
      if (!isDown) return;
      const touch = e.touches[0];
      const dx = touch.pageX - touchStartX;
      const dy = touch.pageY - touchStartY;

      // If user is swiping horizontally rather than scrolling vertically
      if (Math.abs(dx) > Math.abs(dy)) {
        e.preventDefault(); // Stop default scroll of page
        wasDragging = true;
        const walk = dx * 1.3;
        setTranslation(touchStartTranslateX + walk);
        pauseAutoScroll();
      }
    }, { passive: false });

    scrollContainer.addEventListener("touchend", () => {
      isDown = false;
    }, { passive: true });

    // Disable browser default image and link drag ghosting
    scrollContainer.addEventListener("dragstart", (e) => {
      e.preventDefault();
    });

    // Capture phase click interceptor to prevent click activation during drag scroll
    scrollContainer.addEventListener("click", (e) => {
      if (wasDragging) {
        e.preventDefault();
        e.stopPropagation();
        wasDragging = false;
      }
    }, true);
  }

  // Load from local storage or use defaults
  loadPersistedData() {
    // 1. Seed and load merchants roster first
    const savedMerchants = localStorage.getItem("ao_marketplace_merchants");
    if (savedMerchants) {
      this.merchants = JSON.parse(savedMerchants);
    } else {
      // Build unique merchants list from DEFAULT_PRODUCTS
      const uniqueMerchantsMap = {};
      const emailMap = {
        "Kofi Auto Spares": "kofi@gmail.com",
        "Abossey Okai Shocks Hub": "hub@gmail.com",
        "Electricals Junction Store": "junction@gmail.com",
        "Sound Force Accessories": "soundforce@gmail.com",
        "Akwasi Auto Accessories": "akwasi@gmail.com",
        "Ofori Cooling Systems": "ofori@gmail.com",
        "Elite Parts Center": "eliteparts@gmail.com"
      };
      
      DEFAULT_PRODUCTS.forEach(p => {
        const m = p.merchant;
        if (m && !uniqueMerchantsMap[m.shopName]) {
          uniqueMerchantsMap[m.shopName] = {
            shopName: m.shopName,
            phone: m.phone,
            email: emailMap[m.shopName] || (m.shopName.toLowerCase().replace(/[^a-z0-9]/g, "") + "@gmail.com"),
            location: m.location,
            coordinates: m.coordinates,
            description: p.description || `${m.shopName} — Premium Abossey Okai Dealer.`,
            specialty: p.mainType === "parts" ? "japanese" : "accessories",
            avatar: null,
            verified: true,
            status: "Active",
            since: m.since || "Jan 2022"
          };
        }
      });
      this.merchants = Object.values(uniqueMerchantsMap);
      localStorage.setItem("ao_marketplace_merchants", JSON.stringify(this.merchants));
    }

    // 2. Load products and synchronize verification state
    const savedProducts = localStorage.getItem("ao_marketplace_products");
    if (savedProducts) {
      const parsed = JSON.parse(savedProducts);
      // Synchronize verification state with merchants roster
      parsed.forEach(p => {
        if (p.merchant) {
          const m = this.merchants.find(x => x.shopName === p.merchant.shopName);
          p.merchant.verified = m ? m.verified : true;
        }
      });
      const hasEpcProducts = parsed.some(p => p.id && p.id.startsWith("prod-epc-"));
      if (hasEpcProducts) {
        this.products = parsed;
      } else {
        const epcProducts = DEFAULT_PRODUCTS.filter(p => p.id && p.id.startsWith("prod-epc-"));
        this.products = [...parsed, ...epcProducts];
        this.products.forEach(p => {
          if (p.merchant) {
            const m = this.merchants.find(x => x.shopName === p.merchant.shopName);
            p.merchant.verified = m ? m.verified : true;
          }
        });
        this.saveProductsToStorage();
      }
    } else {
      this.products = [...DEFAULT_PRODUCTS];
      this.products.forEach(p => {
        if (p.merchant) {
          const m = this.merchants.find(x => x.shopName === p.merchant.shopName);
          p.merchant.verified = m ? m.verified : true;
        }
      });
      this.saveProductsToStorage();
    }

    const savedAuth = localStorage.getItem("ao_merchant_logged_in");
    const savedProfile = localStorage.getItem("ao_merchant_profile");
    const savedAdminAuth = localStorage.getItem("ao_admin_logged_in");
    const savedCustomerAuth = localStorage.getItem("ao_customer_logged_in");
    const jwtToken = localStorage.getItem("ao_jwt_token");
    
    if (savedAdminAuth === "true") {
      this.isAdminLoggedIn = true;
      this.isMerchantLoggedIn = false;
      this.isCustomerLoggedIn = false;
      this.currentView = "storefront";
    } else if (savedAuth === "true" && savedProfile) {
      this.isMerchantLoggedIn = true;
      this.isAdminLoggedIn = false;
      this.isCustomerLoggedIn = false;
      try { this.merchantProfile = JSON.parse(savedProfile); } catch (e) {}
      this.currentView = "storefront";
    } else if (savedCustomerAuth === "true") {
      this.isCustomerLoggedIn = true;
      this.isMerchantLoggedIn = false;
      this.isAdminLoggedIn = false;
      this.currentView = "storefront";
    }

    // Verify session with Neon backend if JWT token exists
    if (jwtToken) {
      fetch("http://localhost:3001/api/auth/me", {
        headers: { "Authorization": `Bearer ${jwtToken}` }
      })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.user) {
          if (data.user.role === "admin") {
            this.isAdminLoggedIn = true;
            this.isMerchantLoggedIn = false;
            this.isCustomerLoggedIn = false;
          } else if (data.user.role === "merchant") {
            this.isMerchantLoggedIn = true;
            this.isAdminLoggedIn = false;
            this.isCustomerLoggedIn = false;
            if (data.merchantProfile) {
              this.merchantProfile = data.merchantProfile;
              localStorage.setItem("ao_merchant_profile", JSON.stringify(this.merchantProfile));
            }
          } else {
            this.isCustomerLoggedIn = true;
            this.isMerchantLoggedIn = false;
            this.isAdminLoggedIn = false;
          }
          this.updatePortalButtonState();
        }
      })
      .catch(() => {/* Offline fallback */});
    }

    // Load custom settings
    const savedPremod = localStorage.getItem("ao_admin_premoderation");
    this.premoderation = savedPremod === "true";

    this.announcement = JSON.parse(localStorage.getItem("ao_global_announcement")) || {
      visible: true,
      text: "Install ABBOSSEY OKAI MAGAZINE on your home screen for quick offline access!",
      showInstallBtn: true
    };

    this.brands = JSON.parse(localStorage.getItem("ao_brands_list")) || ["Toyota", "Honda", "Nissan", "Hyundai", "Kia", "Ford", "BMW", "Mercedes", "Lexus", "Mitsubishi", "Suzuki", "Volkswagen", "Land Rover", "Audi", "Akebono", "Denso", "KYB", "Bosch", "Brembo", "Valvoline"];
    this.adminListingsFilter = "all";
    this.syncCategoryUpgrades();
  }

  syncCategoryUpgrades() {
    // 1. Ensure all new categories are in SPARE_PART_CATEGORIES & localStorage
    const newCats = [
      "Tires & Wheels", "Batteries", "Engine Oil", "Brake System", "Lighting",
      "Suspension", "Filters", "Radiator", "Shock Absorbers", "Ball Joints",
      "Steering Wheel", "Wipers", "Condenser"
    ];
    let updatedCats = false;
    newCats.forEach(c => {
      if (!SPARE_PART_CATEGORIES.includes(c)) {
        SPARE_PART_CATEGORIES.push(c);
        updatedCats = true;
      }
    });
    if (updatedCats) {
      localStorage.setItem("ao_parts_categories", JSON.stringify(SPARE_PART_CATEGORIES));
    }

    // 2. Ensure new default products are added if not present
    const newProductsToAdd = [
      {
        id: "prod-9",
        mainType: "parts",
        name: "Front Lower Ball Joint Kit",
        brand: "Moog",
        category: "Ball Joints",
        condition: "New",
        price: 450,
        stock: "In Stock",
        status: "Live",
        views: 89,
        images: [],
        compatibility: [
          { make: "Toyota", model: "Corolla", years: "2012-2020" },
          { make: "Honda", model: "Civic", years: "2013-2021" }
        ],
        merchant: {
          shopName: "Kofi Auto Spares",
          phone: "+233240123456",
          location: "Stall A12, Section 3, Abossey Okai",
          coordinates: "5.5562, -0.2284",
          verified: true,
          since: "Jan 2022"
        },
        description: "Premium heavy-duty ball joints from Moog. Built with hardened steel and greasable design for long-lasting durability and smooth steering response."
      },
      {
        id: "prod-10",
        mainType: "parts",
        name: "Premium All-Season Windshield Wipers (Pair)",
        brand: "Bosch ICON",
        category: "Wipers",
        condition: "New",
        price: 180,
        stock: "In Stock",
        status: "Live",
        views: 124,
        images: [],
        compatibility: "Universal Fit",
        merchant: {
          shopName: "Electricals Junction Store",
          phone: "+233551234567",
          location: "Stall D45, Electricals Lane, Abossey Okai",
          coordinates: "5.5570, -0.2275",
          verified: false,
          since: "Nov 2024"
        },
        description: "Bosch ICON beam wiper blades with clearmax 365 rubber technology. Provides clean, streak-free visibility under all weather conditions."
      },
      {
        id: "prod-11",
        mainType: "parts",
        name: "A/C Condenser Assembly",
        brand: "Denso",
        category: "Condenser",
        condition: "New",
        price: 950,
        stock: "In Stock",
        status: "Live",
        views: 56,
        images: [],
        compatibility: [
          { make: "Hyundai", model: "Elantra", years: "2016-2022" },
          { make: "Kia", model: "Cerato", years: "2017-2023" }
        ],
        merchant: {
          shopName: "Ofori Cooling Systems",
          phone: "+233243332221",
          location: "Stall F5, Radiator Lane, Abossey Okai",
          coordinates: "5.5559, -0.2280",
          verified: true,
          since: "Sep 2020"
        },
        description: "Original Denso replacement A/C condenser. Manufactured with premium aluminum construction for efficient heat transfer and optimal cooling system performance."
      }
    ];

    let updatedProducts = false;
    newProductsToAdd.forEach(np => {
      if (!this.products.some(p => p.id === np.id)) {
        this.products.push(np);
        updatedProducts = true;
      }
    });

    // 3. Upgrade categories for existing seed products in the active products list
    this.products.forEach(p => {
      if (p.id === "prod-2" && p.category !== "Shock Absorbers") {
        p.category = "Shock Absorbers";
        updatedProducts = true;
      }
      if (p.id === "prod-8" && p.category !== "Radiator") {
        p.category = "Radiator";
        updatedProducts = true;
      }
      if (p.id === "prod-epc-5" && p.category !== "Steering Wheel") {
        p.category = "Steering Wheel";
        updatedProducts = true;
      }
    });

    if (updatedProducts) {
      this.saveProductsToStorage();
    }
  }

  saveProductsToStorage() {
    localStorage.setItem("ao_marketplace_products", JSON.stringify(this.products));
  }

  saveMerchantProfileToStorage() {
    localStorage.setItem("ao_merchant_profile", JSON.stringify(this.merchantProfile));
    localStorage.setItem("ao_merchant_logged_in", this.isMerchantLoggedIn ? "true" : "false");
    localStorage.setItem("ao_admin_logged_in", this.isAdminLoggedIn ? "true" : "false");
    localStorage.setItem("ao_customer_logged_in", this.isCustomerLoggedIn ? "true" : "false");
  }

  setupPwaEvents() {
    // Service Worker registration
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js")
          .then(reg => console.log("Service Worker registered successfully:", reg.scope))
          .catch(err => console.error("Service Worker registration failed:", err));
      });
    }

    // PWA Install trigger banner
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.renderAnnouncementBanner();
    });

    const installBtn = document.getElementById("pwa-install-btn");
    if (installBtn) {
      installBtn.addEventListener("click", () => {
        if (!this.deferredPrompt) return;
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the install prompt");
          }
          this.deferredPrompt = null;
          this.renderAnnouncementBanner();
        });
      });
    }
  }

  renderAnnouncementBanner() {
    const banner = document.getElementById("pwa-banner");
    const textEl = banner ? banner.querySelector(".pwa-install-text") : null;
    const installBtn = document.getElementById("pwa-install-btn");
    
    if (banner) {
      if (this.announcement.visible) {
        banner.style.display = "flex";
        if (textEl) {
          textEl.innerHTML = `<i class="fa-solid fa-bullhorn"></i> ` + this.announcement.text;
        }
        if (installBtn) {
          installBtn.style.display = (this.deferredPrompt && this.announcement.showInstallBtn) ? "inline-block" : "none";
        }
      } else {
        banner.style.display = "none";
      }
    }
  }

  setupClickTracking() {
    document.body.addEventListener("click", (e) => {
      // 1. WhatsApp Clicks
      const waBtn = e.target.closest('a[href*="whatsapp.com/send"]');
      if (waBtn) {
        const count = parseInt(localStorage.getItem("ao_lead_whatsapp") || "0") + 1;
        localStorage.setItem("ao_lead_whatsapp", count.toString());
        if (this.isAdminLoggedIn) this.renderAdminOverview();
      }

      // 2. Google Maps Clicks
      const mapBtn = e.target.closest('a[href*="google.com/maps"]') || e.target.closest('a[href*="maps.google.com"]');
      if (mapBtn) {
        const count = parseInt(localStorage.getItem("ao_lead_maps") || "0") + 1;
        localStorage.setItem("ao_lead_maps", count.toString());
        if (this.isAdminLoggedIn) this.renderAdminOverview();
      }
    });
  }

  bindDomElements() {
    // Navigation toggle menu for mobile
    const toggleBtn = document.getElementById("mobile-menu-toggle");
    const mainHeader = document.getElementById("main-header");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        mainHeader.classList.toggle("menu-open");
      });
    }

    // Auto-close menu on link click
    document.querySelectorAll("#main-nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        mainHeader.classList.remove("menu-open");
      });
    });

    // Main search input event listener
    const searchInput = document.getElementById("main-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => this.handleSearchInput(e));
      searchInput.addEventListener("focus", () => this.showAutocompleteIfPossible());
      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this.toggleSearchModal(false);
          this.scrollToMarketplace();
        }
      });
      
      // Close autocomplete on click outside
      document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !document.getElementById("search-autocomplete-dropdown").contains(e.target)) {
          document.getElementById("search-autocomplete-dropdown").style.display = "none";
        }
      });
    }

    // Update portal button text based on status
    this.updatePortalButtonState();
  }

  populateSelectOptions() {
    const makeSelect = document.getElementById("select-vehicle-make");
    const categorySelect = document.getElementById("select-parts-category");
    
    // For listing forms
    const formMakeSelect = document.getElementById("form-fitment-make");

    if (makeSelect) {
      makeSelect.innerHTML = '<option value="">All Brands</option>';
      Object.keys(VEHICLE_TAXONOMY).forEach(make => {
        makeSelect.innerHTML += `<option value="${make}">${make}</option>`;
      });
    }

    if (formMakeSelect) {
      formMakeSelect.innerHTML = '<option value="">Select Brand</option>';
      Object.keys(VEHICLE_TAXONOMY).forEach(make => {
        formMakeSelect.innerHTML += `<option value="${make}">${make}</option>`;
      });
    }

    if (categorySelect) {
      categorySelect.innerHTML = '<option value="">All Categories</option>';
      SPARE_PART_CATEGORIES.forEach(cat => {
        categorySelect.innerHTML += `<option value="${cat}">${cat}</option>`;
      });
    }
  }

  // Dual-mode Hero Search Switcher
  setSearchMode(mode) {
    this.searchMode = mode;
    
    const partsTab = document.getElementById("tab-mode-parts");
    const accTab = document.getElementById("tab-mode-accessories");
    const partsFilters = document.getElementById("mode-parts-filters");
    const accFilters = document.getElementById("mode-accessories-filters");
    const searchInput = document.getElementById("main-search-input");

    if (mode === "parts") {
      partsTab.classList.add("active");
      accTab.classList.remove("active");
      partsFilters.style.display = "grid";
      accFilters.style.display = "none";
      searchInput.placeholder = "Search by part name, brand, e.g. 'Brake Pads Toyota'...";
    } else {
      partsTab.classList.remove("active");
      accTab.classList.add("active");
      partsFilters.style.display = "none";
      accFilters.style.display = "grid";
      searchInput.placeholder = "Search accessories, e.g. 'Car cover waterproof', 'Pioneer'...";
    }
    
    this.selectedAccessoryCat = null;
    document.querySelectorAll(".accessory-cat-card").forEach(c => c.classList.remove("active"));
  }

  // Populate models dropdown
  onMakeChange() {
    const makeSelect = document.getElementById("select-vehicle-make");
    const modelSelect = document.getElementById("select-vehicle-model");
    const yearSelect = document.getElementById("select-vehicle-year");
    const selectedMake = makeSelect.value;

    if (!selectedMake) {
      modelSelect.value = "";
      modelSelect.disabled = true;
      yearSelect.value = "";
      yearSelect.disabled = true;
      return;
    }

    modelSelect.disabled = false;
    modelSelect.innerHTML = '<option value="">All Models</option>';
    VEHICLE_TAXONOMY[selectedMake].models.forEach(model => {
      modelSelect.innerHTML += `<option value="${model}">${model}</option>`;
    });

    yearSelect.value = "";
    yearSelect.disabled = true;
  }

  onModelChange() {
    const makeSelect = document.getElementById("select-vehicle-make");
    const modelSelect = document.getElementById("select-vehicle-model");
    const yearSelect = document.getElementById("select-vehicle-year");
    
    const selectedMake = makeSelect.value;
    const selectedModel = modelSelect.value;

    if (!selectedModel) {
      yearSelect.value = "";
      yearSelect.disabled = true;
      return;
    }

    yearSelect.disabled = false;
    yearSelect.innerHTML = '<option value="">All Years</option>';
    VEHICLE_TAXONOMY[selectedMake].years.forEach(year => {
      yearSelect.innerHTML += `<option value="${year}">${year}</option>`;
    });
  }

  // Populate models inside new product creation form
  onFormMakeChange() {
    const makeSelect = document.getElementById("form-fitment-make");
    const modelSelect = document.getElementById("form-fitment-model");
    const selectedMake = makeSelect.value;

    if (!selectedMake) {
      modelSelect.value = "";
      modelSelect.disabled = true;
      return;
    }

    modelSelect.disabled = false;
    modelSelect.innerHTML = '<option value="">Select Model</option>';
    VEHICLE_TAXONOMY[selectedMake].models.forEach(model => {
      modelSelect.innerHTML += `<option value="${model}">${model}</option>`;
    });
  }

  // Apply selectors from spare parts finder widget
  applyVehicleSearch() {
    const make = document.getElementById("select-vehicle-make").value;
    const model = document.getElementById("select-vehicle-model").value;
    const year = document.getElementById("select-vehicle-year").value;
    const cat = document.getElementById("select-parts-category").value;

    this.activeMainType = "parts";
    
    // Update navbar buttons states
    document.getElementById("nav-parts").classList.add("active");
    document.getElementById("nav-accessories").classList.remove("active");

    // Apply strict filtering values
    this.activeFilters.make = make;
    this.activeFilters.model = model;
    this.activeFilters.year = year;
    this.activeFilters.partsCategory = cat;

    this.renderCatalog();
    this.scrollToMarketplace();
    this.toggleSearchModal(false);
    this.showToast("Filtered catalog by vehicle fitment successfully!", "success");
  }

  // Apply category from accessories quick grid
  selectAccessoryCategory(cat, element) {
    this.activeMainType = "accessories";
    this.selectedAccessoryCat = cat;
    
    document.getElementById("nav-parts").classList.remove("active");
    document.getElementById("nav-accessories").classList.add("active");

    document.querySelectorAll(".accessory-cat-card").forEach(c => c.classList.remove("active"));
    if (element) element.classList.add("active");

    this.activeFilters.accessoryCategory = cat;
    this.renderCatalog();
    this.scrollToMarketplace();
    this.toggleSearchModal(false);
  }

  // Global search autocomplete system
  handleSearchInput(e) {
    this.searchQuery = e.target.value.toLowerCase().trim();
    this.showAutocompleteIfPossible();
    
    // Instantly filter main catalog as they type
    this.renderCatalog();
  }

  showAutocompleteIfPossible() {
    const dropdown = document.getElementById("search-autocomplete-dropdown");
    if (!this.searchQuery) {
      dropdown.style.display = "none";
      return;
    }

    // Filter matching parts/accessories names or compatibility matching
    const matches = this.products.filter(p => {
      const matchName = p.name.toLowerCase().includes(this.searchQuery);
      const matchBrand = p.brand.toLowerCase().includes(this.searchQuery);
      const matchCat = p.category.toLowerCase().includes(this.searchQuery);
      let matchVehicle = false;
      if (Array.isArray(p.compatibility)) {
        matchVehicle = p.compatibility.some(c => 
          c.make.toLowerCase().includes(this.searchQuery) || 
          c.model.toLowerCase().includes(this.searchQuery)
        );
      }
      return p.status === "Live" && (matchName || matchBrand || matchCat || matchVehicle);
    }).slice(0, 6);

    if (matches.length === 0) {
      dropdown.style.display = "none";
      return;
    }

    dropdown.innerHTML = "";
    matches.forEach(p => {
      const item = document.createElement("div");
      item.className = "autocomplete-item";
      item.innerHTML = `
        <span class="autocomplete-item-text">${p.name} <small style="color:var(--text-muted);">(${p.brand})</small></span>
        <span class="autocomplete-item-sub">${p.mainType === "parts" ? "Spare Part" : "Accessory"}</span>
      `;
      item.addEventListener("click", () => {
        dropdown.style.display = "none";
        document.getElementById("main-search-input").value = p.name;
        this.searchQuery = p.name.toLowerCase();
        this.renderCatalog();
        this.openPdp(p.id);
        this.toggleSearchModal(false);
      });
      dropdown.appendChild(item);
    });

    dropdown.style.display = "block";
  }

  // Sidebar Filter checks & controls
  onFilterChange() {
    // Retrieve Conditions
    const checkedConditions = Array.from(document.querySelectorAll(".condition-filter-checkbox:checked")).map(el => el.value);
    this.activeFilters.conditions = checkedConditions;

    // Retrieve Prices
    const minPrice = document.getElementById("price-min").value;
    const maxPrice = document.getElementById("price-max").value;
    this.activeFilters.priceMin = minPrice ? parseFloat(minPrice) : null;
    this.activeFilters.priceMax = maxPrice ? parseFloat(maxPrice) : null;

    // Retrieve Merchant types
    const merchantTypes = Array.from(document.querySelectorAll(".merchant-type-filter:checked")).map(el => el.value);
    this.activeFilters.merchantTypes = merchantTypes;

    // Retrieve Brand checkboxes
    const brands = Array.from(document.querySelectorAll(".brand-filter-checkbox:checked")).map(el => el.value);
    this.activeFilters.brands = brands;

    this.renderCatalog();
  }

  resetAllFilters() {
    document.querySelectorAll(".condition-filter-checkbox, .merchant-type-filter, .brand-filter-checkbox").forEach(cb => cb.checked = false);
    document.getElementById("price-min").value = "";
    document.getElementById("price-max").value = "";
    
    // Clear hero search filters also
    document.getElementById("select-vehicle-make").value = "";
    document.getElementById("select-vehicle-model").value = "";
    document.getElementById("select-vehicle-model").disabled = true;
    document.getElementById("select-vehicle-year").value = "";
    document.getElementById("select-vehicle-year").disabled = true;
    document.getElementById("select-parts-category").value = "";
    document.getElementById("main-search-input").value = "";
    
    document.querySelectorAll(".accessory-cat-card").forEach(c => c.classList.remove("active"));
    
    this.searchQuery = "";
    this.activeMainType = "all";
    this.selectedAccessoryCat = null;
    
    document.getElementById("nav-parts").classList.remove("active");
    document.getElementById("nav-accessories").classList.remove("active");

    this.activeFilters = {
      conditions: [],
      priceMin: null,
      priceMax: null,
      merchantTypes: [],
      brands: []
    };

    this.renderCatalog();
    this.showToast("All marketplace filters reset", "success");
  }

  filterByMainType(type) {
    this.activeMainType = type;
    this.selectedAccessoryCat = null;
    this.searchQuery = "";
    document.getElementById("main-search-input").value = "";
    
    const partsNav = document.getElementById("nav-parts");
    const accNav = document.getElementById("nav-accessories");

    if (type === "parts") {
      partsNav.classList.add("active");
      accNav.classList.remove("active");
      this.setSearchMode("parts");
    } else if (type === "accessories") {
      partsNav.classList.remove("active");
      accNav.classList.add("active");
      this.setSearchMode("accessories");
    } else {
      partsNav.classList.remove("active");
      accNav.classList.remove("active");
    }

    // Scroll to products and render
    this.renderCatalog();
    this.scrollToMarketplace();
  }

  // Filter catalog by a specific part category (from Shop by Category strip)
  filterByCategory(category) {
    this.activeMainType = "parts";
    this.activeFilters.partsCategory = category;
    this.searchQuery = "";

    const partsNav = document.getElementById("nav-parts");
    const accNav = document.getElementById("nav-accessories");
    if (partsNav) partsNav.classList.add("active");
    if (accNav) accNav.classList.remove("active");

    this.renderCatalog();
    this.scrollToMarketplace();
    this.showToast(`Showing "${category}" parts`, "success");
  }

  // Filter catalog by a specific brand (from Shop by Brand strip)
  filterByBrand(brand) {
    this.toggleBrandSearchModal(true, brand);
  }

  // Populate dynamic brands on filter block
  renderBrandFilters() {
    const list = document.getElementById("brand-filter-list");
    if (!list) return;

    const brands = [
      "Toyota", "Volkswagen", "Hyundai", "Ford", "Honda", 
      "Nissan", "Chevrolet", "Kia", "Suzuki", "Mercedes-Benz", 
      "BMW", "Audi", "Mazda", "Mitsubishi", "BYD"
    ];
    list.innerHTML = "";
    
    brands.forEach((brand, idx) => {
      const label = document.createElement("label");
      label.className = "filter-checkbox-label";
      label.innerHTML = `
        <input type="checkbox" class="brand-filter-checkbox" value="${brand}" onchange="app.onFilterChange()"> ${brand}
      `;
      list.appendChild(label);
    });
  }

  onSortChange() {
    this.sortOption = document.getElementById("catalog-sort-select").value;
    this.renderCatalog();
  }

  // Core filter application and rendering
  renderCatalog() {
    const container = document.getElementById("catalog-products-container");
    if (!container) return;

    // Filter database
    let filtered = this.products.filter(p => {
      // Must be live listing to display on public storefront
      if (p.status !== "Live") return false;

      // Filter by Spare parts / accessories view
      if (this.activeMainType === "parts" && p.mainType !== "parts") return false;
      if (this.activeMainType === "accessories" && p.mainType !== "accessories") return false;

      // Filter by vehicle selector parameters (Mode A parts)
      if (this.activeMainType === "parts" && this.activeFilters.make) {
        if (!Array.isArray(p.compatibility)) return false;
        const fits = p.compatibility.some(c => {
          const makeMatch = c.make === this.activeFilters.make;
          const modelMatch = !this.activeFilters.model || c.model === this.activeFilters.model;
          
          let yearMatch = true;
          if (this.activeFilters.year) {
            const range = c.years.split("-");
            if (range.length === 1) {
              yearMatch = range[0] === this.activeFilters.year;
            } else {
              const start = parseInt(range[0]);
              const end = parseInt(range[1]);
              const target = parseInt(this.activeFilters.year);
              yearMatch = target >= start && target <= end;
            }
          }
          return makeMatch && modelMatch && yearMatch;
        });
        if (!fits) return false;
      }

      if (this.activeMainType === "parts" && this.activeFilters.partsCategory) {
        if (p.category !== this.activeFilters.partsCategory) return false;
      }

      // Filter by accessory selection parameters (Mode B accessories)
      if (this.activeMainType === "accessories" && this.activeFilters.accessoryCategory) {
        if (p.category !== this.activeFilters.accessoryCategory) return false;
      }

      // Filter by Search text query
      if (this.searchQuery) {
        const text = `${p.name} ${p.brand} ${p.category} ${p.description}`.toLowerCase();
        let compatibilityText = "";
        if (Array.isArray(p.compatibility)) {
          compatibilityText = p.compatibility.map(c => `${c.make} ${c.model}`).join(" ").toLowerCase();
        } else {
          compatibilityText = "universal";
        }
        if (!text.includes(this.searchQuery) && !compatibilityText.includes(this.searchQuery)) return false;
      }

      // Advanced filters (Conditions)
      if (this.activeFilters.conditions.length > 0 && !this.activeFilters.conditions.includes(p.condition)) return false;

      // Advanced filters (Price)
      if (this.activeFilters.priceMin !== null && p.price < this.activeFilters.priceMin) return false;
      if (this.activeFilters.priceMax !== null && p.price > this.activeFilters.priceMax) return false;

      // Advanced filters (Merchant Types)
      if (this.activeFilters.merchantTypes.length > 0) {
        const isVerified = p.merchant.verified;
        const matchesVerified = this.activeFilters.merchantTypes.includes("Verified") && isVerified;
        const matchesIndependent = this.activeFilters.merchantTypes.includes("Independent") && !isVerified;
        if (!matchesVerified && !matchesIndependent) return false;
      }

      // Advanced filters (Brands/Makes)
      if (this.activeFilters.brands.length > 0) {
        const matchesBrand = this.activeFilters.brands.includes(p.brand) || 
                             (Array.isArray(p.compatibility) && p.compatibility.some(c => this.activeFilters.brands.includes(c.make))) || 
                             p.compatibility === "Universal Fit";
        if (!matchesBrand) return false;
      }

      return true;
    });

    // Apply Sorting logic
    if (this.sortOption === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (this.sortOption === "newest") {
      // Simulating newest using indices/IDs
      filtered.sort((a, b) => b.id.localeCompare(a.id));
    } else {
      // Default Popular (Verified first, in-stock first)
      filtered.sort((a, b) => {
        if (a.stock === "In Stock" && b.stock !== "In Stock") return -1;
        if (a.stock !== "In Stock" && b.stock === "In Stock") return 1;
        if (a.merchant.verified && !b.merchant.verified) return -1;
        if (!a.merchant.verified && b.merchant.verified) return 1;
        return 0;
      });
    }

    // Render count
    document.getElementById("catalog-results-count").textContent = `Showing ${filtered.length} product${filtered.length === 1 ? "" : "s"}`;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-catalog" id="catalog-empty-view">
          <span class="empty-icon"><i class="fa-solid fa-face-frown"></i></span>
          <h3>No Listings Found</h3>
          <p>Try modifying your advanced search inputs or clearing the active filters.</p>
          <button class="btn btn-secondary" onclick="app.resetAllFilters()">Reset Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = "";
    filtered.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.id = `card-${p.id}`;
      card.setAttribute("onclick", `app.openPdp('${p.id}')`);
      
      const conditionClass = p.condition === "New" ? "badge-new" : (p.condition === "Used" ? "badge-used" : "badge-refurbished");
      const stockClass = p.stock === "In Stock" ? "badge-instock" : "badge-oos";
      const dealerBadge = p.merchant.verified 
        ? `<span class="verified-dealer-tag" id="verified-card-${p.id}"><i class="fa-solid fa-circle-check"></i> Verified Dealer</span>` 
        : "";

      // Compatibility subtitle rendering
      let compatibilityLabel = "";
      if (Array.isArray(p.compatibility)) {
        compatibilityLabel = p.compatibility.map(c => `${c.make} ${c.model}`).join(", ");
      } else {
        compatibilityLabel = p.compatibility;
      }

      // Check if image exists
      let imgTag = "";
      if (p.images && p.images.length > 0) {
        imgTag = `<img src="${p.images[0]}" alt="${p.name}" loading="lazy">`;
      } else {
        imgTag = `
          <div class="card-image-fallback">
            <span class="card-fallback-icon">${p.mainType === 'parts' ? '⚙️' : '🔌'}</span>
            <span style="font-size:0.75rem; font-weight:600; text-transform:uppercase;">${p.brand}</span>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="product-card-img">
          ${imgTag}
          <div class="product-card-badges">
            <span class="badge ${conditionClass}">${p.condition}</span>
            <span class="badge ${stockClass}">${p.stock}</span>
          </div>
        </div>
        <div class="product-card-body">
          <span class="product-card-category">${p.category}</span>
          <h4 class="product-card-name" title="${p.name}">${p.name}</h4>
          <span class="product-card-compatibility" title="${compatibilityLabel}">
            <i class="fa-solid fa-car"></i> ${compatibilityLabel}
          </span>
          <div class="product-card-footer">
            <div class="product-card-price">
              <span class="price-currency">GHS</span>
              <span class="price-value">₵${p.price}</span>
            </div>
            ${dealerBadge}
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Smooth scrolls
  scrollToMarketplace() {
    const section = document.getElementById("marketplace-grid-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Toggle Filters sidebar on mobile
  toggleMobileFilters(show) {
    const sidebar = document.getElementById("advanced-filters-sidebar");
    const closeBtn = document.getElementById("sidebar-close-mobile");
    if (!sidebar) return;

    if (show) {
      sidebar.style.display = "block";
      if (closeBtn) closeBtn.style.display = "block";
    } else {
      sidebar.style.display = "none";
      if (closeBtn) closeBtn.style.display = "none";
    }
  }

  // FAQ Expand toggle
  toggleFaq(index) {
    const faqItem = document.getElementById(`faq-item-${index}`);
    const faqContent = document.getElementById(`faq-content-${index}`);
    if (!faqItem || !faqContent) return;

    const isActive = faqItem.classList.contains("active");
    
    // Close other faqs first
    document.querySelectorAll(".faq-item").forEach(item => {
      item.classList.remove("active");
      const content = item.querySelector(".faq-content");
      if (content) content.style.display = "none";
    });

    if (!isActive) {
      faqItem.classList.add("active");
      faqContent.style.display = "block";
    }
  }

  // PDP Opening Details Overlay
  openPdp(id) {
    const p = this.products.find(item => item.id === id);
    if (!p) return;

    this.activePdpProduct = p;
    this.activePdpImageIndex = 0;

    // Set textual properties
    document.getElementById("pdp-title-text").textContent = p.name;
    document.getElementById("pdp-category-text").textContent = p.category;
    document.getElementById("pdp-price-text").textContent = `₵${p.price}.00`;
    
    // Condition Badges
    const conditionBadge = document.getElementById("pdp-badge-condition");
    conditionBadge.className = "badge " + (p.condition === "New" ? "badge-new" : (p.condition === "Used" ? "badge-used" : "badge-refurbished"));
    conditionBadge.textContent = p.condition;

    // Stock Badges
    const stockBadge = document.getElementById("pdp-badge-stock");
    stockBadge.className = "badge " + (p.stock === "In Stock" ? "badge-instock" : "badge-oos");
    stockBadge.textContent = p.stock;

    // Compatibility
    const fitmentList = document.getElementById("pdp-fitment-list");
    fitmentList.innerHTML = "";
    if (Array.isArray(p.compatibility)) {
      p.compatibility.forEach(c => {
        fitmentList.innerHTML += `<span class="compatibility-item">${c.make} ${c.model} (${c.years})</span>`;
      });
    } else {
      fitmentList.innerHTML = `<span class="compatibility-item" style="background-color: #ECEFEE; color: #1E6B54; border: 1px solid rgba(30,107,84,0.15); font-weight:700;"><i class="fa-solid fa-circle-check"></i> Universal Fit</span>`;
    }

    // Dealer profile card mapping
    document.getElementById("pdp-merchant-avatar").textContent = p.merchant.shopName.charAt(0).toUpperCase();
    document.getElementById("pdp-merchant-name").textContent = p.merchant.shopName;
    document.getElementById("pdp-merchant-since").textContent = `Member since ${p.merchant.since || '2024'}`;
    document.getElementById("pdp-merchant-location").querySelector("span").textContent = p.merchant.location;

    // Verified badge
    const verifiedBadge = document.getElementById("pdp-merchant-verified-badge");
    verifiedBadge.style.display = p.merchant.verified ? "inline-flex" : "none";

    // Set Gallery Images
    this.renderPdpGallery();

    // Show dynamic details sheet overlay modal
    document.getElementById("pdp-overlay-modal").style.display = "flex";
    document.body.style.overflow = "hidden"; // Disable body scrolls
  }

  closePdp() {
    document.getElementById("pdp-overlay-modal").style.display = "none";
    document.body.style.overflow = ""; // Enable body scrolls
    this.activePdpProduct = null;
  }

  renderPdpGallery() {
    const mainContainer = document.getElementById("pdp-gallery-main");
    const thumbContainer = document.getElementById("pdp-gallery-thumbnails");
    const p = this.activePdpProduct;

    // Define images to use. If empty, generate 5 mock detailed images
    let images = p.images;
    if (!images || images.length === 0) {
      images = [
        "mock_main_details",
        "mock_details_side",
        "mock_details_back",
        "mock_details_specs",
        "mock_details_box"
      ];
    }

    // Main PDP image load
    const activeImageSrc = images[this.activePdpImageIndex];
    if (activeImageSrc.startsWith("mock_") || activeImageSrc.startsWith("data:")) {
      if (activeImageSrc.startsWith("data:")) {
        mainContainer.innerHTML = `<img src="${activeImageSrc}" alt="${p.name}">`;
      } else {
        mainContainer.innerHTML = `
          <div class="card-image-fallback" style="height: 100%;">
            <span class="card-fallback-icon" style="font-size:4.5rem;">${p.mainType === 'parts' ? '⚙️' : '🔌'}</span>
            <span style="font-size:0.95rem; font-weight:700; text-transform:uppercase; color:var(--text-muted);">${activeImageSrc.replace("mock_", "").replace("_", " ")} view</span>
            <span style="font-size:0.85rem; font-weight:600; color:var(--primary-color);">${p.brand} OEM Part</span>
          </div>
        `;
      }
    } else {
      mainContainer.innerHTML = `<img src="${activeImageSrc}" alt="${p.name}">`;
    }

    // Thumbnails rendering
    thumbContainer.innerHTML = "";
    images.forEach((img, idx) => {
      const thumb = document.createElement("div");
      thumb.className = `pdp-thumbnail ${idx === this.activePdpImageIndex ? "active" : ""}`;
      thumb.id = `pdp-thumb-${idx}`;
      
      if (img.startsWith("mock_") || img.startsWith("data:")) {
        if (img.startsWith("data:")) {
          thumb.innerHTML = `<img src="${img}" alt="Thumb">`;
        } else {
          thumb.innerHTML = `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#F1F5F9; font-size:0.8rem; font-weight:700; color:var(--text-muted);">
              IMG ${idx+1}
            </div>
          `;
        }
      } else {
        thumb.innerHTML = `<img src="${img}" alt="Thumb">`;
      }

      thumb.addEventListener("click", () => {
        this.activePdpImageIndex = idx;
        this.renderPdpGallery();
      });
      thumbContainer.appendChild(thumb);
    });
  }

  // Communications integrations
  contactMerchantWhatsApp() {
    const p = this.activePdpProduct;
    if (!p) return;

    const phone = p.merchant.phone;
    const shopName = p.merchant.shopName;
    const prodName = p.name;
    const price = p.price;

    const templateText = `Hello ${shopName}, I am interested in your listing: ${prodName} priced at ${price} GHS on Abossey Okai Marketplace.`;
    const encodedText = encodeURIComponent(templateText);
    
    // Construct WhatsApp Deep link API
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9+]/g, "")}?text=${encodedText}`;
    
    // Visual indicators
    this.showToast(`Deep-linking to WhatsApp of ${shopName}...`, "success");
    window.open(whatsappUrl, "_blank");
  }

  locateMerchantShop() {
    const p = this.activePdpProduct;
    if (!p) return;

    const coords = p.merchant.coordinates;
    const shopName = p.merchant.shopName;

    // Google Maps link constructor
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${coords}`;
    
    this.showToast(`Opening shop location of ${shopName} in Google Maps...`, "success");
    window.open(mapsUrl, "_blank");
  }

  reportListing() {
    if (!this.activePdpProduct) return;
    
    const savedReports = localStorage.getItem("ao_reported_listings");
    const reports = savedReports ? JSON.parse(savedReports) : [];
    
    const newReport = {
      id: "rep-" + Date.now(),
      productId: this.activePdpProduct.id,
      productName: this.activePdpProduct.name,
      shopName: this.activePdpProduct.merchant.shopName,
      reason: "Reported by customer for verification",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    };
    
    reports.push(newReport);
    localStorage.setItem("ao_reported_listings", JSON.stringify(reports));
    
    this.showToast("Listing reported! Our administrators will verify this dealer's product shortly.", "success");
    this.closePdp();
  }

  // Switch between public storefront and merchant dashboard views
  // Switch between public storefront and merchant dashboard views
  toggleMerchantPortal() {
    if (this.isAdminLoggedIn) {
      this.switchAppView(this.currentView === "admin-dashboard" ? "storefront" : "admin-dashboard");
    } else if (this.isMerchantLoggedIn) {
      this.switchAppView(this.currentView === "dashboard" ? "storefront" : "dashboard");
    } else if (!this.isCustomerLoggedIn) {
      this.openMerchantAuth();
    }
  }

  switchAppView(view) {
    this.currentView = view;
    const storefront = document.getElementById("storefront-view-panel");
    const dashboard = document.getElementById("merchant-dashboard-panel");
    const adminDashboard = document.getElementById("admin-dashboard-panel");
    const allBrands = document.getElementById("all-brands-view-panel");

    if (view === "dashboard") {
      storefront.style.display = "none";
      dashboard.style.display = "grid";
      if (adminDashboard) adminDashboard.style.display = "none";
      if (allBrands) allBrands.style.display = "none";
      
      // Update Dashboard view states
      this.renderMerchantProfile();
      this.renderMerchantInventory();
      this.renderMerchantMetrics();
    } else if (view === "admin-dashboard") {
      storefront.style.display = "none";
      dashboard.style.display = "none";
      if (adminDashboard) adminDashboard.style.display = "grid";
      if (allBrands) allBrands.style.display = "none";
      
      // Update Admin Dashboard view states
      this.renderAdminOverview();
    } else if (view === "all-brands") {
      storefront.style.display = "none";
      dashboard.style.display = "none";
      if (adminDashboard) adminDashboard.style.display = "none";
      if (allBrands) allBrands.style.display = "block";
      
      // Render brands list dynamic content
      this.renderBrandsView();
    } else {
      storefront.style.display = "block";
      dashboard.style.display = "none";
      if (adminDashboard) adminDashboard.style.display = "none";
      if (allBrands) allBrands.style.display = "none";
      
      // Re-populate brand catalog on exit
      this.renderBrandFilters();
      this.renderCatalog();
    }

    this.updatePortalButtonState();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    window.scrollTo(0, 0);
  }

  // Authentication Flow Simulator
  openMerchantAuth(register = false) {
    document.getElementById("auth-modal").style.display = "flex";
    this.showAuthView("initial");
  }

  closeMerchantAuth() {
    document.getElementById("auth-modal").style.display = "none";
    
    // Reset inputs
    document.getElementById("auth-phone-input").value = "";
    const smsInput = document.getElementById("auth-sms-input");
    if (smsInput) smsInput.value = "";
    const smsGroup = document.getElementById("auth-sms-code-group");
    if (smsGroup) smsGroup.style.display = "none";
    const submitBtn = document.getElementById("auth-submit-btn");
    if (submitBtn) submitBtn.textContent = "Send Verification Code";

    // Clear Google sign-in forms
    const googleEmailInput = document.getElementById("auth-google-email-input");
    if (googleEmailInput) googleEmailInput.value = "";
    const adminPassInput = document.getElementById("auth-admin-password-input");
    if (adminPassInput) adminPassInput.value = "";

    this.showAuthView("initial");
  }

  startGoogleSignIn() {
    const emailInput = document.getElementById("auth-google-email-input");
    if (emailInput) {
      emailInput.focus();
    }
  }

  showAuthView(viewName) {
    if (viewName === "google-email") {
      viewName = "initial";
    }
    const initial = document.getElementById("auth-view-initial");
    const emailView = document.getElementById("auth-view-google-email");
    const passwordView = document.getElementById("auth-view-admin-password");
    
    if (initial) initial.style.display = viewName === "initial" ? "block" : "none";
    if (emailView) emailView.style.display = "none";
    if (passwordView) passwordView.style.display = viewName === "admin-password" ? "block" : "none";
  }

  handleGoogleSSOClick() {
    this.showToast("Authenticating with Google Account...", "info");
    fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "kofi@gmail.com", password: "merchant123" })
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem("ao_jwt_token", data.token);
        if (data.user && data.user.role === "merchant") {
          this.isMerchantLoggedIn = true;
          this.isAdminLoggedIn = false;
          this.isCustomerLoggedIn = false;
          this.merchantProfile = data.merchantProfile || this.merchants[0];
          this.saveMerchantProfileToStorage();
          this.closeMerchantAuth();
          this.switchAppView("dashboard");
          this.showToast(`Logged in with Google as ${this.merchantProfile.shopName}!`, "success");
        } else {
          this.isCustomerLoggedIn = true;
          this.isMerchantLoggedIn = false;
          this.isAdminLoggedIn = false;
          this.saveMerchantProfileToStorage();
          this.closeMerchantAuth();
          this.switchAppView("storefront");
          this.showToast("Signed in with Google successfully!", "success");
        }
      }
    })
    .catch(() => {
      // Fallback
      this.isCustomerLoggedIn = true;
      this.saveMerchantProfileToStorage();
      this.closeMerchantAuth();
      this.switchAppView("storefront");
      this.showToast("Signed in with Google successfully!", "success");
    });
  }

  handleGoogleEmailSubmit(event) {
    event.preventDefault();
    const email = document.getElementById("auth-google-email-input").value.trim().toLowerCase();
    
    if (email === "korantenghenry2012@gmail.com") {
      this.showAuthView("admin-password");
      const passInput = document.getElementById("auth-admin-password-input");
      if (passInput) passInput.focus();
    } else {
      this.showToast("Authenticating with database...", "info");
      
      // Try login with backend
      fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: "merchant123" })
      })
      .then(res => res.json())
      .then(data => {
        if (data.error && data.error !== "Invalid credentials") {
          this.showToast(data.error, "error");
          return;
        }

        if (data.token) {
          localStorage.setItem("ao_jwt_token", data.token);
          if (data.user.role === "merchant" && data.merchantProfile) {
            this.isMerchantLoggedIn = true;
            this.isAdminLoggedIn = false;
            this.isCustomerLoggedIn = false;
            this.merchantProfile = data.merchantProfile;
            this.saveMerchantProfileToStorage();
            this.closeMerchantAuth();
            this.switchAppView("dashboard");
            this.showToast(`Welcome back, ${this.merchantProfile.shopName}!`, "success");
          } else {
            this.isCustomerLoggedIn = true;
            this.isMerchantLoggedIn = false;
            this.isAdminLoggedIn = false;
            this.saveMerchantProfileToStorage();
            this.closeMerchantAuth();
            this.switchAppView("storefront");
            this.showToast(`Welcome! Signed in successfully as ${email}`, "success");
          }
        } else {
          // New customer user -> Register in Neon backend
          fetch("http://localhost:3001/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password: "customer123", role: "customer" })
          })
          .then(res => res.json())
          .then(regData => {
            if (regData.token) {
              localStorage.setItem("ao_jwt_token", regData.token);
            }
            this.isCustomerLoggedIn = true;
            this.isMerchantLoggedIn = false;
            this.isAdminLoggedIn = false;
            this.saveMerchantProfileToStorage();
            this.closeMerchantAuth();
            this.switchAppView("storefront");
            this.showToast(`Welcome! Signed in successfully as ${email}`, "success");
          })
          .catch(() => {
            this.isCustomerLoggedIn = true;
            this.saveMerchantProfileToStorage();
            this.closeMerchantAuth();
            this.switchAppView("storefront");
            this.showToast(`Welcome! Signed in successfully as ${email}`, "success");
          });
        }
      })
      .catch(() => {
        // Local fallback
        const merchant = this.merchants.find(m => m.email.toLowerCase() === email);
        if (merchant) {
          this.isMerchantLoggedIn = true;
          this.merchantProfile = { ...merchant };
          this.saveMerchantProfileToStorage();
          this.closeMerchantAuth();
          this.switchAppView("dashboard");
          this.showToast(`Welcome back, ${this.merchantProfile.shopName}!`, "success");
        } else {
          this.isCustomerLoggedIn = true;
          this.saveMerchantProfileToStorage();
          this.closeMerchantAuth();
          this.switchAppView("storefront");
          this.showToast(`Welcome! Signed in successfully as ${email}`, "success");
        }
      });
    }
  }

  toggleAdminPasswordVisibility() {
    const input = document.getElementById("auth-admin-password-input");
    const icon = document.getElementById("toggle-admin-pass-btn");
    if (!input || !icon) return;

    if (input.type === "password") {
      input.type = "text";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    } else {
      input.type = "password";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    }
  }

  handleAdminPasswordSubmit(event) {
    event.preventDefault();
    const password = document.getElementById("auth-admin-password-input").value;
    
    this.showToast("Verifying admin credentials with Neon DB...", "info");

    fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "korantenghenry2012@gmail.com", password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.token && data.user && data.user.role === "admin") {
        localStorage.setItem("ao_jwt_token", data.token);
        this.isAdminLoggedIn = true;
        this.isMerchantLoggedIn = false;
        this.isCustomerLoggedIn = false;
        this.saveMerchantProfileToStorage();
        
        this.closeMerchantAuth();
        this.switchAppView("admin-dashboard");
        this.showToast("Welcome back, Administrator Kwame!", "success");
      } else {
        this.showToast("Incorrect password. Please try again.", "error");
      }
    })
    .catch(() => {
      // Fallback
      if (password === "G@laxy2012") {
        this.isAdminLoggedIn = true;
        this.saveMerchantProfileToStorage();
        this.closeMerchantAuth();
        this.switchAppView("admin-dashboard");
        this.showToast("Welcome back, Administrator Kwame!", "success");
      } else {
        this.showToast("Incorrect password. Please try again.", "error");
      }
    });
  }

  simulatePhoneAuth(event) {
    event.preventDefault();
    const phoneInput = document.getElementById("auth-phone-input").value.trim();
    const smsGroup = document.getElementById("auth-sms-code-group");
    const submitBtn = document.getElementById("auth-submit-btn");

    const cleanPhone = phoneInput.replace(/[^0-9]/g, "");

    if (smsGroup.style.display === "none") {
      // Step 1: Send SMS
      this.showToast(`SMS Verification Code sent to ${phoneInput}`, "success");
      smsGroup.style.display = "block";
      submitBtn.textContent = "Verify & Log In";
      const smsInput = document.getElementById("auth-sms-input");
      if (smsInput) {
        smsInput.required = true;
        smsInput.focus();
      }
    } else {
      // Step 2: Validate code (Accept any 4+ digit code)
      const smsCode = document.getElementById("auth-sms-input").value.trim();
      if (smsCode.length < 4) {
        this.showToast("Please enter a valid verification code.", "error");
        return;
      }

      this.showToast("Verifying code with backend...", "info");

      fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone, password: "merchant123" })
      })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem("ao_jwt_token", data.token);
          if (data.user.role === "merchant" && data.merchantProfile) {
            this.isMerchantLoggedIn = true;
            this.isAdminLoggedIn = false;
            this.isCustomerLoggedIn = false;
            this.merchantProfile = data.merchantProfile;
            this.saveMerchantProfileToStorage();
            this.closeMerchantAuth();
            this.switchAppView("dashboard");
            this.showToast(`Welcome back, ${this.merchantProfile.shopName}!`, "success");
          } else {
            this.isCustomerLoggedIn = true;
            this.isMerchantLoggedIn = false;
            this.isAdminLoggedIn = false;
            this.saveMerchantProfileToStorage();
            this.closeMerchantAuth();
            this.switchAppView("storefront");
            this.showToast(`Signed in successfully with ${phoneInput}!`, "success");
          }
        } else {
          // Register customer phone
          fetch("http://localhost:3001/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: cleanPhone, password: "customer123", role: "customer" })
          })
          .then(res => res.json())
          .then(regData => {
            if (regData.token) localStorage.setItem("ao_jwt_token", regData.token);
            this.isCustomerLoggedIn = true;
            this.saveMerchantProfileToStorage();
            this.closeMerchantAuth();
            this.switchAppView("storefront");
            this.showToast(`Signed in successfully with ${phoneInput}!`, "success");
          })
          .catch(() => {
            this.isCustomerLoggedIn = true;
            this.saveMerchantProfileToStorage();
            this.closeMerchantAuth();
            this.switchAppView("storefront");
            this.showToast(`Signed in successfully with ${phoneInput}!`, "success");
          });
        }
      })
      .catch(() => {
        const merchant = this.merchants.find(m => {
          const cleanMerchantPhone = m.phone.replace(/[^0-9]/g, "");
          return cleanMerchantPhone === cleanPhone || m.phone.includes(phoneInput);
        });
        if (merchant) {
          this.isMerchantLoggedIn = true;
          this.merchantProfile = { ...merchant };
          this.saveMerchantProfileToStorage();
          this.closeMerchantAuth();
          this.switchAppView("dashboard");
          this.showToast(`Welcome back, ${this.merchantProfile.shopName}!`, "success");
        } else {
          this.isCustomerLoggedIn = true;
          this.saveMerchantProfileToStorage();
          this.closeMerchantAuth();
          this.switchAppView("storefront");
          this.showToast(`Signed in successfully with ${phoneInput}!`, "success");
        }
      });
    }
  }

  logoutMerchant() {
    localStorage.removeItem("ao_jwt_token");
    this.isMerchantLoggedIn = false;
    this.merchantProfile = null;
    this.isAdminLoggedIn = false;
    this.isCustomerLoggedIn = false;
    this.saveMerchantProfileToStorage();
    
    this.switchAppView("storefront");
    this.showToast("Logged out successfully", "success");
  }

  // ============================================
  // NEW USER ONBOARDING WIZARD
  // ============================================
  openOnboarding(prefillPhone = "") {
    const modal = document.getElementById("onboarding-modal");
    modal.style.display = "flex";

    if (prefillPhone) {
      const phoneField = document.getElementById("onboard-phone");
      if (phoneField) phoneField.value = prefillPhone;
    }

    this.goToOnboardingStep(1);
  }

  closeOnboarding() {
    const modal = document.getElementById("onboarding-modal");
    modal.style.display = "none";

    document.getElementById("onboarding-form").reset();
    this.goToOnboardingStep(1);
  }

  cancelOnboarding() {
    this.closeOnboarding();
    this.showToast("Setup cancelled. You can register again anytime.", "info");
  }

  goToOnboardingStep(step) {
    const step1 = document.getElementById("onboarding-step-1");
    const step2 = document.getElementById("onboarding-step-2");
    const dot1 = document.getElementById("onboard-step-1-dot");
    const dot2 = document.getElementById("onboard-step-2-dot");
    const line = document.getElementById("onboard-step-line");
    const title = document.getElementById("onboarding-title-text");
    const subtitle = document.getElementById("onboarding-subtitle-text");

    if (step === 1) {
      step1.style.display = "block";
      step2.style.display = "none";
      dot1.className = "step-dot active";
      dot2.className = "step-dot";
      line.className = "step-line";
      title.textContent = "Welcome! Tell us about yourself";
      subtitle.textContent = "This helps buyers find and trust your shop";
    } else if (step === 2) {
      const fullName = document.getElementById("onboard-fullname").value.trim();
      const phone = document.getElementById("onboard-phone").value.trim();
      
      if (!fullName) {
        this.showToast("Please enter your full name.", "error");
        document.getElementById("onboard-fullname").focus();
        return;
      }
      if (!phone) {
        this.showToast("Please enter your phone number.", "error");
        document.getElementById("onboard-phone").focus();
        return;
      }

      step1.style.display = "none";
      step2.style.display = "block";
      dot1.className = "step-dot completed";
      dot2.className = "step-dot active";
      line.className = "step-line active";
      title.textContent = "Set up your shop";
      subtitle.textContent = "Tell buyers where to find you in Abossey Okai";
    }
  }

  submitOnboarding(event) {
    event.preventDefault();

    const fullName = document.getElementById("onboard-fullname").value.trim();
    const email = document.getElementById("onboard-email").value.trim();
    const phone = document.getElementById("onboard-phone").value.trim();
    const shopName = document.getElementById("onboard-shop-name").value.trim();
    const shopLocation = document.getElementById("onboard-shop-location").value.trim();
    const shopSpecialty = document.getElementById("onboard-shop-specialty").value;
    const shopDesc = document.getElementById("onboard-shop-desc").value.trim();

    if (!shopName) {
      this.showToast("Please enter your shop name.", "error");
      document.getElementById("onboard-shop-name").focus();
      return;
    }
    if (!shopLocation) {
      this.showToast("Please enter your shop location.", "error");
      document.getElementById("onboard-shop-location").focus();
      return;
    }

    this.showToast("Creating merchant profile in Neon DB...", "info");

    fetch("http://localhost:3001/api/auth/register-merchant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email || `${shopName.toLowerCase().replace(/[^a-z0-9]/g, "")}@gmail.com`,
        phone: phone || "+233240000000",
        password: "merchant123",
        full_name: fullName,
        shop_name: shopName,
        shop_location: shopLocation,
        shop_coordinates: "5.5565, -0.2282",
        shop_description: shopDesc || `${shopName} — Quality auto parts and accessories at Abossey Okai.`,
        shop_specialty: shopSpecialty
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem("ao_jwt_token", data.token);
      }
      this.merchantProfile = data.merchantProfile || {
        shopName, ownerName: fullName, email, phone, location: shopLocation,
        coordinates: "5.5565, -0.2282", description: shopDesc, specialty: shopSpecialty,
        verified: false, since: "Jan 2026"
      };

      this.isMerchantLoggedIn = true;
      localStorage.setItem("ao_onboarding_complete", "true");
      this.saveMerchantProfileToStorage();

      this.closeOnboarding();
      this.updatePortalButtonState();
      this.switchAppView("dashboard");
      this.showToast(`Welcome to Abbossey Okai Magazine, ${fullName}! Your shop "${shopName}" is all set.`, "success");
    })
    .catch(() => {
      // Local fallback
      this.merchantProfile = {
        shopName, ownerName: fullName, email, phone, location: shopLocation,
        coordinates: "5.5565, -0.2282", description: shopDesc, specialty: shopSpecialty,
        verified: false, since: "Jan 2026"
      };
      this.isMerchantLoggedIn = true;
      localStorage.setItem("ao_onboarding_complete", "true");
      this.saveMerchantProfileToStorage();
      this.closeOnboarding();
      this.updatePortalButtonState();
      this.switchAppView("dashboard");
      this.showToast(`Welcome to Abbossey Okai Magazine, ${fullName}! Your shop "${shopName}" is all set.`, "success");
    });
  }
  updatePortalButtonState() {
    const btn = document.getElementById("merchant-portal-btn");
    if (!btn) return;

    if (this.isCustomerLoggedIn) {
      // Regular customer logged in -> Login button DISAPPEARS!
      btn.style.display = "none";
      return;
    }

    btn.style.display = "inline-flex";

    if (this.isAdminLoggedIn) {
      if (this.currentView === "admin-dashboard") {
        btn.innerHTML = 'View Marketplace';
        btn.className = "btn btn-secondary";
      } else {
        btn.innerHTML = 'Admin Panel';
        btn.className = "btn btn-primary";
      }
    } else if (this.isMerchantLoggedIn) {
      if (this.currentView === "dashboard") {
        btn.innerHTML = 'View Marketplace';
        btn.className = "btn btn-secondary";
      } else {
        btn.innerHTML = 'Merchant Center';
        btn.className = "btn btn-primary";
      }
    } else {
      // Unauthenticated / Guest
      btn.innerHTML = 'Login';
      btn.className = "btn btn-primary";
    }
  }

  // Dashboard Navigation Tabs Switcher
  switchDashboardTab(tab) {
    document.querySelectorAll(".dashboard-menu-item").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".dashboard-tab-panel").forEach(el => el.style.display = "none");

    if (tab === "inventory") {
      document.getElementById("db-menu-inventory").classList.add("active");
      document.getElementById("db-panel-inventory").style.display = "block";
      this.renderMerchantInventory();
    } else if (tab === "profile") {
      document.getElementById("db-menu-profile").classList.add("active");
      document.getElementById("db-panel-profile").style.display = "block";
      this.renderMerchantProfile();
    }
  }

  // Populate profiles on settings panel
  renderMerchantProfile() {
    if (!this.merchantProfile) return;

    // Display info on top bar
    const shopNameEl = document.getElementById('merchant-display-shop-name');
    if (shopNameEl) shopNameEl.textContent = this.merchantProfile.shopName;
    
    const locationEl = document.getElementById('merchant-display-location');
    if (locationEl) locationEl.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${this.merchantProfile.location}`;
    
    const avatarContainer = document.getElementById('merchant-avatar-container');
    if (avatarContainer) {
      if (this.merchantProfile.avatar) {
        avatarContainer.innerHTML = `<img src="${this.merchantProfile.avatar}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
      } else {
        avatarContainer.innerHTML = this.merchantProfile.shopName.charAt(0).toUpperCase();
      }
    }

    // Header Logo Card image & fallback
    const logoImg = document.getElementById('settings-shop-logo-img');
    const logoFallback = document.getElementById('settings-shop-logo-fallback');
    if (logoImg && logoFallback) {
      if (this.merchantProfile.avatar) {
        logoImg.src = this.merchantProfile.avatar;
        logoImg.style.display = "block";
        logoFallback.style.display = "none";
      } else {
        logoImg.style.display = "none";
        logoFallback.style.display = "flex";
      }
    }

    // Set forms values
    const nameInput = document.getElementById('settings-shop-name');
    const phoneInput = document.getElementById('settings-contact-phone');
    const locInput = document.getElementById('settings-location');
    const coordsInput = document.getElementById('settings-coordinates');
    const descTextarea = document.getElementById('settings-description');

    if (nameInput) nameInput.value = this.merchantProfile.shopName || '';
    if (phoneInput) phoneInput.value = this.merchantProfile.phone || '';
    if (locInput) locInput.value = this.merchantProfile.location || '';
    if (coordsInput) coordsInput.value = this.merchantProfile.coordinates || '';
    if (descTextarea) {
      descTextarea.value = this.merchantProfile.description || 'Premium Akebono ceramic brake pads offering zero noise, low dust, and exceptional stopping power. Directly imported from USA. Certified fitment for Toyota, Honda and other major vehicle brands. Quality you can trust, safety you can feel.';
      this.updateDescCharCount(descTextarea);
    }
    
    // Map pin label & Google Maps link
    const mapPinLabel = document.getElementById('map-pin-shop-label');
    if (mapPinLabel) mapPinLabel.textContent = this.merchantProfile.shopName || 'Abossey Okai';
    this.updateMapPreviewLink(this.merchantProfile.coordinates || '5.5562, -0.2284');

    // Category tags
    if (!Array.isArray(this.merchantProfile.categoryTags) || this.merchantProfile.categoryTags.length === 0) {
      this.merchantProfile.categoryTags = ["Brake Systems", "Engine Parts", "Toyota Specialist", "Honda Specialist"];
    }

    const hiddenTagsInput = document.getElementById('settings-category-tags');
    if (hiddenTagsInput) hiddenTagsInput.value = (this.merchantProfile.categoryTags || []).join(', ');
    
    this.renderCategoryTagsPreview();
  }

  updateDescCharCount(textarea) {
    const counter = document.getElementById('settings-desc-counter');
    if (counter && textarea) {
      counter.textContent = `${textarea.value.length} / 500`;
    }
  }

  updateMapPreviewLink(coords) {
    const link = document.getElementById('settings-google-maps-link');
    if (link) {
      const query = coords ? coords.trim() : '5.5562,-0.2284';
      link.href = `https://maps.google.com/?q=${encodeURIComponent(query)}`;
    }
  }

  onSettingsInputChange(input) {
    // Valid check icon feedback
  }

  renderCategoryTagsPreview() {
    const row = document.getElementById('settings-specialties-tags-row');
    if (!row) return;
    
    const tags = Array.isArray(this.merchantProfile.categoryTags) ? this.merchantProfile.categoryTags : [];
    let html = tags.map((t, idx) => `
      <span class="specialty-tag-pill" onclick="app.removeSpecialtyTag(${idx})" title="Click to remove tag">
        ${t}
        <span class="tag-check-icon"><i class="fa-solid fa-check"></i></span>
      </span>
    `).join('');

    if (tags.length < 10) {
      html += `
        <button type="button" class="add-tag-pill-btn" onclick="app.addSpecialtyTag()">
          + Add Category
        </button>
      `;
    }

    row.innerHTML = html;
  }

  addSpecialtyTag() {
    const newTag = prompt("Enter a new specialty or category tag (e.g. Suspension, Transmission, Genuine Parts):");
    if (newTag && newTag.trim()) {
      const cleanTag = newTag.trim();
      if (!Array.isArray(this.merchantProfile.categoryTags)) {
        this.merchantProfile.categoryTags = [];
      }
      if (!this.merchantProfile.categoryTags.includes(cleanTag) && this.merchantProfile.categoryTags.length < 10) {
        this.merchantProfile.categoryTags.push(cleanTag);
        this.renderCategoryTagsPreview();
      }
    }
  }

  removeSpecialtyTag(index) {
    if (Array.isArray(this.merchantProfile.categoryTags)) {
      this.merchantProfile.categoryTags.splice(index, 1);
      this.renderCategoryTagsPreview();
    }
  }

  previewMerchantShop() {
    this.switchView('storefront');
    this.searchQuery = this.merchantProfile.shopName;
    this.renderCatalog();
    this.showToast(`Previewing "${this.merchantProfile.shopName}" on storefront.`, "info");
  }

  onAvatarChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.merchantProfile.avatar = e.target.result;
      this.saveMerchantProfileToStorage();
      this.renderMerchantProfile();
      this.showToast("Shop logo updated successfully!", "success");
    };
    reader.readAsDataURL(file);
  }

  saveMerchantProfile(event) {
    event.preventDefault();
    
    this.merchantProfile.shopName = document.getElementById('settings-shop-name').value;
    this.merchantProfile.phone = document.getElementById('settings-contact-phone').value;
    this.merchantProfile.location = document.getElementById('settings-location').value;
    this.merchantProfile.coordinates = document.getElementById('settings-coordinates').value;
    this.merchantProfile.description = document.getElementById('settings-description').value;

    // Category tags — parse comma-separated input
    const tagsRaw = document.getElementById('settings-category-tags').value;
    this.merchantProfile.categoryTags = tagsRaw
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);
    this.renderCategoryTagsPreview();

    this.saveMerchantProfileToStorage();
    this.renderMerchantProfile();
    
    // Update all existing items owned by this merchant
    this.products.forEach(p => {
      if (p.id.startsWith('merchant-') || p.merchant.shopName === this.merchantProfile.shopName) {
        p.merchant.shopName = this.merchantProfile.shopName;
        p.merchant.phone = this.merchantProfile.phone;
        p.merchant.location = this.merchantProfile.location;
        p.merchant.coordinates = this.merchantProfile.coordinates;
      }
    });
    this.saveProductsToStorage();

    this.showToast('Merchant settings saved successfully!', 'success');
  }

  // Inventory stats calculation
  renderMerchantMetrics() {
    if (!this.merchantProfile) return;

    // Filter items belonging to current merchant
    const merchantItems = this.products.filter(p => p.merchant.shopName === this.merchantProfile.shopName);
    
    // Total Visitors: sum of all product views
    const totalVisitors = merchantItems.reduce((acc, p) => acc + (p.views || 0), 0);
    
    // Most Viewed Product: the product with the highest views
    const topItem = merchantItems
      .slice()
      .sort((a, b) => (b.views || 0) - (a.views || 0))[0];

    document.getElementById('metric-total-leads').textContent = totalVisitors.toLocaleString();
    document.getElementById('metric-total-live').textContent = topItem ? topItem.name : '—';
  }

  openMostViewedModal() {
    if (!this.merchantProfile) return;
    const merchantItems = this.products
      .filter(p => p.merchant.shopName === this.merchantProfile.shopName)
      .slice()
      .sort((a, b) => (b.views || 0) - (a.views || 0));

    const listBody = document.getElementById('most-viewed-list-body');
    if (!listBody) return;

    if (merchantItems.length === 0) {
      listBody.innerHTML = `<div class="most-viewed-empty"><i class="fa-solid fa-box-open"></i><p>No products listed yet.</p></div>`;
    } else {
      listBody.innerHTML = merchantItems.map((p, index) => {
        const rank = index + 1;
        const rankClass = rank === 1 ? 'rank-gold' : rank === 2 ? 'rank-silver' : rank === 3 ? 'rank-bronze' : 'rank-default';
        const views = p.views || 0;
        const barWidth = merchantItems[0].views > 0 ? Math.round((views / merchantItems[0].views) * 100) : 0;
        return `
          <div class="most-viewed-item">
            <div class="most-viewed-rank ${rankClass}">${rank}</div>
            <div class="most-viewed-item-info">
              <span class="most-viewed-item-name">${p.name}</span>
              <div class="most-viewed-bar-wrap">
                <div class="most-viewed-bar" style="width:${barWidth}%"></div>
              </div>
            </div>
            <div class="most-viewed-count">
              <i class="fa-solid fa-eye"></i>
              <span>${views.toLocaleString()}</span>
            </div>
          </div>`;
      }).join('');
    }

    document.getElementById('most-viewed-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  closeMostViewedModal() {
    const modal = document.getElementById('most-viewed-modal');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
  }


  renderMerchantInventory() {
    const tableBody = document.getElementById("inventory-table-body");
    const counterLabel = document.getElementById("inventory-count");
    if (!tableBody) return;

    const myItems = this.products.filter(p => p.merchant.shopName === this.merchantProfile.shopName);
    
    // Read active inventory tab filters
    const activeTab = document.querySelector(".inventory-tab.active");
    const statusFilter = activeTab ? activeTab.getAttribute("data-status") : "all";

    const filteredItems = myItems.filter(p => {
      if (statusFilter === "all") return true;
      return p.status === statusFilter || (statusFilter === "Out of Stock" && p.stock === "Out of Stock");
    });

    counterLabel.textContent = `${filteredItems.length} item${filteredItems.length === 1 ? "" : "s"} listed`;

    if (filteredItems.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="3" style="text-align: center; padding: 3rem 1.5rem; color: var(--text-muted);">
            <i class="fa-solid fa-folder-open" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
            No items matching your selection. Click "Add New Product" to populate your inventory listings.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = "";
    // Show only first 3 rows on the dashboard preview
    const previewItems = filteredItems.slice(0, 3);
    previewItems.forEach(p => {
      tableBody.appendChild(this._buildInventoryRow(p));
    });

    // Show/hide the See All button
    const seeAllBtn = document.getElementById('inventory-see-all-btn');
    if (seeAllBtn) {
      seeAllBtn.style.display = filteredItems.length > 3 ? 'flex' : 'none';
      seeAllBtn.querySelector('span').textContent = `See All ${filteredItems.length} Products`;
    }
  }

  // Build a single inventory table row (shared between dashboard preview & full view)
  _buildInventoryRow(p) {
    const row = document.createElement("tr");
    row.id = `row-${p.id}`;
    row.style.cursor = "pointer";
    row.onclick = () => this.openProductForm(p.id);

    let imgTag = "";
    if (p.images && p.images.length > 0) {
      imgTag = `<img src="${p.images[0]}" class="table-product-img" alt="${p.name}">`;
    } else {
      imgTag = `<div class="table-product-img" style="background:#F1F5F9; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">${p.mainType === 'parts' ? '⚙️' : '🔌'}</div>`;
    }

    const infoCell = `
      <div class="table-product-cell">
        ${imgTag}
        <div class="table-product-info">
          <span class="table-product-name">${p.name}</span>
          <span class="table-product-cat">${p.brand} &bull; ${p.category}</span>
        </div>
      </div>`;

    const priceCell = `<span style="font-weight:700; color:var(--primary-color);">₵${p.price.toLocaleString()}</span>`;

    let statusClass = "badge-new";
    if (p.status === "Live") statusClass = "badge-instock";
    if (p.status === "Hidden") statusClass = "badge-stock";
    if (p.status === "Pending Review") statusClass = "badge-refurbished";
    if (p.stock === "Out of Stock") statusClass = "badge-oos";
    
    const displayStatus = p.stock === "Out of Stock" ? "Out of Stock" : (p.status === "Live" ? "In Stock" : p.status);
    const statusCell = `<span class="badge ${statusClass}">${displayStatus}</span>`;

    row.innerHTML = `<td>${infoCell}</td><td>${priceCell}</td><td>${statusCell}</td>`;
    return row;
  }

  // Open full inventory page overlay
  openAllInventory() {
    if (!this.merchantProfile) return;
    const allItems = this.products.filter(p => p.merchant.shopName === this.merchantProfile.shopName);

    const panel = document.getElementById('all-inventory-panel');
    const tbody = document.getElementById('all-inventory-table-body');
    const count = document.getElementById('all-inventory-count');
    if (!panel || !tbody) return;

    if (count) count.textContent = `${allItems.length} product${allItems.length === 1 ? '' : 's'}`;

    tbody.innerHTML = '';
    if (allItems.length === 0) {
      tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; padding:3rem 1rem; color:var(--text-muted);"><i class="fa-solid fa-folder-open" style="font-size:2rem; display:block; margin-bottom:0.5rem;"></i>No products yet. Add your first product!</td></tr>`;
    } else {
      allItems.forEach(p => tbody.appendChild(this._buildInventoryRow(p)));
    }

    panel.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  closeAllInventory() {
    const panel = document.getElementById('all-inventory-panel');
    if (panel) panel.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Filter inventory list based on statuses
  filterInventory(status) {
    document.querySelectorAll(".inventory-tab").forEach(tab => {
      tab.classList.remove("active");
      if (tab.getAttribute("data-status") === status) tab.classList.add("active");
    });
    this.renderMerchantInventory();
  }

  // Add listing form controllers
  setFormStockStatus(status) {
    const hiddenInput = document.getElementById("form-product-stock");
    if (hiddenInput) hiddenInput.value = status;

    const segments = document.querySelectorAll("#form-stock-segmented .status-segment");
    segments.forEach(btn => {
      if (btn.getAttribute("data-value") === status) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  deleteProductFromForm() {
    if (!this.editingProductId) return;

    if (confirm("Are you sure you want to delete this product listing? This action cannot be undone.")) {
      const name = document.getElementById("form-product-name").value;
      this.products = this.products.filter(p => p.id !== this.editingProductId);
      this.saveProductsToStorage();

      this.closeProductForm();
      this.renderMerchantInventory();
      this.renderMerchantMetrics();
      this.renderBrandFilters();
      this.renderCatalog();

      this.showToast(`Product listing "${name}" deleted.`, "success");
    }
  }

  openProductForm(productId = null) {
    this.selectedFitmentsInForm = [];
    this.selectedFormImages = [];
    document.getElementById("product-submission-form").reset();
    document.getElementById("form-image-previews").innerHTML = "";
    this.populateSelectOptions();
    this.populateBrandsDatalist();
    this.populateModelsDatalist();

    const deleteBtn = document.getElementById("form-delete-btn");

    if (productId) {
      this.editingProductId = productId;
      const product = this.products.find(p => p.id === productId);
      if (!product) return;

      document.getElementById("form-modal-title-text").textContent = "Edit Product Listing";
      if (deleteBtn) deleteBtn.style.display = "block";

      // Populate basic info
      document.getElementById("form-product-name").value = product.name;
      document.getElementById("form-product-brand").value = product.brand || "";
      // Set initial listing type & tab
      this.setFormListingType(product.mainType);
      document.getElementById("form-product-category").value = product.category;
      document.getElementById("form-product-price").value = product.price;
      document.getElementById("form-product-condition").value = product.condition;
      document.getElementById("form-product-desc").value = product.description || "";

      // Populate Stock status
      this.setFormStockStatus(product.stock || "In Stock");

      // Populate Model (Make) and Year
      const modelMakeInput = document.getElementById("form-fitment-make-model");
      const yearsInput = document.getElementById("form-fitment-years");

      if (Array.isArray(product.compatibility) && product.compatibility.length > 0) {
        const item = product.compatibility[0];
        if (typeof item === "object") {
          if (modelMakeInput) modelMakeInput.value = `${item.make} ${item.model}`.trim();
          if (yearsInput) yearsInput.value = item.years || "";
        } else if (typeof item === "string") {
          if (modelMakeInput) modelMakeInput.value = item;
          if (yearsInput) yearsInput.value = "";
        }
      } else if (typeof product.compatibility === "string") {
        if (product.compatibility !== "Universal Fit") {
          if (modelMakeInput) modelMakeInput.value = product.compatibility;
        }
      }

      if (product.mainType === "accessories") {
        const isUniversal = product.compatibility === "Universal Fit";
        const universalCheckbox = document.getElementById("form-universal-fit");
        if (universalCheckbox) {
          universalCheckbox.checked = isUniversal;
          this.onUniversalToggle(universalCheckbox);
        }
      }

      // Populate images
      if (product.images && product.images.length > 0) {
        this.selectedFormImages = [...product.images];
        this.renderFormImagePreviews();
      }
    } else {
      this.editingProductId = null;
      document.getElementById("form-modal-title-text").textContent = "Add New Listing";
      if (deleteBtn) deleteBtn.style.display = "none";

      document.getElementById("form-product-brand").value = "";
      const modelMakeInput = document.getElementById("form-fitment-make-model");
      const yearsInput = document.getElementById("form-fitment-years");
      if (modelMakeInput) modelMakeInput.value = "";
      if (yearsInput) yearsInput.value = "";

      this.setFormListingType("parts");
      this.setFormStockStatus("In Stock");
    }

    this.setFormStep(1);
    document.getElementById("product-form-modal").style.display = "flex";
  }

  closeProductForm() {
    document.getElementById("product-form-modal").style.display = "none";
  }

  setFormStep(step) {
    const targetStep = Math.min(Math.max(step, 1), 3);
    
    // Validate current step before advancing forward
    if (targetStep > this.currentFormStep) {
      if (!this.validateCurrentStep(this.currentFormStep)) {
        return;
      }
    }

    this.currentFormStep = targetStep;

    // Show/hide step panes & update wizard step indicators
    for (let i = 1; i <= 3; i++) {
      const pane = document.getElementById(`form-step-pane-${i}`);
      const indicator = document.getElementById(`wizard-step-indicator-${i}`);
      
      if (pane) {
        pane.style.display = (i === targetStep) ? "flex" : "none";
      }

      if (indicator) {
        indicator.classList.toggle("active", i === targetStep);
        indicator.classList.toggle("completed", i < targetStep);
      }
    }

    // Toggle footer navigation buttons
    const prevBtn = document.getElementById("form-prev-btn");
    const nextBtn = document.getElementById("form-next-btn");
    const submitBtn = document.getElementById("submit-form-save-btn");

    if (prevBtn) prevBtn.style.display = (targetStep > 1) ? "inline-flex" : "none";
    if (nextBtn) nextBtn.style.display = (targetStep < 3) ? "inline-flex" : "none";
    if (submitBtn) submitBtn.style.display = (targetStep === 3) ? "inline-flex" : "none";
  }

  nextFormStep() {
    this.setFormStep(this.currentFormStep + 1);
  }

  prevFormStep() {
    this.setFormStep(this.currentFormStep - 1);
  }

  validateCurrentStep(step) {
    if (step === 1) {
      const nameInput = document.getElementById("form-product-name");
      const priceInput = document.getElementById("form-product-price");
      const condInput = document.getElementById("form-product-condition");
      const catInput = document.getElementById("form-product-category");

      if (nameInput && !nameInput.checkValidity()) {
        nameInput.reportValidity();
        return false;
      }
      if (priceInput && !priceInput.checkValidity()) {
        priceInput.reportValidity();
        return false;
      }
      if (condInput && !condInput.checkValidity()) {
        condInput.reportValidity();
        return false;
      }
      if (catInput && !catInput.checkValidity()) {
        catInput.reportValidity();
        return false;
      }
    } else if (step === 2) {
      const brandInput = document.getElementById("form-product-brand");
      const modelMakeInput = document.getElementById("form-fitment-make-model");
      const yearsInput = document.getElementById("form-fitment-years");
      const type = document.getElementById("form-product-type")?.value;
      const isUniversal = document.getElementById("form-universal-fit")?.checked;

      if (brandInput && !brandInput.checkValidity()) {
        brandInput.reportValidity();
        return false;
      }

      if (type === "parts" || (type === "accessories" && !isUniversal)) {
        if (modelMakeInput && !modelMakeInput.checkValidity()) {
          modelMakeInput.reportValidity();
          return false;
        }
        if (yearsInput && !yearsInput.checkValidity()) {
          yearsInput.reportValidity();
          return false;
        }
      }
    }
    return true;
  }

  setFormListingType(type) {
    const hiddenType = document.getElementById("form-product-type");
    if (hiddenType) hiddenType.value = type;

    // Update Tab UI state
    const tabParts = document.getElementById("form-tab-parts");
    const tabAcc = document.getElementById("form-tab-accessories");

    if (tabParts) tabParts.classList.toggle("active", type === "parts");
    if (tabAcc) tabAcc.classList.toggle("active", type === "accessories");

    const partsGroup = document.getElementById('form-field-vehicle-group');
    const accGroup = document.getElementById('form-field-universal-group');
    const refurbishedOption = document.getElementById('condition-refurbished-option');

    if (type === 'parts') {
      if (partsGroup) partsGroup.style.display = 'block';
      if (accGroup) accGroup.style.display = 'none';
      if (refurbishedOption) refurbishedOption.style.display = 'block';
    } else {
      if (partsGroup) partsGroup.style.display = 'none';
      if (accGroup) accGroup.style.display = 'block';
      if (refurbishedOption) refurbishedOption.style.display = 'none';
      const condSelect = document.getElementById('form-product-condition');
      if (condSelect && condSelect.value === 'Refurbished') condSelect.value = 'New';
    }
    
    this.populateFormCategories(type);
  }

  populateFormCategories(type) {
    const catSelect = document.getElementById("form-product-category");
    if (!catSelect) return;

    catSelect.innerHTML = "";
    if (type === "parts") {
      SPARE_PART_CATEGORIES.forEach(cat => {
        catSelect.innerHTML += `<option value="${cat}">${cat}</option>`;
      });
    } else {
      CAR_ACCESSORY_CATEGORIES.forEach(cat => {
        catSelect.innerHTML += `<option value="${cat}">${cat}</option>`;
      });
    }
  }

  onUniversalToggle(checkbox) {
    const partsGroup = document.getElementById("form-field-vehicle-group");
    if (checkbox.checked) {
      partsGroup.style.display = "none";
    } else {
      partsGroup.style.display = "block";
    }
  }

  // Adding compatibility row in form
  addFormFitment() {
    const make = document.getElementById("form-fitment-make").value;
    const model = document.getElementById("form-fitment-model").value;
    const years = document.getElementById("form-fitment-years").value.trim();

    if (!make) {
      this.showToast("Please select at least a vehicle make.", "error");
      return;
    }

    const fitment = {
      make: make,
      model: model || "All Models",
      years: years || "All Years"
    };

    this.selectedFitmentsInForm.push(fitment);
    this.renderFormFitmentTags();
    
    // Reset inputs
    document.getElementById("form-fitment-make").value = "";
    document.getElementById("form-fitment-model").value = "";
    document.getElementById("form-fitment-model").disabled = true;
    document.getElementById("form-fitment-years").value = "";
  }

  removeFormFitment(index) {
    this.selectedFitmentsInForm.splice(index, 1);
    this.renderFormFitmentTags();
  }

  renderFormFitmentTags() {
    const container = document.getElementById("form-fitment-tags-container");
    if (!container) return;

    container.innerHTML = "";
    if (this.selectedFitmentsInForm.length === 0) {
      container.innerHTML = `<span style="font-size:0.8rem; color:var(--text-muted);">No custom vehicle compatibility added.</span>`;
      return;
    }

    this.selectedFitmentsInForm.forEach((fit, idx) => {
      const tag = document.createElement("span");
      tag.className = "compatibility-item";
      tag.innerHTML = `
        ${fit.make} ${fit.model} (${fit.years})
        <i class="fa-solid fa-circle-xmark" style="margin-left:0.35rem; cursor:pointer;" onclick="app.removeFormFitment(${idx})"></i>
      `;
      container.appendChild(tag);
    });
  }

  onFormImageUpload(event) {
    const files = Array.from(event.target.files);
    const previews = document.getElementById("form-image-previews");
    if (!previews) return;

    const remainingSlots = 5 - this.selectedFormImages.length;
    const filesToUpload = files.slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      this.showToast("You can upload a maximum of 5 images per product.", "error");
    }

    filesToUpload.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        this.selectedFormImages.push(dataUrl);
        this.renderFormImagePreviews();
      };
      reader.readAsDataURL(file);
    });
  }

  removeFormImage(index) {
    this.selectedFormImages.splice(index, 1);
    this.renderFormImagePreviews();
  }

  renderFormImagePreviews() {
    const container = document.getElementById("form-image-previews");
    if (!container) return;

    container.innerHTML = "";
    this.selectedFormImages.forEach((src, idx) => {
      const wrapper = document.createElement("div");
      wrapper.style.position = "relative";
      wrapper.style.display = "inline-block";

      const img = document.createElement("img");
      img.src = src;
      img.className = "uploader-preview-img";

      const del = document.createElement("span");
      del.className = "avatar-edit-badge";
      del.style.width = "20px";
      del.style.height = "20px";
      del.style.fontSize = "0.7rem";
      del.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      del.setAttribute("onclick", `app.removeFormImage(${idx})`);
      
      wrapper.appendChild(img);
      wrapper.appendChild(del);
      container.appendChild(wrapper);
    });
  }

  // Publish Form Submission
  submitProductForm(event) {
    event.preventDefault();

    const name = document.getElementById("form-product-name").value.trim();
    const type = document.getElementById("form-product-type").value;
    const price = parseFloat(document.getElementById("form-product-price").value);
    const category = document.getElementById("form-product-category").value;
    const brand = document.getElementById("form-product-brand").value.trim() || "Generic";
    const condition = document.getElementById("form-product-condition").value;
    const desc = document.getElementById("form-product-desc").value.trim();
    const stockInput = document.getElementById("form-product-stock");
    const stock = stockInput ? stockInput.value : "In Stock";

    if (!name || isNaN(price)) {
      this.showToast("Please enter valid product name and pricing details.", "error");
      return;
    }

    // Dynamic field structures based on type
    const modelMakeStr = document.getElementById("form-fitment-make-model")?.value.trim() || "";
    const yearsStr = document.getElementById("form-fitment-years")?.value.trim() || "";

    const parseFitment = (str, brandName) => {
      let makePart = brandName || "Generic";
      let modelPart = str;

      if (typeof VEHICLE_TAXONOMY === "object" && VEHICLE_TAXONOMY) {
        const brandLower = (brandName || "").toLowerCase();
        const matchingTaxonomyMake = Object.keys(VEHICLE_TAXONOMY).find(m => m.toLowerCase() === brandLower);

        if (matchingTaxonomyMake) {
          makePart = matchingTaxonomyMake;
          modelPart = str;
        } else {
          const parts = str.split(" ");
          const firstWordLower = parts[0] ? parts[0].toLowerCase() : "";
          const makeFromModelInput = Object.keys(VEHICLE_TAXONOMY).find(m => m.toLowerCase() === firstWordLower);
          if (makeFromModelInput) {
            makePart = makeFromModelInput;
            modelPart = parts.slice(1).join(" ") || str;
          }
        }
      }

      return [{
        make: makePart,
        model: modelPart,
        years: yearsStr || "All Years"
      }];
    };

    let compatibility = "Universal Fit";
    if (type === "parts") {
      if (!modelMakeStr) {
        this.showToast("Please enter Model (Make) for the spare part.", "error");
        return;
      }
      compatibility = parseFitment(modelMakeStr, brand);
    } else {
      const isUniversal = document.getElementById("form-universal-fit")?.checked;
      if (!isUniversal) {
        if (!modelMakeStr) {
          this.showToast("Please enter Model (Make) or mark as Universal Fit.", "error");
          return;
        }
        compatibility = parseFitment(modelMakeStr, brand);
      }
    }

    // Check if we are in edit mode
    if (this.editingProductId) {
      const idx = this.products.findIndex(p => p.id === this.editingProductId);
      if (idx !== -1) {
        const existing = this.products[idx];
        this.products[idx] = {
          ...existing,
          mainType: type,
          name: name,
          brand: brand,
          category: category,
          condition: condition,
          price: price,
          stock: stock,
          images: [...this.selectedFormImages],
          compatibility: compatibility,
          description: desc || `Authentic ${name} distributed directly from Abossey Okai hub.`
        };
      }
      this.editingProductId = null;
      this.saveProductsToStorage();
      this.closeProductForm();
      
      if (this.isMerchantLoggedIn) {
        this.renderMerchantInventory();
        this.renderMerchantMetrics();
      } else if (this.isAdminLoggedIn) {
        this.renderAdminListings();
        this.renderAdminOverview();
        this.logAdminAction("LISTING_EDIT", name, `Listing details updated by administrator`);
      }
      
      this.renderBrandFilters();
      this.renderCatalog();
      this.showToast(`Product listing "${name}" updated successfully!`, "success");
    } else {
      // Creating new object
      const initialStatus = this.premoderation ? "Pending Review" : "Live";
      const newProduct = {
        id: "merchant-" + Date.now(),
        mainType: type,
        name: name,
        brand: brand,
        category: category,
        condition: condition,
        price: price,
        stock: stock,
        status: initialStatus,
        images: [...this.selectedFormImages],
        compatibility: compatibility,
        description: desc || `Authentic ${name} distributed directly from Abossey Okai hub.`,
        merchant: {
          shopName: this.merchantProfile ? this.merchantProfile.shopName : "Administrator Shop",
          phone: this.merchantProfile ? this.merchantProfile.phone : "+233240000000",
          location: this.merchantProfile ? this.merchantProfile.location : "Abossey Okai Market, Accra",
          coordinates: this.merchantProfile ? this.merchantProfile.coordinates : "5.5562, -0.2284",
          verified: this.merchantProfile ? this.merchantProfile.verified : true,
          since: this.merchantProfile ? this.merchantProfile.since : "Jul 2026"
        }
      };

      // Add to state and persist
      this.products.unshift(newProduct);
      this.saveProductsToStorage();

      this.closeProductForm();
      
      if (this.isMerchantLoggedIn) {
        this.renderMerchantInventory();
        this.renderMerchantMetrics();
      } else if (this.isAdminLoggedIn) {
        this.renderAdminListings();
        this.renderAdminOverview();
        this.logAdminAction("TAXONOMY_ADD", name, `New product published by administrator`);
      }
      
      this.renderBrandFilters();
      this.renderCatalog();
      
      if (this.premoderation) {
        this.showToast(`Product listing "${name}" submitted for admin review!`, "success");
      } else {
        this.showToast(`Product listing "${name}" published successfully!`, "success");
      }
    }
  }

  // Toggle Visibility in inventory row
  toggleListingVisibility(id) {
    const item = this.products.find(p => p.id === id);
    if (!item) return;

    item.status = item.status === "Live" ? "Hidden" : "Live";
    this.saveProductsToStorage();
    this.renderMerchantInventory();
    this.renderMerchantMetrics();
    this.renderCatalog();
    
    this.showToast(`Listing visibility updated to ${item.status}`, "success");
  }

  // Toggle stock values
  toggleListingStock(id) {
    const item = this.products.find(p => p.id === id);
    if (!item) return;

    item.stock = item.stock === "In Stock" ? "Out of Stock" : "In Stock";
    this.saveProductsToStorage();
    this.renderMerchantInventory();
    this.renderMerchantMetrics();
    this.renderCatalog();

    this.showToast(`Stock status set to ${item.stock}`, "success");
  }

  // Delete product listing
  deleteProductListing(id) {
    if (!confirm("Are you sure you want to delete this listing permanently from inventory?")) return;

    const idx = this.products.findIndex(p => p.id === id);
    if (idx === -1) return;

    const name = this.products[idx].name;
    this.products.splice(idx, 1);
    this.saveProductsToStorage();
    
    this.renderMerchantInventory();
    this.renderMerchantMetrics();
    this.renderBrandFilters();
    this.renderCatalog();

    this.showToast(`Deleted listing: "${name}"`, "success");
  }

  // Bulk visibility operations
  bulkToggleStock(inStock) {
    const checkboxes = document.querySelectorAll(".inventory-item-select:checked");
    if (checkboxes.length === 0) {
      this.showToast("Please check at least one product checkbox first.", "error");
      return;
    }

    let count = 0;
    checkboxes.forEach(cb => {
      const item = this.products.find(p => p.id === cb.value);
      if (item) {
        item.stock = inStock ? "In Stock" : "Out of Stock";
        count++;
      }
    });

    this.saveProductsToStorage();
    this.renderMerchantInventory();
    this.renderMerchantMetrics();
    this.renderCatalog();
    
    this.showToast(`Marked ${count} items as ${inStock ? 'In-Stock' : 'Out-of-Stock'}`, "success");
    
    // Clear select all header check
    document.getElementById("inventory-select-all").checked = false;
  }

  toggleSelectAllInventory(headerCheckbox) {
    document.querySelectorAll(".inventory-item-select").forEach(cb => {
      cb.checked = headerCheckbox.checked;
    });
  }

  onInventoryRowSelect() {
    const total = document.querySelectorAll(".inventory-item-select").length;
    const checked = document.querySelectorAll(".inventory-item-select:checked").length;
    document.getElementById("inventory-select-all").checked = total === checked && total > 0;
  }

  // Generic popup overlay click catcher
  onOverlayClick(event, elementId) {
    if (event.target.id === elementId) {
      if (elementId === "pdp-overlay-modal") this.closePdp();
      if (elementId === "product-form-modal") this.closeProductForm();
      if (elementId === "auth-modal") this.closeMerchantAuth();
      if (elementId === "most-viewed-modal") this.closeMostViewedModal();
      if (elementId === "all-inventory-panel") this.closeAllInventory();
    }
  }

  // Simple Beautiful Notification alerts
  showToast(message, type = "success") {
    const container = document.getElementById("global-toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    const icon = type === "success" 
      ? '<i class="fa-solid fa-circle-check" style="color:var(--whatsapp-color);"></i>'
      : '<i class="fa-solid fa-triangle-exclamation" style="color:#DC2626;"></i>';

    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    // Animates entry
    setTimeout(() => toast.classList.add("show"), 50);

    // Animates exit
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // UI styling enhancements for first impress wow factor
  setupThemeAndStyleEnhancements() {
    // Fixed header: push content below it
    const header = document.getElementById("main-header");
    const mainContent = document.getElementById("app-main-content");
    if (header && mainContent) {
      const setOffset = () => {
        mainContent.style.paddingTop = header.offsetHeight + "px";
      };
      setOffset();
      window.addEventListener("resize", setOffset);
    }

    // Scroll header transparency
    window.addEventListener("scroll", () => {
      if (header) {
        if (window.scrollY > 10) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      }
    });

    // Custom Scrollbars for dropdown autocompletes
    const style = document.createElement("style");
    style.innerHTML = `
      .autocomplete-dropdown::-webkit-scrollbar,
      .pdp-body::-webkit-scrollbar,
      .form-modal-body::-webkit-scrollbar {
        width: 6px;
      }
      .autocomplete-dropdown::-webkit-scrollbar-track,
      .pdp-body::-webkit-scrollbar-track,
      .form-modal-body::-webkit-scrollbar-track {
        background: #F1F5F9;
      }
      .autocomplete-dropdown::-webkit-scrollbar-thumb,
      .pdp-body::-webkit-scrollbar-thumb,
      .form-modal-body::-webkit-scrollbar-thumb {
        background: #CBD5E1;
        border-radius: 4px;
      }
      .autocomplete-dropdown::-webkit-scrollbar-thumb:hover,
      .pdp-body::-webkit-scrollbar-thumb:hover,
      .form-modal-body::-webkit-scrollbar-thumb:hover {
        background: #94A3B8;
      }
    `;
    document.head.appendChild(style);
  }

  // ============================================
  // ADMIN DASHBOARD MODULE
  // ============================================

  selectMarketSector(el, coords, description) {
    document.querySelectorAll(".market-sector").forEach(sec => {
      sec.classList.remove("active");
      sec.style.borderColor = "#E2E8F0";
      sec.style.background = "#fff";
      sec.style.color = "var(--charcoal)";
    });
    el.classList.add("active");
    el.style.borderColor = "var(--accent-color)";
    el.style.background = "#FFF7ED";
    el.style.color = "var(--accent-color)";
    
    document.getElementById("onboard-merchant-coords").value = coords;
    
    const locationInput = document.getElementById("onboard-merchant-location");
    if (!locationInput.value) {
      locationInput.value = description;
    }
  }

  togglePremoderationSetting() {
    const checkbox = document.getElementById("admin-setting-premoderation");
    if (!checkbox) return;
    this.premoderation = checkbox.checked;
    localStorage.setItem("ao_admin_premoderation", this.premoderation ? "true" : "false");
    this.showToast(`Pre-publish moderation queue ${this.premoderation ? "enabled" : "disabled"}.`, "success");
    this.logAdminAction("SETTINGS_CHANGE", "Pre-publish Moderation", `Status set to ${this.premoderation}`);
  }

  toggleAnnouncementBannerSetting() {
    const checkbox = document.getElementById("admin-setting-banner-toggle");
    if (!checkbox) return;
    this.announcement.visible = checkbox.checked;
    localStorage.setItem("ao_global_announcement", JSON.stringify(this.announcement));
    this.renderAnnouncementBanner();
    this.showToast(`System announcement banner ${this.announcement.visible ? "visible" : "hidden"}.`, "success");
    this.logAdminAction("SETTINGS_CHANGE", "Announcement Banner Visibility", `Status set to ${this.announcement.visible}`);
  }

  saveAnnouncementBannerText() {
    const input = document.getElementById("admin-setting-banner-text");
    if (!input) return;
    const newText = input.value.trim();
    if (!newText) {
      this.showToast("Announcement text cannot be empty.", "error");
      return;
    }
    this.announcement.text = newText;
    localStorage.setItem("ao_global_announcement", JSON.stringify(this.announcement));
    this.renderAnnouncementBanner();
    this.showToast("Announcement text updated.", "success");
    this.logAdminAction("SETTINGS_CHANGE", "Announcement Banner Text", `Text updated to: "${newText}"`);
  }

  setAdminListingsStatusFilter(filter) {
    this.adminListingsFilter = filter;
    document.querySelectorAll('[id^="admin-listing-tab-"]').forEach(btn => btn.classList.remove("active"));
    
    const tabMap = {
      all: "admin-listing-tab-all",
      "Pending Review": "admin-listing-tab-pending",
      Live: "admin-listing-tab-live",
      Hidden: "admin-listing-tab-hidden",
      oos: "admin-listing-tab-oos"
    };

    const targetTab = document.getElementById(tabMap[filter]);
    if (targetTab) targetTab.classList.add("active");
    
    this.renderAdminListings();
  }

  toggleMerchantVerification(shopName, isChecked) {
    const merchant = this.merchants.find(m => m.shopName === shopName);
    if (!merchant) return;
    
    merchant.verified = isChecked;
    localStorage.setItem("ao_marketplace_merchants", JSON.stringify(this.merchants));
    
    this.products.forEach(p => {
      if (p.merchant && p.merchant.shopName === shopName) {
        p.merchant.verified = isChecked;
      }
    });
    this.saveProductsToStorage();
    
    this.showToast(`Merchant "${shopName}" verification status set to ${isChecked ? "Verified" : "Independent"}.`, "success");
    this.logAdminAction("MERCHANT_VERIFY_TOGGLE", shopName, `Verified status set to ${isChecked}`);
    
    this.renderAdminMerchants();
    this.renderCatalog();
  }

  editMerchantNotes(shopName) {
    const merchant = this.merchants.find(m => m.shopName === shopName);
    if (!merchant) return;
    
    const currentNotes = merchant.verificationNotes || "";
    const newNotes = prompt(`Enter verification review notes for "${shopName}":`, currentNotes);
    if (newNotes === null) return;
    
    merchant.verificationNotes = newNotes.trim();
    localStorage.setItem("ao_marketplace_merchants", JSON.stringify(this.merchants));
    
    this.showToast(`Notes updated for ${shopName}.`, "success");
    this.logAdminAction("MERCHANT_VERIFY_TOGGLE", shopName, `Verification notes updated: "${newNotes}"`);
    
    this.renderAdminMerchants();
  }

  logAdminAction(action, target, details) {
    const savedLogs = localStorage.getItem("ao_admin_audit_logs");
    const logs = savedLogs ? JSON.parse(savedLogs) : [];
    
    logs.push({
      timestamp: new Date().toLocaleString(),
      action: action,
      target: target,
      details: details
    });
    
    if (logs.length > 200) logs.shift();
    localStorage.setItem("ao_admin_audit_logs", JSON.stringify(logs));
  }

  clearAdminAuditLogs() {
    if (confirm("Are you sure you want to clear all operational audit logs? This cannot be undone.")) {
      localStorage.removeItem("ao_admin_audit_logs");
      this.showToast("Audit logs cleared successfully.", "success");
      this.renderAdminAuditLogs();
    }
  }

  renderAdminAuditLogs() {
    const tbody = document.getElementById("admin-logs-table-body");
    if (!tbody) return;

    const savedLogs = localStorage.getItem("ao_admin_audit_logs");
    const logs = savedLogs ? JSON.parse(savedLogs) : [];

    tbody.innerHTML = "";
    if (logs.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:2rem 1rem; color:var(--text-muted);">No logs recorded yet.</td></tr>`;
      return;
    }

    [...logs].reverse().forEach(log => {
      const tr = document.createElement("tr");
      
      const timeCell = `<span style="font-size: 0.8rem; color: var(--text-muted);">${log.timestamp}</span>`;
      
      const actionBadgeColor = {
        MERCHANT_ONBOARD: "background:#E0F2FE; color:#0369A1;",
        MERCHANT_DELETE: "background:#FEE2E2; color:#B91C1C;",
        MERCHANT_VERIFY_TOGGLE: "background:#FEF3C7; color:#B45309;",
        LISTING_STOCK_TOGGLE: "background:#F1F5F9; color:#475569;",
        LISTING_DELETE: "background:#FEE2E2; color:#B91C1C;",
        LISTING_EDIT: "background:#E0F2FE; color:#0369A1;",
        LISTING_APPROVED: "background:#DCFCE7; color:#15803D;",
        LISTING_REJECTED: "background:#FEE2E2; color:#B91C1C;",
        REPORT_DISMISS: "background:#DCFCE7; color:#15803D;",
        REPORT_TAKEDOWN: "background:#FEE2E2; color:#B91C1C;",
        TAXONOMY_ADD: "background:#DCFCE7; color:#15803D;",
        TAXONOMY_DELETE: "background:#FEE2E2; color:#B91C1C;",
        SETTINGS_CHANGE: "background:#F3E8FF; color:#6B21A8;"
      }[log.action] || "background:#F1F5F9; color:#475569;";

      const actionCell = `<span style="font-size:0.72rem; padding:2px 6px; border-radius:4px; font-weight:600; ${actionBadgeColor}">${log.action}</span>`;
      const targetCell = `<strong style="font-size:0.8rem; color:var(--charcoal);">${log.target}</strong>`;
      const detailsCell = `<span style="font-size:0.8rem; color:var(--text-muted);">${log.details}</span>`;

      tr.innerHTML = `<td>${timeCell}</td><td>${actionCell}</td><td>${targetCell}</td><td>${detailsCell}</td>`;
      tbody.appendChild(tr);
    });
  }

  addAdminBrand() {
    const input = document.getElementById("admin-new-brand");
    if (!input) return;
    const brand = input.value.trim();
    if (!brand) return;
    
    if (this.brands.includes(brand)) {
      this.showToast("Brand already exists.", "error");
      return;
    }
    
    this.brands.push(brand);
    localStorage.setItem("ao_brands_list", JSON.stringify(this.brands));
    input.value = "";
    this.showToast(`Brand "${brand}" added.`, "success");
    this.renderAdminBrandsList();
    this.populateBrandsDatalist();
    this.logAdminAction("TAXONOMY_ADD", `Brand: ${brand}`, "Added brand to catalog settings");
  }

  deleteAdminBrand(brand) {
    if (!confirm(`Are you sure you want to remove brand "${brand}"?`)) return;
    this.brands = this.brands.filter(b => b !== brand);
    localStorage.setItem("ao_brands_list", JSON.stringify(this.brands));
    this.showToast(`Brand "${brand}" removed.`, "success");
    this.renderAdminBrandsList();
    this.populateBrandsDatalist();
    this.logAdminAction("TAXONOMY_DELETE", `Brand: ${brand}`, "Removed brand from catalog settings");
  }

  renderAdminBrandsList() {
    const container = document.getElementById("admin-brands-list");
    if (!container) return;
    
    container.innerHTML = "";
    this.brands.forEach(brand => {
      const div = document.createElement("div");
      div.style.cssText = "display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; padding:4px 0; border-bottom:1px solid #F1F5F9;";
      div.innerHTML = `<span style="flex:1;">${brand}</span> <i class="fa-solid fa-trash-can" style="cursor:pointer; color:#DC2626;" onclick="app.deleteAdminBrand('${brand}')"></i>`;
      container.appendChild(div);
    });
  }

  populateBrandsDatalist() {
    const datalist = document.getElementById("form-brands-datalist");
    if (!datalist) return;
    
    datalist.innerHTML = "";
    this.brands.forEach(brand => {
      const opt = document.createElement("option");
      opt.value = brand;
      datalist.appendChild(opt);
    });
  }

  onFormBrandChange() {
    const brandInput = document.getElementById("form-product-brand");
    const brandVal = brandInput ? brandInput.value.trim() : "";
    this.populateModelsDatalist(brandVal);
  }

  populateModelsDatalist(selectedBrand = "") {
    const datalist = document.getElementById("form-models-datalist");
    if (!datalist) return;
    
    datalist.innerHTML = "";
    if (typeof VEHICLE_TAXONOMY !== "object" || !VEHICLE_TAXONOMY) return;

    let matchingMake = null;
    if (selectedBrand) {
      const brandLower = selectedBrand.toLowerCase();
      matchingMake = Object.keys(VEHICLE_TAXONOMY).find(m => m.toLowerCase() === brandLower);
    }

    const modelInput = document.getElementById("form-fitment-make-model");

    if (matchingMake && VEHICLE_TAXONOMY[matchingMake] && Array.isArray(VEHICLE_TAXONOMY[matchingMake].models)) {
      const models = VEHICLE_TAXONOMY[matchingMake].models;
      models.forEach(model => {
        const opt = document.createElement("option");
        opt.value = model;
        datalist.appendChild(opt);
      });
      if (modelInput) {
        modelInput.placeholder = `e.g. ${models.slice(0, 3).join(", ")}`;
      }
    } else {
      Object.keys(VEHICLE_TAXONOMY).forEach(make => {
        const taxonomy = VEHICLE_TAXONOMY[make];
        if (taxonomy && Array.isArray(taxonomy.models)) {
          taxonomy.models.forEach(model => {
            const opt = document.createElement("option");
            opt.value = `${make} ${model}`;
            datalist.appendChild(opt);
          });
        }
      });
      if (modelInput) {
        modelInput.placeholder = "e.g. Civic, CR-V, Corolla";
      }
    }
  }

  switchAdminTab(tab) {
    document.querySelectorAll("#admin-sidebar .dashboard-menu-item").forEach(el => el.classList.remove("active"));
    document.querySelectorAll("#admin-dashboard-content .dashboard-tab-panel").forEach(el => el.style.display = "none");

    const menuMap = {
      overview: "db-menu-admin-overview",
      merchants: "db-menu-admin-merchants",
      listings: "db-menu-admin-listings",
      taxonomy: "db-menu-admin-taxonomy",
      reports: "db-menu-admin-reports",
      logs: "db-menu-admin-logs"
    };

    const panelMap = {
      overview: "admin-panel-overview",
      merchants: "admin-panel-merchants",
      listings: "admin-panel-listings",
      taxonomy: "admin-panel-taxonomy",
      reports: "admin-panel-reports",
      logs: "admin-panel-logs"
    };

    if (menuMap[tab] && panelMap[tab]) {
      const menuItem = document.getElementById(menuMap[tab]);
      const panelItem = document.getElementById(panelMap[tab]);
      if (menuItem) menuItem.classList.add("active");
      if (panelItem) panelItem.style.display = "block";
    }

    if (tab === "overview") {
      this.renderAdminOverview();
    } else if (tab === "merchants") {
      this.renderAdminMerchants();
    } else if (tab === "listings") {
      this.renderAdminListings();
    } else if (tab === "taxonomy") {
      this.renderAdminTaxonomy();
    } else if (tab === "reports") {
      this.renderAdminReports();
    } else if (tab === "logs") {
      this.renderAdminAuditLogs();
    }
  }

  renderAdminOverview() {
    // Total Merchants
    const merchantsCount = this.merchants.length;
    const merchantsEl = document.getElementById("admin-metric-merchants");
    if (merchantsEl) merchantsEl.textContent = merchantsCount;

    // Total Listings
    const listingsCount = this.products.length;
    const listingsEl = document.getElementById("admin-metric-listings");
    if (listingsEl) listingsEl.textContent = listingsCount;

    // Aggregated views
    const totalViews = this.products.reduce((acc, p) => acc + (p.views || 0), 0);
    const viewsEl = document.getElementById("admin-metric-views");
    if (viewsEl) viewsEl.textContent = totalViews.toLocaleString();

    // Open reports
    const savedReports = localStorage.getItem("ao_reported_listings");
    const reports = savedReports ? JSON.parse(savedReports) : [];
    const reportsEl = document.getElementById("admin-metric-reports");
    if (reportsEl) reportsEl.textContent = reports.length;

    // Listings Breakdown Counts
    const liveCount = this.products.filter(p => p.status === "Live").length;
    const pendingCount = this.products.filter(p => p.status === "Pending Review").length;
    const hiddenCount = this.products.filter(p => p.status === "Hidden").length;
    const oosCount = this.products.filter(p => p.stock === "Out of Stock").length;

    const elLive = document.getElementById("analytics-count-live");
    const elPending = document.getElementById("analytics-count-pending");
    const elHidden = document.getElementById("analytics-count-hidden");
    const elOos = document.getElementById("analytics-count-oos");

    if (elLive) elLive.textContent = liveCount;
    if (elPending) elPending.textContent = pendingCount;
    if (elHidden) elHidden.textContent = hiddenCount;
    if (elOos) elOos.textContent = oosCount;

    // Set Pending Count badge next to tab filter
    const elPendingBadge = document.getElementById("admin-listings-count-pending");
    if (elPendingBadge) elPendingBadge.textContent = pendingCount;

    // Lead Clicks Analytics
    const waLeads = parseInt(localStorage.getItem("ao_lead_whatsapp") || "0");
    const mapLeads = parseInt(localStorage.getItem("ao_lead_maps") || "0");

    const elWaLeads = document.getElementById("analytics-lead-whatsapp");
    const elMapLeads = document.getElementById("analytics-lead-maps");

    if (elWaLeads) elWaLeads.textContent = waLeads.toLocaleString();
    if (elMapLeads) elMapLeads.textContent = mapLeads.toLocaleString();

    // Top Category Views
    const catViews = {};
    this.products.forEach(p => {
      if (p.category) {
        catViews[p.category] = (catViews[p.category] || 0) + (p.views || 0);
      }
    });
    const topCats = Object.entries(catViews).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const topCatsContainer = document.getElementById("analytics-top-categories");
    if (topCatsContainer) {
      topCatsContainer.innerHTML = "";
      if (topCats.length === 0) {
        topCatsContainer.innerHTML = `<li style="color:var(--text-muted);">No views recorded.</li>`;
      } else {
        topCats.forEach(([cat, views]) => {
          const li = document.createElement("li");
          li.style.display = "flex";
          li.style.justify = "space-between";
          li.style.padding = "2px 0";
          li.innerHTML = `<span>${cat}</span> <strong style="color:var(--text-muted);">${views}</strong>`;
          topCatsContainer.appendChild(li);
        });
      }
    }

    // Top Brand Views
    const brandViews = {};
    this.products.forEach(p => {
      if (p.brand) {
        brandViews[p.brand] = (brandViews[p.brand] || 0) + (p.views || 0);
      }
    });
    const topBrands = Object.entries(brandViews).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const topBrandsContainer = document.getElementById("analytics-top-brands");
    if (topBrandsContainer) {
      topBrandsContainer.innerHTML = "";
      if (topBrands.length === 0) {
        topBrandsContainer.innerHTML = `<li style="color:var(--text-muted);">No views recorded.</li>`;
      } else {
        topBrands.forEach(([brand, views]) => {
          const li = document.createElement("li");
          li.style.display = "flex";
          li.style.justify = "space-between";
          li.style.padding = "2px 0";
          li.innerHTML = `<span>${brand}</span> <strong style="color:var(--text-muted);">${views}</strong>`;
          topBrandsContainer.appendChild(li);
        });
      }
    }

    // Bind settings elements state
    const checkboxPre = document.getElementById("admin-setting-premoderation");
    if (checkboxPre) checkboxPre.checked = this.premoderation;

    const checkboxBanner = document.getElementById("admin-setting-banner-toggle");
    if (checkboxBanner) checkboxBanner.checked = this.announcement.visible;

    const inputBannerText = document.getElementById("admin-setting-banner-text");
    if (inputBannerText) inputBannerText.value = this.announcement.text;
  }

  renderAdminMerchants() {
    const tbody = document.getElementById("admin-merchants-table-body");
    if (!tbody) return;

    const searchInput = document.getElementById("admin-merchants-search");
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

    tbody.innerHTML = "";

    const filtered = this.merchants.filter(m => {
      if (!query) return true;
      const shopName = (m.shopName || "").toLowerCase();
      const phone = (m.phone || "").toLowerCase();
      const email = (m.email || "").toLowerCase();
      const location = (m.location || "").toLowerCase();
      const specialty = (m.specialty || "").toLowerCase();
      return shopName.includes(query) || phone.includes(query) || email.includes(query) || location.includes(query) || specialty.includes(query);
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:2rem 1rem; color:var(--text-muted);">${query ? `No merchants matching "${query}".` : "No onboarded merchants yet."}</td></tr>`;
      return;
    }

    filtered.forEach(m => {
      const tr = document.createElement("tr");
      
      const detailsCell = `
        <div style="display:flex; flex-direction:column; gap:0.25rem;">
          <strong style="color:var(--charcoal);">${m.shopName} ${m.status === "Suspended" ? '<span class="badge badge-oos" style="font-size:0.65rem; padding:1px 4px;">SUSPENDED</span>' : ""}</strong>
          <span style="font-size:0.8rem; color:var(--text-muted);"><i class="fa-solid fa-phone"></i> ${m.phone} | <i class="fa-solid fa-envelope"></i> ${m.email}</span>
          <span style="font-size:0.75rem; display:inline-block; max-width:max-content; background:var(--bg-light); padding:2px 6px; border-radius:4px; font-weight:600; color:var(--primary-color);">${m.specialty.toUpperCase()}</span>
        </div>
      `;
      
      const locationCell = `
        <div style="display:flex; flex-direction:column; gap:0.15rem; font-size:0.85rem;">
          <span>${m.location}</span>
          <span style="font-size:0.75rem; color:var(--text-muted);"><i class="fa-solid fa-map-pin"></i> ${m.coordinates}</span>
        </div>
      `;

      const notes = m.verificationNotes ? `<div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.25rem; border-left:2px solid var(--accent-color); padding-left:4px; max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${m.verificationNotes}">${m.verificationNotes}</div>` : "";
      const verificationCell = `
        <div style="display:flex; flex-direction:column; align-items:flex-start; gap:0.25rem;">
          <label style="display:flex; align-items:center; gap:0.25rem; font-size:0.8rem; cursor:pointer; font-weight:600; margin:0;">
            <input type="checkbox" ${m.verified ? "checked" : ""} onchange="app.toggleMerchantVerification('${m.shopName}', this.checked)"> Verified Shop
          </label>
          ${notes}
          <button class="btn btn-secondary btn-sm" style="padding:2px 6px; font-size:0.7rem; display:inline-flex; align-items:center; gap:2px;" onclick="app.editMerchantNotes('${m.shopName}')">
            <i class="fa-solid fa-pen"></i> Review Notes
          </button>
        </div>
      `;
      
      const isSuspended = m.status === "Suspended";
      const actionCell = `
        <div style="display:flex; gap:0.35rem;">
          <button class="btn btn-secondary btn-sm" style="color:${isSuspended ? "var(--whatsapp-color)" : "var(--accent-color)"}; border-color:${isSuspended ? "var(--whatsapp-color)" : "var(--accent-color)"}; padding:4px 8px; font-size:0.75rem;" onclick="app.toggleMerchantSuspension('${m.shopName}')">
            <i class="fa-solid ${isSuspended ? "fa-play" : "fa-pause"}"></i> ${isSuspended ? "Unsuspend" : "Suspend"}
          </button>
          <button class="btn btn-secondary btn-sm" style="color:#DC2626; border-color:#FCA5A5; padding:4px 8px; font-size:0.75rem;" onclick="app.deleteMerchant('${m.shopName}')">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </div>
      `;
      
      tr.innerHTML = `<td>${detailsCell}</td><td>${locationCell}</td><td>${verificationCell}</td><td>${actionCell}</td>`;
      tbody.appendChild(tr);
    });
  }

  toggleMerchantSuspension(shopName) {
    const merchant = this.merchants.find(m => m.shopName === shopName);
    if (!merchant) return;

    const isSuspended = merchant.status === "Suspended";
    merchant.status = isSuspended ? "Active" : "Suspended";
    localStorage.setItem("ao_marketplace_merchants", JSON.stringify(this.merchants));

    // Update all listings for this merchant
    this.products.forEach(p => {
      if (p.merchant && p.merchant.shopName === shopName) {
        p.status = isSuspended ? "Live" : "Hidden";
      }
    });
    this.saveProductsToStorage();

    this.showToast(`Merchant "${shopName}" is now ${merchant.status}.`, "success");
    this.logAdminAction("SETTINGS_CHANGE", shopName, `Merchant status set to ${merchant.status}`);
    
    this.renderAdminMerchants();
    this.renderAdminOverview();
    this.renderCatalog();
  }

  onboardMerchant(event) {
    event.preventDefault();

    const shopName = document.getElementById("onboard-merchant-shop").value.trim();
    const phone = document.getElementById("onboard-merchant-phone").value.trim();
    const email = document.getElementById("onboard-merchant-email").value.trim();
    const specialty = document.getElementById("onboard-merchant-specialty").value;
    const location = document.getElementById("onboard-merchant-location").value.trim();
    const coords = document.getElementById("onboard-merchant-coords").value.trim();
    const desc = document.getElementById("onboard-merchant-desc").value.trim();

    if (this.merchants.some(m => m.shopName.toLowerCase() === shopName.toLowerCase())) {
      this.showToast("A merchant with this shop name already exists.", "error");
      return;
    }
    if (this.merchants.some(m => m.email.toLowerCase() === email.toLowerCase())) {
      this.showToast("A merchant with this email already exists.", "error");
      return;
    }

    const passcode = "AO-" + Math.floor(1000 + Math.random() * 9000);

    const newMerchant = {
      shopName: shopName,
      phone: phone,
      email: email,
      specialty: specialty,
      location: location,
      coordinates: coords || "5.5562, -0.2284",
      description: desc || `${shopName} — Quality auto parts and accessories at Abossey Okai.`,
      avatar: null,
      verified: true,
      passcode: passcode,
      status: "Active",
      since: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })
    };

    this.merchants.push(newMerchant);
    localStorage.setItem("ao_marketplace_merchants", JSON.stringify(this.merchants));
    
    document.getElementById("admin-onboard-merchant-form").reset();
    
    // Clear active map sector classes
    document.querySelectorAll(".market-sector").forEach(sec => {
      sec.classList.remove("active");
      sec.style.borderColor = "#E2E8F0";
      sec.style.background = "#fff";
      sec.style.color = "var(--charcoal)";
    });

    this.logAdminAction("MERCHANT_ONBOARD", shopName, `Dealer registered with phone: ${phone}, email: ${email}, passcode: ${passcode}`);
    this.showToast(`Successfully onboarded "${shopName}" as a verified dealer!`, "success");
    
    // Show onboarding success details panel
    document.getElementById("success-shop-name").textContent = shopName;
    document.getElementById("success-shop-email").textContent = email;
    document.getElementById("success-shop-phone").textContent = phone;
    document.getElementById("success-shop-location").textContent = location;
    document.getElementById("success-shop-passcode").textContent = passcode;

    const waBtn = document.getElementById("btn-send-whatsapp-invite");
    if (waBtn) {
      waBtn.onclick = () => {
        const message = `Hello! Your shop "${shopName}" is now registered on ABBOSSEY OKAI MAGAZINE.\n\nLogin Email: ${email}\nStall Location: ${location}\nPasscode: ${passcode}\n\nAccess the portal here: http://localhost:5173/`;
        const encoded = encodeURIComponent(message);
        window.open(`https://api.whatsapp.com/send/?phone=${phone}&text=${encoded}`, '_blank');
      };
    }

    document.getElementById("onboard-success-modal").style.display = "flex";

    this.renderAdminMerchants();
    this.renderAdminOverview();
  }

  deleteMerchant(shopName) {
    if (!confirm(`Are you sure you want to delete merchant "${shopName}"? This will also delete all their product listings permanently.`)) return;

    this.merchants = this.merchants.filter(m => m.shopName !== shopName);
    localStorage.setItem("ao_marketplace_merchants", JSON.stringify(this.merchants));

    this.products = this.products.filter(p => p.merchant.shopName !== shopName);
    this.saveProductsToStorage();

    this.logAdminAction("MERCHANT_DELETE", shopName, "Merchant and all listings deleted permanently");
    this.showToast(`Deleted merchant "${shopName}" and all associated listings.`, "success");
    this.renderAdminMerchants();
    this.renderAdminOverview();
    this.renderCatalog();
  }

  renderAdminListings() {
    const tbody = document.getElementById("admin-listings-table-body");
    if (!tbody) return;

    const searchVal = document.getElementById("admin-listings-search").value.trim().toLowerCase();

    const filtered = this.products.filter(p => {
      // 1. Status filters
      if (this.adminListingsFilter !== "all") {
        if (this.adminListingsFilter === "oos") {
          if (p.stock !== "Out of Stock") return false;
        } else {
          if (p.status !== this.adminListingsFilter) return false;
        }
      }

      // 2. Search values
      if (!searchVal) return true;
      return p.name.toLowerCase().includes(searchVal) || 
             p.brand.toLowerCase().includes(searchVal) || 
             p.merchant.shopName.toLowerCase().includes(searchVal) || 
             (p.category && p.category.toLowerCase().includes(searchVal));
    });

    tbody.innerHTML = "";
    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; padding:2rem 1rem; color:var(--text-muted);">No products match your criteria.</td></tr>`;
      return;
    }

    filtered.forEach(p => {
      const tr = document.createElement("tr");

      let imgTag = "";
      if (p.images && p.images.length > 0) {
        imgTag = `<img src="${p.images[0]}" class="table-product-img" style="width:36px; height:36px; border-radius:4px; object-fit:cover; margin-right:8px;" alt="${p.name}">`;
      } else {
        imgTag = `<div class="table-product-img" style="width:36px; height:36px; border-radius:4px; background:#F1F5F9; display:flex; align-items:center; justify-content:center; font-size:1.1rem; margin-right:8px;">${p.mainType === 'parts' ? '⚙️' : '🔌'}</div>`;
      }

      let statusBadgeClass = "badge-new";
      if (p.status === "Live") statusBadgeClass = "badge-instock";
      if (p.status === "Hidden") statusBadgeClass = "badge-stock";
      if (p.status === "Pending Review") statusBadgeClass = "badge-refurbished";
      if (p.stock === "Out of Stock") statusBadgeClass = "badge-oos";

      const infoCell = `
        <div style="display:flex; align-items:center;">
          ${imgTag}
          <div style="display:flex; flex-direction:column;">
            <strong style="font-size:0.9rem; color:var(--charcoal);">${p.name}</strong>
            <span style="font-size:0.75rem; color:var(--text-muted);">${p.brand} &bull; ₵${p.price.toLocaleString()}</span>
            <div style="margin-top: 2px;">
              <span class="badge ${statusBadgeClass}" style="font-size:0.65rem; padding:1px 4px;">${p.status}</span>
            </div>
          </div>
        </div>
      `;

      const sellerCell = `
        <div style="display:flex; flex-direction:column;">
          <strong style="font-size:0.85rem; color:var(--primary-color);">${p.merchant.shopName}</strong>
          <span style="font-size:0.75rem; color:var(--text-muted);"><i class="fa-solid fa-phone"></i> ${p.merchant.phone}</span>
        </div>
      `;

      const stockBadgeClass = p.stock === "In Stock" ? "badge-instock" : "badge-oos";
      
      let statusActionBtn = "";
      if (p.status === "Pending Review") {
        statusActionBtn = `
          <button class="btn btn-secondary btn-sm" style="color:var(--whatsapp-color); border-color:var(--whatsapp-color); padding:3px 6px; font-size:0.7rem;" onclick="app.approveAdminListing('${p.id}')">
            <i class="fa-solid fa-check"></i> Approve
          </button>
          <button class="btn btn-secondary btn-sm" style="color:#DC2626; border-color:#FCA5A5; padding:3px 6px; font-size:0.7rem;" onclick="app.rejectAdminListing('${p.id}')">
            <i class="fa-solid fa-xmark"></i> Reject
          </button>
        `;
      } else {
        const isLive = p.status === "Live";
        statusActionBtn = `
          <button class="btn btn-secondary btn-sm" style="color:${isLive ? "var(--accent-color)" : "var(--whatsapp-color)"}; border-color:${isLive ? "var(--accent-color)" : "var(--whatsapp-color)"}; padding:3px 6px; font-size:0.7rem;" onclick="app.toggleAdminListingVisibility('${p.id}')">
            <i class="fa-solid ${isLive ? "fa-eye-slash" : "fa-eye"}"></i> ${isLive ? "Hide" : "Publish"}
          </button>
        `;
      }

      const actionCell = `
        <div style="display:flex; align-items:center; gap:0.35rem; flex-wrap:wrap;">
          <span class="badge ${stockBadgeClass}" style="cursor:pointer; font-size:0.7rem; padding:3px 6px;" onclick="app.toggleAdminListingStock('${p.id}')">${p.stock}</span>
          ${statusActionBtn}
          <button class="btn btn-secondary btn-sm" style="padding:3px 6px; font-size:0.7rem;" onclick="app.openProductForm('${p.id}')">
            <i class="fa-solid fa-pen"></i> Edit
          </button>
          <button class="btn btn-secondary btn-sm" style="color:#DC2626; border-color:#FCA5A5; padding:3px 6px; font-size:0.7rem;" onclick="app.deleteAdminListing('${p.id}')">
            <i class="fa-solid fa-trash-can"></i> Takedown
          </button>
        </div>
      `;

      tr.innerHTML = `<td>${infoCell}</td><td>${sellerCell}</td><td>${actionCell}</td>`;
      tbody.appendChild(tr);
    });
  }

  approveAdminListing(id) {
    const item = this.products.find(p => p.id === id);
    if (!item) return;
    
    item.status = "Live";
    this.saveProductsToStorage();
    this.showToast(`Listing "${item.name}" approved successfully!`, "success");
    this.logAdminAction("LISTING_APPROVED", item.name, `Approved pending listing from ${item.merchant.shopName}`);
    
    this.renderAdminListings();
    this.renderAdminOverview();
    this.renderCatalog();
  }

  rejectAdminListing(id) {
    const item = this.products.find(p => p.id === id);
    if (!item) return;

    const reason = prompt(`Enter rejection feedback/reason for "${item.name}":`, "Please upload a clearer image of the part number.");
    if (reason === null) return;

    item.status = "Hidden";
    item.rejectionReason = reason;
    this.saveProductsToStorage();
    
    this.showToast(`Listing "${item.name}" rejected.`, "success");
    this.logAdminAction("LISTING_REJECTED", item.name, `Rejected listing from ${item.merchant.shopName}. Reason: ${reason}`);

    this.renderAdminListings();
    this.renderAdminOverview();
    this.renderCatalog();
  }

  toggleAdminListingVisibility(id) {
    const item = this.products.find(p => p.id === id);
    if (!item) return;

    const prevStatus = item.status;
    item.status = item.status === "Live" ? "Hidden" : "Live";
    this.saveProductsToStorage();
    
    this.showToast(`Listing visibility set to ${item.status}.`, "success");
    this.logAdminAction("SETTINGS_CHANGE", item.name, `Visibility status changed from ${prevStatus} to ${item.status}`);
    
    this.renderAdminListings();
    this.renderAdminOverview();
    this.renderCatalog();
  }

  toggleAdminListingStock(id) {
    const item = this.products.find(p => p.id === id);
    if (!item) return;

    item.stock = item.stock === "In Stock" ? "Out of Stock" : "In Stock";
    this.saveProductsToStorage();
    
    this.logAdminAction("LISTING_STOCK_TOGGLE", item.name, `Stock status set to ${item.stock}`);
    this.renderAdminListings();
    this.renderAdminOverview();
    this.renderCatalog();
    this.showToast(`Listing stock status set to ${item.stock}`, "success");
  }

  deleteAdminListing(id) {
    if (!confirm("Are you sure you want to take down this listing permanently?")) return;

    const idx = this.products.findIndex(p => p.id === id);
    if (idx === -1) return;

    const name = this.products[idx].name;
    this.products.splice(idx, 1);
    this.saveProductsToStorage();

    this.logAdminAction("LISTING_DELETE", name, "Listing taken down permanently by admin");
    this.showToast(`Successfully took down listing: "${name}"`, "success");
    this.renderAdminListings();
    this.renderAdminOverview();
    this.renderCatalog();
  }

  renderAdminReports() {
    const tbody = document.getElementById("admin-reports-table-body");
    if (!tbody) return;

    const savedReports = localStorage.getItem("ao_reported_listings");
    const reports = savedReports ? JSON.parse(savedReports) : [];

    tbody.innerHTML = "";
    if (reports.length === 0) {
      tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; padding:2rem 1rem; color:var(--text-muted);">No unresolved buyer reports.</td></tr>`;
      return;
    }

    reports.forEach(r => {
      const tr = document.createElement("tr");

      const infoCell = `
        <div style="display:flex; flex-direction:column;">
          <strong style="font-size:0.85rem; color:var(--charcoal);">${r.productName}</strong>
          <span style="font-size:0.75rem; color:var(--text-muted);"><i class="fa-solid fa-shop"></i> Seller: ${r.shopName}</span>
        </div>
      `;

      const reasonCell = `
        <div style="display:flex; flex-direction:column; font-size:0.85rem;">
          <span style="color:#DC2626; font-weight:600;"><i class="fa-solid fa-triangle-exclamation"></i> ${r.reason}</span>
          <span style="font-size:0.75rem; color:var(--text-muted);">${r.date}</span>
        </div>
      `;

      const actionCell = `
        <div style="display:flex; gap:0.35rem; flex-wrap:wrap;">
          <button class="btn btn-secondary btn-sm" style="color:var(--whatsapp-color); border-color:var(--whatsapp-color); padding:3px 6px; font-size:0.75rem;" onclick="app.dismissAdminReport('${r.id}')">
            <i class="fa-solid fa-check"></i> Dismiss
          </button>
          <button class="btn btn-secondary btn-sm" style="color:var(--accent-color); border-color:var(--accent-color); padding:3px 6px; font-size:0.75rem;" onclick="app.warnMerchantFromReport('${r.id}', '${r.shopName}')">
            <i class="fa-solid fa-circle-exclamation"></i> Warn Seller
          </button>
          <button class="btn btn-secondary btn-sm" style="color:#DC2626; border-color:#FCA5A5; padding:3px 6px; font-size:0.75rem;" onclick="app.resolveAdminReportTakedown('${r.id}', '${r.productId}')">
            <i class="fa-solid fa-trash"></i> Takedown
          </button>
        </div>
      `;

      tr.innerHTML = `<td>${infoCell}</td><td>${reasonCell}</td><td>${actionCell}</td>`;
      tbody.appendChild(tr);
    });
  }

  dismissAdminReport(reportId) {
    const savedReports = localStorage.getItem("ao_reported_listings");
    let reports = savedReports ? JSON.parse(savedReports) : [];
    const report = reports.find(r => r.id === reportId);
    reports = reports.filter(r => r.id !== reportId);
    localStorage.setItem("ao_reported_listings", JSON.stringify(reports));

    this.showToast("Report dismissed.", "success");
    this.logAdminAction("REPORT_DISMISS", report ? report.productName : "Unknown Product", "Admin dismissed buyer report flag");
    this.renderAdminReports();
    this.renderAdminOverview();
  }

  resolveAdminReportTakedown(reportId, productId) {
    const item = this.products.find(p => p.id === productId);
    const productName = item ? item.name : "Unknown Product";

    this.products = this.products.filter(p => p.id !== productId);
    this.saveProductsToStorage();

    const savedReports = localStorage.getItem("ao_reported_listings");
    let reports = savedReports ? JSON.parse(savedReports) : [];
    reports = reports.filter(r => r.id !== reportId);
    localStorage.setItem("ao_reported_listings", JSON.stringify(reports));

    this.showToast("Listing taken down and report resolved.", "success");
    this.logAdminAction("REPORT_TAKEDOWN", productName, `Listing taken down permanently due to buyer flag`);
    this.renderAdminReports();
    this.renderAdminListings();
    this.renderAdminOverview();
    this.renderCatalog();
  }

  warnMerchantFromReport(reportId, shopName) {
    const merchant = this.merchants.find(m => m.shopName === shopName);
    if (!merchant) return;

    merchant.warnings = (merchant.warnings || 0) + 1;
    localStorage.setItem("ao_marketplace_merchants", JSON.stringify(this.merchants));

    const savedReports = localStorage.getItem("ao_reported_listings");
    let reports = savedReports ? JSON.parse(savedReports) : [];
    const report = reports.find(r => r.id === reportId);
    reports = reports.filter(r => r.id !== reportId);
    localStorage.setItem("ao_reported_listings", JSON.stringify(reports));

    this.showToast(`Warning issued to dealer "${shopName}". Total warnings: ${merchant.warnings}`, "success");
    this.logAdminAction("SETTINGS_CHANGE", shopName, `Warning issued due to listing flag on "${report ? report.productName : "unknown listing"}". Total warnings: ${merchant.warnings}`);
    
    this.renderAdminReports();
    this.renderAdminOverview();
    this.renderAdminMerchants();
  }

  renderAdminTaxonomy() {
    const makeSelect = document.getElementById("admin-select-make-edit");
    if (!makeSelect) return;

    makeSelect.innerHTML = "";
    Object.keys(VEHICLE_TAXONOMY).forEach(make => {
      const opt = document.createElement("option");
      opt.value = make;
      opt.textContent = make;
      makeSelect.appendChild(opt);
    });

    this.onAdminTaxonomyMakeChange();
    this.renderAdminCategoriesLists();
    this.renderAdminBrandsList();
  }

  onAdminTaxonomyMakeChange() {
    const makeSelect = document.getElementById("admin-select-make-edit");
    if (!makeSelect) return;
    const selectedMake = makeSelect.value;
    const modelsDisplay = document.getElementById("admin-models-list-display");
    if (!modelsDisplay || !selectedMake || !VEHICLE_TAXONOMY[selectedMake]) return;

    modelsDisplay.innerHTML = "";
    const models = VEHICLE_TAXONOMY[selectedMake].models;
    if (models.length === 0) {
      modelsDisplay.innerHTML = `<span style="font-size:0.75rem; color:var(--text-muted);">No models added yet.</span>`;
      return;
    }

    models.forEach(model => {
      const pill = document.createElement("span");
      pill.className = "settings-tag";
      pill.style.cssText = "display:inline-flex; align-items:center; gap:0.25rem; font-size:0.75rem; background:#E2E8F0; padding:2px 8px; border-radius:12px; margin:2px;";
      pill.innerHTML = `${model} <i class="fa-solid fa-times" style="cursor:pointer; color:var(--text-muted);" onclick="app.deleteAdminModel('${selectedMake}', '${model}')"></i>`;
      modelsDisplay.appendChild(pill);
    });
  }

  addAdminMake() {
    const input = document.getElementById("admin-new-make-input");
    const value = input.value.trim();
    if (!value) return;

    if (VEHICLE_TAXONOMY[value]) {
      this.showToast("Make already exists.", "error");
      return;
    }

    VEHICLE_TAXONOMY[value] = {
      models: [],
      years: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"]
    };
    
    localStorage.setItem("ao_vehicle_taxonomy", JSON.stringify(VEHICLE_TAXONOMY));
    input.value = "";
    this.showToast(`Make "${value}" added successfully.`, "success");
    this.logAdminAction("TAXONOMY_ADD", `Make: ${value}`, "Added vehicle make to settings");
    this.renderAdminTaxonomy();
    this.populateSelectOptions();
  }

  addAdminModel() {
    const selectedMake = document.getElementById("admin-select-make-edit").value;
    const input = document.getElementById("admin-new-model-input");
    const value = input.value.trim();
    if (!selectedMake || !value) return;

    if (VEHICLE_TAXONOMY[selectedMake].models.includes(value)) {
      this.showToast("Model already exists for this make.", "error");
      return;
    }

    VEHICLE_TAXONOMY[selectedMake].models.push(value);
    localStorage.setItem("ao_vehicle_taxonomy", JSON.stringify(VEHICLE_TAXONOMY));
    input.value = "";
    this.showToast(`Model "${value}" added for ${selectedMake}.`, "success");
    this.logAdminAction("TAXONOMY_ADD", `Model: ${selectedMake} ${value}`, "Added model to vehicle make");
    this.onAdminTaxonomyMakeChange();
    this.populateSelectOptions();
  }

  deleteAdminModel(make, model) {
    if (!confirm(`Are you sure you want to remove model "${model}" from ${make}?`)) return;

    VEHICLE_TAXONOMY[make].models = VEHICLE_TAXONOMY[make].models.filter(m => m !== model);
    localStorage.setItem("ao_vehicle_taxonomy", JSON.stringify(VEHICLE_TAXONOMY));
    this.showToast(`Model "${model}" removed.`, "success");
    this.logAdminAction("TAXONOMY_DELETE", `Model: ${make} ${model}`, "Removed model from vehicle make");
    this.onAdminTaxonomyMakeChange();
    this.populateSelectOptions();
  }

  renderAdminCategoriesLists() {
    const partList = document.getElementById("admin-part-categories-list");
    const accList = document.getElementById("admin-acc-categories-list");
    
    if (partList) {
      partList.innerHTML = "";
      SPARE_PART_CATEGORIES.forEach(cat => {
        const div = document.createElement("div");
        div.style.cssText = "display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; padding:4px 0; border-bottom:1px solid #F1F5F9;";
        div.innerHTML = `<span style="flex:1;">${cat}</span> <i class="fa-solid fa-trash-can" style="cursor:pointer; color:#DC2626;" onclick="app.deleteAdminPartCategory('${cat}')"></i>`;
        partList.appendChild(div);
      });
    }

    if (accList) {
      accList.innerHTML = "";
      CAR_ACCESSORY_CATEGORIES.forEach(cat => {
        const div = document.createElement("div");
        div.style.cssText = "display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; padding:4px 0; border-bottom:1px solid #F1F5F9;";
        div.innerHTML = `<span style="flex:1;">${cat}</span> <i class="fa-solid fa-trash-can" style="cursor:pointer; color:#DC2626;" onclick="app.deleteAdminAccessoryCategory('${cat}')"></i>`;
        accList.appendChild(div);
      });
    }
  }

  addAdminPartCategory() {
    const input = document.getElementById("admin-new-part-cat");
    const val = input.value.trim();
    if (!val) return;

    if (SPARE_PART_CATEGORIES.includes(val)) {
      this.showToast("Category already exists.", "error");
      return;
    }

    SPARE_PART_CATEGORIES.push(val);
    localStorage.setItem("ao_parts_categories", JSON.stringify(SPARE_PART_CATEGORIES));
    input.value = "";
    this.showToast(`Category "${val}" added.`, "success");
    this.logAdminAction("TAXONOMY_ADD", `Parts Category: ${val}`, "Added spare parts category");
    this.renderAdminCategoriesLists();
    this.populateSelectOptions();
  }

  deleteAdminPartCategory(cat) {
    if (!confirm(`Are you sure you want to remove parts category "${cat}"?`)) return;
    const idx = SPARE_PART_CATEGORIES.indexOf(cat);
    if (idx !== -1) {
      SPARE_PART_CATEGORIES.splice(idx, 1);
      localStorage.setItem("ao_parts_categories", JSON.stringify(SPARE_PART_CATEGORIES));
      this.showToast(`Category "${cat}" removed.`, "success");
      this.logAdminAction("TAXONOMY_DELETE", `Parts Category: ${cat}`, "Removed spare parts category");
      this.renderAdminCategoriesLists();
      this.populateSelectOptions();
    }
  }

  addAdminAccessoryCategory() {
    const input = document.getElementById("admin-new-acc-cat");
    const val = input.value.trim();
    if (!val) return;

    if (CAR_ACCESSORY_CATEGORIES.includes(val)) {
      this.showToast("Category already exists.", "error");
      return;
    }

    CAR_ACCESSORY_CATEGORIES.push(val);
    localStorage.setItem("ao_accessory_categories", JSON.stringify(CAR_ACCESSORY_CATEGORIES));
    input.value = "";
    this.showToast(`Category "${val}" added.`, "success");
    this.logAdminAction("TAXONOMY_ADD", `Accessory Category: ${val}`, "Added car accessory category");
    this.renderAdminCategoriesLists();
    this.populateSelectOptions();
  }

  deleteAdminAccessoryCategory(cat) {
    if (!confirm(`Are you sure you want to remove accessory category "${cat}"?`)) return;
    const idx = CAR_ACCESSORY_CATEGORIES.indexOf(cat);
    if (idx !== -1) {
      CAR_ACCESSORY_CATEGORIES.splice(idx, 1);
      localStorage.setItem("ao_accessory_categories", JSON.stringify(CAR_ACCESSORY_CATEGORIES));
      this.showToast(`Category "${cat}" removed.`, "success");
      this.logAdminAction("TAXONOMY_DELETE", `Accessory Category: ${cat}`, "Removed car accessory category");
      this.renderAdminCategoriesLists();
      this.populateSelectOptions();
    }
  }

  toggleSearchModal(show) {
    const modal = document.getElementById("search-modal");
    if (!modal) return;
    
    if (show) {
      modal.style.display = "flex";
      // Allow display flex to paint before adding active class for animation
      setTimeout(() => {
        modal.classList.add("active");
      }, 10);
      const searchInput = document.getElementById("main-search-input");
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 300);
      }
    } else {
      modal.classList.remove("active");
      // Wait for fade transition to finish before hiding display
      setTimeout(() => {
        if (!modal.classList.contains("active")) {
          modal.style.display = "none";
        }
      }, 250);
    }
  }

  toggleBrandSearchModal(show, brandName) {
    const modal = document.getElementById("brand-search-modal");
    if (!modal) return;
    
    if (show) {
      this.selectedBrandForSearch = brandName;
      
      const modalLogo = document.getElementById("brand-modal-logo");
      const modalName = document.getElementById("brand-modal-name");
      const searchApplyBtn = document.getElementById("brand-parts-search-apply");
      
      // Find logo file name
      const brandInfo = this.allBrandsData.find(b => b.name.toLowerCase() === brandName.toLowerCase()) || { logo: "default-logo.png" };
      
      if (modalLogo) modalLogo.src = `/assets/images/brands/all/${brandInfo.logo}?v=3`;
      if (modalName) modalName.textContent = brandName;
      if (searchApplyBtn) {
        searchApplyBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> Find Parts for ${brandName}`;
      }
      
      // Reset input fields
      const partInput = document.getElementById("brand-part-search-input");
      if (partInput) partInput.value = "";
      
      // Populate selectors
      this.populateBrandModalSelectors(brandName);
      
      // Default search mode is parts
      this.setBrandSearchMode("parts");
      
      modal.style.display = "flex";
      setTimeout(() => {
        modal.classList.add("active");
      }, 10);
      if (partInput) {
        setTimeout(() => partInput.focus(), 300);
      }
    } else {
      modal.classList.remove("active");
      setTimeout(() => {
        if (!modal.classList.contains("active")) {
          modal.style.display = "none";
        }
      }, 250);
    }
  }

  getTaxonomyForBrand(brandName) {
    if (!brandName) return { models: [], years: [] };
    const nameLower = brandName.toLowerCase();
    
    // Map common names/variations
    let lookupKey = brandName;
    if (nameLower === "mercedes-benz" || nameLower === "mercedes") {
      lookupKey = "Mercedes";
    }
    
    if (VEHICLE_TAXONOMY[lookupKey]) {
      return VEHICLE_TAXONOMY[lookupKey];
    }
    
    // Check case-insensitively
    const exactKey = Object.keys(VEHICLE_TAXONOMY).find(k => k.toLowerCase() === nameLower);
    if (exactKey) {
      return VEHICLE_TAXONOMY[exactKey];
    }
    
    // Fallback: mock models based on brand category
    const isTruckOrCommercial = this.allBrandsData.find(b => b.name.toLowerCase() === nameLower)?.category === "commercial";
    
    if (nameLower === "acura") {
      return { models: ["MDX", "RDX", "TLX", "ILX", "Integra"], years: this.getDefaultYears() };
    } else if (nameLower === "audi") {
      return { models: ["A3", "A4", "A6", "Q5", "Q7", "e-tron"], years: this.getDefaultYears() };
    } else if (nameLower === "byd") {
      return { models: ["Atto 3", "Han", "Tang", "Dolphin", "Seal"], years: this.getDefaultYears() };
    } else if (nameLower === "chevrolet") {
      return { models: ["Cruze", "Malibu", "Equinox", "Silverado", "Camaro"], years: this.getDefaultYears() };
    } else if (nameLower === "chrysler") {
      return { models: ["300", "Pacifica", "Voyager", "Aspen"], years: this.getDefaultYears() };
    } else if (nameLower === "dodge") {
      return { models: ["Charger", "Challenger", "Durango", "Ram 1500"], years: this.getDefaultYears() };
    } else if (nameLower === "jeep") {
      return { models: ["Wrangler", "Grand Cherokee", "Cherokee", "Compass", "Renegade"], years: this.getDefaultYears() };
    } else if (nameLower === "lexus") {
      return { models: ["RX", "NX", "ES", "IS", "GX", "LX"], years: this.getDefaultYears() };
    } else if (nameLower === "mazda") {
      return { models: ["Mazda 3", "Mazda 6", "CX-5", "CX-9", "MX-5 Miata"], years: this.getDefaultYears() };
    } else if (nameLower === "mitsubishi") {
      return { models: ["Lancer", "Outlander", "Pajero", "Mirage", "ASX"], years: this.getDefaultYears() };
    } else if (nameLower === "opel") {
      return { models: ["Astra", "Corsa", "Insignia", "Mokka", "Vectra"], years: this.getDefaultYears() };
    } else if (nameLower === "peugeot") {
      return { models: ["208", "308", "508", "2008", "3008", "5008"], years: this.getDefaultYears() };
    } else if (nameLower === "porsche") {
      return { models: ["911", "Cayenne", "Macan", "Panamera", "Taycan"], years: this.getDefaultYears() };
    } else if (nameLower === "renault") {
      return { models: ["Clio", "Megane", "Captur", "Koleos", "Duster"], years: this.getDefaultYears() };
    } else if (nameLower === "subaru") {
      return { models: ["Impreza", "Legacy", "Outback", "Forester", "WRX"], years: this.getDefaultYears() };
    } else if (nameLower === "suzuki") {
      return { models: ["Swift", "Vitara", "Jimny", "Baleno", "Alto"], years: this.getDefaultYears() };
    } else if (nameLower === "tesla") {
      return { models: ["Model 3", "Model Y", "Model S", "Model X", "Cybertruck"], years: this.getDefaultYears() };
    } else if (nameLower === "volkswagen") {
      return { models: ["Golf", "Passat", "Tiguan", "Touareg", "Polo", "Jetta"], years: this.getDefaultYears() };
    } else if (nameLower === "volvo") {
      return { models: ["S60", "S90", "XC40", "XC60", "XC90"], years: this.getDefaultYears() };
    }
    
    if (isTruckOrCommercial) {
      return {
        models: ["Heavy Duty Truck", "Tractor Head", "Tipper", "Cargo Truck", "Bus Chassis"],
        years: this.getDefaultYears()
      };
    }
    
    return {
      models: ["Series A", "Series B", "Universal Utility", "Custom Concept"],
      years: this.getDefaultYears()
    };
  }

  getDefaultYears() {
    return ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"];
  }

  populateBrandModalSelectors(brandName) {
    const modelSelect = document.getElementById("select-brand-model");
    const yearSelect = document.getElementById("select-brand-year");
    if (!modelSelect || !yearSelect) return;
    
    modelSelect.innerHTML = '<option value="">Choose Model</option>';
    yearSelect.innerHTML = '<option value="">Choose Year</option>';
    yearSelect.disabled = true;
    
    const taxonomy = this.getTaxonomyForBrand(brandName);
    taxonomy.models.forEach(model => {
      modelSelect.innerHTML += `<option value="${model}">${model}</option>`;
    });
  }

  onBrandModelChange() {
    const modelSelect = document.getElementById("select-brand-model");
    const yearSelect = document.getElementById("select-brand-year");
    if (!modelSelect || !yearSelect) return;
    
    const selectedModel = modelSelect.value;
    if (!selectedModel) {
      yearSelect.innerHTML = '<option value="">Choose Year</option>';
      yearSelect.disabled = true;
      return;
    }
    
    yearSelect.disabled = false;
    yearSelect.innerHTML = '<option value="">Choose Year</option>';
    
    const taxonomy = this.getTaxonomyForBrand(this.selectedBrandForSearch);
    taxonomy.years.forEach(year => {
      yearSelect.innerHTML += `<option value="${year}">${year}</option>`;
    });
  }

  setBrandSearchMode(mode) {
    this.brandSearchMode = mode;
    
    const partsTab = document.getElementById("brand-tab-mode-parts");
    const accTab = document.getElementById("brand-tab-mode-accessories");
    const partsSection = document.getElementById("brand-parts-section");
    const accSection = document.getElementById("brand-accessories-section");
    
    if (mode === "parts") {
      partsTab.classList.add("active");
      accTab.classList.remove("active");
      partsSection.style.display = "block";
      accSection.style.display = "none";
    } else {
      partsTab.classList.remove("active");
      accTab.classList.add("active");
      partsSection.style.display = "none";
      accSection.style.display = "block";
    }
  }

  applyBrandPartsSearch() {
    const model = document.getElementById("select-brand-model").value;
    const year = document.getElementById("select-brand-year").value;
    const query = document.getElementById("brand-part-search-input").value.trim();
    
    if (!model || !year) {
      this.showToast("Please select both a model and a year to proceed!", "warning");
      return;
    }
    
    this.activeMainType = "parts";
    
    // Update navbar buttons
    document.getElementById("nav-parts").classList.add("active");
    document.getElementById("nav-accessories").classList.remove("active");
    
    // Filter by vehicle selector parameters
    this.activeFilters.make = this.selectedBrandForSearch;
    this.activeFilters.model = model;
    this.activeFilters.year = year;
    this.activeFilters.partsCategory = ""; // Clear category
    this.activeFilters.brands = []; // Clear brands filter so it doesn't conflict with make compatibility
    
    this.searchQuery = query.toLowerCase();
    
    // Sync storefront search input
    const mainSearchInput = document.getElementById("main-search-input");
    if (mainSearchInput) {
      mainSearchInput.value = query;
    }
    
    // Sync main selector if possible
    const makeSelect = document.getElementById("select-vehicle-make");
    if (makeSelect) {
      // Find exact make match in taxonomy keys
      const exactKey = Object.keys(VEHICLE_TAXONOMY).find(k => k.toLowerCase() === this.selectedBrandForSearch.toLowerCase());
      if (exactKey) {
        makeSelect.value = exactKey;
        this.onMakeChange();
        
        const modelSelect = document.getElementById("select-vehicle-model");
        if (modelSelect) {
          modelSelect.value = model;
          this.onModelChange();
          
          const yearSelect = document.getElementById("select-vehicle-year");
          if (yearSelect) {
            yearSelect.value = year;
          }
        }
      } else {
        makeSelect.value = "";
        this.onMakeChange();
      }
    }
    
    this.renderCatalog();
    this.scrollToMarketplace();
    this.toggleBrandSearchModal(false);
    this.switchAppView("storefront");
    this.showToast(`Showing parts for ${this.selectedBrandForSearch} ${model} ${year}`, "success");
  }

  applyBrandAccessorySearch(category, element) {
    this.activeMainType = "accessories";
    this.selectedAccessoryCat = category;
    
    document.getElementById("nav-parts").classList.remove("active");
    document.getElementById("nav-accessories").classList.add("active");
    
    document.querySelectorAll("#brand-search-card .accessory-cat-card").forEach(c => c.classList.remove("active"));
    if (element) element.classList.add("active");
    
    // Reset vehicle filters
    this.activeFilters.make = "";
    this.activeFilters.model = "";
    this.activeFilters.year = "";
    
    // Filter accessories by brand
    this.activeFilters.brands = [this.selectedBrandForSearch];
    this.activeFilters.accessoryCategory = category;
    
    this.searchQuery = "";
    
    // Clear search input UI
    const mainSearchInput = document.getElementById("main-search-input");
    if (mainSearchInput) mainSearchInput.value = "";
    
    // Sync checkbox in sidebar
    document.querySelectorAll(".brand-filter-checkbox").forEach(cb => {
      cb.checked = (cb.value.toLowerCase() === this.selectedBrandForSearch.toLowerCase());
    });
    
    this.renderCatalog();
    this.scrollToMarketplace();
    this.toggleBrandSearchModal(false);
    this.switchAppView("storefront");
    this.showToast(`Showing ${category} accessories for ${this.selectedBrandForSearch}`, "success");
  }

  showStorefront() {
    this.switchAppView("storefront");
  }

  // Smooth scroll categories tabs to the right when arrow is clicked
  scrollTabsRight() {
    const wrapper = document.getElementById("brands-tabs-wrapper");
    if (wrapper) {
      wrapper.scrollBy({ left: 160, behavior: "smooth" });
    }
  }

  // Render the Brand Directory Cards dynamically
  renderBrandsView() {
    this.brandSearchQuery = this.brandSearchQuery || "";
    this.activeBrandTab = this.activeBrandTab || "all";
    
    const container = document.getElementById("all-brands-grid");
    if (!container) return;
    
    // Filter data
    const filtered = this.allBrandsData.filter(brand => {
      const matchSearch = brand.name.toLowerCase().includes(this.brandSearchQuery.toLowerCase());
      const matchTab = this.activeBrandTab === "all" || brand.category === this.activeBrandTab;
      return matchSearch && matchTab;
    });
    
    // Sort alphabetically
    filtered.sort((a, b) => a.name.localeCompare(b.name));
    
    // Update count text
    const countText = document.getElementById("brands-count-text");
    if (countText) {
      countText.textContent = `Showing ${filtered.length} of ${this.allBrandsData.length} brands`;
    }
    
    // Render cards
    container.innerHTML = filtered.map(brand => `
      <div class="brand-card-item" onclick="app.selectBrandAndRedirect('${brand.name}')">
        <div class="brand-card-logo-box">
          <img src="/assets/images/brands/all/${brand.logo}?v=3" alt="${brand.name}" class="brand-card-logo-img">
        </div>
        <div class="brand-card-name">${brand.name}</div>
      </div>
    `).join("");

    // Bind scroll listener to categories wrapper to hide the scroll arrow indicator near the end
    setTimeout(() => {
      const wrapper = document.getElementById("brands-tabs-wrapper");
      const arrow = document.getElementById("brands-tabs-arrow");
      if (wrapper && arrow) {
        // Reset scroll state on render
        wrapper.scrollLeft = 0;
        arrow.style.opacity = "1";
        arrow.style.pointerEvents = "auto";
        
        wrapper.onscroll = () => {
          const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
          if (wrapper.scrollLeft >= maxScroll - 15) {
            arrow.style.opacity = "0";
            arrow.style.pointerEvents = "none";
          } else {
            arrow.style.opacity = "1";
            arrow.style.pointerEvents = "auto";
          }
        };
      }
    }, 50);
  }

  // Filter the brand directory list in real-time as search input updates
  filterBrandsList() {
    const input = document.getElementById("brand-search-input");
    if (input) {
      this.brandSearchQuery = input.value;
      this.renderBrandsView();
    }
  }

  // Handle category tabs click
  switchBrandTab(tab, element) {
    this.activeBrandTab = tab;
    document.querySelectorAll(".brand-tab-btn").forEach(btn => btn.classList.remove("active"));
    if (element) {
      element.classList.add("active");
    }
    this.renderBrandsView();
  }

  // Select a brand card and filter the storefront marketplace catalog
  selectBrandAndRedirect(brandName) {
    this.toggleBrandSearchModal(true, brandName);
  }
}

// Global hook instantiator
window.app = new AbbosseyOkaiApp();
export default window.app;
