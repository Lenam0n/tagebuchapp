import React, { useState } from "react";
import { format } from "date-fns";
import "./WeekendDiary.css";
import Wochenend_fragen from "../Data/Wochenend_fragen.json";
import Wochenend_MC_fragen from "../Data/Wochenend_MC_fragen.json";
import MC_Container from "../Container/MC_Container";
import Input from "../Container/Input";
import DiaryButton from "../Components/DiaryButton";
import Header from "../Components/Header";

const WeekendDiary = () => {
    const MC_Fragen = Wochenend_MC_fragen;
    const Ziele = Wochenend_fragen["Ziele_WE"];
    const FragenWE = Wochenend_fragen["Fragen_WE"];

    const [formData, setFormData] = useState({
        Ziel1: "",
        Ziel2: "",
        Ziel3: "",
        WochenendZiel: [], // Initiales leeres Array für die ausgewählten Optionen
        date: ""
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handler zum Sammeln der ausgewählten Optionen aus der Multiple-Choice-Komponente
    const handleMCSelectionChange = (selectedOptions) => {
        setFormData({
            ...formData,
            WochenendZiel: selectedOptions // Aktualisieren Sie den State mit den ausgewählten Optionen
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = format(new Date(), "dd-MM-yyyy");
        const username = localStorage.getItem('username') || 'Unknown User';

        const formDataWithDateAndUser = {
            ...formData,
            date: formData.date || currentDate, // Verwende das geänderte Datum oder das aktuelle Datum
            username, // Füge den Benutzernamen hinzu
        };

        try {
            // Überprüfen, ob ein Eintrag für das aktuelle Datum existiert
            const checkResponse = await fetch(`http://localhost:3000/weekend/check?date=${currentDate}&username=${username}`);
            const exists = await checkResponse.text();

            if (exists === 'exists') {
                if (window.confirm('An entry for today already exists. Do you want to update it?')) {
                    // Aktualisieren des Eintrags
                    const updateResponse = await fetch('http://localhost:3000/weekend', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
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
                const createResponse = await fetch('http://localhost:3000/weekend', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formDataWithDateAndUser),
                });

                if (createResponse.ok) {
                    console.log('Entry created successfully.');
                } else {
                    console.error('Failed to create entry.');
                }
            }
        } catch (error) {
            console.error('Error handling entry:', error);
        }

        // Formular zurücksetzen
        setFormData({
            Ziel1: "",
            Ziel2: "",
            Ziel3: "",
            WochenendZiel: [],
            date: "",
        });

        // Clear textareas
        const textareas = document.querySelectorAll("textarea");
        textareas.forEach((textarea) => {
            textarea.style.height = "auto";
            textarea.value = "";
        });

        // Reset checkbox inputs
        const checkboxes = document.querySelectorAll("input[type=checkbox]");
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    };

    return (
        <form id="Fragen" onSubmit={handleSubmit}>
            <Header head={"Weekend Diary"} onChange={handleChange}/>
            {Ziele.map((frage) => (
                <Input
                    key={frage.name}
                    name={frage.name}
                    text={frage.text}
                    value={formData[frage.name]}
                    onChange={(name, value) => handleChange(name, value)}
                />
            ))}
            <MC_Container 
                name={MC_Fragen["name"]}
                headline={MC_Fragen["text"]} 
                options={MC_Fragen["MC_text"]} 
                anzahl={MC_Fragen["MC_Anzahl"]}
                selectedOptions={formData.WochenendZiel} // Übergabe der ausgewählten Optionen
                onSelectionChange={handleMCSelectionChange}
            />
            <DiaryButton>Submit</DiaryButton>
        </form>
    );
}

export default WeekendDiary;