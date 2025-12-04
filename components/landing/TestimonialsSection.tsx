// =============================================================================
// Imports
// =============================================================================
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Quote } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';

// =============================================================================
// Types
// =============================================================================

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  daysSober: string;
}

// =============================================================================
// Component
// =============================================================================

/**
 * Testimonials section component displaying user success stories.
 *
 * Shows three testimonials from users in recovery with their quotes, names, and
 * sobriety milestones. Features animated entrance effects and responsive grid layout.
 * Builds trust with potential users through authentic recovery stories.
 *
 * @returns The testimonials section with animated testimonial cards
 */
export default function TestimonialsSection() {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();

  const testimonials: Testimonial[] = [
    {
      quote:
        'This app has been a game-changer for my recovery. Having my sponsor just a tap away and being able to track my progress daily keeps me motivated and accountable.',
      author: 'Sarah M.',
      role: 'In Recovery',
      daysSober: '287 days sober',
    },
    {
      quote:
        'As a sponsor, this makes it so much easier to stay connected with my sponsees. The task system helps me guide them through the steps in a structured way.',
      author: 'Michael T.',
      role: 'Sponsor',
      daysSober: '5 years sober',
    },
    {
      quote:
        "Celebrating each milestone, no matter how small, has been huge for my journey. The app reminds me how far I've come and gives me hope for tomorrow.",
      author: 'Jennifer L.',
      role: 'In Recovery',
      daysSober: '127 days sober',
    },
  ];

  const styles = createStyles(theme, width);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Real Stories, Real Progress</Text>
        <Text style={styles.sectionSubtitle}>
          Hear from people who are using Sobriety Waypoint on their recovery journey
        </Text>

        <View style={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
              theme={theme}
              width={width}
            />
          ))}
        </View>

        {/* Success Stats */}
        <View style={styles.statsContainer}>
          <StatItem value="10,000+" label="Days Tracked" theme={theme} width={width} />
          <StatItem value="500+" label="Active Users" theme={theme} width={width} />
          <StatItem value="1,000+" label="Milestones Celebrated" theme={theme} width={width} />
        </View>
      </View>
    </View>
  );
}

// =============================================================================
// Sub-Components
// =============================================================================

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  theme: any;
  width: number;
}

function TestimonialCard({ testimonial, index, theme, width }: TestimonialCardProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(40);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!hasAnimated.current) {
      opacity.value = withDelay(index * 150, withSpring(1, { damping: 15 }));
      translateY.value = withDelay(index * 150, withSpring(0, { damping: 15 }));
      hasAnimated.current = true;
    }
  }, [index]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const styles = createCardStyles(theme, width);

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <View style={styles.quoteIconContainer}>
        <Quote size={24} color="#007AFF" />
      </View>
      <Text style={styles.quote}>{testimonial.quote}</Text>
      <View style={styles.authorContainer}>
        <Text style={styles.authorName}>{testimonial.author}</Text>
        <Text style={styles.authorRole}>{testimonial.role}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{testimonial.daysSober}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

interface StatItemProps {
  value: string;
  label: string;
  theme: any;
  width: number;
}

function StatItem({ value, label, theme, width }: StatItemProps) {
  const isMobile = width < 768;

  const styles = StyleSheet.create({
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statValue: {
      fontSize: isMobile ? 32 : 40,
      fontFamily: theme.fontBold,
      color: '#007AFF',
      marginBottom: 8,
      lineHeight: isMobile ? 40 : 48,
    },
    statLabel: {
      fontSize: isMobile ? 14 : 16,
      fontFamily: theme.fontRegular,
      color: theme.textSecondary,
      textAlign: 'center',
      lineHeight: isMobile ? 20 : 24,
    },
  });

  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
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
      backgroundColor: theme.background,
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
    testimonialsGrid: {
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? 20 : 24,
      marginBottom: isMobile ? 40 : 64,
    },
    statsContainer: {
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? 32 : 48,
      paddingVertical: isMobile ? 32 : 40,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
  });
};

const createCardStyles = (theme: any, width: number) => {
  const isMobile = width < 768;

  return StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: theme.card,
      borderRadius: 16,
      padding: isMobile ? 24 : 28,
      borderWidth: 1,
      borderColor: theme.border,
      minWidth: isMobile ? undefined : 280,
      ...Platform.select({
        web: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        },
        default: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3,
        },
      }),
    },
    quoteIconContainer: {
      marginBottom: 16,
    },
    quote: {
      fontSize: isMobile ? 15 : 16,
      fontFamily: theme.fontRegular,
      color: theme.text,
      lineHeight: isMobile ? 24 : 26,
      marginBottom: 20,
    },
    authorContainer: {
      borderTopWidth: 1,
      borderTopColor: theme.border,
      paddingTop: 16,
    },
    authorName: {
      fontSize: isMobile ? 16 : 17,
      fontFamily: theme.fontSemiBold,
      color: theme.text,
      marginBottom: 4,
    },
    authorRole: {
      fontSize: isMobile ? 14 : 15,
      fontFamily: theme.fontRegular,
      color: theme.textSecondary,
      marginBottom: 12,
    },
    badge: {
      backgroundColor: '#10b98115',
      borderRadius: 16,
      paddingVertical: 6,
      paddingHorizontal: 12,
      alignSelf: 'flex-start',
    },
    badgeText: {
      fontSize: 13,
      fontFamily: theme.fontMedium,
      color: '#10b981',
    },
  });
};
