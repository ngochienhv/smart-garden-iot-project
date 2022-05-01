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
import User from './pages/user/user';
import React from 'react';
import './App.css';
import socketIOClient from "socket.io-client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const host = "http://localhost:5000/";
export const NotiContext = React.createContext();

function App() {
  const [countNoti, setCountNoti] = React.useState(0);
  const [socketConnection, setSocketConection] = React.useState(false);

  const options = {
    type: toast.TYPE.WARNING,
    hideProgressBar: true,
    position: toast.POSITION.BOTTOM_RIGHT,
    closeOnClick: true,
    style: {
      backgroundColor: "black",
      color: "white",
      border: "1px solid white",
      borderRadius: 20
    }
    // and so on ...
  };
  const notify = (data) => toast(data, options);

  const socketRef = React.useRef();

  React.useEffect(() => {
    socketRef.current = socketIOClient.connect(host)
    socketRef.current.on("newNoti", data => {
      notify(data);
      setSocketConection(true);
    })

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <NotiContext.Provider value={[countNoti, setCountNoti]}>
      <div className="container-fluid">
        <ToastContainer
          autoClose={4000}
        />
        <div className="row">
          <div className="col-1">
            <Sidebar socketConnection={socketConnection} setSocketConection={setSocketConection} />
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
