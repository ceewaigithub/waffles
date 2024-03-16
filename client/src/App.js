import logo from './logo.svg';
import './styles/App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const sendDataToServer = () => {
    // Code to send data to the server
    // You can use fetch or axios to make an HTTP request to your Node.js server
    // Example using fetch:
    fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: 'Hello from the client!' }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server
        console.log(data);
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload lol.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={sendDataToServer}>Send Data to Server</button>
      </header>
    </div>
  );
}

export default App;
