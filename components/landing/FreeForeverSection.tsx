// =============================================================================
// Imports
// =============================================================================
import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { Shield, Zap, Heart, ArrowRight } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';

// =============================================================================
// Component
// =============================================================================

/**
 * Free Forever section component highlighting the app's no-cost commitment.
 *
 * Emphasizes that the app is completely free with no ads or hidden costs, ever.
 * Features three key benefits with icons and a prominent call-to-action button.
 * Uses animations and a distinct background to draw attention to this unique value.
 *
 * @returns The free forever section with animated elements and CTA
 */
export default function FreeForeverSection() {
  const { theme } = useTheme();
  const router = useRouter();
  const { width } = useWindowDimensions();

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(40);

  useEffect(() => {
    opacity.value = withDelay(200, withSpring(1, { damping: 15 }));
    translateY.value = withDelay(200, withSpring(0, { damping: 15 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const styles = createStyles(theme, width);
  const isMobile = width < 768;
  const iconSize = isMobile ? 28 : 32;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, animatedStyle]}>
        <View style={styles.header}>
          <Heart size={isMobile ? 40 : 48} color="#10b981" fill="#10b981" />
          <Text style={styles.title}>Free Forever. No Catch.</Text>
          <Text style={styles.subtitle}>
            Recovery support should be accessible to everyone. That is why Sobriety Waypoint will
            always be 100% free with no ads, no premium tiers, no hidden costs.
          </Text>
        </View>

        <View style={styles.benefitsContainer}>
          <View style={styles.benefit}>
            <View style={styles.benefitIcon}>
              <Shield size={iconSize} color="#10b981" />
            </View>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>No Ads, Ever</Text>
              <Text style={styles.benefitDescription}>
                Your recovery journey deserves focus, not distractions
              </Text>
            </View>
          </View>

          <View style={styles.benefit}>
            <View style={styles.benefitIcon}>
              <Zap size={iconSize} color="#10b981" />
            </View>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>All Features Unlocked</Text>
              <Text style={styles.benefitDescription}>
                Every tool and feature available to all users, always
              </Text>
            </View>
          </View>

          <View style={styles.benefit}>
            <View style={styles.benefitIcon}>
              <Heart size={iconSize} color="#10b981" />
            </View>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Built for Recovery</Text>
              <Text style={styles.benefitDescription}>
                Created to support your journey, not to profit from it
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => router.push('/signup')}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaButtonText}>Start Your Journey Free</Text>
          <ArrowRight size={20} color="#ffffff" style={styles.buttonIcon} />
        </TouchableOpacity>

        <Text style={styles.footnote}>No credit card required • No trial period • Just free</Text>
      </Animated.View>
    </View>
  );
}

// =============================================================================
// Styles
// =============================================================================

const createStyles = (theme: any, width: number) => {
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  return StyleSheet.create({
    container: {
      backgroundColor: '#10b98108',
      paddingHorizontal: isMobile ? 24 : isTablet ? 48 : 80,
      paddingVertical: isMobile ? 60 : 80,
      alignItems: 'center',
    },
    content: {
      maxWidth: 800,
      width: '100%',
      alignItems: 'center',
    },
    header: {
      alignItems: 'center',
      marginBottom: isMobile ? 40 : 48,
    },
    title: {
      fontSize: isMobile ? 32 : isTablet ? 40 : 48,
      fontFamily: theme.fontBold,
      color: theme.text,
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 16,
      lineHeight: isMobile ? 40 : isTablet ? 48 : 56,
    },
    subtitle: {
      fontSize: isMobile ? 16 : 18,
      fontFamily: theme.fontRegular,
      color: theme.textSecondary,
      textAlign: 'center',
      lineHeight: isMobile ? 24 : 28,
      paddingHorizontal: isMobile ? 0 : 20,
    },
    benefitsContainer: {
      width: '100%',
      gap: isMobile ? 20 : 24,
      marginBottom: isMobile ? 40 : 48,
    },
    benefit: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: theme.card,
      padding: isMobile ? 20 : 24,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      gap: 16,
      ...Platform.select({
        web: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        },
        default: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 6,
          elevation: 2,
        },
      }),
    },
    benefitIcon: {
      width: isMobile ? 48 : 56,
      height: isMobile ? 48 : 56,
      borderRadius: isMobile ? 24 : 28,
      backgroundColor: '#10b98115',
      justifyContent: 'center',
      alignItems: 'center',
    },
    benefitContent: {
      flex: 1,
    },
    benefitTitle: {
      fontSize: isMobile ? 17 : 18,
      fontFamily: theme.fontSemiBold,
      color: theme.text,
      marginBottom: 4,
      lineHeight: isMobile ? 24 : 26,
    },
    benefitDescription: {
      fontSize: isMobile ? 14 : 15,
      fontFamily: theme.fontRegular,
      color: theme.textSecondary,
      lineHeight: isMobile ? 20 : 22,
    },
    ctaButton: {
      backgroundColor: '#10b981',
      borderRadius: 12,
      paddingVertical: 18,
      paddingHorizontal: isMobile ? 48 : 56,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
      ...Platform.select({
        web: {
          boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        },
        default: {
          shadowColor: '#10b981',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 6,
        },
      }),
    },
    ctaButtonText: {
      color: '#ffffff',
      fontSize: 18,
      fontFamily: theme.fontSemiBold,
    },
    buttonIcon: {
      marginLeft: 8,
    },
    footnote: {
      fontSize: 14,
      fontFamily: theme.fontRegular,
      color: theme.textTertiary,
      textAlign: 'center',
    },
  });
};
