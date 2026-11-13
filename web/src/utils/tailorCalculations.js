/**
 * Conversions and mathematical scaling engine for StitchCraft / TailorSnap
 */

export const INCH_TO_CM = 2.54;

export const convertUnit = (value, fromUnit, toUnit) => {
  if (value === undefined || value === null || isNaN(value)) return 0;
  if (fromUnit === toUnit) return value;
  if (fromUnit === 'in' && toUnit === 'cm') {
    return Math.round(value * INCH_TO_CM * 10) / 10;
  }
  if (fromUnit === 'cm' && toUnit === 'in') {
    return Math.round((value / INCH_TO_CM) * 10) / 10;
  }
  return value;
};

export const formatMeasurement = (value, unit, precision = 1) => {
  if (value === undefined || value === null || isNaN(value)) return '-';
  const num = Number(value);
  if (unit === 'in') {
    return `${num.toFixed(precision)}"`;
  }
  return `${num.toFixed(precision)} cm`;
};

// Fit Ease offsets in cm
export const FIT_EASE_OFFSETS = {
  fitted: { chest: 4, shoulder: 0, length: 0, sleeve: 0, easeFactor: 1.02 },
  relaxed: { chest: 8, shoulder: 2, length: 2, sleeve: 1.5, easeFactor: 1.08 },
  boxy: { chest: 14, shoulder: 6, length: 1, sleeve: 2, easeFactor: 1.15 },
  oversized: { chest: 20, shoulder: 9, length: 4, sleeve: 4, easeFactor: 1.25 },
};

/**
 * Calculates dynamically scaled pattern blocks and blueprint dimensions
 * based on the user's custom body measurements and selected fit preference.
 */
