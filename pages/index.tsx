import React, {
  useEffect, useState, useRef, useMemo,
} from 'react';
import {
  Chart,
  BarElement,
  BarController,
  LinearScale,
  CategoryScale,
} from 'chart.js';
import _ from 'lodash';
import SelectMultiple, { components } from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { useDataContext } from '../lib/useContext';
import Title from '../components/Title';

Chart.register(BarElement, BarController, LinearScale, CategoryScale);

const Option = (props) => (
  <div>
    <components.Option {...props}>
      <input
        type="checkbox"
        checked={props.isSelected}
        onChange={() => null}
      />
      {' '}
      <label>{props.label}</label>
    </components.Option>
  </div>
);

const IndexPage = () => {
  // data
  const geographic_data = useDataContext();
  if (!geographic_data) {
    <div>No data available</div>;
  }

  // chartJS
  const ref = useRef<HTMLCanvasElement>();
  const chart = useMemo(() => {
    if (!ref.current) return;
    const ctx = ref?.current?.getContext('2d');
    // eslint-disable-next-line consistent-return
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: '# of Votes',
            data: [],
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });
  }, [ref.current]);

  const [counties1, setCounties1] = useState([]);

  useEffect(() => {
    if (!geographic_data || !chart) return;

    // chart
    chart.data.labels = _.range(geographic_data.filtered_data.length);
    chart.data.datasets[0].data = [...geographic_data.filtered_data.map((e) => e.all)];

    // form
    setCounties1([...geographic_data.filtered_data.map((e) => ({ value: e.area, label: e.name }))]);
    console.log(counties1);

    chart.update();
  }, [geographic_data]);

  // form
  const {
    handleSubmit, control,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldUnregister: true,
    defaultValues: {
      counties: [],
    },
  });

  return (
    <section>
      <Title txt="Welcome" />
      <div>
        <form onSubmit={handleSubmit(console.log)}>
          <div>
            <Controller
              name="counties"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <SelectMultiple
                  options={counties1}
                  placeholder="Choose..."
                  isMulti
                  onChange={(options) => onChange(options?.map((option) => option.value))}
                  onBlur={onBlur}
                  value={counties1.filter((option) => value?.includes(option.value))}
                  defaultValue={counties1.filter((option) => value?.includes(option.value))}
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
          <button>submit</button>
        </form>
      </div>

      <div style={{ height: 500 }}>
        <canvas ref={ref} />
      </div>
      <pre>{JSON.stringify(geographic_data.filtered_data, null, 2)}</pre>
    </section>
  );
};

export default IndexPage;
