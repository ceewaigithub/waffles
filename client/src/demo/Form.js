import React, { useState } from "react";
import "../styles/Form.css";
import { PiMapPin, PiPathLight } from "react-icons/pi";

function Form({ onFormSubmit }) { // Add a prop to handle submission results
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      from: source,
      to: destination,
    };
    
    // Make a POST request to your backend
    try {
      const response = await fetch('/api/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Here you handle the response. For example:
      onFormSubmit(data); // Assuming your parent component handles the result
      
      // Optionally reset form fields
      setSource('');
      setDestination('');
    } catch (error) {
      console.error("Failed to submit form", error);
      // Handle errors, maybe set an error message state and display it
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="input-group">
        <PiPathLight className="icon" />
        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(event) => setSource(event.target.value)}
        />
      </div>
      <div className="input-group">
        <PiMapPin className="icon" />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
