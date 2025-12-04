// =============================================================================
// Imports
// =============================================================================
import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import TestimonialsSection from './TestimonialsSection';
import FreeForeverSection from './FreeForeverSection';
import Footer from './Footer';

// =============================================================================
// Component
// =============================================================================

/**
 * Main landing page component that serves as the marketing page for web visitors.
 *
 * Displays hero section, features, how it works, testimonials, and footer sections
 * in a scrollable layout. Only renders on web platform. Implements responsive design
 * with smooth animations and calming aesthetic suitable for recovery-focused app.
 *
 * @returns The complete landing page layout with all marketing sections
 */
export default function LandingPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const { width } = useWindowDimensions();

  // Section entrance animations
  const heroOpacity = useSharedValue(0);
  const heroTranslateY = useSharedValue(16);
  const heroScale = useSharedValue(1);
  const featuresOpacity = useSharedValue(0);
  const featuresTranslateY = useSharedValue(16);
  const featuresScale = useSharedValue(1);
  const howItWorksOpacity = useSharedValue(0);
  const howItWorksTranslateY = useSharedValue(16);
  const howItWorksScale = useSharedValue(1);
  const testimonialsOpacity = useSharedValue(0);
  const testimonialsTranslateY = useSharedValue(16);
  const testimonialsScale = useSharedValue(1);
  const freeForeverOpacity = useSharedValue(0);
  const freeForeverTranslateY = useSharedValue(16);
  const freeForeverScale = useSharedValue(1);
  const footerOpacity = useSharedValue(0);
  const footerTranslateY = useSharedValue(16);
  const footerScale = useSharedValue(1);

  // Ensure we're on web platform (additional safety check)
  useEffect(() => {
    if (Platform.OS !== 'web') {
      router.replace('/login');
    }
  }, [router]);

  // Trigger staggered entrance animations on mount
  useEffect(() => {
    const config = { duration: 450, easing: Easing.out(Easing.cubic) };

    heroOpacity.value = withDelay(0, withTiming(1, config));
    heroTranslateY.value = withDelay(0, withTiming(0, config));

    featuresOpacity.value = withDelay(120, withTiming(1, config));
    featuresTranslateY.value = withDelay(120, withTiming(0, config));

    howItWorksOpacity.value = withDelay(240, withTiming(1, config));
    howItWorksTranslateY.value = withDelay(240, withTiming(0, config));

    testimonialsOpacity.value = withDelay(360, withTiming(1, config));
    testimonialsTranslateY.value = withDelay(360, withTiming(0, config));

    freeForeverOpacity.value = withDelay(480, withTiming(1, config));
    freeForeverTranslateY.value = withDelay(480, withTiming(0, config));

    footerOpacity.value = withDelay(600, withTiming(1, config));
    footerTranslateY.value = withDelay(600, withTiming(0, config));
  }, []);

  const heroAnimatedStyle = useAnimatedStyle(() => ({
    opacity: heroOpacity.value,
    transform: [{ translateY: heroTranslateY.value }, { scale: heroScale.value }],
  }));

  const featuresAnimatedStyle = useAnimatedStyle(() => ({
    opacity: featuresOpacity.value,
    transform: [{ translateY: featuresTranslateY.value }, { scale: featuresScale.value }],
  }));

  const howItWorksAnimatedStyle = useAnimatedStyle(() => ({
    opacity: howItWorksOpacity.value,
    transform: [{ translateY: howItWorksTranslateY.value }, { scale: howItWorksScale.value }],
  }));

  const testimonialsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: testimonialsOpacity.value,
    transform: [{ translateY: testimonialsTranslateY.value }, { scale: testimonialsScale.value }],
  }));

  const freeForeverAnimatedStyle = useAnimatedStyle(() => ({
    opacity: freeForeverOpacity.value,
    transform: [{ translateY: freeForeverTranslateY.value }, { scale: freeForeverScale.value }],
  }));

  const footerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: footerOpacity.value,
    transform: [{ translateY: footerTranslateY.value }, { scale: footerScale.value }],
  }));

  const styles = createStyles(theme, width);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          style={styles.section}
          // Hover only affects web; native platforms ignore hovered state
          onHoverIn={() => {
            if (Platform.OS === 'web') {
              heroScale.value = withTiming(1.01, {
                duration: 150,
                easing: Easing.out(Easing.quad),
              });
            }
          }}
          onHoverOut={() => {
            if (Platform.OS === 'web') {
              heroScale.value = withTiming(1, { duration: 150, easing: Easing.out(Easing.quad) });
            }
          }}
        >
          <Animated.View style={heroAnimatedStyle}>
            <HeroSection />
          </Animated.View>
        </Pressable>

        <Pressable
          style={styles.section}
          onHoverIn={() => {
            if (Platform.OS === 'web') {
              featuresScale.value = withTiming(1.01, {
                duration: 150,
                easing: Easing.out(Easing.quad),
              });
            }
          }}
          onHoverOut={() => {
            if (Platform.OS === 'web') {
              featuresScale.value = withTiming(1, {
                duration: 150,
                easing: Easing.out(Easing.quad),
              });
            }
          }}
        >
          <Animated.View style={featuresAnimatedStyle}>
            <FeaturesSection />
          </Animated.View>
        </Pressable>

        <Pressable
          style={styles.section}
          onHoverIn={() => {
            if (Platform.OS === 'web') {
              howItWorksScale.value = withTiming(1.01, {
                duration: 150,
                easing: Easing.out(Easing.quad),
              });
            }
          }}
          onHoverOut={() => {
            if (Platform.OS === 'web') {
              howItWorksScale.value = withTiming(1, {
                duration: 150,
                easing: Easing.out(Easing.quad),
              });
            }
          }}
        >
          <Animated.View style={howItWorksAnimatedStyle}>
            <HowItWorksSection />
          </Animated.View>
        </Pressable>

        <Pressable
          style={styles.section}
          onHoverIn={() => {
            if (Platform.OS === 'web') {
              testimonialsScale.value = withTiming(1.01, {
                duration: 150,
                easing: Easing.out(Easing.quad),
              });
            }
          }}
          onHoverOut={() => {
            if (Platform.OS === 'web') {
              testimonialsScale.value = withTiming(1, {
                duration: 150,
                easing: Easing.out(Easing.quad),
              });
            }
          }}
        >
          <Animated.View style={testimonialsAnimatedStyle}>
            <TestimonialsSection />
          </Animated.View>
        </Pressable>

        <Pressable
          style={styles.section}
          onHoverIn={() => {
            if (Platform.OS === 'web') {
              freeForeverScale.value = withTiming(1.01, {
                duration: 150,
                easing: Easing.out(Easing.quad),
              });
            }
          }}
          onHoverOut={() => {
            if (Platform.OS === 'web') {
              freeForeverScale.value = withTiming(1, {
                duration: 150,
                easing: Easing.out(Easing.quad),
              });
            }
          }}
        >
          <Animated.View style={freeForeverAnimatedStyle}>
            <FreeForeverSection />
          </Animated.View>
        </Pressable>

        <Pressable
          style={styles.section}
          onHoverIn={() => {
            if (Platform.OS === 'web') {
              footerScale.value = withTiming(1.01, {
                duration: 150,
                easing: Easing.out(Easing.quad),
              });
            }
          }}
          onHoverOut={() => {
            if (Platform.OS === 'web') {
              footerScale.value = withTiming(1, { duration: 150, easing: Easing.out(Easing.quad) });
            }
          }}
        >
          <Animated.View style={footerAnimatedStyle}>
            <Footer />
          </Animated.View>
        </Pressable>
      </ScrollView>
    </View>
  );
}

// =============================================================================
// Styles
// =============================================================================

const createStyles = (theme: any, width: number) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    section: {
      width: '100%',
    },
  });
};
