import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Analysis.css';

// Register the necessary components with Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const fetchData = async (username) => {
  try {
    const positivityResponse = await fetch(`http://localhost:3000/analysis-positivity?username=${username}`);
    const weekendResponse = await fetch(`http://localhost:3000/analysis-weekend?username=${username}`);

    if (!positivityResponse.ok || !weekendResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const positivityContentType = positivityResponse.headers.get("content-type");
    const weekendContentType = weekendResponse.headers.get("content-type");

    if (!positivityContentType.includes("application/json") || !weekendContentType.includes("application/json")) {
      throw new Error('Received non-JSON response');
    }

    const positivityData = await positivityResponse.json();
    const weekendData = await weekendResponse.json();

    return { positivityData, weekendData };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { positivityData: [], weekendData: [] };
  }
};

const AnalysisPage = ()=>{
    const [positivityData, setPositivityData] = useState([]);
    const [weekendData, setWeekendData] = useState([]);
    const username = localStorage.getItem('username') || 'Unknown User';
  
    useEffect(() => {
      const loadEntries = async () => {
        const { positivityData, weekendData } = await fetchData(username);
        setPositivityData(positivityData);
        setWeekendData(weekendData);
      };
      loadEntries();
    }, [username]);
  
    const graphData = {
      labels: positivityData.map(entry => entry.date),
      datasets: [
        {
          label: 'Stimmung',
          data: positivityData.map(entry => entry.Stimmung),
          borderColor: 'blue',
          backgroundColor: 'lightblue',
          fill: false,
        },
        {
          label: 'Zufriedenheit',
          data: positivityData.map(entry => entry.Zufriedenheit),
          borderColor: 'green',
          backgroundColor: 'lightgreen',
          fill: false,
        },
      ],
    };
  
    const graphOptions = {
      scales: {
        y: {
          ticks: {
            stepSize: 1,
            min: 1,
            max: 10,
            callback: function(value) {
              if (Number.isInteger(value)) {
                return value;
              }
            }
          }
        }
      }
    };
  
    return (
      <div className="analysis-container">
        <h2 className="analysis-title">Positivity Diary</h2>
        <h2 className="analysis-title">Zufriedenheit / Stimmung</h2>
        <div className="analysis-graph-container">
          <Line data={graphData} options={graphOptions} />
        </div>
        <div className="analysis-entries-wrapper">
          <div className="analysis-entries-section">
            <h2 className="analysis-title">Positivity Diary Entries</h2>
            <div className="analysis-entries-container">
              {positivityData.map((entry, index) => (
                <div className="analysis-card" key={index}>
                  <p>Date: {entry.date}</p>
                  <p>Stimmung: {entry.Stimmung}</p>
                  <p>Zufriedenheit: {entry.Zufriedenheit}</p>
                  <p>Ziel: {entry.Ziel}</p>
                  <p>Highlight: {entry.Highlight}</p>
                  <p>Stolz: {entry.Stolz}</p>
                  <p>LiefGut: {entry.LiefGut}</p>
                  <p>Gelassen: {entry.Gelassen}</p>
                  <p>ZielProgress: {entry.ZielProgress}</p>
                  <p>Morgen: {entry.Morgen}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="analysis-entries-section">
            <h2 className="analysis-title">Weekend Diary Entries</h2>
            <div className="analysis-entries-container">
              {weekendData.map((entry, index) => (
                <div className="analysis-card" key={index}>
                  <p>Date: {entry.date}</p>
                  <p>Ziel1: {entry.Ziel1}</p>
                  <p>Ziel2: {entry.Ziel2}</p>
                  <p>Ziel3: {entry.Ziel3}</p>
                  {Object.keys(entry.WochenendZiel || {}).map((key) => (
                    <p key={key}>{key}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
    export default AnalysisPage;