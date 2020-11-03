import React, { useContext } from "react";
import "./styles.css";
import Form from "./Form";
import Reasons from "./Reasons";
import styled from "styled-components";
import { ModalContext } from "./ModalContext";

const App = () => {
  const { handleModal } = useContext(ModalContext);

  return (
    <div className="App">
      <Header>
        <h1>A Million Reasons To Stay Alive</h1>
      </Header>

      <Reasons />
      <Button onClick={() => handleModal(<Form />)}>What's your Reason?</Button>
    </div>
  );
};

export default App;

const Button = styled.button`
  border: 3px solid black;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 20px;
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#e84393),
    color-stop(38%, #f28874),
    to(#fcd65a)
  );
  background-image: linear-gradient(90deg, #e84393, #f28874 38%, #fcd65a 71%);
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0%;
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  border-bottom: 1px solid grey;
  -webkit-backdrop-filter: saturate(180%) blur(5px);
  backdrop-filter: saturate(180%) blur(5px);
  h1 {
    font-weight: bold;
    font-size: 30px;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 30px;
    background-image: -webkit-gradient(
      linear,
      left top,
      right top,
      from(#e84393),
      color-stop(38%, #f28874),
      color-stop(71%, #fcd65a),
      to(#fff)
    );
    background-image: linear-gradient(
      90deg,
      #e84393,
      #f28874 38%,
      #fcd65a 71%,
      #fff
    );
    font-weight: 900;
    text-align: center;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  p {
    text-align: center;
  }
`;
