import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
// import SettingsPage from './pages/SettingsPage'; // Example if needed

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<DashboardPage />} />
          {/* <Route path="/settings" element={<SettingsPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
