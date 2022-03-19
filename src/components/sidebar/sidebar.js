import React from 'react';
import './sidebar.css';

export default function Sidebar() {
    return (
        <div className="sidebar-container">
            <div className="sidebar-btn-container">
                <a className="sidebar-btn" href="/"><i className="bi bi-house-fill"></i></a>
                <a className="sidebar-btn" href="/"><i className="bi bi-record-circle"></i></a>
                <a className="sidebar-btn" href="/"><i className="bi bi-envelope-fill"></i></a>
                <a className="sidebar-btn" href="/"><i className="bi bi-person-fill"></i></a>
            </div>
        </div>
    )
}