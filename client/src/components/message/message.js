import React, { useState } from 'react';
import axios from 'axios';
import { NotiContext } from '../../App';
import MessageModal from './messageModal';
import "./message.css";

export default function Message({ message }) {
    const [exist, setExist] = useState(true);

    const consumer = React.useContext(NotiContext);

    const deleteMess = () => {
        setExist(false);
        axios.delete('http://localhost:5000/noti/delete',
            {
                data: { id: message["id"] },
            });
        if (message["seen"] === '0')
            consumer[1](consumer[0] - 1);
    }

    const [open, setOpen] = useState(false);
    console.log(open);
    const handleOpen = () => {
        setOpen(true);
        axios.post('http://localhost:5000/noti/update', {
            id: message["id"]
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    };

    const parseTime = () => {
        var currentDate = new Date();
        var messDate = message.time.split(' ')[0];
        var messtime = message.time.split(' ')[1];
        var year = parseInt(messDate.split('/')[2]);
        var month = parseInt(messDate.split('/')[0]);
        var date = parseInt(messDate.split('/')[1]);
        var hour = parseInt(messtime.split(':')[0]);
        var minute = parseInt(messtime.split(':')[1]);
        var second = parseInt(messtime.split(':')[2]);

        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth() + 1;
        var currentDay = currentDate.getDate();
        var currentHour = currentDate.getHours();
        var currentMinute = currentDate.getMinutes();
        var currentSecond = currentDate.getSeconds();

        console.log(month);
        console.log(currentMonth);
        if (message.time.split(' ')[2] === 'PM') {
            hour = (parseInt(messtime.split(':')[0]) + 12).toString();
        }

        if (year !== currentYear) {
            return ["year", Math.abs(year - currentYear)];
        } else if (month !== currentMonth) {
            return ["month", Math.abs(month - currentMonth)];
        } else if (date !== currentDay) {
            return ["day", Math.abs(date - currentDay)];
        } else if (hour !== currentHour) {
            return ["hour", Math.abs(hour - currentHour)];
        } else if (minute !== currentMinute) {
            return ["minute", Math.abs(minute - currentMinute)];
        } else if (second !== currentSecond) {
            return ["second", Math.abs(second - currentSecond)];
        }
    }

    var timeSub = parseTime();

    return (
        exist ? <div className="row message-container" onClick={handleOpen}>
            <div className="col-2 message-icon">
                {message["icon"]}
            </div>
            <div className="col-8 message-content">
                <div className="row">
                    {message["content"]}
                </div>
                <div className="row">
                    {timeSub[1] > 1 ? timeSub[1].toString() + " " + timeSub[0] + "'s ago" : timeSub[1].toString() + " " + timeSub[0] + " ago"}
                </div>
            </div>
            <div className="col-2 btn-group close-message">
                {message["seen"] === 0 ? <i className="bi bi-circle-fill message-unread"></i> : null}
                <button className="btn btn-primary message-dismiss" onClick={deleteMess}><i className="bi bi-x-circle"></i></button>
            </div>
            <MessageModal open={open} setOpen={setOpen} data={message} />
        </div> : null
    )
}