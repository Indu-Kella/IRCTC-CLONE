import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeComponent from './Components/Home';
import RegisterComponent from './Components/Register';
import HelpSupport from './Components/HelpSupport';
import Alert from './Components/Alert';
import TrainsList from './Components/TrainsList';
import PassengerDetails from './Components/PassengerDetails';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/helpSupport" element={<HelpSupport />} />
        <Route path="/alert" element={<Alert />} />
        <Route path="/trains" element={<TrainsList />} />
        <Route path="/passenger-details" element={<PassengerDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
