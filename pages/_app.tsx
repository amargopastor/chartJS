import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { SWRConfig } from 'swr';
import fetcher from '../lib/swr-fetcher';
import { GlobalStyles, lightTheme } from '../style/theme.congif';
import Menu from '../components/Menu';

const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider theme={lightTheme}>
    <GlobalStyles />
    <SWRConfig value={{ refreshInterval: 10 * 1000, fetcher }}>
      <main>
        <Menu />
        <Component {...pageProps} />
      </main>
    </SWRConfig>
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
