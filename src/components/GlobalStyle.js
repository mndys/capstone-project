import { createGlobalStyle } from 'styled-components'

import OpenSans from '../fonts/OpenSans-Regular.ttf'
import HangedLetters from '../fonts/Hanged-Letters.ttf'

export default createGlobalStyle`
  * {
    box-sizing: border-box
  }

  @font-face {
    font-family: 'hanging_lettersregular';
    src: url('hanged_letters-webfont.woff2') format('woff2'),
         url('hanged_letters-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;

}

@font-face {
    font-family: 'open_sansregular';
    src: url('opensans-regular-webfont.woff2') format('woff2'),
         url('opensans-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;

}

  body {
    margin: 0 auto;
    font-family: 'open_sansregular', Verdana, Geneva, Tahoma, sans-serif;
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
