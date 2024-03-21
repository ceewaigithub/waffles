import React from "react";
import "../styles/LiveDemoButton.css";

const LiveDemoButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="live-demo-button">
      Live Demo
    </button>
  );
};

export default LiveDemoButton;