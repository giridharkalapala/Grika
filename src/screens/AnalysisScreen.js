import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Animated,
} from 'react-native';
import { Ruler, Sparkles, Check, ArrowRight, Sliders, Scissors } from 'lucide-react-native';
import { COLORS, SPACING, RADIUS, FONTS } from '../constants/theme';
import { STANDARD_SIZES } from '../constants/presets';
import { toInches, toCm } from '../utils/calculations';

export const AnalysisScreen = ({
  garment,
  imageUri,
  measurements,
  setMeasurements,
  unit,
  setUnit,
  onGenerateCard,
}) => {
  const [analyzing, setAnalyzing] = useState(true);
  const [progressStep, setProgressStep] = useState(0);
  const [progressAnim] = useState(new Animated.Value(0));

  const steps = [
    'Detecting silhouette & fit...',
    'Mapping cut lines & seams...',
    'Estimating fabric & yield...',
  ];

  useEffect(() => {
    // Run simple 3-stage progress animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: false,
    }).start();

    const t1 = setTimeout(() => setProgressStep(1), 600);
    const t2 = setTimeout(() => setProgressStep(2), 1200);
    const t3 = setTimeout(() => setAnalyzing(false), 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Handle switching unit and converting existing input numbers
  const handleToggleUnit = (newUnit) => {
    if (newUnit === unit) return;
    setUnit(newUnit);

    setMeasurements({
      chest: newUnit === 'cm' ? toCm(measurements.chest) : toInches(measurements.chest),
      sleeve: newUnit === 'cm' ? toCm(measurements.sleeve) : toInches(measurements.sleeve),
      length: newUnit === 'cm' ? toCm(measurements.length) : toInches(measurements.length),
    });
  };

  // Prefill standard size
  const handleSelectSizePreset = (sizeKey) => {
    const preset = STANDARD_SIZES[sizeKey];
    if (!preset) return;

    if (unit === 'in') {
      setMeasurements({
        chest: preset.chest,
        sleeve: preset.sleeve,
        length: preset.length,
      });
    } else {
      setMeasurements({
        chest: toCm(preset.chest),
        sleeve: toCm(preset.sleeve),
        length: toCm(preset.length),
      });
    }
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Loading state bar if analyzing */}
      {analyzing ? (
        <View style={styles.loadingCard}>
          <View style={styles.loadingHeader}>
            <View style={styles.loadingDot} />
            <Text style={styles.loadingTitle}>ANALYZING OUTFIT</Text>
          </View>

          <Text style={styles.stepText}>{steps[progressStep]}</Text>

          <View style={styles.progressBarBg}>
            <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
          </View>
        </View>
      ) : (
        <View style={styles.detectedBanner}>
          <View style={styles.detectedIcon}>
            <Scissors size={14} color={COLORS.accent} />
          </View>
          <View style={styles.detectedInfo}>
            <Text style={styles.detectedGarment}>{garment?.garmentType || 'Boxy Tee'}</Text>
            <Text style={styles.detectedStyle}>{garment?.fitStyle || 'Drop-Shoulder Relaxed'}</Text>
          </View>
          <View style={styles.successPill}>
            <Check size={12} color={COLORS.accent} />
            <Text style={styles.successPillText}>SCANNED</Text>
          </View>
        </View>
      )}

      {/* Stacked Preview Card */}
      <View style={styles.previewCard}>
        <Image source={{ uri: imageUri || garment?.image }} style={styles.previewThumb} />
        
        <View style={styles.previewMeta}>
          <Text style={styles.metaLabel}>DETECTED FABRIC</Text>
          <Text style={styles.metaValue} numberOfLines={2}>{garment?.fabric || '280 GSM Heavyweight Cotton'}</Text>
          <View style={styles.yieldRow}>
            <Text style={styles.yieldTag}>EST. YIELD</Text>
            <Text style={styles.yieldValue}>{garment?.fabricYield || '1.6m'}</Text>
          </View>
        </View>
      </View>

      {/* Sizing & Core Measurements Form */}
      <View style={styles.formCard}>
        
        {/* Form Title & Unit Switcher */}
        <View style={styles.formHeader}>
          <View>
            <Text style={styles.formTitle}>Your Measurements</Text>
            <Text style={styles.formSubtitle}>Basic sizing for the tailor blueprint</Text>
          </View>

          {/* Unit Toggle Pill */}
          <View style={styles.unitToggle}>
            <TouchableOpacity
              style={[styles.unitBtn, unit === 'in' && styles.unitBtnActive]}
              onPress={() => handleToggleUnit('in')}
              activeOpacity={0.7}
            >
              <Text style={[styles.unitBtnText, unit === 'in' && styles.unitBtnTextActive]}>IN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.unitBtn, unit === 'cm' && styles.unitBtnActive]}
              onPress={() => handleToggleUnit('cm')}
              activeOpacity={0.7}
            >
              <Text style={[styles.unitBtnText, unit === 'cm' && styles.unitBtnTextActive]}>CM</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Size Presets: S, M, L, XL */}
        <View style={styles.sizePresetsRow}>
          <Text style={styles.sizePresetsLabel}>Quick Standard Size:</Text>
          <View style={styles.sizePillGroup}>
            {['S', 'M', 'L', 'XL'].map((s) => (
              <TouchableOpacity
                key={s}
                style={styles.sizePill}
                onPress={() => handleSelectSizePreset(s)}
                activeOpacity={0.7}
              >
                <Text style={styles.sizePillText}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 3 Core Inputs: Chest, Sleeve, Length */}
        <View style={styles.inputGroup}>
          
          {/* Field 1: Chest / Bust */}
          <View style={styles.inputField}>
            <View style={styles.inputLabelRow}>
              <Text style={styles.inputLabel}>1. Chest / Bust Circumference</Text>
              <Text style={styles.unitBadge}>{unit === 'in' ? 'inches' : 'cm'}</Text>
            </View>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.inputText}
                keyboardType="numeric"
                value={String(measurements.chest)}
                onChangeText={(val) => setMeasurements({ ...measurements, chest: val })}
                placeholderTextColor={COLORS.textMuted}
                placeholder={unit === 'in' ? '44' : '112'}
              />
              <Text style={styles.inputSuffix}>{unit === 'in' ? '"' : 'cm'}</Text>
            </View>
          </View>

          {/* Field 2: Sleeve Length */}
          <View style={styles.inputField}>
            <View style={styles.inputLabelRow}>
              <Text style={styles.inputLabel}>2. Sleeve Length (Shoulder to Cuff)</Text>
              <Text style={styles.unitBadge}>{unit === 'in' ? 'inches' : 'cm'}</Text>
            </View>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.inputText}
                keyboardType="numeric"
                value={String(measurements.sleeve)}
                onChangeText={(val) => setMeasurements({ ...measurements, sleeve: val })}
                placeholderTextColor={COLORS.textMuted}
                placeholder={unit === 'in' ? '10.5' : '27'}
              />
              <Text style={styles.inputSuffix}>{unit === 'in' ? '"' : 'cm'}</Text>
            </View>
          </View>

          {/* Field 3: Total Garment Length */}
          <View style={styles.inputField}>
            <View style={styles.inputLabelRow}>
              <Text style={styles.inputLabel}>3. Total Garment Length</Text>
              <Text style={styles.unitBadge}>{unit === 'in' ? 'inches' : 'cm'}</Text>
            </View>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.inputText}
                keyboardType="numeric"
                value={String(measurements.length)}
                onChangeText={(val) => setMeasurements({ ...measurements, length: val })}
                placeholderTextColor={COLORS.textMuted}
                placeholder={unit === 'in' ? '28.5' : '72'}
              />
              <Text style={styles.inputSuffix}>{unit === 'in' ? '"' : 'cm'}</Text>
            </View>
          </View>

        </View>

      </View>

      {/* Action CTA: Generate Tailor Card */}
      <TouchableOpacity
        style={styles.generateButton}
        onPress={onGenerateCard}
        activeOpacity={0.85}
      >
        <Sparkles size={18} color={COLORS.textDark} />
        <Text style={styles.generateButtonText}>Generate Tailor Card</Text>
        <ArrowRight size={18} color={COLORS.textDark} />
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  loadingCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: SPACING.md,
  },
  loadingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  loadingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
  },
  loadingTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.accent,
    fontFamily: FONTS.mono,
    letterSpacing: 0.5,
  },
  stepText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 10,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: COLORS.cardHover,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
  },
  detectedBanner: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: SPACING.md,
  },
  detectedIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.accentSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detectedInfo: {
    flex: 1,
  },
  detectedGarment: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
  },
  detectedStyle: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  successPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.accentSubtle,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  successPillText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.accent,
    fontFamily: FONTS.mono,
  },
  previewCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  previewThumb: {
    width: 76,
    height: 96,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
  },
  previewMeta: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textMuted,
    fontFamily: FONTS.mono,
    letterSpacing: 0.5,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 2,
    marginBottom: 8,
  },
  yieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  yieldTag: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.accent,
    backgroundColor: COLORS.accentSubtle,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  yieldValue: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    fontFamily: FONTS.mono,
  },
  formCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: SPACING.xl,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  formTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
  },
  formSubtitle: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  unitToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.md,
    padding: 2,
  },
  unitBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.sm - 2,
  },
  unitBtnActive: {
    backgroundColor: COLORS.accent,
  },
  unitBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    fontFamily: FONTS.mono,
  },
  unitBtnTextActive: {
    color: COLORS.textDark,
  },
  sizePresetsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    marginBottom: SPACING.md,
  },
  sizePresetsLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  sizePillGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  sizePill: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.cardHover,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizePillText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.text,
    fontFamily: FONTS.mono,
  },
  inputGroup: {
    gap: 14,
  },
  inputField: {
    gap: 6,
  },
  inputLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
  },
  unitBadge: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontFamily: FONTS.mono,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 48,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    fontFamily: FONTS.mono,
  },
  inputSuffix: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.accent,
    fontFamily: FONTS.mono,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.lg,
    paddingVertical: 16,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  generateButtonText: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.textDark,
    letterSpacing: -0.2,
  },
});
