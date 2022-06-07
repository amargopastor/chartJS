import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCountiesFromAPI } from './api';
import { CountiesList, Countie } from '../types/countie';
import { DataContextInterface } from '../types/dataContext';

// Create context
export const DataContext = React.createContext({} as DataContextInterface);

// Functions that return the created context
export const useDataContext = () => {
  const ctx = useContext(DataContext);
  return ctx;
};

export const DataManager = ({ children }) => {
  const [counties, setCounties] = useState([]);

  const startCountiesInfo = () => {
    // empty state
    setCounties(() => []);
    // Load the counties from database via API
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

      // empty list
      setCounties(() => []);
      // Load the filtered counties
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
