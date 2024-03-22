import "./styles/App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header.js";
import DJPlayer from "./components/DJPlayer.js";
import Form from "./components/Form.js";
import TrafficDataHistogram from "./components/TrafficDataHistogram.js";

function App() {
  const [formData, setFormData] = useState(null);
  const [routeImage, setRouteImage] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [trafficData, setTrafficData] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (newFormData) => {
    setFormData(newFormData);
    setFormSubmitted(true);
    sendDataToServer(newFormData);
  };

  useEffect(() => {
    if (formSubmitted) {
      fetchRouteImage();
      fetchImages();
      fetchTrafficData();
    }
  }, [formSubmitted]);

  const sendDataToServer = (formData) => {
    fetch("/api/formData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setRouteImage(data.routeImage);
        setTrafficData(data.histogramData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchImages = (formData) => {
    const queryParams = new URLSearchParams({
      current_location: formData.from,
      destination_location: formData.to
    }).toString();
  
    const url = `/api/get-images?${queryParams}`;
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setImageUrls(data.images); 
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  const fetchRouteImage = () => {
    const queryParams = new URLSearchParams({
      current_location: formData.from,
      destination_location: formData.to
    }).toString();

    const url = `https://your-api-endpoint.com/get-route-image?${queryParams}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRouteImage(data.routeImage); 
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchTrafficData = () => {
    const queryParams = new URLSearchParams({
      current_location: formData.from,
      destination_location: formData.to
    }).toString();

    const url = `https://your-api-endpoint.com/get-traffic-data?${queryParams}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTrafficData(data.histogramData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <Header />
      <h2> Demo App </h2>
      {!formSubmitted ? (
        <div className="left-side">
          <Form onSubmit={handleFormSubmit} />
        </div>
      ) : (
        <div className="container">
          <div className="left-side">
            <img
              src={routeImage || "route-image.jpg"}
              alt="Recommended Route"
            />
            <DJPlayer />
          </div>
          <div className="right-side">
            <h2>Images of traffic condition</h2>
            <div className="images-container">
              {imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Traffic ${index}`} />
              ))}
            </div>
            <h2>Histogram Chart of traffic condition</h2>
            {trafficData && <TrafficDataHistogram trafficData={trafficData} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
