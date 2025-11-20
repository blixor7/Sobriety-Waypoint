import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { ThemeProvider } from '@/contexts/ThemeContext';
import SignupScreen from '@/app/signup';

// Mock AuthContext
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    signUp: jest.fn(),
    signInWithGoogle: jest.fn(),
  }),
}));

// Mock lucide-react-native icons
jest.mock('lucide-react-native', () => {
  const React = require('react');
  return {
    Heart: ({ color, ...props }: any) => React.createElement('Heart', { color, ...props }),
    ArrowLeft: ({ color, ...props }: any) => React.createElement('ArrowLeft', { color, ...props }),
  };
});

// Mock the social logos component
jest.mock('@/components/auth/SocialLogos', () => ({
  GoogleLogo: () => null,
}));

describe('SignupScreen', () => {
  describe('Back Button', () => {
    it('uses theme text color instead of hardcoded color', () => {
      let component: any;
      act(() => {
        component = renderer.create(
          <ThemeProvider>
            <SignupScreen />
          </ThemeProvider>
        );
      });

      const tree = component.toJSON();

      // Find the ArrowLeft icon in the tree
      const findArrowLeft = (node: any): any => {
        if (!node) return null;
        if (node.type === 'ArrowLeft') {
          return node;
        }
        if (Array.isArray(node)) {
          for (const child of node) {
            const result = findArrowLeft(child);
            if (result) return result;
          }
        }
        if (node.children) {
          return findArrowLeft(node.children);
        }
        return null;
      };

      const arrowLeftIcon = findArrowLeft(tree);

      // The icon should use theme.text color (#111827 for light theme)
      // not the hardcoded #374151
      expect(arrowLeftIcon).toBeDefined();
      expect(arrowLeftIcon.props.color).toBe('#111827');
    });
  });
});
