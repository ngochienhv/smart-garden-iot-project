import React from 'react';
import Message from '../components/message/message';

const time = ["3/24/2022 10:11:54 AM", "3/24/2022 10:11:49 AM", "3/24/2022 8:48:14 AM", "3/24/2022 8:48:11 AM", "3/24/2022 8:46:37 AM"];
export default function Notifications() {
    return (
        <>
            <h1 style={{ color: "white", textAlign: "center", fontSize: 50 }}>Thông báo</h1>
            <div className="container mt-5">
                {time.map((time) => <Message time={time} />)}
            </div>
        </>

    )
}