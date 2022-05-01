import React, { useReducer } from 'react';
import LogModal from './viewlogmodal';
import EditValueModal from './editValueModal';
import CustomizedSwitches from '../../components/devicecontroll/CustomizedSwitches';
import mqttClient from '../../components/mqttConnection/mqttConnection';
import axios from 'axios';
import "./userstyle.css";


var initialState = [
    {
        id: 1,
        task: "water pump modal",
        open: false
    },
    {
        id: 2,
        task: "light modal",
        open: false
    },
    {
        id: 3,
        task: "temp sensor modal",
        open: false
    },
    {
        id: 4,
        task: "moist sensor modal",
        open: false
    },
    {
        id: 5,
        task: "light sensor modal",
        open: false
    },
    {
        id: 6,
        task: "water sensor modal",
        open: false
    },
];

const reducer = (state, action) => {
    switch (action.type) {
        case "open":
            return state.map(todo => {
                if (todo.id === action.id) {
                    return { ...todo, open: true };
                } else {
                    return todo;
                }
            });
        case "close":
            return state.map(todo => {
                if (todo.id === action.id) {
                    return { ...todo, open: false };
                } else {
                    return todo;
                }
            });
        default:
            return state;
    };
};

export default function User() {
    const [connectionStatus, setConnectionStatus] = React.useState(false);
    const [tempLimit, setTempLimit] = React.useState(0);
    const [lightLimit, setLightLimit] = React.useState(0);
    const [soilLimit, setSoilLimit] = React.useState(0);
    const [humiLimit, setHumiLimit] = React.useState(0);
    const [state, dispatch] = useReducer(
        reducer,
        initialState
    );
    const handleModal = state => {
        dispatch({
            type: state.action,
            id: state.id
        })
    }

    React.useEffect(() => {
        axios.get('https://io.adafruit.com/api/v2/ngochienhv/feeds/bbc-temp-limit/data/retain')
            .then((res) => {
                setTempLimit(parseInt(res.data.split(',')[0]));
            })

        axios.get('https://io.adafruit.com/api/v2/ngochienhv/feeds/bbc-humi-limit/data/retain')
            .then((res) => {
                setHumiLimit(parseInt(res.data.split(',')[0]));
            })

        axios.get('https://io.adafruit.com/api/v2/ngochienhv/feeds/bbc-soil-limit/data/retain')
            .then((res) => {
                setSoilLimit(parseInt(res.data.split(',')[0]));
            })

        axios.get('https://io.adafruit.com/api/v2/ngochienhv/feeds/bbc-light-limit/data/retain')
            .then((res) => {
                setLightLimit(parseInt(res.data.split(',')[0]));
            })
    }, [])

    React.useEffect(() => {
        mqttClient.on('connect', function () {
            setConnectionStatus(true);
        });

        mqttClient.on("message", (topic, message) => {
            const value = parseInt(message.toString());
            switch (topic.split("/")[2]) {
                case "bbc-temp-limit":
                    setTempLimit(value);
                    break;
                case "bbc-humi-limit":
                    setHumiLimit(value);
                    break;
                case "bbc-light-limit":
                    setLightLimit(value);
                    break;
                case "bbc-soil-limit":
                    setSoilLimit(value);
                    break;
                default:
                    break;
            }
            setConnectionStatus(false);
        });
    }, [connectionStatus])


    return (
        <div className="container user-container">
            <div className="row device-container">
                <div className="col-6 device-box" style={{ backgroundColor: "#006187" }}>
                    <div className="device-title" style={{ backgroundColor: "#003043" }}>
                        <h1>Water pump</h1>
                    </div>
                    <div className="device-description">
                        <h2><b>Switch</b></h2>
                    </div>
                    <div className="switch-control">
                        <CustomizedSwitches type={"pump"} />
                    </div>
                    <button className="btn btn-primary view-log-btn" onClick={() => {
                        handleModal({
                            action: 'open',
                            id: 1
                        });
                    }}>View Full Log</button>
                    <LogModal open={state.find(e => e.id === 1).open} handleClose={() => handleModal({
                        action: 'close',
                        id: 1
                    })} type={'minipump'} />
                </div>
                <div className="col-6 device-box mx-5" style={{ backgroundColor: "#DEAA6E" }}>
                    <div className="device-title" style={{ backgroundColor: "#E17700" }}>
                        <h1>Light</h1>
                    </div>
                    <div className="device-description">
                        <h2><b>Switch</b></h2>
                    </div>
                    <div className="switch-control">
                        <CustomizedSwitches type={"light"} />
                    </div>
                    <button className="btn btn-primary view-log-btn" onClick={() => {
                        handleModal({
                            action: 'open',
                            id: 2
                        });
                    }}>View Full Log</button>
                    <LogModal open={state.find(e => e.id === 2).open} handleClose={() => handleModal({
                        action: 'close',
                        id: 2
                    })} type={'light'} />
                </div>
            </div>
            <div className="row sensor-container1">
                <div className="col-3 sensor-box" style={{ backgroundColor: "#ff0000" }}>
                    <div className="sensor-title" style={{ backgroundColor: "#b70000" }}>
                        <h1>
                            Temperature Sensor
                        </h1>
                    </div>
                    <div className="sensor-status">
                        <h3>Current Upper Limit: <b>{tempLimit}</b></h3>
                    </div>
                    <button className="btn btn-primary edit-value-btn" onClick={() => handleModal({
                        action: 'open',
                        id: 3
                    })}>Edit value</button>
                    <EditValueModal open={state.find(e => e.id === 3).open} handleClose={() => handleModal({
                        action: 'close',
                        id: 3
                    })} type={'temp'} />
                </div>
                <div className="col-3 sensor-box" style={{ backgroundColor: "#5099f4" }}>
                    <div className="sensor-title" style={{ backgroundColor: "#16246d" }}>
                        <h1>
                            Humid Sensor
                        </h1>
                    </div>
                    <div className="sensor-status">
                        <h3>Current Lower Limit: <b>{humiLimit}</b></h3>
                    </div>
                    <button className="btn btn-primary edit-value-btn" onClick={() => handleModal({
                        action: 'open',
                        id: 4
                    })}>Edit value</button>
                    <EditValueModal open={state.find(e => e.id === 4).open} handleClose={() => handleModal({
                        action: 'close',
                        id: 4
                    })} type={'humid'} />
                </div>
                <div className="col-3 sensor-box" style={{ backgroundColor: "#ffba01" }}>
                    <div className="sensor-title" style={{ backgroundColor: "#ffa701" }}>
                        <h1>
                            Light Sensor
                        </h1>
                    </div>
                    <div className="sensor-status">
                        <h3>Current Upper Limit: <b>{lightLimit}</b></h3>
                    </div>
                    <button className="btn btn-primary edit-value-btn" onClick={() => handleModal({
                        action: 'open',
                        id: 5
                    })}>Edit value</button>
                    <EditValueModal open={state.find(e => e.id === 5).open} handleClose={() => handleModal({
                        action: 'close',
                        id: 5
                    })} type={'light'} />
                </div>
                <div className="col-3 sensor-box" style={{ backgroundColor: "#449e48" }}>
                    <div className="sensor-title" style={{ backgroundColor: "#357a38" }}>
                        <h1>
                            Soil moisture Sensor
                        </h1>
                    </div>
                    <div className="sensor-status">
                        <h3>Current Lower Limit: <b>{soilLimit}</b></h3>
                    </div>
                    <button className="btn btn-primary edit-value-btn" onClick={() => handleModal({
                        action: 'open',
                        id: 6
                    })}>Edit value</button>
                    <EditValueModal open={state.find(e => e.id === 6).open} handleClose={() => handleModal({
                        action: 'close',
                        id: 6
                    })} type={'soil'} />
                </div>
            </div>
        </div>
    )
}