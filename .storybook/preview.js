import React from 'react';

import GlobalStyle from '../src/components/GlobalStyle'
import GlobalFonts from '../src/fonts/fonts'

// Global decorator to apply the styles to all stories
export const decorators = [
  Story => (
    <>
      <GlobalStyle />
      <GlobalFonts />
      <Story />
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}