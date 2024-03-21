import React, { useState } from "react";
import "../styles/Form.css";
import { PiMapPin, PiPathLight } from "react-icons/pi";

function Form() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the form submission.
    // For example, you can make a GET request to your backend with the source and destination as parameters.
    console.log("Source:", source);
    console.log("Destination:", destination);
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