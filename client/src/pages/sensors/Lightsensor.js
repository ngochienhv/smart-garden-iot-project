import React, { useEffect, useState } from 'react';
import DataTables from '../../components/tables/tables';
import Chart from '../../components/homebox/charts';
import Speedometers from '../../components/speedometer/speedometer';
import "./sensorstyles.css";
import mqttClient from '../../components/mqttConnection/mqttConnection';
import axios from 'axios';

export default function LightSensor() {
    const [connectionStatus, setConnectionStatus] = React.useState(false);
    const [data, setData] = useState([]);
    const [currentData, setCurrentData] = useState(0);
    const lightTopic = 'ngochienhv/feeds/bbc-light';


    useEffect(() => {
        async function fetching() {
            await axios.get("https://io.adafruit.com/api/v2/ngochienhv/feeds/bbc-light/data")
                .then((response) => {
                    let tempDataArr = [];
                    let tempData = response.data[0]["value"];
                    setCurrentData(tempData);
                    for (let i = 0; i < response.data.length; i++) {
                        let temp = {
                            "time": "",
                            "value": 0
                        }
                        temp["time"] = new Date(response.data[i]["created_at"]).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }).replace(",", "");
                        temp["value"] = parseInt(response.data[i]["value"]);
                        tempDataArr.push(temp);
                    }
                    tempDataArr.reverse();
                    setData(tempDataArr);
                });

            await mqttClient.on('message', (topic, message) => {
                setConnectionStatus(true);
                if (topic === lightTopic) {
                    const value = parseInt(message.toString());
                    let tempData = value;
                    let temp = {
                        "time": new Date().toISOString(),
                        "value": value
                    };
                    setData(prev => [...prev, temp]);
                    setCurrentData(tempData);
                    setConnectionStatus(false);
                }
            });
        }
        fetching();
    }, [connectionStatus]);

    return (
        <div className="container-fluid sensor-container">
            <div className="row">
                <div className="col-6">
                    <DataTables type={"sensor"} data={[...data].reverse()} />
                </div>
                <div className="col-6 speedometer" >
                    <Speedometers data={currentData} minValue={0} maxValue={1023} />
                    <h3 className="current-value">Current Value</h3>
                </div>
            </div>
            <div className="row chart">
                <Chart data={data} />
            </div>
        </div>
    );
}