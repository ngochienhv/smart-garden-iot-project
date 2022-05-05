import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NotiContext } from '../../App';
import MessageModal from './messageModal';
import moment from 'moment';
import "./message.css";

export default function Message({ message }) {
    const [exist, setExist] = useState(true);
    const [seen, setSeen] = useState(message["seen"]);
    const consumer = React.useContext(NotiContext);

    const deleteMess = () => {
        setExist(false);
        axios.delete('http://localhost:5000/noti/delete',
            {
                data: { id: message["id"] },
            });
        axios.delete('http://localhost:5000/noti/delete',
            {
                data: { id: message["id"] + 10 },
            });
    }

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        console.log(seen);
        if (seen === 0) {
            console.log("bruh");
            setSeen('1');
            axios.post('http://localhost:5000/noti/update', {
                id: message["id"]
            }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        }
    };

    useEffect(() => {
        if (seen === '1') {
            consumer[1](consumer[0] - 1);
        }

    }, [seen]);

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

        if (message.time.split(' ')[2] === 'PM') {
            hour = (parseInt(messtime.split(':')[0]) + 12);
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
                    {timeSub[1] > 1 ? timeSub[1].toString() + " " + timeSub[0] + "s ago" : timeSub[1].toString() + " " + timeSub[0] + " ago"}
                </div>
            </div>
            <div className="col-2 btn-group close-message">
                {seen === 0 ? <i className="bi bi-circle-fill message-unread"></i> : <i className="bi bi-circle-fill message-unread" style={{ color: "transparent" }}></i>}
                <button className="btn btn-primary message-dismiss" onClick={deleteMess}><i className="bi bi-x-circle"></i></button>
            </div>
            <MessageModal open={open} setOpen={setOpen} data={message} />
        </div> : null
    )
}