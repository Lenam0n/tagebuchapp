import React from 'react';

function MultipleChoice({ name, options, maxSelection, selectedOptions, onSelectionChange }) {

  // Handler für Klick auf eine Option
  const handleOptionClick = (option) => {
    let newSelectedOptions;
    if (selectedOptions[option]) {
      // Wenn bereits ausgewählt, aus der Auswahl entfernen
      newSelectedOptions = { ...selectedOptions };
      delete newSelectedOptions[option];
    } else {
      // Ansonsten prüfen, ob Maximalauswahl erreicht ist
      if (Object.keys(selectedOptions).length < maxSelection) {
        newSelectedOptions = { ...selectedOptions, [option]: true };
      } else {
        // Mehr als maxSelection ausgewählt, Alert anzeigen
        alert(`Sie können nur ${maxSelection} Optionen auswählen.`);
        newSelectedOptions = selectedOptions;
      }
    }
    // Aktualisierten Zustand der ausgewählten Optionen an die übergeordnete Komponente zurückgeben
    onSelectionChange(newSelectedOptions);
  };

  return (
    <div className='mc_container'>
      {options.map((option) => (
        <div
          key={option}
          onClick={() => handleOptionClick(option)}
          style={{ cursor: 'pointer', marginBottom: '5px' }}
        >
          <input
            type="checkbox"
            checked={selectedOptions[option] ? true : false}
            readOnly
          />
          <label style={{ marginLeft: '5px' }}>{option}</label>
        </div>
      ))}
    </div>
  );
}

export default MultipleChoice;
