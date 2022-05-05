import React, { useEffect, useState } from 'react';
import DataTables from '../../components/tables/tables';
import Chart from '../../components/homebox/charts';
import Speedometers from '../../components/speedometer/speedometer';
import "./sensorstyles.css";
import mqttClient from '../../components/mqttConnection/mqttConnection';
import axios from 'axios';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-radius: 100px;
  border: 5px solid white;
  position: absolute;
  top: 250px;
  left: 700px;
`;

export default function TempSensor() {
    const [connectionStatus, setConnectionStatus] = React.useState(false);
    const [data, setData] = useState([]);
    const [currentData, setCurrentData] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const tempTopic = 'ngochienhv/feeds/bbc-temp';

    useEffect(() => {
        setIsLoading(true);
        async function fetching() {
            await axios.get("https://io.adafruit.com/api/v2/ngochienhv/feeds/bbc-temp/data")
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
                    setIsLoading(false);
                });

            await mqttClient.on('message', (topic, message) => {
                setConnectionStatus(true);
                if (topic === tempTopic) {
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
        !isLoading ? <div className="container-fluid sensor-container">
            <div className="row">
                <div className="col-6">
                    <DataTables type={"sensor"} data={[...data].reverse()} />
                </div>
                <div className="col-6 speedometer" >
                    <Speedometers data={currentData} minValue={0} maxValue={50} />
                    <h3 className="current-value">Current Value</h3>
                </div>
            </div>
            <div className="row chart">
                <Chart data={data} />
            </div>
        </div> : (<ClipLoader color={"#ffffff"} loading={isLoading} css={override} size={100} />)
    );
}

