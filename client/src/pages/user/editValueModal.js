import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import mqttClient from '../../components/mqttConnection/mqttConnection';
import { useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const tempLimitTopic =  'ngochienhv/feeds/bbc-temp-limit';
const lightLimitTopic = 'ngochienhv/feeds/bbc-light-limit';
const soilLimitTopic = 'ngochienhv/feeds/bbc-soil-limit';
const humidLimitTopic = 'ngochienhv/feeds/bbc-humi-limit';

export default function EditValueModal({ open, handleClose, type }) {
    const [input, setInput] = useState();
    const setLimit = () => {
        var curTopic;
        if(type==='temp') {
            curTopic = tempLimitTopic;
        } else if(type === 'light') {
            curTopic = lightLimitTopic;
        } else if(type ==='soil') {
            curTopic = soilLimitTopic;
        } else {
            curTopic = humidLimitTopic;
        }
        mqttClient.publish(curTopic, input.toString());
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Change sensor's limit
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <label>Input new value</label>
                        <input value={input} onInput={e => setInput(e.target.value)} />
                        <button className='btn btn-primary' onClick={() => {setLimit(); handleClose()}} style={{marginTop: 10}}>Submit</button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}