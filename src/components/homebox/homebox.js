import React from 'react';
import axios from 'axios';
import './homebox.css';
import Chart from './charts';

const data = [{ time: '2022-03-13', value: 30, v: 100 }, { time: '2022-03-13', value: 23, v: 43 }, { time: '2022-03-20', value: 50, v: 78 }];

export default class InformationCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tempData: "",
            tempDataArr: []
        }
    }
    componentDidMount() {
        axios.get("https://io.adafruit.com/api/v2/ngochienhv/feeds/bbc-temp/data")
            .then((response) => {
                let tempDataArr = [];
                let tempData = response.data[0]["value"];
                for (let i = 0; i < 4; i++) {
                    let temp = {
                        "time": "",
                        "value": 0
                    }
                    temp["time"] = response.data[i]["created_at"];
                    temp["value"] = response.data[i]["value"];
                    tempDataArr.push(temp);
                }
                tempDataArr.reverse();
                this.setState({ tempDataArr: tempDataArr, tempData: tempData });
            });
    }

    render() {
        return (
            <div className="container-fluid" style={{ paddingTop: 20 }}>
                <div className="row">
                    <div className="info-card-container col-6 mx-3" style={{ backgroundColor: "#776cca" }}>
                        <div className="info-card-info-container" style={{ backgroundColor: "#655cc8" }}>
                            <h1 className="info-card-data">
                                {this.state.tempData}°C
                                <i className="bi bi-thermometer-half"></i>
                            </h1>
                            <h2 className="info-card-type">
                                Temperature
                            </h2>
                            <button className="btn btn-primary info-card-detail">Detail</button>
                        </div>
                        <div className="info-card-graph">
                            <Chart data={this.state.tempDataArr} />
                        </div>
                    </div>
                    <div className="info-card-container col-6" style={{ backgroundColor: "#57c0ef" }}>
                        <div className="info-card-info-container" style={{ backgroundColor: "#00a1e1" }}>
                            <h1 className="info-card-data">
                                60%
                                <i className="bi bi-droplet-fill"></i>
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
                                <i className="bi bi-brightness-low-fill"></i>
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
                                <i className="bi bi-water"></i>
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
        );
    }

}