import "./App.css";
import GlobeComponent from "./components/GlobeComponent";
import { TransactionList } from "./components/TransactionList";

function App() {
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      {" "}
      <TransactionList />
      <GlobeComponent />
    </div>
  );
}

export default App;
