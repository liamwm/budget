'use client'


import useSWR from 'swr';


const fetcher = (url: string) => fetch(url).then((res) => res.json())


export default function TransactionList() {
    const { data, error } = useSWR('/api/transactions', fetcher)
    const transactions = data;
 
    if (error) return <div>Failed to load</div>
    if (!transactions) return <div>Loading...</div>

    const transactionsMarkup = transactions.map((transaction: TransactionData) => {
      return (
        <li key={transaction.id}>
          <div>{transaction.merchant}</div>
          <div>{transaction.amount}</div>
          <div>{transaction.timestamp}</div>
        </li>
      )
    });
   
    return (
      <ul className="flex-1 overflow-y-auto bg-red-50"> {transactionsMarkup}</ul>
    )
}