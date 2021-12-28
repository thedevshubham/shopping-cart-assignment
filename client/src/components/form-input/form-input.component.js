import React from "react";
import "./form-input.styles.css";

export default function FormInput({ handleChange, label, ...otherProps }) {
  return (
    <div className="form-input__group">
      {label ? (
        <label
          htmlFor={otherProps.id}
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      ) : null}
      <input className="form-input" onChange={handleChange} {...otherProps} />
    </div>
  );
}
