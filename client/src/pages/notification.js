import React, { useEffect, useState } from 'react';
import Message from '../components/message/message';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';

const icons = {
    light: <i className="bi bi-lightbulb" style={{ color: "yellow" }}></i>,
    minipump: <i className="bi bi-droplet-half" style={{ color: "blue" }}></i>,
    DHT11: <i className="bi bi-thermometer-half" style={{ color: "red" }}></i>,
    soil: <i className="bi bi-water" style={{ color: "green" }}></i>
}

const override = css`
  display: block;
  margin: 0 auto;
  border-radius: 100px solid white;
  position: absolute;
  top: 250px;
  left: 200px;
`;

export default function Notifications({ socketConnection, setSocketConection }) {
    const [message, setMessage] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetching() {
        setIsLoading(true);
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
                for (var i = 0; i < tempMessage.length; i++) {
                    tempMessage.splice(i + 1, 1);
                }
                setMessage(tempMessage);
                setIsLoading(false);
            });
        setSocketConection(false);
    }
    useEffect(() => {
        fetching();
    }, [socketConnection]);

    return (
        <>
            <div className="noti-modal container">
                {!isLoading ? message.map((message) => <Message message={message} key={message["id"]} />) : (<ClipLoader color={"#ffffff"} loading={isLoading} css={override} size={100} />)}
            </div>
        </>

    )
}