import BalancePlot from '../components/balancePlot';
import { getDateBalanceData, getDateDetails } from '../actions';


export default async function Page() {
    return (
        <BalancePlot dateBalanceData={await getDateBalanceData('2024-07-01', '2024-10-05')} initialSelectedDateData={await getDateDetails(Date.now())}/>
    );
}