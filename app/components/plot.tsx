'use client'

import { useState, useEffect } from 'react';
import {LineChart, Line} from 'recharts'

export default function TransactionsPlot({data}: {data: {name: string, uv: number, pv: number, amt: number}[]}) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, [])

    let chart = <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>

    return isClient ? chart : <div>Loading...</div>;
}