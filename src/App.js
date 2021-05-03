import React, { useContext, useEffect } from "react";
import "./styles.css";
import Form from "./Form";
import Reasons from "./Reasons";
import Search from "./Search";
import About from "./About";
import styled from "styled-components";
import Percentage from "./Percentage";
import Hotline from "./Hotline";
import Random from "./Random";
import Shared from "./Shared";
import { ModalContext } from "./ModalContext";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  const { handleModal } = useContext(ModalContext);

  return (
    <div className="App">
      <Router>
        <Header>
          <div className="header">
            <h1>A Million Reasons To Stay Alive</h1>
            <p>
              Made By{" "}
              <a href="https://www.youtube.com/channel/UCr-vFpHCOglpHgJLQlvE_pQ">Karlynn King</a>
            </p>
            <Nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/search">Search</Link>
                </li>
                <li>
                  <Link to="/random">Random</Link>
                </li>
                {/* <li>
                  <Link to="/about">About</Link>
                </li> */}
                {/* <li>
                  <Link to="/percentage">Percentage</Link>
                </li> */}
                <li>
                  <Link to="/hotline">Hotline</Link>
                </li>
              </ul>
            </Nav>
          </div>
          <div className="spacer" />
        </Header>

        <Switch>
          <Route exact path="/">
            <Reasons />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/random">
            <Random />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/percentage">
            <Percentage />
          </Route>
          <Route path="/hotline">
            <Hotline />
          </Route>
          <Route path="/:id" children={<Shared />} />
        </Switch>
        <Button onClick={() => handleModal(<Form />)}>What's your Reason?</Button>
      </Router>
    </div>
  );
};

export default App;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  ul {
    display: flex;
    list-style: none;
    li {
      padding: 0 10px;
    }
    a {
      color: white;
      font-size: 11px;
    }
  }
`;

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
  .header {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0%;
    width: 100%;
    padding: 20px 20px;
    box-sizing: border-box;
    border-bottom: 1px solid grey;
    -webkit-backdrop-filter: saturate(180%) blur(5px);
    backdrop-filter: saturate(180%) blur(5px);
    h1 {
      font-weight: bold;
      font-size: 30px;
      text-transform: uppercase;
      text-align: center;
      margin: 0 0 4px 0;
      background-image: -webkit-gradient(
        linear,
        left top,
        right top,
        from(#e84393),
        color-stop(38%, #f28874),
        color-stop(71%, #fcd65a),
        to(#fff)
      );
      background-image: linear-gradient(90deg, #e84393, #f28874 38%, #fcd65a 71%, #fff);
      font-weight: 900;
      text-align: center;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p {
      text-align: center;
      margin: 0;
      font-size: 10px;
      a {
        color: #e38b7a;
      }
    }
  }
  .spacer {
    /* height: 200px; */
  }
`;
