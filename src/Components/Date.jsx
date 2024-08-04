import React, { useState } from "react";
import "./Date.css"; // Import des CSS-Stylesheets

const DateInput = ({ onChange }) => {
  // Get the current date
  const currentDate = new Date();

  // State für das Anzeigen des Kalenders
  const [showCalendar, setShowCalendar] = useState(false);

  // State für das ausgewählte Datum
  const [selectedDate, setSelectedDate] = useState(currentDate);

  // State für das zuletzt geänderte Datum
  const [lastModified, setLastModified] = useState(currentDate);

  // Funktion zum Öffnen des Kalenders
  const openCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // Funktion zum Schließen des Kalenders
  const closeCalendar = () => {
    setShowCalendar(false);
  };

  // Funktion zum Aktualisieren des ausgewählten Datums
  const handleDateChange = (event) => {
    const newDate = new Date(event.target.value);
    setSelectedDate(newDate);
    setLastModified(new Date()); // Aktualisiere das zuletzt geänderte Datum auf den aktuellen Zeitpunkt
    onChange("date", newDate); // Hier wird das geänderte Datum an die Elternkomponente weitergegeben
  };

  return (
    <div className="current-date-container">
      <div className="current-date" onClick={openCalendar}>
        {selectedDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
      {showCalendar && (
        <div className="calendar-container">
          <input className="calendar-input" type="date" value={selectedDate.toISOString().slice(0, 10)} onChange={handleDateChange} />
          <button className="calendar-button" onClick={closeCalendar}>Close</button>
        </div>
      )}
    </div>
  );
};

export default DateInput;
