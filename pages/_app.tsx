import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { SWRConfig } from 'swr';
import fetcher from '../lib/fetcher';
import { GlobalStyles, lightTheme } from '../style/theme.congif';
import Menu from '../components/Menu';
import { DataManager } from '../lib/useContext';

const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider theme={lightTheme}>
    <GlobalStyles />
    <SWRConfig value={{ refreshInterval: 10 * 1000, fetcher }}>
      <DataManager>
        <main>
          <Menu />
          <Component {...pageProps} />
        </main>
      </DataManager>
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
