export const PRESETS = [
  {
    id: 'boxy-tee',
    title: 'Boxy Tee',
    subtitle: 'Heavy drop-shoulder fit',
    tag: 'STREETWEAR CORE',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80',
    garmentType: 'Heavyweight Boxy Tee',
    fitStyle: 'Drop-Shoulder Boxy (+5" ease)',
    fabric: '280 GSM Ring-Spun Heavyweight Cotton',
    fabricYield: '1.6m (1.75 yd)',
    seamAllowance: '0.5 inch (1.2 cm) double-needle',
    defaultInches: {
      chest: 44,
      sleeve: 10.5,
      length: 28.5,
    },
    defaultCm: {
      chest: 112,
      sleeve: 27,
      length: 72,
    },
    panelBreakdown: [
      { name: 'Front Torso Panel', widthFactor: 0.52, heightFactor: 1.0, count: '1× on fold' },
      { name: 'Back Torso Panel', widthFactor: 0.52, heightFactor: 1.02, count: '1× on fold' },
      { name: 'Drop Sleeve Blocks', widthFactor: 0.42, heightFactor: 0.38, count: '2× mirrored' },
      { name: 'Ribbed Neckband (3cm)', widthFactor: 0.44, heightFactor: 0.08, count: '1× strip' },
    ]
  },
  {
    id: 'camp-collar',
    title: 'Camp Collar Shirt',
    subtitle: 'Relaxed resort drape',
    tag: 'THRIFT GRAIL',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80',
    garmentType: 'Cuban Camp Collar Shirt',
    fitStyle: 'Relaxed Straight Cut (+3" ease)',
    fabric: '180 GSM Washed Linen / Tencel Modal',
    fabricYield: '2.1m (2.3 yd)',
    seamAllowance: '0.6 inch (1.5 cm) French seam',
    defaultInches: {
      chest: 42,
      sleeve: 9.5,
      length: 27.5,
    },
    defaultCm: {
      chest: 107,
      sleeve: 24,
      length: 70,
    },
    panelBreakdown: [
      { name: 'Left Button Placket Panel', widthFactor: 0.28, heightFactor: 1.0, count: '1× left' },
      { name: 'Right Buttonhole Panel', widthFactor: 0.28, heightFactor: 1.0, count: '1× right' },
      { name: 'Back Panel with Yoke', widthFactor: 0.54, heightFactor: 1.02, count: '1× back' },
      { name: 'Curved Sleeve Caps', widthFactor: 0.40, heightFactor: 0.36, count: '2× sleeves' },
      { name: 'Cuban Notched Collar', widthFactor: 0.42, heightFactor: 0.14, count: '2× leaves' },
    ]
  },
  {
    id: 'cargo-pants',
    title: 'Cargo Pants',
    subtitle: 'Articulated 3D utility',
    tag: 'TECH UTILITY',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=80',
    garmentType: 'Architectural Cargo Pants',
    fitStyle: 'Wide-Leg Tapered Ankle (+4" ease)',
    fabric: '260 GSM Cotton Ripstop or Nylon Cordura',
    fabricYield: '2.6m (2.85 yd)',
    seamAllowance: '0.6 inch (1.5 cm) flat-felled seam',
    defaultInches: {
      chest: 34, // Waist for pants
      sleeve: 30, // Inseam
      length: 41, // Outseam
    },
    defaultCm: {
      chest: 86,  // Waist for pants
      sleeve: 76, // Inseam
      length: 104,// Outseam
    },
    panelBreakdown: [
      { name: 'Front Leg Panels (Darted)', widthFactor: 0.38, heightFactor: 1.0, count: '2× legs' },
      { name: 'Back Leg Panels (Gusseted)', widthFactor: 0.42, heightFactor: 1.02, count: '2× legs' },
      { name: '3D Bellows Cargo Pockets', widthFactor: 0.22, heightFactor: 0.26, count: '2× pockets' },
      { name: 'Tactical Waistband', widthFactor: 0.90, heightFactor: 0.08, count: '1× band' },
    ]
  }
];

export const STANDARD_SIZES = {
  S: { chest: 38, sleeve: 9.0, length: 27.0 },
  M: { chest: 41, sleeve: 9.8, length: 28.0 },
  L: { chest: 44, sleeve: 10.5, length: 29.0 },
  XL: { chest: 48, sleeve: 11.2, length: 30.5 },
};
