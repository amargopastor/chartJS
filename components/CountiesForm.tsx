import React from 'react';
import SelectMultiple from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { useDataContext } from '../lib/useContext';
import Option from './Option';

const CountiesForm = () => {
  // data
  const { counties, apply_filter } = useDataContext();

  const {
    handleSubmit, control,
  } = useForm({
    defaultValues: {
      filtered_areas: [],
    },
  });

  const onSubmit = (filtered_areas) => {
    apply_filter(filtered_areas);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          name="filtered_areas"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <SelectMultiple
              options={counties}
              placeholder="Choose..."
              isMulti
              onChange={(options) => onChange(options?.map((option) => option.value))}
              onBlur={onBlur}
              value={counties.filter(
                (option) => value?.includes(option.value),
              )}
              defaultValue={counties.filter(
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
