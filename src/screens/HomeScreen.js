import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Image as ImageIcon, Sparkles, ArrowRight, Zap, RefreshCw } from 'lucide-react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { PRESETS } from '../constants/presets';

export const HomeScreen = ({ onSelectImage, onSelectPreset }) => {
  const [selectedLocalUri, setSelectedLocalUri] = useState(null);
  const [isPicking, setIsPicking] = useState(false);

  // Pick image from phone gallery
  const pickFromGallery = async () => {
    try {
      setIsPicking(true);
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          'Gallery Permission Required',
          'TailorSnap needs access to your gallery so you can choose an outfit inspiration photo.'
        );
        setIsPicking(false);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setSelectedLocalUri(uri);
        onSelectImage(uri);
      }
    } catch (err) {
      console.error('Gallery picker error:', err);
      Alert.alert('Error', 'Unable to open phone gallery.');
    } finally {
      setIsPicking(false);
    }
  };

  // Launch camera to snap photo
  const snapWithCamera = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          'Camera Permission Required',
          'TailorSnap needs camera access to snap clothing in thrift stores or studios.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setSelectedLocalUri(uri);
        onSelectImage(uri);
      }
    } catch (err) {
      console.error('Camera snap error:', err);
      Alert.alert('Error', 'Unable to access camera.');
    }
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Punchy Streetwear Headline */}
      <View style={styles.heroSection}>
        <View style={styles.tagPill}>
          <Zap size={12} color={COLORS.accent} />
          <Text style={styles.tagPillText}>INSPO TO TAILOR BLUEPRINT</Text>
        </View>

        <Text style={styles.headline}>
          Snap a fit.{'\n'}
          <Text style={styles.headlineAccent}>Get the stitch blueprint.</Text>
        </Text>

        <Text style={styles.subheadline}>
          Upload any Pinterest, TikTok, or thrift fit. We map the cut lines and tailor specs in seconds.
        </Text>
      </View>

      {/* Main Upload / Camera Container */}
      <View style={styles.uploadSection}>
        {!selectedLocalUri ? (
          <TouchableOpacity
            style={styles.dropZone}
            onPress={pickFromGallery}
            activeOpacity={0.8}
          >
            <View style={styles.iconCircle}>
              <ImageIcon size={26} color={COLORS.accent} />
            </View>

            <Text style={styles.dropZoneTitle}>Select Outfit Photo</Text>
            <Text style={styles.dropZoneSub}>Tap to browse your photo gallery</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={styles.browseButton}
                onPress={pickFromGallery}
                activeOpacity={0.8}
              >
                <Text style={styles.browseButtonText}>Choose from Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.cameraIconBtn}
                onPress={snapWithCamera}
                activeOpacity={0.8}
              >
                <Camera size={16} color={COLORS.text} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.previewContainer}>
            <Image source={{ uri: selectedLocalUri }} style={styles.previewImage} />
            
            <View style={styles.previewOverlay}>
              <TouchableOpacity
                style={styles.retakeBtn}
                onPress={() => setSelectedLocalUri(null)}
                activeOpacity={0.8}
              >
                <RefreshCw size={14} color={COLORS.text} />
                <Text style={styles.retakeBtnText}>Change Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.continueBtn}
                onPress={() => onSelectImage(selectedLocalUri)}
                activeOpacity={0.8}
              >
                <Text style={styles.continueBtnText}>Continue to Sizing</Text>
                <ArrowRight size={16} color={COLORS.textDark} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* 3 Quick-Tap Preset Inspo Cards */}
      <View style={styles.presetsSection}>
        <View style={styles.presetHeader}>
          <Text style={styles.presetSectionTitle}>Or Test a Preset Fit</Text>
          <Text style={styles.presetSectionSub}>Instant 1-tap demo</Text>
        </View>

        <View style={styles.presetGrid}>
          {PRESETS.map((preset) => (
            <TouchableOpacity
              key={preset.id}
              style={styles.presetCard}
              onPress={() => onSelectPreset(preset)}
              activeOpacity={0.85}
            >
              <Image source={{ uri: preset.image }} style={styles.presetImage} />
              <View style={styles.presetOverlay} />

              <View style={styles.presetTag}>
                <Text style={styles.presetTagText}>{preset.tag}</Text>
              </View>

              <View style={styles.presetInfo}>
                <Text style={styles.presetTitle}>{preset.title}</Text>
                <Text style={styles.presetSub}>{preset.subtitle}</Text>
              </View>

              <View style={styles.presetAction}>
                <Text style={styles.presetActionText}>Blueprint Fit →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
  heroSection: {
    marginBottom: SPACING.lg,
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accentSubtle,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.sm,
  },
  tagPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: 0.5,
  },
  headline: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: -0.8,
    lineHeight: 34,
  },
  headlineAccent: {
    color: COLORS.accent,
  },
  subheadline: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 6,
    lineHeight: 18,
  },
  uploadSection: {
    marginBottom: SPACING.xl,
  },
  dropZone: {
    backgroundColor: COLORS.card,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.accentSubtle,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  dropZoneTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  dropZoneSub: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 3,
    marginBottom: SPACING.md,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  browseButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
  },
  browseButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  cameraIconBtn: {
    backgroundColor: COLORS.cardHover,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 10,
    borderRadius: RADIUS.md,
  },
  previewContainer: {
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    height: 320,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  previewOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.md,
    backgroundColor: 'rgba(10, 10, 10, 0.85)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  retakeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
  },
  retakeBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  continueBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.accent,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: RADIUS.md,
  },
  continueBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  presetsSection: {
    marginTop: SPACING.xs,
  },
  presetHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  presetSectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  presetSectionSub: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontFamily: FONTS.mono,
  },
  presetGrid: {
    gap: 12,
  },
  presetCard: {
    height: 110,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    position: 'relative',
  },
  presetImage: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 140,
    resizeMode: 'cover',
  },
  presetOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20, 20, 20, 0.88)',
  },
  presetTag: {
    position: 'absolute',
    top: 10,
    left: 14,
    backgroundColor: COLORS.accentSubtle,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  presetTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.accent,
    fontFamily: FONTS.mono,
  },
  presetInfo: {
    flex: 1,
    marginTop: 18,
  },
  presetTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
  },
  presetSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  presetAction: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
  },
  presetActionText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textDark,
  },
});
