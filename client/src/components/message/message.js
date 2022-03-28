import React, { useState } from 'react';
import axios from 'axios';
import "./message.css";

export default function Message({ message }) {
    const [exist, setExist] = useState(true);
    const deleteMess = () => {
        setExist(false);
        axios.delete('http://localhost:5000/noti/delete',
            {
                data: { id: message["id"] },
            });
    }

    return (
        exist ? <div className="row message-container mt-3">
            <div className="col-1 message-icon">
                {message["icon"]}
            </div>
            <div className="col-3 message-time">
                {message["time"]}
            </div>
            <div className="col-7 message-content">
                {message["content"]}
            </div>
            <div className="col-1">
                <button className="btn btn-primary message-dismiss" onClick={deleteMess}><i className="bi bi-x-circle"></i></button>
            </div>
        </div> : null
    )
}