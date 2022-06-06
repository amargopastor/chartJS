import React, { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import PropTypes from 'prop-types';
import { getIngredients } from './api';

export const get_filtered_data = () => {
  console.log('getting data');
  const { data } = useSWR('/cerca.json?p=tipus/com');
  if (data) {
    const filtered_data = data.feed.entry.map((e) => ({
      area: e['cross:DataSet']['cross:Section'].AREA,
      name: e.title,
      male: e['cross:DataSet']['cross:Section']['cross:Obs'][0].OBS_VALUE,
      female: e['cross:DataSet']['cross:Section']['cross:Obs'][1].OBS_VALUE,
      all: e['cross:DataSet']['cross:Section']['cross:Obs'][2].OBS_VALUE,
    }));
    return filtered_data;
  }
  return false;
};

// export const get_filtered_data_by_gender = (area_list, sex) => {
//   console.log(area_list);
//   console.log(sex);
//   console.log(filtered_data);
//   return false;
// };

export const search_counties = (area_list, sex) => {
  console.log(area_list);
  console.log(sex);
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
  const [items, setItems] = useState([]);

  // Load the ingredients from database via API
  useEffect(() => {
    getIngredients().then((e) => {
      e.forEach((ing) => {
        setItems(((ppp) => [...ppp, ing]));
      });
    });
  }, []);

  const filter = (area_list, sex) => {
    const array_counties = area_list.counties;
    console.log(array_counties);
    console.log(sex);
    console.log(items);
    const items_filtered = items.filter((e) => array_counties.includes(e.area));
    console.log('items_filtered', items_filtered);
    setItems((ops) => []);
    items_filtered.forEach((ing) => {
      setItems(((ops) => [...ops, ing]));
    });
    console.log('final', items);
    return false;
  };

  const filtered_data = get_filtered_data();

  let counties_list = [];
  if (filtered_data) {
    counties_list = filtered_data.map((e) => (
      { value: e.area, label: e.name }
    ));
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <DataContext.Provider value={{
      filtered_data, search_counties, counties_list, items, filter,
    }}
    >
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
