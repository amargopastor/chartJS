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
import { DataContextInterface } from '../types/dataContext';
import { Countie } from '../types/countie';

Chart.register(BarElement, BarController, LinearScale, CategoryScale);

const CountiesChart = () => {
  const data:DataContextInterface = useDataContext();

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

    chart.data.labels = [...data.counties.filter((e:Countie) => e.active)
      .map((e:Countie) => e.label)];
    chart.data.datasets[0].data = [...data.counties.filter((e:Countie) => e.active)
      .map((e:Countie) => e[pathname()])];

    chart.update();
  }, [data]);
  return (
    <section>
      <canvas ref={ref} />
    </section>

  );
};

export default CountiesChart;
