import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const About = () => {
  return (
    <Section>
      <Wrapper>
        <h2>Talk to Someone Now</h2>
        <p>USA Suicide Prevention Lifeline</p>
        <a style={{ color: "lightgrey" }} href="tel:8002738255">
          800-273-8255
        </a>
        <hr style={{ width: "100%" }} />
        <p>Canada Suicide Prevention Service</p>
        <a style={{ color: "lightgrey" }} href="tel:8334564566">
          833-456-4566
        </a>
        <hr style={{ width: "100%" }} />
        <p>UK Samaritans Suicide Hotline</p>
        <a style={{ color: "lightgrey" }} href="tel:116123">
          116 123
        </a>
        <hr style={{ width: "100%" }} />
        <a
          style={{ paddingTop: 20, fontSize: 20, color: "lightgrey" }}
          href="https://www.opencounseling.com/suicide-hotlines"
        >
          Find Yours
        </a>
      </Wrapper>
    </Section>
  );
};

export default About;

const Center = styled.div`
  justify-content: center;
  align-items: center;
`;

const Section = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 10px;
  max-width: 400px;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Count = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  color: white;
  z-index: 10;
  background: black;
  border-top-right-radius: 10px;
  padding: 5px;
`;

const BoxWrapper = styled.div`
  padding-bottom: 40px;
`;

const Box = styled.div`
  padding: 10px 30px;
  border-radius: 20px;
  position: relative;
  -webkit-box-shadow: 0px 16px 22px -5px #000000;
  box-shadow: 0px 16px 22px -5px #000000;
`;

const ReasonText = styled.p`
  font-size: 14px;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
`;

const ReasonInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
  font-weight: bold;
`;

const Flag = styled.button`
  border: none;
  background: none;
  top: 10px;
  right: 5px;
  position: absolute;
  flex-direction: row;
  display: none;
  p {
    color: white;
    font-size: 10px;
    line-height: 1;
    margin: 0;
    padding: 0;
  }
  svg {
    margin-right: 4px;
  }
`;

const Form = styled.form`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto;
  grid-column-gap: 20px;
  grid-row-gap: 0px;
  input {
    width: 100%;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    box-sizing: border-box;
    font-size: 16px;
    flex: 2fr;
    background: transparent;
    border: 2px solid white;
    color: white;
  }
`;
