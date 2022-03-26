import React from 'react';
import "./message.css";

export default function Message({ icon, content, time }) {
    return (
        <div className="row message-container mt-3">
            <div className="col-1 message-icon">
                <i className="bi bi-brightness-low-fill"></i>
            </div>
            <div className="col-3 message-time">
                {time}
            </div>
            <div className="col-7 message-content">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, rem!
            </div>
            <div className="col-1">
                <button className="btn btn-primary message-dismiss"><i className="bi bi-x-circle"></i></button>
            </div>
        </div>
    )
}