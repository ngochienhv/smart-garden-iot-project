import Sidebar from './components/sidebar/sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './pages/dashboard';
import LightSensor from './pages/sensors/Lightsensor';
import MoistSensor from './pages/sensors/MoistSensor';
import TempSensor from './pages/sensors/TempSensor';
import WaterSensor from './pages/sensors/Watersensor';
import Notifications from './pages/notification';
import User from './pages/user/user';
import React from 'react';

import './App.css';

export const NotiContext = React.createContext();

function App() {
  const [countNoti, setCountNoti] = React.useState(0);

  return (
    <NotiContext.Provider value={[countNoti, setCountNoti]}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-1">
            <Sidebar />
          </div>
          <div className="col-11 page-container">
            <Router>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/lightsensor" element={<LightSensor />} />
                <Route path="/moistsensor" element={<MoistSensor />} />
                <Route path="/tempsensor" element={<TempSensor />} />
                <Route path="/watersensor" element={<WaterSensor />} />
                <Route path="/user" element={<User />} />
              </Routes>
            </Router>
          </div>
        </div>
      </div>
    </NotiContext.Provider>
  );
}

export default App;
