import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#FFE5D9',
  main: '#5C14DB',
  mainColor: '#FFFFFF',
  text: '#e99aac',
  accent: '#E5DE17',
  accentColor: '#161616',
  secondary: '#FFFFFF',
  secondaryColor: '#343434',
  dullColor: '#343434',
  ternary: '#000000',
  codeColor: '#D121C5',
};

export const GlobalStyles = createGlobalStyle<{theme:typeof lightTheme}>`
* {
   box-sizing: border-box;
}
body {
   margin: 0;
   padding-top: 20px;
   background: ${({ theme }) => theme.body};
   color: ${({ theme }) => theme.text};
   font-family: sans-serif;
   font-weight: 400;
   font-style: normal;
   transition: all 0.50s linear;
   width: 85%;
   margin: auto;
   overflow: auto;
   position: relative;
}
input, textarea, button {font-family: inherit}`;
