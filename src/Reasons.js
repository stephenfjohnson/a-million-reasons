import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { gql, useQuery, useMutation } from "@apollo/client";

const FlagSVG = (props) => {
  return (
    <svg fill="#FFF" width="10px" height="10px" viewBox="0 0 100 100" {...props}>
      <path d="M38.844 7.023c-7.055.196-14.051 2.266-20.438 6.313A3.062 3.062 0 0017 15.867v74.125a3 3 0 006 0V53.68c3.726-2.168 16.023-8.117 30.812-1.719 8.832 3.82 15.555 4.598 20.188 4.344 4.633-.254 7.469-1.75 7.469-1.75a3.062 3.062 0 001.53-2.594V15.836a3.05 3.05 0 00-1.46-2.597 3.048 3.048 0 00-2.977-.059s-1.203.758-4.843.938c-3.641.18-9.41-.399-17.562-3.813a42.133 42.133 0 00-14.281-3.25 41.286 41.286 0 00-3.032-.031zm.375 5.938c.793-.02 1.582-.008 2.375.031 4.117.207 8.246 1.168 12.25 2.844 8.863 3.71 15.582 4.508 20.188 4.281 1.258-.062 2-.312 2.969-.5v30.22c-.762.194-1.719.41-3.313.5-3.636.198-9.402-.372-17.5-3.876-14.242-6.164-26.723-2.36-33.188.594V17.617c5.16-2.965 10.664-4.523 16.22-4.656z" />
    </svg>
  );
};

const REASONS_LIST = gql`
  query GetReasonsList {
    reasonsList {
      items {
        country
        id
        initials
        reason
        reported
      }
    }
  }
`;

const REASON_UPDATE = gql`
  mutation ReasonUpdate($id: ID!, $reported: Boolean!) {
    reasonUpdate(data: { id: $id, reported: $reported }) {
      id
      reported
    }
  }
`;

const ReasonsList = () => {
  const messageRef = useRef();
  const { loading, error, data } = useQuery(REASONS_LIST);
  const [updateReason] = useMutation(REASON_UPDATE, {
    refetchQueries: ["GetReasonsList"]
  });

  const [pressedReason, setPressedReason] = useState(null);

  const onFlag = (id) => {
    console.log(id);
    updateReason({
      variables: {
        id: id,
        reported: true
      }
    });
  };

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
          if (item.reported) {
            return null;
          }

          const seed = Math.floor(Math.abs(Math.sin(key + 1) * 16777215) % 16777215).toString(16);
          return (
            <Box
              key={key}
              style={{ border: `4px solid #${seed}` }}
              onClick={() => setPressedReason(item.id)}
            >
              <Flag
                onClick={() => onFlag(item.id)}
                style={{ display: pressedReason === item.id ? "flex" : "none" }}
              >
                <FlagSVG />
                <p>report</p>
              </Flag>
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
