import React, {
  useEffect, useRef, useMemo,
} from 'react';
import {
  Chart,
  BarElement,
  BarController,
  LinearScale,
  CategoryScale,
} from 'chart.js';
import { useDataContext } from '../lib/useContext';
import pathname from '../utils/location.pathname';

Chart.register(BarElement, BarController, LinearScale, CategoryScale);

const CountiesChart = () => {
  // data
  const data = useDataContext();
  // if (!geographic_data.counties) {
  //   <div>No data available</div>;
  // }

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
    if (!data.counties !== false || !chart) return;

    // chart
    chart.data.labels = [...data.counties.filter((e) => e.active).map((e) => e.label)];
    chart.data.datasets[0].data = [...data.counties.filter(
      (e) => e.active,
    ).map((e) => e[pathname()])];

    chart.update();
  }, [data]);
  return (
    <section>
      {/* <pre>{JSON.stringify(geographic_data.items, null, 2)}</pre>
      <pre>{JSON.stringify(geographic_data.filtered_data, null, 2)}</pre> */}
      <div style={{ height: 500 }}>
        <canvas ref={ref} />
      </div>
    </section>

  );
};

export default CountiesChart;
