import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import DataTables from '../../components/tables/tables';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 701,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function LogModal({ open, handleClose, type }) {
    let url = type === 'minipump' ? 'http://localhost:5000/device/minipump' : 'http://localhost:5000/device/light';
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(url)
            .then((response) => {
                let tempData = [];
                for (let i = 0; i < response.data.length; i++) {
                    let temp = {};
                    if (type === 'minipump') {
                        temp = {
                            "pumpEvent": response.data[i].pump_event,
                            "pumpTime": new Date(response.data[i].pump_time).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }).replace(",", ""),
                        };
                    }
                    else {
                        temp = {
                            "lightEvent": response.data[i].light_event,
                            "lightTime": new Date(response.data[i].light_time).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }).replace(",", "")
                        }
                    }
                    tempData.push(temp);
                }
                tempData.reverse();
                setData(tempData);
            })
    }, [])

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        Device's Log
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} />
                    {<DataTables data={data} type={type} />}
                </Box>
            </Modal>
        </div>
    );
}