import React from 'react';
import SelectMultiple from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import stl from 'styled-components';
import { useDataContext } from '../lib/useContext';
import Option from './Option';
import { DataContextInterface } from '../types/dataContext';
import SubmitButton from './SubmitButton';

const Form = stl.form`
  border: 1px solid #E99BAC;
  border-radius: 15px;
  padding: 2%;
  margin: 2%;
  display: flex;
  justify-content: space-between;
`;

const Div = stl.div`
  width: 90%;
`;

const CountiesForm = () => {
  const data:DataContextInterface = useDataContext();

  const {
    handleSubmit, control,
  } = useForm({
    defaultValues: {
      filterAreas: [],
    },
  });

  const onSubmit = (filterAreas) => {
    data.applyFilter(filterAreas);
  };

  return (
    // <section style={{ display: 'flex', flexWrap: 'wrap' }}>
    <section>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Div>
          <Controller
            name="filterAreas"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <SelectMultiple
                options={data.counties}
                placeholder="Choose counties..."
                isMulti
                onChange={(options) => onChange(options?.map((option) => option.value))}
                onBlur={onBlur}
                value={data.counties.filter(
                  (option) => value?.includes(option.value),
                )}
                defaultValue={data.counties.filter(
                  (option) => value?.includes(option.value),
                )}
                instanceId="filterAreas"
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option,
                }}
              />
            )}
          />
        </Div>
        <SubmitButton />
      </Form>
    </section>

  );
};

export default CountiesForm;
