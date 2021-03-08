import { createGlobalStyle } from 'styled-components'

import OpenSans from '../fonts/OpenSans-Regular.ttf'
import HangedLetters from '../fonts/Hanged-Letters.ttf'

export default createGlobalStyle`
  * {
    box-sizing: border-box
  }

  @font-face {
    font-family: 'Open Sans';
    src: local('Open Sans'), local('OpenSans'), url(${OpenSans}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Hanging Letters';
    src: local('Hanging Letters'), local('HangingLetters'), url(${HangedLetters}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  body {
    margin: 0 auto;
    font-family: 'Open Sans', Verdana, Geneva, Tahoma, sans-serif;
    font-size: 112.5%;
    line-height: 1.5;
  }

  input, button, textarea {
    font-family: inherit;
    font-size: inherit;
    width: 100%;

    &:focus {
      outline: none;
      border-color: transparent;
      box-shadow: 0 0 4px 1px plum;
    }
  }

  input, textarea {
    border: 2px solid #ddd;
    padding: 4px;
  }

  button {
    border-radius: 4px;
    background: #ddd;
    border: none;
  }
`
