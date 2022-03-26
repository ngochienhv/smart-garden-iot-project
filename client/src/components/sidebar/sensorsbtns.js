import React from 'react';
import './sidebar.css';

export default function SensorsBtns() {
    return (
        <div className="btns-container">
            <a href="/tempsensor" className={window.location.pathname === "/tempsensor" ? "sensor-btn-selected" : "sensor-btn"}><i className="bi bi-thermometer-half"></i></a>
            <a href="/moistsensor" className={window.location.pathname === "/moistsensor" ? "sensor-btn-selected" : "sensor-btn"}><i className="bi bi-droplet-fill"></i></a>
            <a href="/lightsensor" className={window.location.pathname === "/lightsensor" ? "sensor-btn-selected" : "sensor-btn"}><i className="bi bi-brightness-low-fill"></i></a>
            <a href="/watersensor" className={window.location.pathname === "/watersensor" ? "sensor-btn-selected" : "sensor-btn"}><i className="bi bi-water"></i></a>
        </div>
    )
}