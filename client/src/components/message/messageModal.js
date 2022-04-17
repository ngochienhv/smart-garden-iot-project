import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MessageModal({ open, setOpen, data }) {
    const handleClose = () => { 
        setOpen(false);
    };
    const datas = data.content.split('!');
    let content = datas[0] + "!";
    let value = datas[1];
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                onClose={handleClose}
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            <h6 style={{color: "red", fontWeight: 600, fontSize: 35, textAlign: "center"}}>WARNING!</h6>
                            {content}
                            <h5>Value: {value}</h5>
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <h4 style={{ fontWeight: 600, textAlign: "center"}}>Time of data:</h4>
                            <h5 style={{textAlign: "center"}}>{data.time}</h5>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div >
    );
}