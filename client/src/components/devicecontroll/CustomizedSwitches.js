import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import deviceControll from './devicecontroll';
import axios from 'axios';

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 100,
    height: 40,
    padding: 0,
    borderRadius: 30,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 50,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(50px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 0,
        '&.Mui-checked': {
            transform: 'translateX(50px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 50,
        height: 40,
        borderRadius: 30,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));

export default function CustomizedSwitches({ type }) {
    console.log(type);
    const [checked, setChecked] = React.useState(false);
    const [data, setData] = React.useState(type === 'pump' ? "3" : "0");
    const feed = type === 'pump' ? "bbc-pump" : "bbc-led";

    const handleChange = () => {
        setChecked(!checked);
    };

    const handleDevice = () => {
        if (checked === true) {
            if (type === 'pump') {
                setData("3");
            }
            else {
                setData("0");
            }
        }
        else {
            if (type === 'pump') {
                setData("2");
            }
            else {
                setData("1");
            }
        }
    }

    React.useEffect(() => {
        handleDevice()
    }, [checked])

    React.useEffect(() => {
        axios.get(`https://io.adafruit.com/api/v2/ngochienhv/feeds/${feed}/data/retain`)
            .then((response) => {
                console.log(response.data);
                if (type === 'pump') {
                    if (response.data[0] === '3') {
                        setChecked(false);
                    }
                    else {
                        setChecked(true);
                    }
                }
                else {
                    if (response.data[0] === '0') {
                        setChecked(false);
                    }
                    else {
                        setChecked(true);
                    }
                }
            })
    }, []);

    const sendData = () => {
        if(type === 'pump') {
            deviceControll(data, "bbc-pump");
        } else {
            deviceControll(data, "bbc-led");
        }
    }
    return (
        <FormGroup>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Off</Typography>
                <AntSwitch
                    checked={checked}
                    onChange={() => {
                        handleChange()
                        sendData()
                    }}
                    inputProps={{ 'aria-label': 'ant design' }}
                />
                <Typography>On</Typography>
            </Stack>
        </FormGroup>
    );
}