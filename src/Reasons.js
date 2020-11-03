import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { gql, useQuery } from "@apollo/client";

const REASONS_LIST = gql`
  query GetReasonsList {
    reasonsList {
      items {
        country
        id
        initials
        reason
      }
    }
  }
`;

const ReasonsList = () => {
  const messageRef = useRef();
  const { loading, error, data } = useQuery(REASONS_LIST);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
    }
    return;
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Section>
      <Wrapper ref={messageRef}>
        {data.reasonsList.items.map((item, key) => {
          const seed = Math.floor(
            Math.abs(Math.sin(key + 1) * 16777215) % 16777215
          ).toString(16);
          return (
            <Box key={key} style={{ border: `4px solid #${seed}` }}>
              <ReasonText>{item.reason}</ReasonText>
              <ReasonInfo>
                <p>{item.initials}</p>
                <p>{item.country}</p>
              </ReasonInfo>
            </Box>
          );
        })}
        <p>{data.reasonsList.items.length} Reasons</p>
      </Wrapper>
    </Section>
  );
};

const Reasons = () => {
  return <ReasonsList />;
};

export default Reasons;

const Section = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  max-width: 400px;
  padding-top: 120px;
  @media only screen and (max-width: 600px) {
    padding-top: 150px;
  }

  width: 100%;
  flex-direction: column;
`;

const Box = styled.div`
  padding: 10px 30px;
  border-radius: 20px;
  margin-bottom: 40px;
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
