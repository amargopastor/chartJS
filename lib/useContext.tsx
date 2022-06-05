import React, { useContext } from 'react';
import useSWR from 'swr';
import PropTypes from 'prop-types';

export const get_filtered_data = () => {
  const { data } = useSWR('/cerca.json?p=tipus/com');
  if (data) {
    return data.feed.entry.map((e) => ({
      area: e['cross:DataSet']['cross:Section'].AREA,
      name: e.title,
      male: e['cross:DataSet']['cross:Section']['cross:Obs'][0].OBS_VALUE,
      female: e['cross:DataSet']['cross:Section']['cross:Obs'][1].OBS_VALUE,
      all: e['cross:DataSet']['cross:Section']['cross:Obs'][2].OBS_VALUE,
    }));
  }
  return false;
};

// Create context
export const DataContext = React.createContext({});

// Functions that return the created context
export const useDataContext = () => {
  const ctx = useContext(DataContext);
  return ctx;
};

export const DataManager = ({ children }) => {
  const filtered_data = get_filtered_data();
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <DataContext.Provider value={{ filtered_data }}>
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
