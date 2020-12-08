import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Loader from "./Loader";

import { gql, useQuery, useMutation } from "@apollo/client";

const REASONS_LIST = gql`
  query GetReasonsList {
    reasonsList(orderBy: createdAt_DESC, filter: { reported: { is_empty: true } }) {
      count
    }
  }
`;

const Percentage = () => {
  const { loading, error, data } = useQuery(REASONS_LIST);

  if (loading)
    return (
      <Section>
        <Wrapper>
          <Center>
            <Loader />
          </Center>
        </Wrapper>
      </Section>
    );

  if (error)
    return (
      <Section>
        <Wrapper>
          <p>Error...</p>
        </Wrapper>
      </Section>
    );

  if (data === undefined)
    return (
      <Section>
        <Wrapper>
          <Loader />
        </Wrapper>
      </Section>
    );

  const outOff = 1000000;
  const value = data.reasonsList.count;
  const result = (value * 100) / outOff;

  return (
    <Section>
      <Wrapper>
        <div>{data.reasonsList.count.toLocaleString()} Reasons</div>
        <div style={{ margin: 20, fontSize: 40 }}>{result}%</div>
        <div>of 1 Million</div>
      </Wrapper>
    </Section>
  );
};

export default Percentage;

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
