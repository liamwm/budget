import BalancePlot from '../components/balancePlot';
import { getDateBalanceData, getDateDetails } from '../actions';
import TransactionList from '../components/transactionList';
import CreateTransactionForm from '../components/createTransactionForm';



export default async function Page() {

    // return (
    //     <BalancePlot dateBalanceData={await getDateBalanceData('2024-07-01', '2024-10-05')} initialSelectedDateData={await getDateDetails(Date.now())}/>
    // );
    return (
        <div className="flex flex-col w-2/5 h-screen overflow-hidden border-r border-gray-300">
            <TransactionList />
            <CreateTransactionForm />
        </div>
    );
}