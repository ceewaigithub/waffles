import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const TrafficDataHistogram = ({ trafficData }) => {

  const datasets = Object.entries(trafficData).map(([cameraNumber, volumes]) => {
    return {
      label: `Camera ${cameraNumber}`,
      data: volumes,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    };
  });

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Measurement Times'
        },

        labels: ['0.5hr', '1hr', '1.5hr'],
      },
      y: {
        title: {
          display: true,
          text: 'Traffic Volume'
        },
        beginAtZero: true,
      }
    },
    plugins: {
      legend: {
        display: true, 
      }
    }
  };

  return (
    <>
      {datasets.map((dataset, index) => (
        <Bar key={index} data={{ labels: options.scales.x.labels, datasets: [dataset] }} options={options} />
      ))}
    </>
  );
};

export default TrafficDataHistogram;
