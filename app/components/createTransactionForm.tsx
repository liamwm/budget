'use client'



export default function CreateTransactionForm() {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const transaction = {
            amount: data.amount,
            merchant: data.merchant,
            description: data.description,
            trans_date: data.date
        }

        console.log(transaction);

        const response = await fetch('/api/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction),
        });

        if (response.ok) {
            console.log('Transaction created successfully');
        } else {
            console.error('Error creating transaction');
        }
    };

    return (
        <form className="flex-shrink-0 p-4 border-t border-gray-300 bg-white" onSubmit={handleSubmit}>
            <input type="number" name="amount" placeholder="Amount" required />
            <input type="text" name="merchant" placeholder="Merchant" required />
            <input type="text" name="description" placeholder="Description" required />
            <input type="date" name="date" placeholder="Date" required />
            <button type="submit">Create Transaction</button>
        </form>
    );
}