export const calculateTailorRecipe = (garment, userMeasurements, unit = 'cm', fitPreference = 'boxy') => {
  const ease = FIT_EASE_OFFSETS[fitPreference] || FIT_EASE_OFFSETS.boxy;
  
  // Normalize user inputs to CM for math
  const m = {
    chest: userMeasurements.unit === 'in' ? userMeasurements.chest * INCH_TO_CM : userMeasurements.chest || 104,
    shoulder: userMeasurements.unit === 'in' ? userMeasurements.shoulder * INCH_TO_CM : userMeasurements.shoulder || 48,
    sleeve: userMeasurements.unit === 'in' ? userMeasurements.sleeve * INCH_TO_CM : userMeasurements.sleeve || 26,
    length: userMeasurements.unit === 'in' ? userMeasurements.length * INCH_TO_CM : userMeasurements.length || 72,
    waist: userMeasurements.unit === 'in' ? userMeasurements.waist * INCH_TO_CM : userMeasurements.waist || 84,
    hip: userMeasurements.unit === 'in' ? userMeasurements.hip * INCH_TO_CM : userMeasurements.hip || 102,
  };

  const isPants = garment?.category === 'Pants';

  // Calculate key dimensions with ease applied
  let calculatedChest = m.chest + ease.chest;
  let calculatedShoulder = m.shoulder + ease.shoulder;
  let calculatedLength = m.length + ease.length;
  let calculatedSleeve = m.sleeve + ease.sleeve;
  let calculatedWaist = m.waist + (fitPreference === 'oversized' ? 8 : 4);

  // Scaled Pattern components
  const baseComponents = garment?.blueprintComponents || [];
  
  const scaledComponents = baseComponents.map((comp) => {
    let scaledWidthCm = comp.baseW;
    let scaledHeightCm = comp.baseH;

    if (isPants) {
      if (comp.id.includes('front-legs') || comp.id.includes('back-legs')) {
        scaledHeightCm = m.length;
        scaledWidthCm = (m.hip / 4) + (comp.id.includes('back') ? 8 : 4);
      } else if (comp.id.includes('waistband')) {
        scaledWidthCm = m.waist + 8; // overlap & closure
        scaledHeightCm = comp.baseH;
      } else if (comp.id.includes('cargo-pockets')) {
        scaledWidthCm = Math.max(18, Math.round(m.hip * 0.18));
        scaledHeightCm = Math.max(20, Math.round(m.length * 0.22));
      }
    } else {
      // Tops / Shirts / Jackets / Tees
      if (comp.id.includes('front') || comp.id.includes('back')) {
        scaledWidthCm = Math.round((calculatedChest / 2) + 2); // half chest + allowance
        scaledHeightCm = Math.round(calculatedLength);
      } else if (comp.id.includes('sleeves') || comp.id.includes('stacked-sleeves') || comp.id.includes('kimono-sleeves')) {
        scaledWidthCm = Math.round((calculatedChest * 0.38) + ease.shoulder);
        scaledHeightCm = Math.round(calculatedSleeve);
      } else if (comp.id.includes('collar') || comp.id.includes('neck')) {
        scaledWidthCm = Math.round(calculatedShoulder * 0.9);
      } else if (comp.id.includes('hood')) {
        scaledWidthCm = Math.round(calculatedChest * 0.32);
        scaledHeightCm = Math.round(calculatedLength * 0.55);
      }
    }

    // Convert to target display unit
    const displayWidth = unit === 'in' ? convertUnit(scaledWidthCm, 'cm', 'in') : scaledWidthCm;
    const displayHeight = unit === 'in' ? convertUnit(scaledHeightCm, 'cm', 'in') : scaledHeightCm;

    return {
      ...comp,
      widthCm: Math.round(scaledWidthCm * 10) / 10,
      heightCm: Math.round(scaledHeightCm * 10) / 10,
      displayWidth: Math.round(displayWidth * 10) / 10,
      displayHeight: Math.round(displayHeight * 10) / 10,
      unitLabel: unit === 'in' ? '"' : 'cm'
    };
  });

  // Calculate total surface area in square meters
  const totalAreaCm2 = scaledComponents.reduce((acc, c) => {
    return acc + (c.widthCm * c.heightCm * (c.count || 1));
  }, 0);

  // Standard fabric roll width is 145cm (~58 inches)
  // Fabric meters needed = (Area with 20% cutting/bias buffer) / roll width
  const fabricMetersNeeded = Math.max(1.2, Math.round(((totalAreaCm2 * 1.25) / 14500) * 10) / 10);
  const fabricYardsNeeded = Math.round((fabricMetersNeeded * 1.0936) * 10) / 10;

  // Stitch specifications based on garment and fit
  const stitchSpecs = {
    machineNeedle: garment?.category === 'Pants' ? 'Size 90/14 Jeans / Heavy Twill' : (garment?.category === 'Hoodie' ? 'Size 90/14 Ballpoint' : 'Size 80/12 Universal'),
    threadType: '100% Spun Polyester (Tex 40)',
    stitchDensity: garment?.category === 'T-Shirt' ? '3.5 mm / 8-10 SPI' : '3.0 mm / 10-12 SPI',
    seamType: garment?.detectedAttributes?.seamAllowance || '1.2 cm standard with overlocked edges',
    ironingHeat: 'Medium-High with Steam (Cotton/Linen setting)'
  };

  // Tailor Bill of Materials (BOM)
  const bomList = [
    {
      item: 'Primary Shell Fabric',
      spec: garment?.detectedAttributes?.fabricSuggestion || 'Heavyweight Cotton',
      qty: unit === 'in' ? `${fabricYardsNeeded} yards` : `${fabricMetersNeeded} meters`
    },
    {
      item: 'Matching Thread Spool',
      spec: stitchSpecs.threadType,
      qty: '2 Spools (1,000m)'
    },
    {
      item: 'Interfacing / Stabilizer',
      spec: garment?.category === 'Shirt' ? 'Medium-weight Fusible Interfacing (Collar & Placket)' : 'Iron-on seam stay tape',
      qty: '0.5 meters'
    },
    ...(garment?.category === 'Shirt' ? [
      { item: 'Buttons', spec: '18L (11.5mm) 4-Hole Horn/Pearl buttons', qty: '7 pieces' }
    ] : []),
    ...(garment?.category === 'Pants' ? [
      { item: 'Metal Zipper / Fly', spec: 'YKK #5 Antique Brass Zipper (18cm)', qty: '1 piece' },
      { item: 'Waistband Snap or Button', spec: 'Tack Button or Heavy Hook-and-Bar', qty: '1 set' },
      { item: 'Bungee Cord / Cord Locks', spec: '2mm Shock Cord with dual hole stoppers', qty: '2 sets' }
    ] : []),
    ...(garment?.category === 'Hoodie' ? [
      { item: 'Ribbed Knit Trim', spec: '1x1 Spun Cotton Rib (95% Cotton / 5% Elastane)', qty: '0.4 meters' }
    ] : [])
  ];

  return {
    scaledComponents,
    fabricRequirement: {
      meters: fabricMetersNeeded,
      yards: fabricYardsNeeded,
      displayRequirement: unit === 'in' ? `${fabricYardsNeeded} yds (58" width)` : `${fabricMetersNeeded} m (145cm width)`
    },
    bodyFitSummary: {
      calculatedChest: Math.round(unit === 'in' ? convertUnit(calculatedChest, 'cm', 'in') : calculatedChest),
      calculatedShoulder: Math.round(unit === 'in' ? convertUnit(calculatedShoulder, 'cm', 'in') : calculatedShoulder),
      calculatedLength: Math.round(unit === 'in' ? convertUnit(calculatedLength, 'cm', 'in') : calculatedLength),
      calculatedSleeve: Math.round(unit === 'in' ? convertUnit(calculatedSleeve, 'cm', 'in') : calculatedSleeve),
      calculatedWaist: Math.round(unit === 'in' ? convertUnit(calculatedWaist, 'cm', 'in') : calculatedWaist),
      unit
    },
    stitchSpecs,
    bomList,
    totalPieces: scaledComponents.reduce((acc, c) => acc + (c.count || 1), 0),
    fitPreference
  };
};

/**
 * Generates WhatsApp share URL with pre-formatted tech pack summary
 */
export const createWhatsAppShareUrl = (recipe, garment) => {
  const text = `✂️ *STITCHCRAFT TAILOR BLUEPRINT & RECIPE* ✂️
Garment: ${garment.name}
Style: ${garment.detectedAttributes.fitStyle}
Estimated Fabric: ${recipe.fabricRequirement.displayRequirement}

📐 *Custom Target Measurements:*
• Chest: ${recipe.bodyFitSummary.calculatedChest} ${recipe.bodyFitSummary.unit}
• Shoulder: ${recipe.bodyFitSummary.calculatedShoulder} ${recipe.bodyFitSummary.unit}
• Length: ${recipe.bodyFitSummary.calculatedLength} ${recipe.bodyFitSummary.unit}
• Sleeve: ${recipe.bodyFitSummary.calculatedSleeve} ${recipe.bodyFitSummary.unit}

🧩 *Pattern Component Count:* ${recipe.totalPieces} pieces
🧵 *Needle & Thread:* ${recipe.stitchSpecs.machineNeedle} | ${recipe.stitchSpecs.threadType}

Generated via StitchCraft AI Tech-Pack Studio.`;

  return `https://wa.me/?text=${encodeURIComponent(text)}`;
};

