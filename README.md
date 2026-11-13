# TailorSnap ⚡ Mobile App (React Native & Expo)

**TailorSnap** is an ultra-fast, minimal mobile app designed for Gen Z fashion enthusiasts. Users snap or upload a photo of a desired outfit (from Pinterest, TikTok, or a thrift store rack), enter their core body measurements, and instantly generate a clean, minimal **"Tailor Card" blueprint** to show directly to a local tailor.

---

## 📱 Mobile Design & Aesthetics

- **Streetwear Vibe:** Deep obsidian background (`#0A0A0A`), crisp elevated cards (`#141414`), bold typography, generous mobile padding, and electric **Acid Lime** (`#CCFF00`) accents.
- **Zero Jargon:** No corporate fluff or clutter. Direct, punchy, and built for speed.
- **Native Components:** Built using React Native core primitives (`View`, `Text`, `TouchableOpacity`, `TextInput`, `ScrollView`, `Image`, `SafeAreaView`, `StatusBar`, `Share`, `Alert`) with `lucide-react-native` icons.

---

## 🚀 Screen-by-Screen Flow

### 1. Home / Upload Screen (`src/screens/HomeScreen.js`)
- Top branding header with **TailorSnap**, an "APK READY" badge, and a quick-snap camera trigger.
- Punchy headline: *"Snap a fit. Get the stitch blueprint."*
- Clickable upload zone with `expo-image-picker` integration (gallery photo browser + camera snap).
- **3 Quick-Tap Preset Inspo Cards:**
  - **Boxy Tee:** Heavyweight drop-shoulder cut
  - **Camp Collar Shirt:** Relaxed resort drape
  - **Cargo Pants:** Articulated 3D utility
  - *Tap any preset to test the complete pipeline instantly without uploading a photo.*

### 2. Analysis & Sizing Screen (`src/screens/AnalysisScreen.js`)
- Minimalist animated progress bar with 3 discrete phases:
  - *"Detecting silhouette & fit..."*
  - *"Mapping cut lines & seams..."*
  - *"Estimating fabric & yield..."*
- Stacked garment preview card displaying detected fabric (`280 GSM Ring-Spun Heavyweight Cotton`) and estimated yield (`1.6m`).
- **Interactive Sizing Studio:**
  - Quick size prefill pills (**S, M, L, XL**).
  - Unit toggle: **Inches (")** vs **Centimeters (CM)** with live conversion.
  - 3 clean numeric fields: **Chest / Bust**, **Sleeve Length**, **Total Length**.

### 3. The "TailorSnap Card" Output View (`src/screens/TailorCardScreen.js`)
- A digital card formatted specifically to be handed to or shown to a local tailor:
  - **Header:** Serial ID (`TS-BOXY-XXXX`), date stamp, Garment Type, and Fit Silhouette.
  - **Fabric Spec:** Recommended textile, estimated fabric yield, and seam allowance.
  - **Target Finished Dimensions:** Chest, sleeve, and total length.
  - **Calculated Cut Panels:** Front Torso, Back Torso, Drop Sleeves, Neckband/Collar with exact calculated width $\times$ length dimensions ($W \times L$).
  - **Pro Tailor Tip:** Shrinkage allowance and armhole geometry notes.
- **Action Buttons:**
  - 📋 **Copy Tailor Specs:** One-tap clipboard copy formatted with emojis, dimensions, and instructions ready for WhatsApp or SMS.
  - ↗️ **Share Blueprint:** Native mobile share sheet (`Share.share`) to send specs via WhatsApp, AirDrop, Messages, or Email.
  - 🔄 **New Snap:** Reset state to scan a new fit.

---

## 📦 Android APK Compilation & Export

TailorSnap is pre-configured and structured to export and compile into an **Android APK**.

### Option A: Local Offline APK Build (via Gradle)
The native Android project has been prebuilt (`android/` directory already generated with Gradle wrapper, AndroidManifest, and resources).

To build the APK locally on your machine:
```bash
# Debug APK (fastest, no signing required)
npm run build:apk:debug
# Located at: android/app/build/outputs/apk/debug/app-debug.apk

# Release APK (optimized production binary)
npm run build:apk:local
# Located at: android/app/build/outputs/apk/release/app-release.apk
```

### Option B: Cloud APK Build (via EAS Build)
Configured via `eas.json` with `"buildType": "apk"` in the preview profile:

```bash
# 1. Install EAS CLI (if not already installed)
npm install -g eas-cli

# 2. Login to your Expo account
eas login

# 3. Trigger cloud APK compilation
npm run build:apk
# or
eas build -p android --profile preview
```
EAS will generate a direct download link and QR code to install the `.apk` on any Android device.

---

## 🏃 Running in Development Mode

```bash
# Start the Expo development server
npm start

# Run on Android Emulator or connected device
npm run android

# Run on Web browser (optional)
npm run web
```

---

## 📁 Project Structure

```
d:\TailorSnap\
├── App.js                         # Root application entry & navigation coordinator
├── app.json                       # Expo configuration (package: com.tailorsnap.app, permissions)
├── eas.json                       # EAS Build configuration for APK export (buildType: apk)
├── babel.config.js                # Babel preset config
├── package.json                   # React Native 0.76, Expo 52, Lucide icons
├── assets/                        # App icon, adaptive icon, splash screen, favicon
├── android/                       # Generated native Android Gradle project
│   ├── app/
│   │   ├── build.gradle           # Application gradle build config
│   │   └── src/main/
│   │       └── AndroidManifest.xml# Permissions: CAMERA, READ_MEDIA_IMAGES
│   ├── build.gradle               # Root project gradle
│   └── gradlew.bat                # Windows Gradle wrapper
├── src/
│   ├── constants/
│   │   ├── theme.js               # Streetwear color palette (Obsidian + Acid Lime)
│   │   └── presets.js             # 3 streetwear preset fits (Boxy Tee, Cuban Shirt, Cargo)
│   ├── utils/
│   │   └── calculations.js        # Panel dimensional scaling & WhatsApp text formatter
│   ├── components/
│   │   └── Header.js              # Minimal top navigation bar with camera icon
│   └── screens/
│       ├── HomeScreen.js          # Photo upload, camera snap, and preset inspo cards
│       ├── AnalysisScreen.js      # Progress bar scan & 3-field body measurement form
│       └── TailorCardScreen.js    # The TailorSnap Card output view & clipboard copy
└── web/                           # Standalone Vite/React web version (preserved from prior build)
```
