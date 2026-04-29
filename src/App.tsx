import "./App.css";
import GlobeComponent from "./components/GlobeComponent";
import { TransactionList } from "./components/TransactionList";
import { useIotaValidators } from "./hooks/useIotaValidators";
import { useIotaTransactions } from "./hooks/useIotaTransactions";
function App() {
  const { data: transactions } = useIotaTransactions();
  const { validators } = useIotaValidators();

  return (
    <div className='flex h-screen font-sans'>
      {" "}
      <TransactionList />
      <GlobeComponent transactions={transactions || []} validators={validators || []} />
    </div>
  );
}

export default App;
