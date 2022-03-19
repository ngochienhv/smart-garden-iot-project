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

const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }];

export default function Chart() {
    return (
        <LineChart width={300} height={300} data={data}>
            <Line type="monotone" dataKey="uv" stroke="white" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
        </LineChart>
    );
}