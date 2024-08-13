import styled from "styled-components";
import "./App.css";
import SchedulePicker from "./components/SchedulePicker";

const Wrapper = styled.div`
  display: flex;
  background-color: red;
  margin: 10px;
  border-radius: 20px;
  padding: 20px;
`;

function App() {
  return (
    <>
      <Wrapper>
      <SchedulePicker timeZones={['1','2','3']} />

      </Wrapper>
    </>
  );
}

export default App;
