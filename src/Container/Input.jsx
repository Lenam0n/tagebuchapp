import React, { useState, useEffect } from "react";
import "./input.css";

const Input = ({ name, text, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  // Update the input value if the parent component changes it
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(name, newValue);
    adjustTextareaHeight(e.target);
  };

  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = (() => {
      let height = textarea.scrollHeight / 1.3;

      if (height % 1 !== 0) {
        let decimalPart = height % 1;
        let roundedDecimal =
          decimalPart >= 0.5 ? Math.ceil(decimalPart) : Math.floor(decimalPart);

        height = Math.floor(height) + roundedDecimal;
      } else {
        height = Math.floor(height);
      }

      return height + "px";
    })();
  };

  return (
    <div id="Input">
      <p className="label">{text}</p>
      <textarea
        className="input"
        name={name}
        value={inputValue}
        rows={2}
        onChange={handleChange}
        required
      ></textarea>
    </div>
  );
};

export default Input;
