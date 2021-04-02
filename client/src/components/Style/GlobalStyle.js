import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    --color-primary: #0f6f7bff;
    --color-primary-dark: #093a40ff;
    --color-secondary: #fca311ff;
    --color-platinum: #e4e4e4ff;
    --color-silver: #c3c3c3ff;
    --color-text: #0e1516ff;
    --color-shadow: #33333380;

    box-sizing: border-box;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  *::-webkit-scrollbar {
  display: none;
}

  body {
    margin: 0 auto;
    font-family: 'Open Sans', Verdana, Geneva, Tahoma, sans-serif;
    font-size: 112.5%;
    line-height: 1.5;
    color: var(--color-text)
  }

  input, button, textarea {
    font-family: inherit;
    font-size: inherit;
    width: 100%;

    &:focus {
      outline: none;
      border-color: transparent;
      box-shadow: 0px 5px 4px -4px var(--color-primary);
    }
  }

  input, textarea {
    border: transparent;
    border-bottom: 2px solid var(--color-silver);
    padding: 4px;
  }

  button {
    border-radius: 4px;
    background: var(--color-primary);
    border: none;
  letter-spacing: 0.2em;

  }

  h2, h3{
    font-size: clamp(1.1em, 5vw, 30px);
    line-height: 1.1em;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: .2em;
    padding-bottom: .3em;
  }

  h3{
    font-size: clamp(.8em, 4.5vw, 24px);
    margin: 2rem 0 .5rem 0;
  }

  textarea {
    resize: none;
  }

  ::placeholder {
    font-size: 12px;
  }
`
