  import React from 'react';
  import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

  import AddDoctor from './components/add-doctor';
  import ViewDoctors from './components/show-doctors';
  import AddPatient from './components/add-patient';
  import ViewPatients from './components/show-patient';
  import AddAppointment from './components/add-apponitment';
  import ViewAppointments from './components/show-appointment';
  import Home from './components/home';

  function App() {
    return (
      <Router>
        <div className="App">

          <div >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/doctors" element={<ViewDoctors />} />
              <Route path="/add-patient" element={<AddPatient />} />
              <Route path="/patients" element={<ViewPatients />} />
              <Route path="/add-appointment" element={<AddAppointment />} />
              <Route path="/appointments" element={<ViewAppointments />} />
              <Route path="*" element={<h2>404 Not Found</h2>} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }


  export default App;
