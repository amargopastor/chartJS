import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { GlobalStyles, lightTheme } from '../style/theme.congif';
import Menu from '../components/Menu';

const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider theme={lightTheme}>
    <GlobalStyles />
    <main>
      <Menu />
      <Component {...pageProps} />
    </main>
  </ThemeProvider>
);

MyApp.defaultProps = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.shape({}),
};

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.shape({}),
};

export default MyApp;
