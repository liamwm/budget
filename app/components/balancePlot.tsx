'use client'


import { useState, useEffect } from 'react';
import {LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts';
import { CategoricalChartState } from 'recharts/types/chart/types';
import { getDateBalanceData, getDateDetails } from '../actions';



export default function BalancePlot({dateBalanceData, initialSelectedDateData}: {dateBalanceData: DateBalanceData[], initialSelectedDateData: TransactionData[]}) {
    const [isClient, setIsClient] = useState(false);
    const [selectedDate, setSelectedDate] = useState(Date.now());
    const [selectedDateData, setSelectedDateData] = useState<TransactionData[]>(initialSelectedDateData);

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

    const amountMin = Math.min(...dateBalanceData.map(d => d.amount));
    const amountMax = Math.max(...dateBalanceData.map(d => d.amount));

    const onClick = (state: CategoricalChartState) => {
        if (state.activePayload) {
            const activeDataPoint: DateBalanceData = state.activePayload[0].payload;
            onChangeSelectedDate(activeDataPoint.timestamp);
            //setSelectedDate(activeDataPoint.timestamp);
        }
    }

    const onChangeSelectedDate = (newDate: number) => {
        getDateDetails(newDate).then((newSelectedDateData) => {
            console.log(newSelectedDateData);
            setSelectedDateData(newSelectedDateData);
        }).catch((err) => {
            console.log(err);
        });
    }

    let chart = <LineChart width={1000} height={500} data={dateBalanceData} onClick={onClick}>
            <XAxis type="number" dataKey="timestamp" domain={['dataMin', 'dataMax']} tickFormatter={formatDateTick}/>
            <YAxis type="number" dataKey="amount" domain={[amountMin-10, amountMax+10]} />
            <Line type="linear" dataKey="amount" stroke="#82ca9d"/>
            <Tooltip labelFormatter={formatDateLabel}/>
    </LineChart>

    const chartContent = isClient ? chart : null;
    return (
        <div>
            {chartContent}
            <h3>{formatDateLabel(selectedDate)}</h3>
            <ul>
                {selectedDateData.map((transaction) => {
                    return <li key={transaction.id}>{transaction.amount} {transaction.merchant}</li>
                })}
            </ul>
        </div>
    );
}