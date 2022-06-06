import React, {
  useEffect, useState,
} from 'react';
import SelectMultiple from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { useDataContext } from '../lib/useContext';
import Option from './Option';
import pathname from '../utils/location.pathname';

const CountiesForm = () => {
  // data
  const geographic_data = useDataContext();
  if (!geographic_data) {
    <div>No data available</div>;
  }

  const counties_list = geographic_data.items.map((e) => (
    { value: e.area, label: e.name }
  ));
  // const [counties, setcounties] = useState([]);

  // useEffect(() => {
  //   if (geographic_data.filtered_data !== false) {
  //     // geographic_data.filtered_data = [];
  //     // setcounties([...geographic_data.filtered_data.map((e) => (
  //     //   { value: e.area, label: e.name }
  //     // ))]);
  //   }
  // }, [geographic_data]);

  const {
    handleSubmit, control,
  } = useForm({
    defaultValues: {
      counties: [],
    },
  });

  const onSubmit = (area_list) => {
    geographic_data.filter(area_list, pathname());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          name="counties"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <SelectMultiple
              options={counties_list}
              placeholder="Choose..."
              isMulti
              onChange={(options) => onChange(options?.map((option) => option.value))}
              onBlur={onBlur}
              value={counties_list.filter(
                (option) => value?.includes(option.value),
              )}
              defaultValue={counties_list.filter(
                (option) => value?.includes(option.value),
              )}
              instanceId
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{
                Option,
              }}
            />
          )}
        />
      </div>
      <input type="submit" />
    </form>
  );
};

export default CountiesForm;
