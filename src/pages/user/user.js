import React from 'react';
import LogModal from './viewlogmodal';
import EditValueModal from './editValueModal';
import "./userstyle.css";

export default function User() {
    const [openLog, setOpenLog] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenLog = () => setOpenLog(true);
    const handleCloseLog = () => setOpenLog(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);
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
                    <button className="btn btn-primary view-log-btn" onClick={handleOpenLog}>View Full Log</button>
                    <LogModal open={openLog} handleClose={handleCloseLog} />
                </div>
                <div className="col-6 device-box mx-5" style={{ backgroundColor: "#DEAA6E" }}>
                    <div className="device-title" style={{ backgroundColor: "#E17700" }}>
                        <h1>Light</h1>
                    </div>
                    <div className="device-description">
                        <h2><b>Last Activity at:</b> 3/24/2022 10:11:54 AM</h2>
                    </div>
                    <button className="btn btn-primary view-log-btn" onClick={handleOpenLog}>View Full Log</button>
                    <LogModal open={openLog} handleClose={handleCloseLog} />
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
                    <button className="btn btn-primary edit-value-btn" onClick={handleOpenEdit}>Edit Value</button>
                    <EditValueModal open={openEdit} handleClose={handleCloseEdit} />
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
                    <button className="btn btn-primary edit-value-btn" onClick={handleOpenEdit}>Edit Value</button>
                    <EditValueModal open={openEdit} handleClose={handleCloseEdit} />
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
                    <button className="btn btn-primary edit-value-btn" onClick={handleOpenEdit}>Edit Value</button>
                    <EditValueModal open={openEdit} handleClose={handleCloseEdit} />
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
                    <button className="btn btn-primary edit-value-btn" onClick={handleOpenEdit}>Edit Value</button>
                    <EditValueModal open={openEdit} handleClose={handleCloseEdit} />
                </div>
            </div>
        </div>
    )
}