// =============================================================================
// Imports
// =============================================================================
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { Heart, Mail, Github } from 'lucide-react-native';

// =============================================================================
// Component
// =============================================================================

/**
 * Footer component for the landing page.
 *
 * Displays app branding, navigation links, contact information, and copyright notice.
 * Features responsive layout that adapts from vertical on mobile to multi-column on desktop.
 * Includes links to privacy policy, terms of service, and contact methods.
 *
 * @returns The footer section with branding and navigation links
 */
export default function Footer() {
  const { theme } = useTheme();
  const router = useRouter();
  const { width } = useWindowDimensions();

  const handleEmailPress = () => {
    Linking.openURL('mailto:support@sobrietywaypoint.com');
  };

  const handleGithubPress = () => {
    Linking.openURL('https://github.com/yourusername/sobriety-waypoint');
  };

  const styles = createStyles(theme, width);
  const isMobile = width < 768;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Top Section */}
        <View style={styles.topSection}>
          {/* Brand */}
          <View style={styles.brandSection}>
            <View style={styles.logoContainer}>
              <Heart size={32} color="#007AFF" fill="#007AFF" />
            </View>
            <Text style={styles.brandName}>Sobriety Waypoint</Text>
            <Text style={styles.brandTagline}>
              Supporting your recovery journey, one day at a time.
            </Text>
          </View>

          {/* Links Section */}
          {!isMobile && (
            <View style={styles.linksContainer}>
              {/* Product Links */}
              <View style={styles.linkColumn}>
                <Text style={styles.linkColumnTitle}>Product</Text>
                <TouchableOpacity onPress={() => router.push('/signup')}>
                  <Text style={styles.linkText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/login')}>
                  <Text style={styles.linkText}>Sign In</Text>
                </TouchableOpacity>
              </View>

              {/* Support Links */}
              <View style={styles.linkColumn}>
                <Text style={styles.linkColumnTitle}>Support</Text>
                <TouchableOpacity onPress={handleEmailPress}>
                  <Text style={styles.linkText}>Contact Us</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.linkText}>FAQ</Text>
                </TouchableOpacity>
              </View>

              {/* Legal Links */}
              <View style={styles.linkColumn}>
                <Text style={styles.linkColumnTitle}>Legal</Text>
                <TouchableOpacity>
                  <Text style={styles.linkText}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.linkText}>Terms of Service</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Mobile Links */}
        {isMobile && (
          <View style={styles.mobileLinksContainer}>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={styles.linkText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.linkSeparator}>•</Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.linkText}>Sign In</Text>
            </TouchableOpacity>
            <Text style={styles.linkSeparator}>•</Text>
            <TouchableOpacity onPress={handleEmailPress}>
              <Text style={styles.linkText}>Contact</Text>
            </TouchableOpacity>
            <Text style={styles.linkSeparator}>•</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>Privacy</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Divider */}
        <View style={styles.divider} />

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <Text style={styles.copyright}>
            © {new Date().getFullYear()} Sobriety Waypoint. All rights reserved.
          </Text>

          <View style={styles.socialLinks}>
            <TouchableOpacity style={styles.socialButton} onPress={handleEmailPress}>
              <Mail size={20} color={theme.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} onPress={handleGithubPress}>
              <Github size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recovery Resources Notice */}
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>
            If you or someone you know is struggling with substance abuse, please reach out to
            SAMHSA National Helpline: 1-800-662-4357 (24/7 confidential support)
          </Text>
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
      backgroundColor: theme.card,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      paddingHorizontal: isMobile ? 24 : isTablet ? 48 : 80,
      paddingVertical: isMobile ? 40 : 60,
    },
    content: {
      maxWidth: 1200,
      width: '100%',
      alignSelf: 'center',
    },
    topSection: {
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      marginBottom: isMobile ? 32 : 40,
      gap: isMobile ? 32 : 0,
    },
    brandSection: {
      maxWidth: isMobile ? '100%' : 300,
    },
    logoContainer: {
      marginBottom: 12,
    },
    brandName: {
      fontSize: isMobile ? 20 : 22,
      fontFamily: theme.fontBold,
      color: theme.text,
      marginBottom: 8,
    },
    brandTagline: {
      fontSize: 14,
      fontFamily: theme.fontRegular,
      color: theme.textSecondary,
      lineHeight: 22,
    },
    linksContainer: {
      flexDirection: 'row',
      gap: isMobile ? 32 : 48,
    },
    linkColumn: {
      gap: 12,
    },
    linkColumnTitle: {
      fontSize: 14,
      fontFamily: theme.fontSemiBold,
      color: theme.text,
      marginBottom: 4,
    },
    linkText: {
      fontSize: 14,
      fontFamily: theme.fontRegular,
      color: theme.textSecondary,
      lineHeight: 24,
      ...Platform.select({
        web: {
          cursor: 'pointer',
          transition: 'color 0.2s ease',
        },
      }),
    },
    mobileLinksContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
      marginBottom: 24,
    },
    linkSeparator: {
      fontSize: 14,
      color: theme.textTertiary,
    },
    divider: {
      height: 1,
      backgroundColor: theme.border,
      marginBottom: isMobile ? 24 : 32,
    },
    bottomSection: {
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: isMobile ? 20 : 0,
      marginBottom: 24,
    },
    copyright: {
      fontSize: 14,
      fontFamily: theme.fontRegular,
      color: theme.textTertiary,
      textAlign: isMobile ? 'center' : 'left',
    },
    socialLinks: {
      flexDirection: 'row',
      gap: 16,
    },
    socialButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
      ...Platform.select({
        web: {
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        },
      }),
    },
    noticeContainer: {
      backgroundColor: theme.background,
      borderRadius: 8,
      padding: isMobile ? 16 : 20,
      borderWidth: 1,
      borderColor: theme.border,
    },
    noticeText: {
      fontSize: 12,
      fontFamily: theme.fontRegular,
      color: theme.textSecondary,
      textAlign: 'center',
      lineHeight: 18,
    },
  });
};
