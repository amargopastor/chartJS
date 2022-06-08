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
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useDataContext } from '../lib/useContext';
import pathname from '../utils/location.pathname';
import { DataContextInterface } from '../types/dataContext';
import { Countie } from '../types/countie';

Chart.register(BarElement, BarController, LinearScale, CategoryScale, ChartDataLabels);

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
            hoverBackgroundColor: '#e9b1b3',
            hoverBorderColor: '#7b23a2',
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            anchor: 'center',
            align: 'right',
            offset: -100,
            clamp: true,
            formatter(value, context) {
              const countie = context.chart.data.labels[context.dataIndex];
              return (`${countie}: ${value} p`);
            },
            display(context) {
              return context.active;
            },
          },
        },
      },
    });
  }, [ref.current]);

  useEffect(() => {
    if (!data.counties !== false || !chart) return;

    const pn = pathname() === '' ? 'all' : pathname();

    chart.data.labels = [...data.counties.filter((e:Countie) => e.active)
      .map((e:Countie) => e.label)];
    chart.data.datasets[0].data = [...data.counties.filter((e:Countie) => e.active)
      .map((e:Countie) => e[pn])];

    chart.update();
  }, [data]);
  return (
    <section>
      <canvas ref={ref} />
    </section>

  );
};

export default CountiesChart;
