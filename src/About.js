import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const About = () => {
  return (
    <Section>
      <Wrapper>
        <h2>About A Million Reasons To Stay</h2>
        <p>
          Made By{" "}
          <a style={{ color: "lightgrey" }} href="https://www.tiktok.com/@karlynnbekind">
            KarlynnBeKind
          </a>
        </p>
      </Wrapper>
    </Section>
  );
};

export default About;

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
