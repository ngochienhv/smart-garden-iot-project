import React, { useEffect, useState } from 'react';
import Message from '../components/message/message';
import axios from 'axios';
import mqtt from 'mqtt/dist/mqtt';

const icons = {
    light: <i className="bi bi-lightbulb" style={{ color: "yellow" }}></i>,
    minipump: <i className="bi bi-droplet-half" style={{ color: "blue" }}></i>,
    DHT11: <i className="bi bi-thermometer-half"></i>
}
export default function Notifications() {
    const [message, setMessage] = useState([]);
    const [connectionStatus, setConnectionStatus] = React.useState(false);
    const url = 'mqtt://ngochienhv:aio_hRKe39xRu3EXPo7mbFJWfEoMHbqU@io.adafruit.com';
    const topic = `ngochienhv/feeds/bbc-noti`;
    useEffect(() => {
        async function fetching() {
            await axios.get('http://localhost:5000/noti/get')
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
                            "seen": response.data[i]["Seen"]
                        }
                        tempMessage.push(temp);
                    }
                    setMessage(tempMessage);
                });
            const mqtt_client = mqtt.connect(url, 8883);
            console.log(mqtt_client);
            mqtt_client.on('connect', function () {
                setConnectionStatus(true);
                console.log(connectionStatus);
                mqtt_client.subscribe(topic, () => { });
            });
            mqtt_client.on('message', (topic, message) => {
                setConnectionStatus(false);
                mqtt_client.end();
            });
        }
        fetching();
    }, [connectionStatus]);

    return (
        <>
            <div className="noti-modal container">
                {message.map((message) => <Message message={message} key={message["id"]} />)}
            </div>
        </>

    )
}