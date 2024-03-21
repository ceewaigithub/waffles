import "./styles/App.css";
import React, { useState, useEffect } from "react";
import NewsComponent from "./NewsComponent.js"; // Adjust the import path as needed
import Navbar from "./demo/Navbar.js";
import DJPlayer from "./DJPlayer.js";
import Map from "./demo/Map.js";
import Form from "./demo/Form.js";
import TrafficDataHistogram from "./demo/TrafficDataHistogram.js";

function App() {
  const [formData, setFormData] = useState(null);
  const [mapData, setMapData] = useState(null);
  // const [trafficData, setTrafficData] = useState(null);
  const [audioFiles, setAudioFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleFormSubmit = (newFormData) => {
    setFormSubmitted(true);
    sendDataToServer(newFormData);
    // fetchImages();
  };

  // Modified to accept formData and update state with the data from the server
  // const sendDataToServer = (formData) => {
  //   fetch("/api/data", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setMapData(data.mapData); // Assume server response has mapData
  //       setTrafficData(data.trafficData); // Assume server response has trafficData
  //       // Any other state updates based on server response
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // For fetching images from the server
  // const fetchImages = () => {
  //   // Replace '/api/images' with the correct endpoint
  //   fetch('/api/images', {
  //     // Put any required headers here
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     // Assuming backend returns an array of image URLs
  //     setImageUrls(data);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching images:', error);
  //   });
  // };

  const sendDataToServer = () => {
    // Code to send data to the server
    // You can use fetch or axios to make an HTTP request to your Node.js server
    // Remove this placeholder test function once the server is ready to receive data
    // Example using fetch:
    fetch("/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: "Hello from the client!" }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const handleAudioFilesLoaded = (files) => {
    setAudioFiles(files);
  };

  // Hardcoded traffic data, replace with actual data from the server
  const trafficData = {
    "1001": [5, 7, 10],
    "3521": [1, 2, 3],
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <div className="container">
          <div className="left-side form">
            <Form />
          </div>
          <div className="right-side">
            <div className="map-container">
              <Map />
            </div>
            <div className="image-container">
              {imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Traffic ${index}`} />
              ))}
            </div>
            <DJPlayer />
            <TrafficDataHistogram trafficData={trafficData} />
          </div>
        </div>

        {/* {!formSubmitted && <Form onSubmit={handleFormSubmit} />}
        {formSubmitted && (
          <>
            <Map mapData={mapData} />
            <DJPlayer audioFiles={audioFiles} />
            // Placeholder for other components that will render traffic info
          </>
        )} */}
        {/* NewsComponent yet to be fixed */}
        {/* <NewsComponent onAudioFilesLoaded={handleAudioFilesLoaded} /> */}
      </header>
    </div>
  );
}

export default App;
