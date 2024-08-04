import React, { useState, useEffect } from 'react';
import './Numbers.css';

const NumberInput = ({ name, text, range, value, onChange }) => {
  const [nvalue, setnValue] = useState(value);

  // Update the input value if the parent component changes it
  useEffect(() => {
    setnValue(value);
  }, [value]);

  const handleChange = (e) => {
    let newValue = parseInt(e.target.value, 10);
    if (isNaN(newValue)) {
      newValue = range.min;
    } else if (newValue < range.min) {
      newValue = range.min;
    } else if (newValue > range.max) {
      newValue = range.max;
    }
    setnValue(newValue);
    onChange(name, newValue); // Hier wurde nvalue zu newValue geändert
  };

  const handleIncrement = () => {
    if (nvalue < range.max) {
      const newValue = nvalue + 1;
      setnValue(newValue);
      onChange(name, newValue);
    }
  };

  const handleDecrement = () => {
    if (nvalue > range.min) {
      const newValue = nvalue - 1;
      setnValue(newValue);
      onChange(name, newValue);
    }
  };

  return (
    <div id="Input">
      <p className="label">{text}</p>
      <div className="number-input-container">
        <div className="number-input-button" onClick={handleDecrement}>-</div>
        <div
            contentEditable="false"
            suppressContentEditableWarning={true}
            value={nvalue}
            onInput={handleChange}
            onKeyDown={(e) => {
                // Verhindere das Einfügen von Zeichen, die keine Zahlen sind
                if (!/^\d+$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'ArrowUp' && e.key !== 'ArrowDown') {
                e.preventDefault();
                }
            }}
            className="number-input"
            >
            {nvalue}
        </div>

        <div className="number-input-button" onClick={handleIncrement}>+</div>
      </div>
    </div>
  );
};

export default NumberInput;
