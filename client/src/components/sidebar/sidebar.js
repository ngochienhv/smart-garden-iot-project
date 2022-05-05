import axios from 'axios';
import React from 'react';
import SensorsBtns from './sensorsbtns';
import { NotiContext } from '../../App';
import Notifications from '../../pages/notification';
import './sidebar.css';

export default function Sidebar({ socketConnection, setSocketConection }) {
    const consumer = React.useContext(NotiContext);

    const checkPath = () => {
        const path = window.location.pathname;
        if (path === "/tempsensor" || path === "/moistsensor" || path === "/lightsensor" || path === "/watersensor")
            return true;
    }

    const [showResults, setShowResults] = React.useState(checkPath() ? true : false);
    const [showNoti, setShowNoti] = React.useState(false);
    const onClick = () => setShowResults(true);
    const close = () => setShowResults(false);

    async function fetching() {
        await axios.get('http://localhost:5000/noti/count')
            .then((response) => {
                console.log(response.data);
                if (response.data.length > 1 || (response.data.length === 1 && response.data[0].Seen === 0))
                    consumer[1](Math.ceil(response.data[0].count / 2));
                else consumer[1](0);
            })
        setSocketConection(false);
    }

    React.useEffect(() => {
        fetching();
    }, [socketConnection]);

    React.useEffect(() => {
        consumer[1](consumer[0]);
    }, [consumer[0]])

    const handleNoti = () => {
        setShowNoti(!showNoti);
    }
    return (
        <div className="sidebar-container">
            <div className="sidebar-btn-container">
                <a className={window.location.pathname === "/" ? 'sidebar-btn-selected' : 'sidebar-btn'} href="/"><i className="bi bi-house-fill"></i></a>
                <button className="sidebar-btn" href="/" onClick={showResults ? close : onClick}><i className="bi bi-record-circle"></i></button>
                {showResults ? <SensorsBtns /> : null}
                <a className='sidebar-btn' onClick={() => { handleNoti(); }}>
                    <i className="bi bi-envelope-fill noti-icon"></i>
                    <span className="badge badge-light">{consumer[0]}</span>
                </a>
                {showNoti ? <Notifications socketConnection={socketConnection} setSocketConection={setSocketConection} /> : null}
                <a className={window.location.pathname === "/user" ? 'sidebar-btn-selected' : 'sidebar-btn'} href="/user"><i className="bi bi-person-fill"></i></a>
            </div>
        </div>
    )
}