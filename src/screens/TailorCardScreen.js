import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Share,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import {
  Copy,
  Check,
  Share2,
  RefreshCw,
  Ruler,
  Scissors,
  Layers,
  Sparkles,
  ShieldCheck,
} from 'lucide-react-native';
import { COLORS, SPACING, RADIUS, FONTS } from '../constants/theme';
import { calculateTailorDimensions, buildTailorCopyText } from '../utils/calculations';

export const TailorCardScreen = ({
  garment,
  measurements,
  unit,
  onNewSnap,
}) => {
  const [copied, setCopied] = useState(false);

  // Generate calculated panel dimensions based on user inputs
  const calculatedPanels = calculateTailorDimensions(garment, measurements, unit);

  const serialNumber = `TS-${(garment?.title || 'SNAP').toUpperCase().slice(0, 4)}-${Math.floor(1000 + Math.random() * 9000)}`;
  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Copy specs formatted for tailor WhatsApp or Notes
  const handleCopySpecs = async () => {
    try {
      const copyText = buildTailorCopyText(garment, measurements, unit, calculatedPanels);
      await Clipboard.setStringAsync(copyText);
      setCopied(true);
      Alert.alert(
        '✂️ Specs Copied!',
        'Tailor blueprint specs copied to your clipboard. Ready to paste directly into WhatsApp or Messages for your tailor.'
      );
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Clipboard copy error:', err);
      Alert.alert('Error', 'Could not copy to clipboard.');
    }
  };

  // Open native mobile share dialog
  const handleShareBlueprint = async () => {
    try {
      const shareText = buildTailorCopyText(garment, measurements, unit, calculatedPanels);
      await Share.share({
        message: shareText,
        title: `TailorSnap Blueprint — ${garment?.garmentType}`,
      });
    } catch (err) {
      console.error('Share error:', err);
    }
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Banner Tag */}
      <View style={styles.topStatusRow}>
        <View style={styles.statusPill}>
          <ShieldCheck size={13} color={COLORS.accent} />
          <Text style={styles.statusPillText}>TAILOR SPEC READY</Text>
        </View>

        <Text style={styles.serialText}>{serialNumber}</Text>
      </View>

      {/* ============================================================ */}
      {/* THE "TAILORSNAP CARD" (DESIGNED TO SHOW DIRECTLY TO TAILOR)  */}
      {/* ============================================================ */}
      <View style={styles.tailorCard}>
        
        {/* Card Header */}
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <Text style={styles.brandSubtitle}>TAILORSNAP TECH BLUEPRINT</Text>
            <Text style={styles.garmentTitle}>{garment?.garmentType || 'Boxy Tee'}</Text>
            <Text style={styles.fitStyleSubtitle}>{garment?.fitStyle || 'Drop-Shoulder Boxy'}</Text>
          </View>

          <View style={styles.dateStampBox}>
            <Text style={styles.dateStampLabel}>DATE</Text>
            <Text style={styles.dateStampValue}>{dateStr}</Text>
          </View>
        </View>

        {/* Blueprint Divider Line */}
        <View style={styles.blueprintDivider} />

        {/* Fabric & Seam Summary Box */}
        <View style={styles.specBox}>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>RECOMMENDED FABRIC</Text>
            <Text style={styles.specValue}>{garment?.fabric || '280 GSM Ring-Spun Cotton'}</Text>
          </View>

          <View style={styles.specRow}>
            <View style={styles.specMini}>
              <Text style={styles.specLabel}>ESTIMATED FABRIC</Text>
              <Text style={styles.specValueMini}>{garment?.fabricYield || '1.6m (1.75 yd)'}</Text>
            </View>

            <View style={styles.specMini}>
              <Text style={styles.specLabel}>SEAM ALLOWANCE</Text>
              <Text style={styles.specValueMini}>{garment?.seamAllowance || '0.5" (1.2cm)'}</Text>
            </View>
          </View>
        </View>

        {/* Client Target Body Measurements */}
        <View style={styles.bodySpecsContainer}>
          <Text style={styles.sectionHeader}>1. TARGET FINISHED SIZING</Text>

          <View style={styles.bodyGrid}>
            <View style={styles.bodyGridItem}>
              <Text style={styles.bodyItemLabel}>CHEST / BUST</Text>
              <Text style={styles.bodyItemVal}>
                {measurements.chest} {unit === 'in' ? '"' : 'cm'}
              </Text>
            </View>

            <View style={styles.bodyGridItem}>
              <Text style={styles.bodyItemLabel}>SLEEVE</Text>
              <Text style={styles.bodyItemVal}>
                {measurements.sleeve} {unit === 'in' ? '"' : 'cm'}
              </Text>
            </View>

            <View style={styles.bodyGridItem}>
              <Text style={styles.bodyItemLabel}>TOTAL LENGTH</Text>
              <Text style={styles.bodyItemVal}>
                {measurements.length} {unit === 'in' ? '"' : 'cm'}
              </Text>
            </View>
          </View>
        </View>

        {/* Calculated Panel Dimensions */}
        <View style={styles.panelsContainer}>
          <View style={styles.panelsHeaderRow}>
            <Text style={styles.sectionHeader}>2. CALCULATED CUT PANELS</Text>
            <Text style={styles.panelsCountTag}>{calculatedPanels.length} BLOCKS</Text>
          </View>

          <View style={styles.panelList}>
            {calculatedPanels.map((panel, idx) => (
              <View key={idx} style={styles.panelRow}>
                <View style={styles.panelLeft}>
                  <Text style={styles.panelName}>{panel.name}</Text>
                  <Text style={styles.panelCount}>{panel.count}</Text>
                </View>

                <View style={styles.panelDims}>
                  <Text style={styles.panelDimsText}>
                    {panel.width}{panel.unitSymbol} × {panel.height}{panel.unitSymbol}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Tailor Execution Advice */}
        <View style={styles.tailorTipBox}>
          <Text style={styles.tailorTipLabel}>PRO TAILOR NOTE</Text>
          <Text style={styles.tailorTipText}>
            Pre-wash fabric before cutting to account for natural cotton shrinkage. Keep drop-shoulder armhole straight without tight curving.
          </Text>
        </View>

      </View>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        {/* Primary: Copy Tailor Specs */}
        <TouchableOpacity
          style={styles.copyButton}
          onPress={handleCopySpecs}
          activeOpacity={0.85}
        >
          {copied ? (
            <Check size={18} color={COLORS.textDark} />
          ) : (
            <Copy size={18} color={COLORS.textDark} />
          )}
          <Text style={styles.copyButtonText}>
            {copied ? 'Specs Copied!' : 'Copy Tailor Specs'}
          </Text>
        </TouchableOpacity>

        {/* Secondary Row: Share via Mobile & New Snap */}
        <View style={styles.secondaryRow}>
          <TouchableOpacity
            style={styles.shareBtn}
            onPress={handleShareBlueprint}
            activeOpacity={0.8}
          >
            <Share2 size={16} color={COLORS.text} />
            <Text style={styles.shareBtnText}>Share Blueprint</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.newSnapBtn}
            onPress={onNewSnap}
            activeOpacity={0.8}
          >
            <RefreshCw size={16} color={COLORS.accent} />
            <Text style={styles.newSnapBtnText}>New Snap</Text>
          </TouchableOpacity>
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
  topStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.accentSubtle,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.accent,
    fontFamily: FONTS.mono,
  },
  serialText: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontFamily: FONTS.mono,
  },
  tailorCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    marginBottom: SPACING.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardHeaderLeft: {
    flex: 1,
  },
  brandSubtitle: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.accent,
    fontFamily: FONTS.mono,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  garmentTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: -0.6,
  },
  fitStyleSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  dateStampBox: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
  },
  dateStampLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: COLORS.textMuted,
    fontFamily: FONTS.mono,
  },
  dateStampValue: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.text,
    fontFamily: FONTS.mono,
    marginTop: 1,
  },
  blueprintDivider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginVertical: SPACING.md,
  },
  specBox: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: SPACING.md,
    gap: 10,
  },
  specItem: {},
  specLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textMuted,
    fontFamily: FONTS.mono,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  specValue: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
  },
  specRow: {
    flexDirection: 'row',
    gap: 12,
  },
  specMini: {
    flex: 1,
  },
  specValueMini: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accent,
    fontFamily: FONTS.mono,
  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textSecondary,
    fontFamily: FONTS.mono,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  bodySpecsContainer: {
    marginBottom: SPACING.md,
  },
  bodyGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  bodyGridItem: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.md,
    padding: 10,
  },
  bodyItemLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: COLORS.textMuted,
    fontFamily: FONTS.mono,
    marginBottom: 4,
  },
  bodyItemVal: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    fontFamily: FONTS.mono,
  },
  panelsContainer: {
    marginBottom: SPACING.md,
  },
  panelsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  panelsCountTag: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.accent,
    fontFamily: FONTS.mono,
  },
  panelList: {
    gap: 6,
  },
  panelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  panelLeft: {
    flex: 1,
  },
  panelName: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
  },
  panelCount: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontFamily: FONTS.mono,
    marginTop: 2,
  },
  panelDims: {
    backgroundColor: COLORS.cardHover,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.sm,
  },
  panelDimsText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.accent,
    fontFamily: FONTS.mono,
  },
  tailorTipBox: {
    backgroundColor: COLORS.accentSubtle,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    borderRadius: RADIUS.md,
    padding: 12,
  },
  tailorTipLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.accent,
    fontFamily: FONTS.mono,
    marginBottom: 2,
  },
  tailorTipText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  actionSection: {
    gap: 10,
  },
  copyButton: {
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
  copyButtonText: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.textDark,
    letterSpacing: -0.2,
  },
  secondaryRow: {
    flexDirection: 'row',
    gap: 10,
  },
  shareBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.md,
    paddingVertical: 12,
  },
  shareBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
  },
  newSnapBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    borderRadius: RADIUS.md,
    paddingVertical: 12,
  },
  newSnapBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accent,
  },
});
