import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, ArrowLeft } from 'lucide-react-native';
import { COLORS, SPACING } from '../constants/theme';

export const Header = ({ onBack, onCameraPress, showBack = false }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftRow}>
        {showBack ? (
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={onBack}
            activeOpacity={0.7}
          >
            <ArrowLeft color={COLORS.text} size={20} />
          </TouchableOpacity>
        ) : (
          <View style={styles.dotIndicator} />
        )}

        <View style={styles.brandRow}>
          <Text style={styles.brandTitle}>TailorSnap</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>APK READY</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.cameraButton}
        onPress={onCameraPress}
        activeOpacity={0.7}
      >
        <Camera color={COLORS.textDark} size={18} strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.background,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dotIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accent,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.8,
    color: COLORS.text,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: COLORS.accentSubtle,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: 0.5,
  },
  cameraButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 4,
  },
});
