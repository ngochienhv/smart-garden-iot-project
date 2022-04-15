import React, { useReducer } from 'react';
import LogModal from './viewlogmodal';
import EditValueModal from './editValueModal';
import CustomizedSwitches from '../../components/devicecontroll/CustomizedSwitches';
import mqttClient from '../../components/mqttConnection/mqttConnection';
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
    const [tempLimit, setTempLimit] = React.useState(35);
    const [lightLimit, setLightLimit] = React.useState(800);
    const [soilLimit, setSoilLimit] = React.useState(100);
    const [humiLimit, setHumiLimit] = React.useState(20);
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
                        <h3>Current Upper Limit: {tempLimit}</h3>
                    </div>
                    <button className="btn btn-primary edit-value-btn" onClick={() => handleModal({
                        action: 'open',
                        id: 3
                    })}>Edit value</button>
                    <EditValueModal open={state.find(e => e.id === 3).open} handleClose={() => handleModal({
                        action: 'close',
                        id: 3
                    })} type = {'temp'} initValue={tempLimit}/>
                </div>
                <div className="col-3 sensor-box" style={{ backgroundColor: "#5099f4" }}>
                    <div className="sensor-title" style={{ backgroundColor: "#16246d" }}>
                        <h1>
                            Humid Sensor
                        </h1>
                    </div>
                    <div className="sensor-status">
                        <h3>Current Lower Limit: {humiLimit}</h3>
                    </div>
                    <button className="btn btn-primary edit-value-btn" onClick={() => handleModal({
                        action: 'open',
                        id: 4
                    })}>Edit value</button>
                    <EditValueModal open={state.find(e => e.id === 4).open} handleClose={() => handleModal({
                        action: 'close',
                        id: 4
                    })} type={'humid'} initValue={humiLimit}/>
                </div>
                <div className="col-3 sensor-box" style={{ backgroundColor: "#ffba01" }}>
                    <div className="sensor-title" style={{ backgroundColor: "#ffa701" }}>
                        <h1>
                            Light Sensor
                        </h1>
                    </div>
                    <div className="sensor-status">
                        <h3>Current Upper Limit: {lightLimit}</h3>
                    </div>
                    <button className="btn btn-primary edit-value-btn" onClick={() => handleModal({
                        action: 'open',
                        id: 5
                    })}>Edit value</button>
                    <EditValueModal open={state.find(e => e.id === 5).open} handleClose={() => handleModal({
                        action: 'close',
                        id: 5
                    })} type={'light'} initValue={lightLimit}/>
                </div>
                <div className="col-3 sensor-box" style={{ backgroundColor: "#449e48" }}>
                    <div className="sensor-title" style={{ backgroundColor: "#357a38" }}>
                        <h1>
                            Soil moisture Sensor
                        </h1>
                    </div>
                    <div className="sensor-status">
                        <h3>current Lower Limit: {soilLimit}</h3>
                    </div>
                    <button className="btn btn-primary edit-value-btn" onClick={() => handleModal({
                        action: 'open',
                        id: 6
                    })}>Edit value</button>
                    <EditValueModal open={state.find(e => e.id === 6).open} handleClose={() => handleModal({
                        action: 'close',
                        id: 6
                    })} type={'soil'} initValue={soilLimit}/>
                </div>
            </div>
        </div>
    )
}