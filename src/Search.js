import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Virtuoso } from "react-virtuoso";
import { useForm } from "react-hook-form";
import Loader from "./Loader";

import { gql, useLazyQuery, useMutation } from "@apollo/client";

const FlagSVG = (props) => {
  return (
    <svg fill="#FFF" width="10px" height="10px" viewBox="0 0 100 100" {...props}>
      <path d="M38.844 7.023c-7.055.196-14.051 2.266-20.438 6.313A3.062 3.062 0 0017 15.867v74.125a3 3 0 006 0V53.68c3.726-2.168 16.023-8.117 30.812-1.719 8.832 3.82 15.555 4.598 20.188 4.344 4.633-.254 7.469-1.75 7.469-1.75a3.062 3.062 0 001.53-2.594V15.836a3.05 3.05 0 00-1.46-2.597 3.048 3.048 0 00-2.977-.059s-1.203.758-4.843.938c-3.641.18-9.41-.399-17.562-3.813a42.133 42.133 0 00-14.281-3.25 41.286 41.286 0 00-3.032-.031zm.375 5.938c.793-.02 1.582-.008 2.375.031 4.117.207 8.246 1.168 12.25 2.844 8.863 3.71 15.582 4.508 20.188 4.281 1.258-.062 2-.312 2.969-.5v30.22c-.762.194-1.719.41-3.313.5-3.636.198-9.402-.372-17.5-3.876-14.242-6.164-26.723-2.36-33.188.594V17.617c5.16-2.965 10.664-4.523 16.22-4.656z" />
    </svg>
  );
};

const REASONS_LIST = gql`
  query GetReasonsList($skip: Int, $first: Int, $reasonContains: String) {
    reasonsList(
      skip: $skip
      first: $first
      orderBy: createdAt_DESC
      filter: { reported: { is_empty: true }, reason: { contains: $reasonContains } }
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
  const [submitSearch, { called, loading, error, data }] = useLazyQuery(REASONS_LIST, {
    variables: {
      skip: 0,
      first: 4000,
      reasonContains: ""
    }
  });

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    submitSearch({
      variables: {
        skip: 0,
        first: 4000,
        reasonContains: data.search
      }
    });
  };

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

  const SearchForm = () => {
    return (
      <Form style={{ paddingTop: 200 }} onSubmit={handleSubmit(onSubmit)}>
        {/* include validation with required or other standard HTML validation rules */}
        <input name="search" placeholder="Fuzzy Socks" ref={register({ required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" value="Search" />
      </Form>
    );
  };

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
          <SearchForm />
        </Wrapper>
      </Section>
    );

  const items = data.reasonsList.items;

  const ListContainer = ({ listRef, children, className, style }) => (
    <div ref={listRef} className={className} style={{ ...style, paddingTop: "10px" }}>
      {children}
    </div>
  );

  return (
    <Section>
      <Wrapper>
        <SearchForm />
        <Virtuoso
          ListContainer={ListContainer}
          overscan={200}
          style={{ width: "100%", height: "100%", paddingTop: "50px" }}
          totalCount={data.reasonsList.items.length}
          item={(index) => {
            const seed = Math.floor(Math.abs(Math.sin(index + 1) * 16777215) % 16777215).toString(
              16
            );

            return (
              <BoxWrapper>
                <Box
                  key={index}
                  style={{ border: `4px solid #${seed}` }}
                  onClick={() => setPressedReason(items[index].id)}
                >
                  <Flag
                    onClick={() => onFlag(items[index].id)}
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
              </BoxWrapper>
            );
          }}
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

const Search = () => {
  return <ReasonsList />;
};

export default Search;

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
