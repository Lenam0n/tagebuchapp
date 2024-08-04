import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Container/Navbar';
import PositivityDiary from './Pages/positivityDiary';
import Analysis from './Pages/Analysis';
import Weekend from './Pages/WeekendDiary';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState(''); // Startseite oder eine andere Standardseite
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = (user) => {
    setIsAuthenticated(true);
    localStorage.setItem('token', user.token);
    localStorage.setItem('username', user.username); // Speichern des Benutzernamens
    setCurrentPage('PositivityDiary'); // Beispiel, falls du zur Startseite weiterleiten möchtest
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token'); // Entferne den Token aus dem Local Storage
  };

  return (
    <Router>
      {isAuthenticated && (
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          toggleSidebar={toggleSidebar}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleLogout={handleLogout}
        />
      )}
      <Routes>
        <Route
          path="/login"
          element={<Login           
            setCurrentPage={setCurrentPage}
            onLogin={handleLogin} 
            />}
        />
        <Route
          path="/register"
          element={<Register           
            setCurrentPage={setCurrentPage}
            />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <PositivityDiary /> : <Navigate to="/login" />}
        />
        <Route
          path="/positivity"
          element={isAuthenticated ? <PositivityDiary /> : <Navigate to="/login" />}
        />
        <Route
          path="/analysis"
          element={isAuthenticated ? <Analysis /> : <Navigate to="/login" />}
        />
        <Route
          path="/weekend"
          element={isAuthenticated ? <Weekend /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;