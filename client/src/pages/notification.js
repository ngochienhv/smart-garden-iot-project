import React, { useEffect, useState } from 'react';
import Message from '../components/message/message';
import axios from 'axios';

const icons = {
    light: <i className="bi bi-lightbulb-fill"></i>,
    minipump: <i className="bi bi-droplet-half"></i>,
    DHT11: <i className="bi bi-thermometer-half"></i>
}
export default function Notifications() {
    const [message, setMessage] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/')
            .then((response) => {
                let tempMessage = [];
                for (let i = 0; i < response.data.length; i++) {
                    let icon;
                    switch (response.data[i]["ID_SENSOR"]) {
                        case 1: icon = icons.light;
                            break;
                        case 3: icon = icons.DHT11;
                            break;
                        default: icon = icons.minipump;
                            break;
                    }
                    let temp = {
                        "time": new Date(response.data[i]["mesureTime"]).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }).replace(",", ""),
                        "content": response.data[i]["notified"],
                        "icon": icon,
                        "id": response.data[i]["ID_DATA"],
                    }
                    tempMessage.push(temp);
                }
                setMessage(tempMessage);
            });
    }, []);
    console.log(message);
    return (
        <>
            <h1 style={{ color: "white", textAlign: "center", fontSize: 50 }}>Thông báo</h1>
            <div className="container mt-5">
                {message.map((message) => <Message message={message} />)}
            </div>
        </>

    )
}