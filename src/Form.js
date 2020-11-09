import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";
import { ModalContext } from "./ModalContext";
import Filter from "bad-words";

const filter = new Filter();
filter.addWords("kill", "Kill", "murder", "Murder", "death", "Death");

const REASON_CREATE = gql`
  mutation CreateReason(
    $reason: String!
    $country: String!
    $initials: String!
  ) {
    reasonCreate(
      data: { reason: $reason, country: $country, initials: $initials }
    ) {
      id
      reason
    }
  }
`;

yup.addMethod(yup.string, "profaneCheck", function (errorMessage) {
  return this.test(`test-card-type`, errorMessage, function (value) {
    const { path, createError } = this;
    return (
      !filter.isProfane(value) || createError({ path, message: errorMessage })
    );
  });
});

const schema = yup.object().shape({
  reason: yup
    .string()
    .required()
    .profaneCheck("Please do not include Profanity")
    .required(),
  country: yup
    .string()
    .profaneCheck("Please do not include Profanity")
    .required(),
  initials: yup
    .string()
    .max(4, "Must be less than 4 characters")
    .profaneCheck("Please do not include Profanity")
    .required()
});

const Form = () => {
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schema)
  });
  const [addReason, { loading, error, data }] = useMutation(REASON_CREATE, {
    refetchQueries: ["GetReasonsList"]
  });

  let { handleModal } = useContext(ModalContext);

  const onSubmit = (values) => {
    console.log(values);
    addReason({
      variables: {
        reason: values.reason,
        country: values.country,
        initials: values.initials
      }
    });
    handleModal();
  };

  return (
    <FormStyle onSubmit={handleSubmit(onSubmit)}>
      <p>What is your reason for staying?</p>
      <textarea name="reason" placeholder="Reason" ref={register} />
      {errors.reason && errors.reason.message}

      <p>Country</p>
      <input name="country" placeholder="Your Country" ref={register} />
      {errors.country && errors.country.message}

      <p>Initials</p>
      <input name="initials" placeholder="Your Initails" ref={register} />
      {errors.initials && errors.initials.message}

      <p style={{ fontSize: "12px" }}>
        Your submission is anonymous but it may be so awesome that we will want
        to share it on social media and print materials.
      </p>

      <button type="submit">Submit &#9829;</button>
    </FormStyle>
  );
};

export default Form;

const FormStyle = styled.form`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;
  textarea {
    border-radius: 10px;
    width: 100%;
    height: 10vh;
    box-sizing: border-box;
    padding: 10px 20px;
    font-family: sans-serif;
    font-size: 16px;
  }
  input {
    width: 100%;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    box-sizing: border-box;
    font-size: 16px;
  }
  button {
    border: 1px solid white;
    border-radius: 20px;
    padding: 10px 20px;
    text-transform: uppercase;
    margin-top: 20px;
    background: transparent;
    color: white;
  }
`;
