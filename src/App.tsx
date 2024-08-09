import "./App.css";
import ModalComponent from "./components/Modal";
import SchedulePicker from "./components/SchedulePicker";
import TimezonePicker from "./components/TimezonePicker";
function App() {
  return (
    <>
      <h1>Hello</h1>
      <ModalComponent
        content={["Saim contents...", "Some contents...", "Some contents..."]}
        title="Basic Modal"
        buttonText="Open My Modal"
      />
      <TimezonePicker />
      <SchedulePicker isValid={} />
    </>
  );
}

export default App;
