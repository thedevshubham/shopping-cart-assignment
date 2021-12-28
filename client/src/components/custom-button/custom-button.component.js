import React from "react";
import "./custom-button.styles.css";

export default function CustomButton({ children, ...otherProps }) {
  return (
    <button className={(otherProps.disabled ? `custom-button-disable` : `custom-button`)} {...otherProps}>
      {children}
    </button>
  );
}
