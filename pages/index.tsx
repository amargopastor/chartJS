import React, { useEffect, useRef, useMemo } from 'react';
import {
  Chart,
  BarElement,
  BarController,
  LinearScale,
  CategoryScale,
} from 'chart.js';
import _ from 'lodash';
import { useDataContext } from '../lib/useContext';
import Title from '../components/Title';

Chart.register(BarElement, BarController, LinearScale, CategoryScale);

const IndexPage = () => {
  // data
  const geographic_data = useDataContext();
  if (!geographic_data) {
    <div>No data available</div>;
  }

  if (geographic_data !== undefined) {
    console.log(geographic_data.filtered_data.length);
    // console.log(Array.isArray(geographic_data.filtered_data.map((e)=>e.all)));
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

  useEffect(() => {
    if (!geographic_data || !chart) return;
    console.log('updating data');

    chart.data.labels = _.range(geographic_data.filtered_data.length);
    chart.data.datasets[0].data = [...geographic_data.filtered_data.map((e) => e.all)];

    chart.update();
  }, [geographic_data]);

  return (
    <section>
      <Title txt="Welcome" />
      <div style={{ height: 500 }}>
        <canvas ref={ref} />
      </div>
      <pre>{JSON.stringify(geographic_data.filtered_data, null, 2)}</pre>
    </section>
  );
};

export default IndexPage;
