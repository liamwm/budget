'use client'

import { useState, useEffect } from 'react';
import {LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip} from 'recharts'

export default function TransactionsPlot({data}: {data: DataPoint[]}) {
    const [isClient, setIsClient] = useState(false);

    const formatDateTick = (value: number) => {
        const date = new Date(value);
        return `${date.getDate()}/${date.getMonth()}`;
    }
    const formatDateLabel = (value: number) => {
        const date = new Date(value);
        return date.toDateString();
    }


    useEffect(() => {
        setIsClient(true);
    }, [])

    const amountMin = Math.min(...data.map(d => d.amount));
    const amountMax = Math.max(...data.map(d => d.amount));


    let chart = <LineChart width={1000} height={500} data={data}>
            <XAxis type="number" dataKey="timestamp" domain={['dataMin', 'dataMax']} tickFormatter={(value)=>formatDateTick(value)}/>
            <YAxis type="number" dataKey="amount" domain={[amountMin-10, amountMax+10]} />
            <Line type="monotone" dataKey="amount" stroke="#82ca9d"/>
            <Tooltip labelFormatter={(label) => formatDateLabel(label)}/>
    </LineChart>

    return isClient ? chart : <div>Loading...</div>;
}