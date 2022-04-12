import axios from 'axios';
import React from 'react';
import SensorsBtns from './sensorsbtns';
import { NotiContext } from '../../App';
import Notifications from '../../pages/notification';
import './sidebar.css';
import mqtt from 'mqtt/dist/mqtt';

export default function Sidebar() {
    const consumer = React.useContext(NotiContext);
    const [connectionStatus, setConnectionStatus] = React.useState(false);
    const url = 'mqtt://ngochienhv:aio_hRKe39xRu3EXPo7mbFJWfEoMHbqU@io.adafruit.com';
    const topic = `ngochienhv/feeds/bbc-noti`;

    const checkPath = () => {
        const path = window.location.pathname;
        if (path === "/tempsensor" || path === "/moistsensor" || path === "/lightsensor" || path === "/watersensor")
            return true;
    }

    const [showResults, setShowResults] = React.useState(checkPath() ? true : false);
    const [showNoti, setShowNoti] = React.useState(false);
    const onClick = () => setShowResults(true);
    const close = () => setShowResults(false);

    React.useEffect(() => {
        async function fetching() {
            await axios.get('http://localhost:5000/noti/count')
                .then((response) => {
                    console.log(response.data);
                    if (response.data.length > 1 || (response.data.length === 1 && response.data[0].Seen === 0))
                        consumer[1](response.data[0].count);
                    else consumer[1](0);
                })
            const mqtt_client = mqtt.connect(url, 8883);
            console.log(mqtt_client);
            mqtt_client.on('connect', function () {
                setConnectionStatus(true);
                mqtt_client.subscribe(topic, () => { });
            });
            mqtt_client.on('message', (topic, message) => {
                setConnectionStatus(false);
                mqtt_client.end();
            });
        }
        fetching();
    }, [connectionStatus]);

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
                {showNoti ? <Notifications /> : null}
                <a className={window.location.pathname === "/user" ? 'sidebar-btn-selected' : 'sidebar-btn'} href="/user"><i className="bi bi-person-fill"></i></a>
            </div>
        </div>
    )
}