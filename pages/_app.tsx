import React from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { GlobalStyles, lightTheme } from '../style/theme.congif';
import Menu from '../components/Menu';
import { DataManager } from '../lib/useContext';
import CountiesForm from '../components/CountiesForm';
import CountiesChart from '../components/CountiesChart';

const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider theme={lightTheme}>
    <GlobalStyles />
    <DataManager>
      <main>
        <Menu />
        <Component {...pageProps} />
        <CountiesForm />
        <CountiesChart />
      </main>
    </DataManager>
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
