import React, { useState, useEffect } from 'react';
import './homebox.css';
import Chart from './charts';
import fetching from './fetchData';

export default function InformationCard() {
    const [connectionStatus, setConnectionStatus] = React.useState(false);
    const [tempData, setTempData] = useState();
    const [tempDataArr, setTempDataArr] = useState([]);
    const [moistData, setMoistData] = useState();
    const [moistDataArr, setMoistDataArr] = useState([]);
    const [lightData, setLightData] = useState();
    const [lightDataArr, setLightDataArr] = useState([]);
    const [waterData, setWaterData] = useState();
    const [waterDataArr, setWaterDataArr] = useState([]);
    useEffect(() => {
        fetching(setTempData, setTempDataArr, setConnectionStatus, 'bbc-temp');
        fetching(setMoistData, setMoistDataArr, setConnectionStatus, 'bbc-humi');
        fetching(setLightData, setLightDataArr, setConnectionStatus, 'bbc-light');
        fetching(setWaterData, setWaterDataArr, setConnectionStatus, 'bbc-soil');
    }, [connectionStatus]);

    return (
        <div className="container-fluid" style={{ paddingTop: 20 }}>
            <div className="row">
                <div className="info-card-container col-6 mx-3" style={{ backgroundColor: "#ff0000" }}>
                    <div className="info-card-info-container" style={{ backgroundColor: "#b70000" }}>
                        <h1 className="info-card-data">
                            {tempData}°C
                            <i className="bi bi-thermometer-half"></i>
                        </h1>
                        <h2 className="info-card-type">
                            Temperature
                        </h2>
                        <a className="btn btn-primary info-card-detail" href="/tempsensor">Detail</a>
                    </div>
                    <div className="info-card-graph">
                        <Chart data={tempDataArr} />
                    </div>
                </div>
                <div className="info-card-container col-6" style={{ backgroundColor: "#5099f4" }}>
                    <div className="info-card-info-container" style={{ backgroundColor: "#16246d" }}>
                        <h1 className="info-card-data">
                            {moistData}%
                            <i className="bi bi-droplet-fill"></i>
                        </h1>
                        <h2 className="info-card-type">
                            Humidity
                        </h2>
                        <a className="btn btn-primary info-card-detail" href="/moistsensor">Detail</a>
                    </div>
                    <div className="info-card-graph">
                        <Chart data={moistDataArr} />
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="info-card-container col-6 mx-3" style={{ backgroundColor: "#ffba01" }}>
                    <div className="info-card-info-container" style={{ backgroundColor: "#ffa701" }}>
                        <h1 className="info-card-data">
                            {lightData}
                            <i className="bi bi-brightness-low-fill"></i>
                        </h1>
                        <h2 className="info-card-type">
                            Light
                        </h2>
                        <a className="btn btn-primary info-card-detail" href="/lightsensor">Detail</a>
                    </div>
                    <div className="info-card-graph">
                        <Chart data={lightDataArr} />
                    </div>
                </div>
                <div className="info-card-container col-6" style={{ backgroundColor: "#449e48" }}>
                    <div className="info-card-info-container" style={{ backgroundColor: "#357a38" }}>
                        <h1 className="info-card-data">
                            {waterData}
                            <i className="bi bi-water"></i>
                        </h1>
                        <h2 className="info-card-type">
                            Soil Moisture
                        </h2>
                        <a className="btn btn-primary info-card-detail" href="/watersensor">Detail</a>
                    </div>
                    <div className="info-card-graph">
                        <Chart data={waterDataArr} />
                    </div>
                </div>
            </div>
        </div>
    );
}