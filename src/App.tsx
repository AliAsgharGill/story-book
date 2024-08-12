import styled from "styled-components";
import "./App.css";
import SpaceBetween from "./components/SpaceBetween";
import { Button } from "antd/es/radio";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: red;
  margin:10px;
  border-radius:20px;
  padding:20px;
`;

function App() {
  return (  
    <>
      <Wrapper>
        <SpaceBetween direction="vertical" justify="end">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </SpaceBetween>
      </Wrapper>
    </>
  );
}

export default App;
