import sql from "./db.js";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("🌱 Seeding database...\n");

  try {
    // ── 1. Create Admin User ────────────────────────────────
    const adminPasswordHash = await bcrypt.hash("G@laxy2012", 12);

    const [adminUser] = await sql`
      INSERT INTO users (email, phone, password_hash, full_name, role)
      VALUES ('korantenghenry2012@gmail.com', '+233000000000', ${adminPasswordHash}, 'Administrator Kwame', 'admin')
      ON CONFLICT (email) DO UPDATE SET password_hash = ${adminPasswordHash}
      RETURNING id
    `;
    console.log("  ✅ Admin user created (id:", adminUser.id, ")");

    // ── 2. Create Merchant Users & Profiles ─────────────────
    const merchantsData = [
      {
        email: "kofi@gmail.com",
        phone: "+233240123456",
        name: "Kofi Mensah",
        shopName: "Kofi Auto Spares",
        location: "Stall A12, Section 3, Abossey Okai",
        coordinates: "5.5562, -0.2284",
        description: "Premium Abossey Okai Dealer specializing in Toyota, Honda, and Nissan parts.",
        specialty: "japanese",
        verified: true,
        since: "Jan 2022"
      },
      {
        email: "hub@gmail.com",
        phone: "+233249998887",
        name: "Kwesi Owusu",
        shopName: "Abossey Okai Shocks Hub",
        location: "Near Ghana Commercial Bank, Abossey Okai",
        coordinates: "5.5558, -0.2291",
        description: "Shock absorbers and suspension specialists for all vehicle makes.",
        specialty: "japanese",
        verified: true,
        since: "Mar 2023"
      },
      {
        email: "junction@gmail.com",
        phone: "+233551234567",
        name: "Ama Boateng",
        shopName: "Electricals Junction Store",
        location: "Stall D45, Electricals Lane, Abossey Okai",
        coordinates: "5.5570, -0.2275",
        description: "Auto electrical parts — alternators, starters, wiring harnesses.",
        specialty: "japanese",
        verified: false,
        since: "Nov 2024"
      },
      {
        email: "soundforce@gmail.com",
        phone: "+233201112222",
        name: "Yaw Asante",
        shopName: "Sound Force Accessories",
        location: "Stall B9, High Street Area, Abossey Okai",
        coordinates: "5.5550, -0.2299",
        description: "Car audio, interior accessories, and tech upgrades.",
        specialty: "accessories",
        verified: true,
        since: "Jul 2021"
      },
      {
        email: "akwasi@gmail.com",
        phone: "+233245554443",
        name: "Akwasi Frimpong",
        shopName: "Akwasi Auto Accessories",
        location: "Opposite Police Container, Abossey Okai",
        coordinates: "5.5566, -0.2268",
        description: "Car covers, exterior protection, and styling accessories.",
        specialty: "accessories",
        verified: false,
        since: "May 2023"
      },
      {
        email: "ofori@gmail.com",
        phone: "+233243332221",
        name: "Ofori Darkwa",
        shopName: "Ofori Cooling Systems",
        location: "Stall F5, Radiator Lane, Abossey Okai",
        coordinates: "5.5559, -0.2280",
        description: "Radiators, condensers, and cooling system parts specialists.",
        specialty: "japanese",
        verified: true,
        since: "Sep 2020"
      },
      {
        email: "eliteparts@gmail.com",
        phone: "+233244111222",
        name: "Elite Parts Team",
        shopName: "Elite Parts Center",
        location: "Stall E18, Main Boulevard, Abossey Okai",
        coordinates: "5.5565, -0.2282",
        description: "Premium European vehicle parts — BMW, Mercedes, Audi specialists.",
        specialty: "european",
        verified: true,
        since: "Jun 2023"
      }
    ];

    const merchantPasswordHash = await bcrypt.hash("merchant123", 12);
    const merchantIdMap = {};

    for (const m of merchantsData) {
      const [user] = await sql`
        INSERT INTO users (email, phone, password_hash, full_name, role)
        VALUES (${m.email}, ${m.phone}, ${merchantPasswordHash}, ${m.name}, 'merchant')
        ON CONFLICT (email) DO UPDATE SET full_name = ${m.name}
        RETURNING id
      `;

      const [merchant] = await sql`
        INSERT INTO merchants (user_id, shop_name, phone, email, location, coordinates, description, specialty, verified, since)
        VALUES (${user.id}, ${m.shopName}, ${m.phone}, ${m.email}, ${m.location}, ${m.coordinates}, ${m.description}, ${m.specialty}, ${m.verified}, ${m.since})
        ON CONFLICT DO NOTHING
        RETURNING id
      `;

      if (merchant) {
        merchantIdMap[m.shopName] = merchant.id;
        console.log(`  ✅ Merchant: ${m.shopName} (id: ${merchant.id})`);
      } else {
        // Already exists, fetch ID
        const [existing] = await sql`SELECT id FROM merchants WHERE shop_name = ${m.shopName}`;
        if (existing) merchantIdMap[m.shopName] = existing.id;
        console.log(`  ⏭️  Merchant already exists: ${m.shopName}`);
      }
    }

    // ── 3. Seed Products ────────────────────────────────────
    const productsData = [
      {
        merchantShop: "Kofi Auto Spares",
        mainType: "parts",
        name: "Ceramic Front Brake Pads Kit",
        brand: "Akebono",
        category: "Brake System",
        condition: "New",
        price: 380,
        stock: "In Stock",
        views: 142,
        description: "Premium Akebono ceramic brake pads offering zero noise, low dust, and exceptional stopping power.",
        compatibility: [
          { make: "Toyota", model: "Corolla", years: "2015-2022" },
          { make: "Toyota", model: "Camry", years: "2016-2021" }
        ]
      },
      {
        merchantShop: "Abossey Okai Shocks Hub",
        mainType: "parts",
        name: "Full Set Shock Absorbers (Front & Rear)",
        brand: "KYB Excel-G",
        category: "Shock Absorbers",
        condition: "New",
        price: 1850,
        stock: "In Stock",
        views: 98,
        description: "Original KYB Excel-G nitrogen gas charged shocks. Designed to restore your Honda's original handling and ride control.",
        compatibility: [
          { make: "Honda", model: "Civic", years: "2012-2018" },
          { make: "Honda", model: "Accord", years: "2013-2019" }
        ]
      },
      {
        merchantShop: "Electricals Junction Store",
        mainType: "parts",
        name: "Replacement Alternator 12V 90A",
        brand: "Denso",
        category: "Electrical",
        condition: "Refurbished",
        price: 750,
        stock: "In Stock",
        views: 67,
        description: "Fully remanufactured original Denso alternator. Bench-tested with new brushes and bearings.",
        compatibility: [
          { make: "Nissan", model: "Almera", years: "2010-2016" }
        ]
      },
      {
        merchantShop: "Sound Force Accessories",
        mainType: "accessories",
        name: "7-Inch Android Touchscreen Car Stereo",
        brand: "Pioneer",
        category: "Audio",
        condition: "New",
        price: 1200,
        stock: "In Stock",
        views: 203,
        description: "Features double-din design, built-in GPS, Bluetooth, Apple CarPlay, and Android Auto.",
        compatibilityText: "Universal Fit"
      },
      {
        merchantShop: "Sound Force Accessories",
        mainType: "accessories",
        name: "Orthopedic Memory Foam Seat Cushion",
        brand: "Sparco",
        category: "Interior",
        condition: "New",
        price: 280,
        stock: "In Stock",
        views: 55,
        description: "Ergonomic wedge shape relieves tailbone pain and improves posture during long traffic commutes.",
        compatibilityText: "Universal Fit"
      },
      {
        merchantShop: "Akwasi Auto Accessories",
        mainType: "accessories",
        name: "Heavy Duty Waterproof Car Cover",
        brand: "MotorTrend",
        category: "Exterior",
        condition: "New",
        price: 350,
        stock: "Out of Stock",
        views: 31,
        description: "Multi-layered breathable fabric protects your vehicle from dust, rain, and heavy Ghana sunshine.",
        compatibilityText: "Universal Fit"
      },
      {
        merchantShop: "Kofi Auto Spares",
        mainType: "parts",
        name: "1.8L Engine Head Gasket Kit",
        brand: "Fel-Pro",
        category: "Engine Parts",
        condition: "New",
        price: 450,
        stock: "In Stock",
        views: 79,
        description: "Premium gasket kit provides superior sealing on uneven head surfaces.",
        compatibility: [
          { make: "Toyota", model: "Corolla", years: "2009-2016" }
        ]
      },
      {
        merchantShop: "Ofori Cooling Systems",
        mainType: "parts",
        name: "Front Radiator Assembly",
        brand: "KOYORAD",
        category: "Radiator",
        condition: "Used",
        price: 850,
        stock: "In Stock",
        views: 44,
        description: "Genuinely imported salvage (Tokunbo) radiator in excellent condition.",
        compatibility: [
          { make: "Hyundai", model: "Tucson", years: "2015-2020" },
          { make: "Kia", model: "Sportage", years: "2016-2021" }
        ]
      },
      {
        merchantShop: "Elite Parts Center",
        mainType: "parts",
        name: "Genuine Bosch Fuel Injector Set (4 pcs)",
        brand: "Bosch",
        category: "Engine Parts",
        condition: "New",
        price: 1450,
        stock: "In Stock",
        views: 317,
        description: "Original Bosch direct-injection injectors for BMW petrol engines.",
        compatibility: [
          { make: "BMW", model: "3 Series", years: "2012-2019" },
          { make: "BMW", model: "5 Series", years: "2013-2020" }
        ]
      },
      {
        merchantShop: "Elite Parts Center",
        mainType: "parts",
        name: "Mercedes-Benz Air Suspension Compressor",
        brand: "Arnott",
        category: "Suspension & Steering",
        condition: "New",
        price: 3200,
        stock: "In Stock",
        views: 189,
        description: "Premium OEM-equivalent air suspension compressor for Mercedes W211/W220.",
        compatibility: [
          { make: "Mercedes", model: "E-Class", years: "2010-2016" },
          { make: "Mercedes", model: "S-Class", years: "2006-2013" }
        ]
      }
    ];

    for (const p of productsData) {
      const merchantId = merchantIdMap[p.merchantShop];
      if (!merchantId) {
        console.log(`  ⚠️  Skipping product "${p.name}" — merchant not found: ${p.merchantShop}`);
        continue;
      }

      const [product] = await sql`
        INSERT INTO products (merchant_id, main_type, name, brand, category, condition, price, stock, views, description, compatibility_text)
        VALUES (${merchantId}, ${p.mainType}, ${p.name}, ${p.brand}, ${p.category}, ${p.condition}, ${p.price}, ${p.stock || "In Stock"}, ${p.views || 0}, ${p.description}, ${p.compatibilityText || null})
        RETURNING id
      `;

      // Insert compatibility records
      if (p.compatibility && Array.isArray(p.compatibility)) {
        for (const c of p.compatibility) {
          await sql`
            INSERT INTO product_compatibility (product_id, make, model, years)
            VALUES (${product.id}, ${c.make}, ${c.model}, ${c.years})
          `;
        }
      }

      console.log(`  ✅ Product: ${p.name} (id: ${product.id})`);
    }

    // ── 4. Seed Categories ──────────────────────────────────
    const partsCategories = [
      "Brake System", "Engine Parts", "Electrical", "Suspension & Steering",
      "Transmission", "Cooling System", "Filters & Tune-Up", "Body & Styling",
      "Tires & Wheels", "Batteries", "Engine Oil", "Lighting", "Suspension",
      "Filters", "Radiator", "Shock Absorbers", "Ball Joints",
      "Steering Wheel", "Wipers", "Condenser"
    ];

    const accessoryCategories = ["Audio", "Interior", "Exterior", "Safety"];

    for (const cat of partsCategories) {
      await sql`
        INSERT INTO categories (name, type) VALUES (${cat}, 'parts')
        ON CONFLICT DO NOTHING
      `;
    }
    for (const cat of accessoryCategories) {
      await sql`
        INSERT INTO categories (name, type) VALUES (${cat}, 'accessories')
        ON CONFLICT DO NOTHING
      `;
    }
    console.log(`  ✅ Categories seeded (${partsCategories.length} parts + ${accessoryCategories.length} accessories)`);

    // ── 5. Seed Car / Vehicle Brands ────────────────────────
    const carBrands = [
      // Asian Vehicles
      { id: "toyota", name: "Toyota", logo: "toyota.png", category: "asian", type: "vehicle" },
      { id: "nissan", name: "Nissan", logo: "nissan.png", category: "asian", type: "vehicle" },
      { id: "honda", name: "Honda", logo: "honda.png", category: "asian", type: "vehicle" },
      { id: "suzuki", name: "Suzuki", logo: "suzuki.png", category: "asian", type: "vehicle" },
      { id: "mitsubishi", name: "Mitsubishi", logo: "mitsubishi.png", category: "asian", type: "vehicle" },
      { id: "acura", name: "Acura", logo: "acura.png", category: "asian", type: "vehicle" },
      { id: "mazda", name: "Mazda", logo: "mazda.png", category: "asian", type: "vehicle" },
      { id: "subaru", name: "Subaru", logo: "subaru.png", category: "asian", type: "vehicle" },
      { id: "lexus", name: "Lexus", logo: "lexus.png", category: "asian", type: "vehicle" },
      { id: "infiniti", name: "Infiniti", logo: "infiniti.png", category: "asian", type: "vehicle" },
      { id: "isuzu", name: "Isuzu", logo: "isuzu.png", category: "asian", type: "vehicle" },
      { id: "hyundai", name: "Hyundai", logo: "hyundai.png", category: "asian", type: "vehicle" },
      { id: "kia", name: "Kia", logo: "kia.png", category: "asian", type: "vehicle" },
      { id: "daewoo", name: "Daewoo", logo: "daewoo.png", category: "asian", type: "vehicle" },
      { id: "chery", name: "Chery", logo: "chery.png", category: "asian", type: "vehicle" },
      { id: "byd", name: "BYD", logo: "byd.png", category: "asian", type: "vehicle" },
      { id: "jetour", name: "Jetour", logo: "jetour.png", category: "asian", type: "vehicle" },
      { id: "geely", name: "Geely", logo: "geely.png", category: "asian", type: "vehicle" },
      { id: "jac-motors", name: "JAC Motors", logo: "jac-motors.png", category: "asian", type: "vehicle" },

      // European Vehicles
      { id: "mercedes-benz", name: "Mercedes-Benz", logo: "mercedes-benz.png", category: "european", type: "vehicle" },
      { id: "bmw", name: "BMW", logo: "bmw.png", category: "european", type: "vehicle" },
      { id: "audi", name: "Audi", logo: "audi.png", category: "european", type: "vehicle" },
      { id: "porsche", name: "Porsche", logo: "porsche.png", category: "european", type: "vehicle" },
      { id: "peugeot", name: "Peugeot", logo: "peugeot.png", category: "european", type: "vehicle" },
      { id: "renault", name: "Renault", logo: "renault.png", category: "european", type: "vehicle" },
      { id: "opel", name: "Opel", logo: "opel.png", category: "european", type: "vehicle" },
      { id: "land-rover", name: "Land Rover", logo: "land-rover.png", category: "european", type: "vehicle" },
      { id: "jaguar", name: "Jaguar", logo: "jaguar.png", category: "european", type: "vehicle" },
      { id: "volvo", name: "Volvo", logo: "volvo.png", category: "european", type: "vehicle" },

      // American Vehicles
      { id: "ford", name: "Ford", logo: "ford.png", category: "american", type: "vehicle" },
      { id: "chevrolet", name: "Chevrolet", logo: "chevrolet.png", category: "american", type: "vehicle" },
      { id: "jeep", name: "Jeep", logo: "jeep.png", category: "american", type: "vehicle" },
      { id: "dodge", name: "Dodge", logo: "dodge.png", category: "american", type: "vehicle" },
      { id: "gmc", name: "GMC", logo: "gmc.png", category: "american", type: "vehicle" },
      { id: "cadillac", name: "Cadillac", logo: "cadillac.png", category: "american", type: "vehicle" },
      { id: "tesla", name: "Tesla", logo: "tesla.png", category: "american", type: "vehicle" },
      { id: "ram", name: "RAM", logo: "ram.png", category: "american", type: "vehicle" },
      { id: "chrysler", name: "Chrysler", logo: "chrysler.png", category: "american", type: "vehicle" },

      // Commercial Vehicles
      { id: "sinotruk", name: "Sinotruk", logo: "sinotruk.png", category: "commercial", type: "vehicle" },
      { id: "daf", name: "DAF", logo: "daf.png", category: "commercial", type: "vehicle" },
      { id: "man", name: "MAN", logo: "man.png", category: "commercial", type: "vehicle" },
      { id: "scania", name: "Scania", logo: "scania.png", category: "commercial", type: "vehicle" },
      { id: "iveco", name: "Iveco", logo: "iveco.png", category: "commercial", type: "vehicle" },
      { id: "mack", name: "Mack", logo: "mack.png", category: "commercial", type: "vehicle" },
      { id: "volvo-trucks", name: "Volvo Trucks", logo: "volvo-trucks.png", category: "commercial", type: "vehicle" },
      { id: "renault-trucks", name: "Renault Trucks", logo: "renault-trucks.png", category: "commercial", type: "vehicle" },
      { id: "ashok-leyland", name: "Ashok Leyland", logo: "ashok-leyland.png", category: "commercial", type: "vehicle" },
      { id: "shacman", name: "Shacman", logo: "shacman.png", category: "commercial", type: "vehicle" },
      { id: "faw", name: "FAW", logo: "faw.png", category: "commercial", type: "vehicle" },
      { id: "tata", name: "Tata", logo: "tata.png", category: "commercial", type: "vehicle" }
    ];

    // Clear existing brands table first to remove any non-car brands
    await sql`TRUNCATE TABLE brands RESTART IDENTITY CASCADE`;

    for (const brand of carBrands) {
      await sql`
        INSERT INTO brands (slug, name, logo, type, category)
        VALUES (${brand.id}, ${brand.name}, ${brand.logo}, ${brand.type}, ${brand.category})
      `;
    }
    console.log(`  ✅ Car Brands seeded (${carBrands.length} vehicle makes)`);

    // ── 6. Seed Admin Settings ──────────────────────────────
    await sql`
      INSERT INTO admin_settings (key, value) VALUES
        ('premoderation', '{"enabled": false}'::jsonb),
        ('announcement', '{"visible": true, "text": "Install ABBOSSEY OKAI MAGAZINE on your home screen for quick offline access!", "showInstallBtn": true}'::jsonb)
      ON CONFLICT (key) DO NOTHING
    `;
    console.log("  ✅ Admin settings seeded");

    console.log("\n🎉 Database seeded successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    console.error(err);
    process.exit(1);
  }

  process.exit(0);
}

seed();
