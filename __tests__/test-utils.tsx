import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';

/**
 * Test utility to render components wrapped with any required providers.
 *
 * @param ui - The React element to render
 * @param options - Optional render options from React Native Testing Library
 * @returns The render result
 */
export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) {
  // In the future, wrap `ui` with ThemeContext/AuthContext providers as needed.
  return render(ui, options);
}
