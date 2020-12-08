import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <LoadWrap>
      <span></span>
      <span></span>
      <span></span>
    </LoadWrap>
  );
};

export default Loader;

const LoadWrap = styled.div`
  display: inline-block;
  font-size: 0px;
  padding: 0px;

  span {
    vertical-align: middle;
    border-radius: 100%;
    background: white;
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 3px 2px;
    -webkit-animation: preloader5 0.8s linear infinite alternate;
    animation: preloader5 0.8s linear infinite alternate;
  }
  span:nth-child(1) {
    -webkit-animation-delay: -0.8;
    animation-delay: -0.8s;
  }
  span:nth-child(2) {
    -webkit-animation-delay: -0.53333s;
    animation-delay: -0.53333s;
  }
  span:nth-child(3) {
    -webkit-animation-delay: -0.26666s;
    animation-delay: -0.26666s;
  }
  @keyframes preloader5 {
    from {
      transform: scale(0, 0);
    }
    to {
      transform: scale(1, 1);
    }
  }
  @-webkit-keyframes preloader5 {
    from {
      -webkit-transform: scale(0, 0);
    }
    to {
      -webkit-transform: scale(1, 1);
    }
  }
`;
