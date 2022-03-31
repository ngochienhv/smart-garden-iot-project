import React, { useReducer } from 'react';
import LogModal from './viewlogmodal';
import EditValueModal from './editValueModal';
import CustomizedSwitches from '../../components/devicecontroll/CustomizedSwitches';

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

    return (
        <div className="container user-container">
            <div className="row device-container">
                <div className="col-6 device-box" style={{ backgroundColor: "#006187" }}>
                    <div className="device-title" style={{ backgroundColor: "#003043" }}>
                        <h1>Water pump</h1>
                    </div>
                    <div className="device-description">
                        <h2><b>Last Activity at:</b>  3/24/2022 10:11:54 AM</h2>
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
                        <h2><b>Last Activity at:</b> 3/24/2022 10:11:54 AM</h2>
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
                        <h3>Status: OK</h3>
                    </div>
                    <button className="btn btn-primary edit-value-btn" onClick={() => handleModal({
                        action: 'open',
                        id: 3
                    })}>Edit value</button>
                    <EditValueModal open={state.find(e => e.id === 3).open} handleClose={() => handleModal({
                        action: 'close',
                        id: 3
                    })} />
                </div>
                <div className="col-3 sensor-box" style={{ backgroundColor: "#5099f4" }}>
                    <div className="sensor-title" style={{ backgroundColor: "#16246d" }}>
                        <h1>
                            Moisture Sensor
                        </h1>
                    </div>
                    <div className="sensor-status">
                        <h3>Status: OK</h3>
                    </div>
                    <button className="btn btn-primary edit-value-btn" onClick={() => handleModal({
                        action: 'open',
                        id: 4
                    })}>Edit value</button>
                    <EditValueModal open={state.find(e => e.id === 4).open} handleClose={() => handleModal({
                        action: 'close',
                        id: 4
                    })} />
                </div>
                <div className="col-3 sensor-box" style={{ backgroundColor: "#ffba01" }}>
                    <div className="sensor-title" style={{ backgroundColor: "#ffa701" }}>
                        <h1>
                            Light Sensor
                        </h1>
                    </div>
                    <div className="sensor-status">
                        <h3>Status: OK</h3>
                    </div>
                    <button className="btn btn-primary edit-value-btn" onClick={() => handleModal({
                        action: 'open',
                        id: 5
                    })}>Edit value</button>
                    <EditValueModal open={state.find(e => e.id === 5).open} handleClose={() => handleModal({
                        action: 'close',
                        id: 5
                    })} />
                </div>
                <div className="col-3 sensor-box" style={{ backgroundColor: "#449e48" }}>
                    <div className="sensor-title" style={{ backgroundColor: "#357a38" }}>
                        <h1>
                            Water Sensor
                        </h1>
                    </div>
                    <div className="sensor-status">
                        <h3>Status: OK</h3>
                    </div>
                    <button className="btn btn-primary edit-value-btn" onClick={() => handleModal({
                        action: 'open',
                        id: 6
                    })}>Edit value</button>
                    <EditValueModal open={state.find(e => e.id === 6).open} handleClose={() => handleModal({
                        action: 'close',
                        id: 6
                    })} />
                </div>
            </div>
        </div>
    )
}