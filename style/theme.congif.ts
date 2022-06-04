import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#1577A9',
  mainColor: '#FFFFFF',
  text: '#BCBEC0',
};

export const GlobalStyles = createGlobalStyle<{theme:typeof lightTheme}>`
* {
   box-sizing: border-box;
}
body {
   margin: 0;
   padding: 0;
   background: ${({ theme }) => theme.body};
   color: ${({ theme }) => theme.text};
   font-family: sans-serif;
   font-weight: 400;
   font-style: normal;
   transition: all 0.50s linear;
}
input, textarea, button {font-family: inherit}`;
