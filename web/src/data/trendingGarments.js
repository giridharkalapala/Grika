export const TRENDING_GARMENTS = [
  {
    id: "garment-boxy-tee",
    name: "Heavyweight Boxy Tee",
    category: "T-Shirt",
    aesthetic: "Neo-Streetwear / Minimalist",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    tags: ["Drop-Shoulder", "280 GSM Cotton", "Raw Hem Option", "Boxy Fit"],
    badge: "🔥 Trending #1",
    detectedAttributes: {
      garmentType: "Oversized Tee",
      fitStyle: "Drop-Shoulder Boxy",
      collarType: "Thick Ribbed Crew (3.2cm)",
      sleeveType: "Elbow-Length Drop Sleeve",
      hemType: "Double-needle Topstitch",
      fabricSuggestion: "Heavy French Terry or 100% Ring-spun Cotton (240–300 GSM)",
      estimatedFabricMeters: 1.6,
      estimatedFabricYards: 1.75,
      seamAllowance: "1.2 cm (1/2\")",
      difficultyLevel: "Beginner Friendly",
      colorPalette: ["#1e293b", "#f8fafc", "#475569", "#78716c"]
    },
    defaultMeasurements: {
      chest: 108, // cm
      shoulder: 52,
      sleeve: 26,
      length: 72,
      waist: 104,
      collar: 44,
      bicep: 40
    },
    blueprintComponents: [
      { id: 'front-panel', name: 'Front Torso Block', count: 1, baseW: 56, baseH: 72, icon: 'Shirt' },
      { id: 'back-panel', name: 'Back Torso Block', count: 1, baseW: 56, baseH: 74, icon: 'Shirt' },
      { id: 'sleeves', name: 'Drop Sleeves', count: 2, baseW: 44, baseH: 26, icon: 'Scissors' },
      { id: 'collar-rib', name: 'Ribbed Neckband', count: 1, baseW: 46, baseH: 3.5, icon: 'Layers' },
    ]
  },
  {
    id: "garment-cuban-shirt",
    name: "Vintage Cuban Collar Shirt",
    category: "Shirt",
    aesthetic: "Retro Resort / Thriftcore",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    tags: ["Camp Collar", "Relaxed Drape", "Mother-of-Pearl Buttons", "Tencel Linen"],
    badge: "🌴 Thrift Grails",
    detectedAttributes: {
      garmentType: "Camp Collar Shirt",
      fitStyle: "Relaxed Straight Cut",
      collarType: "Notched Cuban / Camp Collar (Flat)",
      sleeveType: "Short Bicep Cut with Cuffed Hem",
      hemType: "Straight Hem with Side Slits (4cm)",
      fabricSuggestion: "Linen-Rayon Blend or Tencel Modal (160–200 GSM)",
      estimatedFabricMeters: 2.1,
      estimatedFabricYards: 2.3,
      seamAllowance: "1.5 cm (French Seam recommended)",
      difficultyLevel: "Intermediate",
      colorPalette: ["#fef08a", "#0d9488", "#fed7aa", "#1c1917"]
    },
    defaultMeasurements: {
      chest: 104,
      shoulder: 48,
      sleeve: 25,
      length: 70,
      waist: 100,
      collar: 42,
      bicep: 38
    },
    blueprintComponents: [
      { id: 'front-left', name: 'Left Placket Panel', count: 1, baseW: 29, baseH: 70, icon: 'FileText' },
      { id: 'front-right', name: 'Right Button Panel', count: 1, baseW: 29, baseH: 70, icon: 'FileText' },
      { id: 'back-yoke', name: 'Back Panel with Yoke', count: 1, baseW: 54, baseH: 72, icon: 'Shirt' },
      { id: 'sleeves', name: 'Curved Sleeve Caps', count: 2, baseW: 40, baseH: 25, icon: 'Scissors' },
      { id: 'camp-collar', name: 'Convertible Camp Collar Leaf', count: 2, baseW: 44, baseH: 8, icon: 'Layers' },
      { id: 'chest-pocket', name: 'Mitred Patch Pocket', count: 1, baseW: 13, baseH: 14, icon: 'Maximize2' }
    ]
  },
  {
    id: "garment-panelled-cargo",
    name: "Architectural Panelled Cargo",
    category: "Pants",
    aesthetic: "Techwear / Cyber-Utilitarian",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    tags: ["3D Bellows Pockets", "Articulated Knees", "Drawstring Cuff", "Ripstop Cotton"],
    badge: "⚡ Cyberpunk Utility",
    detectedAttributes: {
      garmentType: "Multi-Pocket Cargo Pants",
      fitStyle: "Wide-Leg Tapered at Ankle",
      collarType: "N/A (Elastic Drawcord Waistband)",
      sleeveType: "N/A",
      hemType: "Bungee Toggle Adjustable Hem",
      fabricSuggestion: "Cotton Ripstop (260 GSM) or High-Density Cordura Nylon",
      estimatedFabricMeters: 2.8,
      estimatedFabricYards: 3.0,
      seamAllowance: "1.5 cm (Flat-Felled Seam)",
      difficultyLevel: "Advanced Custom",
      colorPalette: ["#18181b", "#3f3f46", "#365314", "#713f12"]
    },
    defaultMeasurements: {
      chest: 0,
      shoulder: 0,
      sleeve: 0,
      length: 104, // inseam/outseam
      waist: 84,
      hip: 106,
      thigh: 66,
      inseam: 76
    },
    blueprintComponents: [
      { id: 'front-legs', name: 'Front Leg Panels with Knee Darts', count: 2, baseW: 34, baseH: 104, icon: 'Columns' },
      { id: 'back-legs', name: 'Back Leg Panels with Crotch Gusset', count: 2, baseW: 38, baseH: 106, icon: 'Columns' },
      { id: 'cargo-pockets', name: '3D Gusseted Cargo Pockets', count: 2, baseW: 22, baseH: 26, icon: 'Maximize2' },
      { id: 'waistband', name: 'Segmented Tactical Waistband', count: 1, baseW: 90, baseH: 5.5, icon: 'Layers' },
      { id: 'pocket-flaps', name: 'Reinforced Pocket Flaps', count: 4, baseW: 22, baseH: 6, icon: 'Square' }
    ]
  },
  {
    id: "garment-cropped-hoodie",
    name: "Subversive Cropped Hoodie",
    category: "Hoodie",
    aesthetic: "Y2K / Dark Academia",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    tags: ["Double-Layer Hood", "Extreme Drop Shoulder", "Cropped Waist", "Raw Edge"],
    badge: "⭐ Viral Fit",
    detectedAttributes: {
      garmentType: "Cropped Pullover Hoodie",
      fitStyle: "Extreme Oversized Torso, Cropped Length",
      collarType: "Crossover Double-Layer Hood (No Drawstring)",
      sleeveType: "Elongated Slouch Sleeves with Extra Stacking",
      hemType: "Unfinished Raw Cut or Wide 5cm Elastic Band",
      fabricSuggestion: "420 GSM Ultra-Heavy Brushed Fleece / 100% Organic Cotton",
      estimatedFabricMeters: 2.2,
      estimatedFabricYards: 2.4,
      seamAllowance: "1.0 cm (Serger Overlock 4-thread)",
      difficultyLevel: "Intermediate",
      colorPalette: ["#0f172a", "#581c87", "#e2e8f0", "#831843"]
    },
    defaultMeasurements: {
      chest: 116,
      shoulder: 58,
      sleeve: 62,
      length: 56,
      waist: 98,
      collar: 48,
      bicep: 44
    },
    blueprintComponents: [
      { id: 'front-cropped', name: 'Cropped Front Torso', count: 1, baseW: 60, baseH: 56, icon: 'Shirt' },
      { id: 'back-cropped', name: 'Back Torso Block', count: 1, baseW: 60, baseH: 58, icon: 'Shirt' },
      { id: 'oversized-hood', name: 'Double Crossover Hood Panels', count: 4, baseW: 38, baseH: 42, icon: 'Layers' },
      { id: 'stacked-sleeves', name: 'Elongated Stack Sleeves', count: 2, baseW: 46, baseH: 66, icon: 'Scissors' },
      { id: 'cuffs', name: 'Ribbed Wrist Cuffs', count: 2, baseW: 20, baseH: 8, icon: 'Square' }
    ]
  },
  {
    id: "garment-noragi-jacket",
    name: "Modern Haori / Noragi Jacket",
    category: "Jacket",
    aesthetic: "Japanese Minimalist / Indigo Workwear",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    tags: ["Open Front", "Sashiko Stitching Accent", "Kimono Collar Band", "Deep Pockets"],
    badge: "🥋 Heritage Craft",
    detectedAttributes: {
      garmentType: "Kimono / Noragi Hybrid Jacket",
      fitStyle: "Relaxed Boxy Open-Front",
      collarType: "Continuous Continuous Folded Collar Band",
      sleeveType: "Rectangular Wide Japanese Cut (3/4 length)",
      hemType: "Deep Clean Turnback Hem (3.5cm)",
      fabricSuggestion: "Slubby Indigo Denim (10–12 oz) or Heavy Washed Linen",
      estimatedFabricMeters: 2.6,
      estimatedFabricYards: 2.85,
      seamAllowance: "1.5 cm with bias-bound seams",
      difficultyLevel: "Intermediate",
      colorPalette: ["#172554", "#1e3a8a", "#e0e7ff", "#292524"]
    },
    defaultMeasurements: {
      chest: 112,
      shoulder: 54,
      sleeve: 46,
      length: 76,
      waist: 110,
      collar: 46,
      bicep: 42
    },
    blueprintComponents: [
      { id: 'back-noragi', name: 'Back Center-Seamed Body', count: 2, baseW: 29, baseH: 76, icon: 'Shirt' },
      { id: 'front-panels', name: 'Front Angular Panels', count: 2, baseW: 26, baseH: 76, icon: 'FileText' },
      { id: 'kimono-sleeves', name: 'Rectangular Kimono Sleeves', count: 2, baseW: 50, baseH: 46, icon: 'Scissors' },
      { id: 'neck-band', name: 'Continuous Folded Collar Band', count: 1, baseW: 160, baseH: 6, icon: 'Layers' },
      { id: 'patch-pockets', name: 'Deep Hip Patch Pockets', count: 2, baseW: 18, baseH: 20, icon: 'Maximize2' }
    ]
  },
  {
    id: "garment-pleated-trousers",
    name: "Wide-Leg Double-Pleated Trousers",
    category: "Pants",
    aesthetic: "Neo-Tailoring / Old Money Luxe",
    image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80",
    tags: ["Double Forward Pleats", "High Waisted", "Puddle Hem", "Wool Blend"],
    badge: "✨ Tailor Masterpiece",
    detectedAttributes: {
      garmentType: "Tailored Wide Trouser",
      fitStyle: "High-Rise, Deep Double Pleats, Drapey Wide Leg",
      collarType: "N/A",
      sleeveType: "N/A",
      hemType: "Blind Hem with 5cm Inseam Allowance",
      fabricSuggestion: "Worsted Wool, Wool-Viscose Twill, or Heavy Gabardine (280–320 GSM)",
      estimatedFabricMeters: 2.5,
      estimatedFabricYards: 2.7,
      seamAllowance: "2.0 cm (Inseam) & 1.5 cm (Outseam)",
      difficultyLevel: "Expert Tailor",
      colorPalette: ["#262626", "#78716c", "#1c1917", "#f5f5f4"]
    },
    defaultMeasurements: {
      chest: 0,
      shoulder: 0,
      sleeve: 0,
      length: 108,
      waist: 80,
      hip: 104,
      thigh: 70,
      inseam: 80
    },
    blueprintComponents: [
      { id: 'front-trouser', name: 'Front Pleated Legs with Slant Pockets', count: 2, baseW: 36, baseH: 108, icon: 'Columns' },
      { id: 'back-trouser', name: 'Back Legs with Double Darts', count: 2, baseW: 40, baseH: 110, icon: 'Columns' },
      { id: 'waistband-curved', name: 'Curved Waistband with Extended Tab', count: 1, baseW: 88, baseH: 5, icon: 'Layers' },
      { id: 'jetted-pockets', name: 'Rear Double-Jetted Pockets', count: 2, baseW: 16, baseH: 4, icon: 'Maximize2' },
      { id: 'fly-shield', name: 'Zip Fly Shield & Facing', count: 2, baseW: 6, baseH: 22, icon: 'Square' }
    ]
  }
];

export const STANDARD_SIZES = {
  S: {
    label: "Small (S)",
    chest: 96,
    shoulder: 44,
    sleeve: 22,
    length: 68,
    waist: 76,
    hip: 94,
    collar: 39,
    bicep: 34
  },
  M: {
    label: "Medium (M)",
    chest: 104,
    shoulder: 47,
    sleeve: 24,
    length: 71,
    waist: 82,
    hip: 100,
    collar: 41,
    bicep: 37
  },
  L: {
    label: "Large (L)",
    chest: 112,
    shoulder: 50,
    sleeve: 26,
    length: 74,
    waist: 88,
    hip: 106,
    collar: 43,
    bicep: 40
  },
  XL: {
    label: "Extra Large (XL)",
    chest: 122,
    shoulder: 54,
    sleeve: 28,
    length: 77,
    waist: 96,
    hip: 114,
    collar: 45,
    bicep: 43
  }
};

