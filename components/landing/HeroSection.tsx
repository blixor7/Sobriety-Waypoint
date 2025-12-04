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
import { Heart, ArrowRight } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withSequence,
  withRepeat,
} from 'react-native-reanimated';

// =============================================================================
// Component
// =============================================================================

/**
 * Hero section component for the landing page.
 *
 * Displays the app name, tagline, description, and primary call-to-action buttons.
 * Features subtle animations for visual interest and includes an animated heart icon.
 * Responsive design adapts layout for desktop, tablet, and mobile viewports.
 *
 * @returns The hero section with animated elements and CTAs
 */
export default function HeroSection() {
  const { theme } = useTheme();
  const router = useRouter();
  const { width } = useWindowDimensions();

  // Animation values
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);
  const subtitleOpacity = useSharedValue(0);
  const subtitleTranslateY = useSharedValue(30);
  const buttonOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(30);
  const heartScale = useSharedValue(1);

  // Start animations on mount
  useEffect(() => {
    titleOpacity.value = withDelay(200, withSpring(1, { damping: 15 }));
    titleTranslateY.value = withDelay(200, withSpring(0, { damping: 15 }));

    subtitleOpacity.value = withDelay(400, withSpring(1, { damping: 15 }));
    subtitleTranslateY.value = withDelay(400, withSpring(0, { damping: 15 }));

    buttonOpacity.value = withDelay(600, withSpring(1, { damping: 15 }));
    buttonTranslateY.value = withDelay(600, withSpring(0, { damping: 15 }));

    // Subtle pulsing heart animation
    heartScale.value = withRepeat(
      withSequence(withSpring(1.1, { damping: 10 }), withSpring(1, { damping: 10 })),
      -1,
      false
    );
  }, []);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: subtitleTranslateY.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonTranslateY.value }],
  }));

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const styles = createStyles(theme, width);
  const isMobile = width < 768;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Animated Heart Icon */}
        <Animated.View style={[styles.iconContainer, heartAnimatedStyle]}>
          <Heart size={isMobile ? 56 : 72} color="#007AFF" fill="#007AFF" />
        </Animated.View>

        {/* Title */}
        <Animated.View style={titleAnimatedStyle}>
          <Text style={styles.title}>Sobriety Waypoint</Text>
          <Text style={styles.tagline}>Your Companion on the Path to Recovery</Text>
        </Animated.View>

        {/* Subtitle */}
        <Animated.View style={subtitleAnimatedStyle}>
          <Text style={styles.subtitle}>
            Track your progress, connect with sponsors, and celebrate every milestone in your
            sobriety journey. A supportive companion for 12-step program participants.
          </Text>
        </Animated.View>

        {/* Inspiring Quote */}
        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>
            Recovery is not a race. You do not have to feel guilty if it takes you longer than you
            thought it would.
          </Text>
        </View>

        {/* CTA Buttons */}
        <Animated.View style={[styles.buttonContainer, buttonAnimatedStyle]}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/signup')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Get Started Free</Text>
            <ArrowRight size={20} color="#ffffff" style={styles.buttonIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/login')}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Sign In</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Free Forever Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✓ Free Forever • No Ads • No Catch</Text>
        </View>
      </View>
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
      minHeight: Platform.OS === 'web' ? '90vh' : 800,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: isMobile ? 24 : isTablet ? 48 : 80,
      paddingVertical: isMobile ? 60 : 80,
    },
    content: {
      maxWidth: 800,
      width: '100%',
      alignItems: 'center',
    },
    iconContainer: {
      marginBottom: isMobile ? 24 : 32,
    },
    title: {
      fontSize: isMobile ? 40 : isTablet ? 56 : 64,
      fontFamily: theme.fontBold,
      color: theme.text,
      textAlign: 'center',
      marginBottom: 12,
      lineHeight: isMobile ? 48 : isTablet ? 64 : 72,
    },
    tagline: {
      fontSize: isMobile ? 20 : isTablet ? 24 : 28,
      fontFamily: theme.fontMedium,
      color: '#007AFF',
      textAlign: 'center',
      marginBottom: isMobile ? 24 : 32,
      lineHeight: isMobile ? 28 : isTablet ? 32 : 36,
    },
    subtitle: {
      fontSize: isMobile ? 16 : 18,
      fontFamily: theme.fontRegular,
      color: theme.textSecondary,
      textAlign: 'center',
      lineHeight: isMobile ? 24 : 28,
      marginBottom: isMobile ? 24 : 32,
      paddingHorizontal: isMobile ? 0 : 40,
    },
    quoteContainer: {
      backgroundColor: theme.card,
      borderLeftWidth: 4,
      borderLeftColor: '#10b981',
      borderRadius: 12,
      padding: isMobile ? 20 : 24,
      marginBottom: isMobile ? 32 : 40,
      width: '100%',
      maxWidth: 600,
      ...Platform.select({
        web: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        },
        default: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
        },
      }),
    },
    quote: {
      fontSize: isMobile ? 15 : 16,
      fontFamily: theme.fontRegular,
      color: theme.textSecondary,
      fontStyle: 'italic',
      lineHeight: isMobile ? 22 : 24,
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: isMobile ? 'column' : 'row',
      gap: 16,
      marginBottom: 24,
      width: '100%',
      maxWidth: 500,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryButton: {
      backgroundColor: '#007AFF',
      borderRadius: 12,
      paddingVertical: 18,
      paddingHorizontal: isMobile ? 48 : 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: isMobile ? '100%' : 200,
      ...Platform.select({
        web: {
          boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        },
        default: {
          shadowColor: '#007AFF',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 6,
        },
      }),
    },
    primaryButtonText: {
      color: '#ffffff',
      fontSize: 18,
      fontFamily: theme.fontSemiBold,
    },
    buttonIcon: {
      marginLeft: 8,
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: theme.border,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: isMobile ? 48 : 40,
      minWidth: isMobile ? '100%' : 200,
      alignItems: 'center',
      justifyContent: 'center',
      ...Platform.select({
        web: {
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        },
      }),
    },
    secondaryButtonText: {
      color: theme.text,
      fontSize: 18,
      fontFamily: theme.fontSemiBold,
    },
    badge: {
      backgroundColor: theme.card,
      borderRadius: 24,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: theme.border,
    },
    badgeText: {
      fontSize: 14,
      fontFamily: theme.fontMedium,
      color: '#10b981',
      textAlign: 'center',
    },
  });
};
