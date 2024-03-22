import React, { useEffect, useState } from 'react';

function WeatherComponent() {

    const getWeather = () => {
        fetch('/api/weather')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
            console.log(data);
            }
        })
        .catch(error => console.error('Failed to fetch weather:', error));
    }

  return (
    <div>
      <button onClick={getWeather}>Weather</button>
    </div>
  );
}

export default WeatherComponent;
