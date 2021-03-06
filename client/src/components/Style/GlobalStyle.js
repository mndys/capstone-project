import { createGlobalStyle } from 'styled-components/macro'

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
    border-radius: 25px;

    &:focus {
      outline: none;
      border-color: transparent;
      box-shadow: 0px 0px 4px 0px var(--color-primary);
    }
  }

  input, textarea {
    border: 2px solid var(--color-silver);
    padding: 4px;
  }

  button {
    border-radius: 4px;
    background: var(--color-primary);
    border: none;
  letter-spacing: 0.2em;

  }

  

  h2, h3{
    font-size: clamp(1.1em, 5vw, 1.6em);
    line-height: 1.1em;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: .2em;
    padding-bottom: .3em;
    color: var(--color-primary-dark);
  }

  h3{
    font-size: clamp(.8em, 4.5vw, 1em);
    margin: 2rem 0 .5rem 0;
  }

  textarea {
    resize: none;
    border-radius: 10px;
  }

  ::placeholder {
    font-size: .8em;
  }
`
