export const INCH_TO_CM = 2.54;

export const toInches = (cmVal) => {
  if (!cmVal || isNaN(cmVal)) return 0;
  return Math.round((cmVal / INCH_TO_CM) * 10) / 10;
};

export const toCm = (inchVal) => {
  if (!inchVal || isNaN(inchVal)) return 0;
  return Math.round(inchVal * INCH_TO_CM * 10) / 10;
};

/**
 * Calculates tailor panel dimensions based on user inputs and garment preset
 */
export const calculateTailorDimensions = (garment, measurements, unit = 'in') => {
  const chestVal = parseFloat(measurements.chest) || 42;
  const sleeveVal = parseFloat(measurements.sleeve) || 10;
  const lengthVal = parseFloat(measurements.length) || 28;

  const panels = garment?.panelBreakdown || [
    { name: 'Front Panel', widthFactor: 0.52, heightFactor: 1.0, count: '1× on fold' },
    { name: 'Back Panel', widthFactor: 0.52, heightFactor: 1.02, count: '1× on fold' },
    { name: 'Sleeve Blocks', widthFactor: 0.42, heightFactor: 0.38, count: '2× mirrored' },
    { name: 'Collar / Neckband', widthFactor: 0.44, heightFactor: 0.08, count: '1× strip' },
  ];

  const calculatedPanels = panels.map((panel) => {
    let w = Math.round(chestVal * panel.widthFactor * 10) / 10;
    let h = Math.round(lengthVal * panel.heightFactor * 10) / 10;

    // Special logic for sleeve
    if (panel.name.toLowerCase().includes('sleeve')) {
      h = Math.round(sleeveVal * 10) / 10;
      w = Math.round((chestVal * 0.42) * 10) / 10;
    }

    return {
      name: panel.name,
      width: w,
      height: h,
      unitSymbol: unit === 'in' ? '"' : ' cm',
      count: panel.count,
    };
  });

  return calculatedPanels;
};

/**
 * Builds formatted text ready to copy or send via WhatsApp to a tailor
 */
export const buildTailorCopyText = (garment, measurements, unit, calculatedPanels) => {
  const symbol = unit === 'in' ? '"' : ' cm';
  const panelLines = calculatedPanels
    .map(p => `• ${p.name}: ${p.width}${symbol} (W) × ${p.height}${symbol} (L) [${p.count}]`)
    .join('\n');

  return `✂️ *TAILORSNAP // STITCH BLUEPRINT*
Garment: ${garment.garmentType}
Fit Style: ${garment.fitStyle}
Recommended Fabric: ${garment.fabric}
Estimated Fabric: ${garment.fabricYield}
Seam Allowance: ${garment.seamAllowance}

📏 *Target Finished Measurements:*
• Chest / Bust: ${measurements.chest}${symbol}
• Sleeve Length: ${measurements.sleeve}${symbol}
• Garment Length: ${measurements.length}${symbol}

📐 *Cut Panel Dimensions:*
${panelLines}

Generated with TailorSnap (Mobile Inspo-to-Stitch Studio)`;
};
