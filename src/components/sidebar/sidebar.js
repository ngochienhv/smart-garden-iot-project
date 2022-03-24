import React from 'react';
import SensorsBtns from './sensorsbtns';
import './sidebar.css';

export default function Sidebar() {
    const checkPath = () => {
        const path = window.location.pathname;
        if (path === "/tempsensor" || path === "/moistsensor" || path === "/lightsensor" || path === "/watersensor")
            return true;
    }
    const [showResults, setShowResults] = React.useState(checkPath() ? true : false);
    const onClick = () => setShowResults(true);
    const close = () => setShowResults(false);

    return (
        <div className="sidebar-container">
            <div className="sidebar-btn-container">
                <a className={window.location.pathname === "/" ? 'sidebar-btn-selected' : 'sidebar-btn'} href="/"><i className="bi bi-house-fill"></i></a>
                <button className="sidebar-btn" href="/" onClick={showResults ? close : onClick}><i className="bi bi-record-circle"></i></button>
                {showResults ? <SensorsBtns /> : null}
                <a className={window.location.pathname === "/notification" ? 'sidebar-btn-selected' : 'sidebar-btn'} href="/notification"><i className="bi bi-envelope-fill"></i></a>
                <a className={window.location.pathname === "/user" ? 'sidebar-btn-selected' : 'sidebar-btn'} href="/user"><i className="bi bi-person-fill"></i></a>
            </div>
        </div>
    )
}