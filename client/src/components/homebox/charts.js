import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from 'recharts';
import React from 'react';


export default function Chart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart width={300} height={300} data={data}>
                <XAxis dataKey="time" stroke='#e6e6e7' minTickGap={20} />
                <YAxis dataKey="value" stroke='#e6e6e7' tickCount={7} domain={[0, 'dataMax']} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#9cc2d6" strokeWidth={3} dot={false} />
                <CartesianGrid stroke="#e6e6e7" />
            </LineChart>
        </ ResponsiveContainer>
    );
}