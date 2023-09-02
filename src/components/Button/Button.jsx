import React from "react";

import "./Button.css";

const Button = ({ text, color, action, type, disabled }) => {
  return (
    <button
      disabled={disabled}
      type={type ? type : "button"}
      className={`${color === "primary" ? "yellow-button" : "gray-button"}`}
      onClick={action}
      id={color === "primary" ? "primary-button" : "default-button"}
    >
      {text}
    </button>
  );
};

export default Button;
