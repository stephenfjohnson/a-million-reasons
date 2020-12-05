import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Virtuoso } from "react-virtuoso";

import { gql, useQuery, useMutation } from "@apollo/client";

const FlagSVG = (props) => {
  return (
    <svg fill="#FFF" width="10px" height="10px" viewBox="0 0 100 100" {...props}>
      <path d="M38.844 7.023c-7.055.196-14.051 2.266-20.438 6.313A3.062 3.062 0 0017 15.867v74.125a3 3 0 006 0V53.68c3.726-2.168 16.023-8.117 30.812-1.719 8.832 3.82 15.555 4.598 20.188 4.344 4.633-.254 7.469-1.75 7.469-1.75a3.062 3.062 0 001.53-2.594V15.836a3.05 3.05 0 00-1.46-2.597 3.048 3.048 0 00-2.977-.059s-1.203.758-4.843.938c-3.641.18-9.41-.399-17.562-3.813a42.133 42.133 0 00-14.281-3.25 41.286 41.286 0 00-3.032-.031zm.375 5.938c.793-.02 1.582-.008 2.375.031 4.117.207 8.246 1.168 12.25 2.844 8.863 3.71 15.582 4.508 20.188 4.281 1.258-.062 2-.312 2.969-.5v30.22c-.762.194-1.719.41-3.313.5-3.636.198-9.402-.372-17.5-3.876-14.242-6.164-26.723-2.36-33.188.594V17.617c5.16-2.965 10.664-4.523 16.22-4.656z" />
    </svg>
  );
};

// const REASONS_LIST = gql`
//   query GetReasonsList {
//     reasonsList(orderBy: createdAt_DESC) {
//       count
//       items {
//         country
//         id
//         initials
//         reason
//         reported
//       }
//     }
//   }
// `;

const REASONS_LIST = gql`
  query GetReasonsList($skip: Int, $first: Int) {
    reasonsList(
      skip: $skip
      first: $first
      orderBy: createdAt_DESC
      filter: { reported: { is_empty: true } }
    ) {
      count
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
  const [pressedReason, setPressedReason] = useState(null);
  const { loading, error, data, refetch, fetchMore } = useQuery(REASONS_LIST, {
    variables: {
      skip: 0,
      first: 4000
    }
  });

  const [updateReason] = useMutation(REASON_UPDATE, {
    refetchQueries: ["GetReasonsList"]
  });

  const onFlag = (id) => {
    console.log(id);
    updateReason({
      variables: {
        id: id,
        reported: true
      }
    });
  };

  // const onFetchMore = () => {
  //   // const offset = data && data.reasonsList.items ? data.reasonsList.items.length : 0;
  //   console.log(data.reasonsList.items.length);

  //   refetch({
  //     variables: {
  //       first: data.reasonsList.items.length + 10
  //     }
  //   });
  //   // fetchMore({
  //   //   variables: {
  //   //     // skip: data && data.reasonsList.items ? data.reasonsList.items.length : 0
  //   //     first: data.reasonsList.items.length + 10
  //   //   }
  //   // });
  // };

  // const isPageBottom = usePageBottom();

  // useEffect(() => {
  //   // if no data or user hasn't scroll to the bottom, don't get more data
  //   // if (!isPageBottom || !data) return;
  //   // otherwise, get more posts
  //   console.log(`Fetching More Posts`);
  //   // onFetchMore();
  //   setFirstItems(firstItems + 10);
  //   console.log(firstItems);

  //   // refetch();

  //   // fetchMore({
  //   //   variables: {
  //   //     // skip: data && data.reasonsList.items ? data.reasonsList.items.length : 0,
  //   //     // skip: data && data.reasonsList.items ? data.reasonsList.items.length : 0,
  //   //     skip: 50,
  //   //     // first: firstItems
  //   //     first: 50
  //   //   }
  //   // });
  // }, []);

  // useEffect(() => {
  // if (messageRef.current) {
  //   messageRef.current.scrollIntoView({
  //     behavior: "smooth",
  //     block: "end",
  //     inline: "nearest"
  //   });
  // }
  // return;
  // }, [data]);

  if (loading)
    return (
      <Section>
        <Wrapper>
          <Center>
            <p>Loading Reasons...</p>
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

  const items = data.reasonsList.items;

  // console.log(data.reasonsList.items);
  // console.log(data.reasonsList.items.length);

  const ListContainer = ({ listRef, children, className, style }) => (
    <div ref={listRef} className={className} style={{ ...style, marginTop: "150px" }}>
      {children}
    </div>
  );

  return (
    <Section>
      <Wrapper>
        <Virtuoso
          ListContainer={ListContainer}
          overscan={400}
          style={{ width: "100%", height: "100%", paddingTop: "50px" }}
          totalCount={data.reasonsList.items.length}
          item={(index) => {
            const seed = Math.floor(Math.abs(Math.sin(index + 1) * 16777215) % 16777215).toString(
              16
            );

            return (
              <Box
                key={index}
                style={{ border: `4px solid #${seed}` }}
                onClick={() => setPressedReason(items[index].id)}
              >
                <Flag
                  onClick={() => onFlag(items[index].item.id)}
                  style={{ display: pressedReason === items[index].id ? "flex" : "none" }}
                >
                  <FlagSVG />
                  <p>report</p>
                </Flag>
                <ReasonText>{items[index].reason}</ReasonText>
                <ReasonInfo>
                  <p>{items[index].initials}</p>
                  <p>{items[index].country}</p>
                </ReasonInfo>
              </Box>
            );
          }}
          // footer={() => (
          //   <div style={{ padding: "1rem", textAlign: "center" }}>-- end reached --</div>
          // )}
        />
      </Wrapper>
      <Count>
        <div>{data.reasonsList.count} Reasons</div>
      </Count>
    </Section>
  );
};

const Center = styled.div`
  justify-content: center;
  align-items: center;
`;

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
  display: absolute;
  max-width: 400px;
  top: 0;
  left: 0;
  /* margin-top: 120px; */
  /* background: red; */
  /* margin-top: 50px; */
  height: 100vh;
  @media only screen and (max-width: 600px) {
    /* margin-top: 150px; */
  }

  width: 100%;
  flex-direction: column;
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
