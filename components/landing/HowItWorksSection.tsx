// =============================================================================
// Imports
// =============================================================================
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { UserPlus, CalendarCheck, Users2, TrendingUp } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';

// =============================================================================
// Types
// =============================================================================

interface Step {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

// =============================================================================
// Component
// =============================================================================

/**
 * How It Works section component explaining the app usage flow.
 *
 * Displays a 4-step process with numbered steps, icons, titles, and descriptions.
 * Features animated entrance effects and responsive layout that adapts from vertical
 * on mobile to horizontal on desktop. Includes visual dividers between steps.
 *
 * @returns The how it works section with animated step cards
 */
export default function HowItWorksSection() {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();

  const isMobile = width < 768;
  const iconSize = isMobile ? 28 : 32;

  const steps: Step[] = [
    {
      number: '01',
      icon: <UserPlus size={iconSize} color="#ffffff" />,
      title: 'Create Your Account',
      description:
        'Sign up in seconds with email or continue with Google. Your journey starts here.',
    },
    {
      number: '02',
      icon: <CalendarCheck size={iconSize} color="#ffffff" />,
      title: 'Set Your Sobriety Date',
      description:
        'Mark your starting point and watch as the days of progress add up. Every day counts.',
    },
    {
      number: '03',
      icon: <Users2 size={iconSize} color="#ffffff" />,
      title: 'Connect With Your Sponsor',
      description:
        'Use invite codes to connect with your sponsor or sponsee. Build your support network.',
    },
    {
      number: '04',
      icon: <TrendingUp size={iconSize} color="#ffffff" />,
      title: 'Track Your Progress',
      description:
        'Complete tasks, celebrate milestones, and stay accountable on your recovery journey.',
    },
  ];

  const styles = createStyles(theme, width);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <Text style={styles.sectionSubtitle}>
          Getting started is simple. Follow these four easy steps to begin your journey.
        </Text>

        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <StepCard step={step} index={index} theme={theme} width={width} />
              {index < steps.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>

        {/* Encouraging message */}
        <View style={styles.encouragementBox}>
          <Text style={styles.encouragementText}>
            One day at a time. You have got this, and you are not alone.
          </Text>
        </View>
      </View>
    </View>
  );
}

// =============================================================================
// Sub-Components
// =============================================================================

interface StepCardProps {
  step: Step;
  index: number;
  theme: any;
  width: number;
}

function StepCard({ step, index, theme, width }: StepCardProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(40);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!hasAnimated.current) {
      opacity.value = withDelay(index * 200, withSpring(1, { damping: 15 }));
      translateY.value = withDelay(index * 200, withSpring(0, { damping: 15 }));
      hasAnimated.current = true;
    }
  }, [index]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const styles = createCardStyles(theme, width);

  return (
    <Animated.View style={[styles.stepCard, animatedStyle]}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepNumber}>{step.number}</Text>
        <View style={styles.iconCircle}>{step.icon}</View>
      </View>
      <Text style={styles.stepTitle}>{step.title}</Text>
      <Text style={styles.stepDescription}>{step.description}</Text>
    </Animated.View>
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
      backgroundColor: theme.surface,
      paddingHorizontal: isMobile ? 24 : isTablet ? 48 : 80,
      paddingVertical: isMobile ? 60 : 80,
      alignItems: 'center',
    },
    content: {
      maxWidth: 1200,
      width: '100%',
    },
    sectionTitle: {
      fontSize: isMobile ? 32 : isTablet ? 40 : 48,
      fontFamily: theme.fontBold,
      color: theme.text,
      textAlign: 'center',
      marginBottom: 16,
      lineHeight: isMobile ? 40 : isTablet ? 48 : 56,
    },
    sectionSubtitle: {
      fontSize: isMobile ? 16 : 18,
      fontFamily: theme.fontRegular,
      color: theme.textSecondary,
      textAlign: 'center',
      marginBottom: isMobile ? 40 : 56,
      lineHeight: isMobile ? 24 : 28,
    },
    stepsContainer: {
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? 24 : 0,
      marginBottom: isMobile ? 40 : 56,
    },
    divider: {
      width: isMobile ? '100%' : 1,
      height: isMobile ? 1 : 'auto',
      backgroundColor: theme.border,
      marginHorizontal: isMobile ? 0 : 16,
      marginVertical: isMobile ? 0 : 0,
    },
    encouragementBox: {
      backgroundColor: theme.card,
      borderRadius: 16,
      padding: isMobile ? 24 : 32,
      borderLeftWidth: 4,
      borderLeftColor: '#007AFF',
      alignItems: 'center',
      ...Platform.select({
        web: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        },
        default: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 4,
        },
      }),
    },
    encouragementText: {
      fontSize: isMobile ? 18 : 20,
      fontFamily: theme.fontMedium,
      color: theme.text,
      textAlign: 'center',
      lineHeight: isMobile ? 26 : 30,
      fontStyle: 'italic',
    },
  });
};

const createCardStyles = (theme: any, width: number) => {
  const isMobile = width < 768;

  return StyleSheet.create({
    stepCard: {
      flex: 1,
      alignItems: isMobile ? 'flex-start' : 'center',
      paddingHorizontal: isMobile ? 0 : 16,
    },
    stepHeader: {
      flexDirection: isMobile ? 'row' : 'column',
      alignItems: 'center',
      marginBottom: 16,
      gap: isMobile ? 16 : 12,
    },
    stepNumber: {
      fontSize: isMobile ? 48 : 56,
      fontFamily: theme.fontBold,
      color: theme.border,
      lineHeight: isMobile ? 48 : 56,
    },
    iconCircle: {
      width: isMobile ? 56 : 64,
      height: isMobile ? 56 : 64,
      borderRadius: isMobile ? 28 : 32,
      backgroundColor: '#007AFF',
      justifyContent: 'center',
      alignItems: 'center',
      ...Platform.select({
        web: {
          boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)',
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
    stepTitle: {
      fontSize: isMobile ? 18 : 20,
      fontFamily: theme.fontSemiBold,
      color: theme.text,
      marginBottom: 8,
      textAlign: isMobile ? 'left' : 'center',
      lineHeight: isMobile ? 26 : 28,
    },
    stepDescription: {
      fontSize: isMobile ? 14 : 15,
      fontFamily: theme.fontRegular,
      color: theme.textSecondary,
      textAlign: isMobile ? 'left' : 'center',
      lineHeight: isMobile ? 22 : 24,
    },
  });
};
