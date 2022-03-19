import React from 'react';
import './homebox.css';
import Chart from './charts';

export default function InformationCard() {
    return (
        <div className="container-fluid" style={{ paddingTop: 20 }}>
            <div className="row">
                <div className="info-card-container col-6 mx-3" style={{ backgroundColor: "#776cca" }}>
                    <div className="info-card-info-container" style={{ backgroundColor: "#655cc8" }}>
                        <h1 className="info-card-data">
                            30°C
                            <i class="bi bi-thermometer-half"></i>
                        </h1>
                        <h2 className="info-card-type">
                            Temperature
                        </h2>
                        <button className="btn btn-primary info-card-detail">Detail</button>
                    </div>
                    <div className="info-card-graph">
                        <Chart />
                    </div>
                </div>
                <div className="info-card-container col-6" style={{ backgroundColor: "#57c0ef" }}>
                    <div className="info-card-info-container" style={{ backgroundColor: "#00a1e1" }}>
                        <h1 className="info-card-data">
                            60%
                            <i class="bi bi-droplet-fill"></i>
                        </h1>
                        <h2 className="info-card-type">
                            Moisture
                        </h2>
                        <button className="btn btn-primary info-card-detail">Detail</button>
                    </div>
                    <div className="info-card-graph">
                        <Chart />
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="info-card-container col-6 mx-3" style={{ backgroundColor: "#cab31e" }}>
                    <div className="info-card-info-container" style={{ backgroundColor: "#bea500" }}>
                        <h1 className="info-card-data">
                            120
                            <i class="bi bi-brightness-low-fill"></i>
                        </h1>
                        <h2 className="info-card-type">
                            Light
                        </h2>
                        <button className="btn btn-primary info-card-detail">Detail</button>
                    </div>
                    <div className="info-card-graph">
                        <Chart />
                    </div>
                </div>
                <div className="info-card-container col-6" style={{ backgroundColor: "#01a589" }}>
                    <div className="info-card-info-container" style={{ backgroundColor: "#019577" }}>
                        <h1 className="info-card-data">
                            50l
                            <i class="bi bi-water"></i>
                        </h1>
                        <h2 className="info-card-type">
                            Water
                        </h2>
                        <button className="btn btn-primary info-card-detail">Detail</button>
                    </div>
                    <div className="info-card-graph">
                        <Chart />
                    </div>
                </div>
            </div>
        </div>
    )
}