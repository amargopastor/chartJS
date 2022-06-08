import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCountiesFromAPI } from './api';
import { CountiesList, Countie } from '../types/countie';
import { DataContextInterface } from '../types/dataContext';

export const DataContext = React.createContext({} as DataContextInterface);

export const useDataContext = () => {
  const ctx = useContext(DataContext);
  return ctx;
};

export const DataManager = ({ children }) => {
  const [counties, setCounties] = useState([]);

  const startCountiesInfo = () => {
    setCounties(() => []);
    getCountiesFromAPI().then((cs:CountiesList) => {
      cs.forEach((c:Countie) => {
        setCounties(((currents:CountiesList) => [...currents, c]));
      });
    });
  };

  useEffect(() => { startCountiesInfo(); }, []);

  const applyFilter = (info) => {
    if (info.filterAreas.length) {
      const filteredCounties = counties.map((e) => (info.filterAreas.includes(e.value)
        ? { ...e, active: true } : { ...e, active: false }));

      setCounties(() => []);
      filteredCounties.forEach((c:Countie) => {
        setCounties(((currents:CountiesList) => [...currents, c]));
      });
    } else {
      startCountiesInfo();
    }
    return true;
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <DataContext.Provider value={{ counties, applyFilter }}>
      {children}
    </DataContext.Provider>
  );
};

DataManager.propTypes = {
  children: PropTypes.node.isRequired,
};
