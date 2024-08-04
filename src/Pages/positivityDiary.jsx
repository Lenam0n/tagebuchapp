import React, { useState } from "react";
import { format } from "date-fns";
import "./PositivityDiary.css";
import Input from "../Container/Input";
import DiaryButton from "../Components/DiaryButton";
import DateInput from "../Components/Date";
import Fragen_Woche from "../Data/Fragen_Woche.json";
import Number_fragen from "../Data/Number_fragen.json";
import NumberInput from "../Components/Numbers";
import Header from "../Components/Header";

const PositivityDiary = () => {
  const FragenKatalog = Fragen_Woche;
  const FragenKatalog_num = Number_fragen;

  const [formData, setFormData] = useState({
    Stimmung: 1,
    Zufriedenheit: 1,
    Ziel: "",
    Highlight: "",
    Stolz: "",
    LiefGut: "",
    Gelassen: "",
    ZielProgress: "",
    Morgen: "",
    date: "",
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = format(new Date(), "dd-MM-yyyy");
    const username = localStorage.getItem('username') || 'Unknown User';

    const formDataWithDateAndUser = {
      ...formData,
      date: formData.date || currentDate,
      username,
    };

    try {
      // Überprüfen, ob ein Eintrag für das aktuelle Datum existiert
      const checkResponse = await fetch(`http://localhost:3000/positivity/check?date=${currentDate}&username=${username}`);
      const exists = await checkResponse.text();

      if (exists === 'exists') {
        if (window.confirm('An entry for today already exists. Do you want to update it?')) {
          // Aktualisieren des Eintrags
          const updateResponse = await fetch('http://localhost:3000/positivity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formDataWithDateAndUser),
          });

          if (updateResponse.ok) {
            console.log('Entry updated successfully.');
          } else {
            console.error('Failed to update entry.');
          }
        }
      } else {
        // Erstellen eines neuen Eintrags
        const createResponse = await fetch('http://localhost:3000/positivity', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formDataWithDateAndUser),
        });

        if (createResponse.ok) {
          console.log('Entry created successfully.');
        } else {
          console.error('Failed to create entry.');
        }
      }
    } catch (error) {
      console.error('Error checking entry existence:', error);
    }

    // Formular zurücksetzen
    setFormData({
      Stimmung: "",
      Zufriedenheit: "",
      Ziel: "",
      Highlight: "",
      Stolz: "",
      LiefGut: "",
      Gelassen: "",
      ZielProgress: "",
      Morgen: "",
      date: "",
    });
  };

  return (
    <>
      <form id="Fragen" onSubmit={handleSubmit}>
        <Header head={"Positivity Diary"} onChange={handleChange}/>
        <div className="num-container">
            {FragenKatalog_num.map((frage) => (
            <div id="Input" key={frage.name}>
                <NumberInput
                range={{ min: frage.min, max: frage.max }}
                name={frage.name}
                text={frage.text}
                value={formData[frage.name]}
                onChange={handleChange}
                />
            </div>
            ))}
        </div>

        {FragenKatalog.map((frage) => (
          <Input
            key={frage.name}
            name={frage.name}
            text={frage.text}
            value={formData[frage.name]} // Pass the value from formData
            onChange={handleChange}
          />
        ))}
        <DiaryButton>Submit</DiaryButton>
      </form>
    </>
  );
};

export default PositivityDiary;