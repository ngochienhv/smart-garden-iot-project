import React, { useEffect, useState } from 'react';
import Message from '../components/message/message';
import axios from 'axios';

const icons = {
    light: <i className="bi bi-lightbulb" style={{ color: "yellow" }}></i>,
    minipump: <i className="bi bi-droplet-half" style={{ color: "blue" }}></i>,
    DHT11: <i className="bi bi-thermometer-half"></i>,
    soil: <i className="bi bi-water"></i>
}
export default function Notifications({socketConnection, setSocketConection}) {
    const [message, setMessage] = useState([]);
    async function fetching() {
        await axios.get('http://localhost:5000/noti/get')
            .then((response) => {
                let tempMessage = [];
                for (let i = 0; i < response.data.length; i++) {
                    let icon;
                    switch (response.data[i]["ID_SENSOR"]) {
                        case 1: icon = icons.DHT11;
                            break;
                        case 2: icon = icons.minipump;
                            break;
                        case 3: icon = icons.soil;
                            break;
                        default: icon = icons.light;
                            break;
                    }
                    let temp = {
                        "time": new Date(response.data[i]["mesureTime"]).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }).replace(",", ""),
                        "content": response.data[i]["notified"],
                        "icon": icon,
                        "id": response.data[i]["ID_DATA"],
                        "seen": response.data[i]["Seen"]
                    }
                    tempMessage.push(temp);
                }
                setMessage(tempMessage);
            });
            setSocketConection(false);
    }
    useEffect(() => {
        fetching();
    }, [socketConnection]);

    return (
        <>
            <div className="noti-modal container">
                {message.map((message) => <Message message={message} key={message["id"]} />)}
            </div>
        </>

    )
}