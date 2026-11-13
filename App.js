import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  Platform,
} from 'react-native';
import { Header } from './src/components/Header';
import { HomeScreen } from './src/screens/HomeScreen';
import { AnalysisScreen } from './src/screens/AnalysisScreen';
import { TailorCardScreen } from './src/screens/TailorCardScreen';
import { COLORS } from './src/constants/theme';
import { PRESETS } from './src/constants/presets';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home' | 'analysis' | 'card'
  const [selectedGarment, setSelectedGarment] = useState(PRESETS[0]);
  const [imageUri, setImageUri] = useState(null);
  const [unit, setUnit] = useState('in'); // 'in' | 'cm'
  const [measurements, setMeasurements] = useState({
    chest: 44,
    sleeve: 10.5,
    length: 28.5,
  });

  // Flow handlers
  const handleSelectImage = (uri) => {
    setImageUri(uri);
    setSelectedGarment({
      id: 'custom-upload',
      title: 'Custom Inspo Fit',
      garmentType: 'Custom Streetwear Fit',
      fitStyle: 'Drop-Shoulder Relaxed (+4" ease)',
      fabric: '280 GSM Heavyweight Cotton or Linen Blend',
      fabricYield: '1.8m (2.0 yd)',
      seamAllowance: '0.5" (1.2 cm)',
      panelBreakdown: [
        { name: 'Front Torso Panel', widthFactor: 0.52, heightFactor: 1.0, count: '1× on fold' },
        { name: 'Back Torso Panel', widthFactor: 0.52, heightFactor: 1.02, count: '1× on fold' },
        { name: 'Sleeve Blocks', widthFactor: 0.42, heightFactor: 0.38, count: '2× mirrored' },
        { name: 'Ribbed Neckband', widthFactor: 0.44, heightFactor: 0.08, count: '1× strip' },
      ]
    });
    setCurrentScreen('analysis');
  };

  const handleSelectPreset = (preset) => {
    setSelectedGarment(preset);
    setImageUri(preset.image);
    setMeasurements(unit === 'in' ? preset.defaultInches : preset.defaultCm);
    setCurrentScreen('analysis');
  };

  const handleGenerateCard = () => {
    setCurrentScreen('card');
  };

  const handleNewSnap = () => {
    setImageUri(null);
    setSelectedGarment(PRESETS[0]);
    setCurrentScreen('home');
  };

  const handleBack = () => {
    if (currentScreen === 'card') {
      setCurrentScreen('analysis');
    } else if (currentScreen === 'analysis') {
      setCurrentScreen('home');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      {/* Top Header */}
      <Header
        showBack={currentScreen !== 'home'}
        onBack={handleBack}
        onCameraPress={handleNewSnap}
      />

      <View style={styles.screenContainer}>
        {currentScreen === 'home' && (
          <HomeScreen
            onSelectImage={handleSelectImage}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {currentScreen === 'analysis' && (
          <AnalysisScreen
            garment={selectedGarment}
            imageUri={imageUri}
            measurements={measurements}
            setMeasurements={setMeasurements}
            unit={unit}
            setUnit={setUnit}
            onGenerateCard={handleGenerateCard}
          />
        )}

        {currentScreen === 'card' && (
          <TailorCardScreen
            garment={selectedGarment}
            measurements={measurements}
            unit={unit}
            onNewSnap={handleNewSnap}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  screenContainer: {
    flex: 1,
  },
});
