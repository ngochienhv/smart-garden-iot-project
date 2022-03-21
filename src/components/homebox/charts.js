import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';
import React from 'react';


export default function Chart({ data }) {
    return (
        <LineChart width={300} height={300} data={data}>
            <Line type="monotone" dataKey="value" stroke="white" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="time" />
            <YAxis />
        </LineChart>
    );
}