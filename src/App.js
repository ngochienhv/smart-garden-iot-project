import Sidebar from './components/sidebar/sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './pages/dashboard';
import LightSensor from './pages/Lightsensor';
import './App.css';

function App() {
  return (
    <div className="container-fluid full-width">
      <div className="row">
        <div className="col-1">
          <Sidebar />
        </div>
        <div className="col-11 page-container">
          <Router>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/lightsensor" element={<LightSensor />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
