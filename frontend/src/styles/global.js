import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  html {
    font-family: "Poppins", sans-serif;
  }

  body {
    margin: 0;
    overflow-x: hidden;
    background-color: #EBEBEBFF;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`