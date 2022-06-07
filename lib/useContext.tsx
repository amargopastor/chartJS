import React, { useContext, useEffect, useState } from 'react';
// import useSWR from 'swr';
import PropTypes from 'prop-types';
import { getCounties } from './api';

// Create context
export const DataContext = React.createContext({});

// Functions that return the created context
export const useDataContext = () => {
  const ctx = useContext(DataContext);
  return ctx;
};

export const DataManager = ({ children }) => {
  const [counties, setCounties] = useState([]);

  // Load the ingredients from database via API
  useEffect(() => {
    getCounties().then((e) => {
      e.forEach((ing) => {
        setCounties(((ppp) => [...ppp, ing]));
      });
    });
  }, []);

  const apply_filter = ({ filtered_areas }) => {
    console.log(filtered_areas);

    if (!filtered_areas.length) {
      console.log('empty!');
      setCounties((c) => []);
      getCounties().then((e) => {
        e.forEach((ing) => {
          setCounties(((ppp) => [...ppp, ing]));
        });
      });
      return false;
    }

    const items_filtered = counties.map((e) => (filtered_areas.includes(e.value)
      ? { ...e, active: true } : { ...e, active: false }));

    // empty list
    setCounties((c) => []);
    items_filtered.forEach((ing) => {
      setCounties(((ops) => [...ops, ing]));
    });

    return false;
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <DataContext.Provider value={{ counties, apply_filter }}>
      {children}
    </DataContext.Provider>
  );
};

DataManager.defaultProps = {
  children: PropTypes.any,
};

DataManager.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any,
};
