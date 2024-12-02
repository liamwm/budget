'use client'

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { LineProps } from 'recharts';
//import {LineChart, Line} from 'recharts'
const Line = dynamic<ComponentType<LineProps>>(() => import('recharts').then((mod) => mod.Line as ComponentType<LineProps>));


export default function TransactionsPlot({data}: {data: {name: string, uv: number, pv: number, amt: number}[]}) {
    return (
        <LineChart width={400} height={400} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
    );
}