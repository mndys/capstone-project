import { createGlobalStyle } from 'styled-components'

import HangingLettersWoff from '../../fonts/hanged_letters-webfont.woff'
import HangingLettersWoff2 from '../../fonts/hanged_letters-webfont.woff2'
import OpenSansWoff from '../../fonts/opensans-regular-webfont.woff'
import OpenSansWoff2 from '../../fonts/opensans-regular-webfont.woff2'

export default createGlobalStyle`
    @font-face {
      font-family: 'Hanging Letters';
      src: local('Hanging Letters'), local('HangingLetters'),
      url(${HangingLettersWoff2}) format('woff2'),
      url(${HangingLettersWoff}) format('woff');
      font-weight: 300;
      font-style: normal;
     }

     @font-face {
      font-family: 'Open Sans';
      src: local('Open Sans'), local('OpenSans'),
      url(${OpenSansWoff2}) format('woff2'),
      url(${OpenSansWoff}) format('woff');
      font-weight: 300;
      font-style: normal;
     }
  `
