import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Heading, Container } from '../../../components/Heading';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import * as ApolloTypes from './__generated__/CreateUser';

type Values = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  repeatPassword: string;
};

const schema = yup.object({
  email: yup
    .string()
    .required()
    .email(),
  firstName: yup.string(),
  lastName: yup.string(),
  password: yup
    .string()
    .required()
    .oneOf([yup.ref('repeatPassword')], 'Passwords must match')
    .min(7),
  repeatPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .min(7),
});

const MUTATION = gql`
  mutation CreateUser($data: CreateUserArgs!) {
    createUser(data: $data) {
      id
      email
      firstName
      lastName
      createdAt
      updatedAt
      lastLogin
    }
  }
`;

export default function AdminCreateUser() {
  const [createUser, createUserResult] = useMutation<
    ApolloTypes.CreateUser,
    ApolloTypes.CreateUserVariables
  >(MUTATION);
  function onSubmit(data: Values) {
    createUser({ variables: { data } });
  }

  return (
    <Container>
      <Heading>Create a user</Heading>
      <Formik<Values>
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          repeatPassword: '',
        }}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        {({ handleSubmit, isValid, dirty, handleReset }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Input label="Email" type="text" name="email" />
              <Input label="First name" type="text" name="firstName" />
              <Input label="Last name" type="text" name="lastName" />
              <Input label="Password" type="password" name="password" />
              <Input
                label="Repeat password"
                type="password"
                name="repeatPassword"
              />
              <Button disabled={!dirty || !isValid} type="submit">
                Create
              </Button>
              <Button type="reset" disabled={!dirty} onClick={handleReset}>
                Reset
              </Button>
            </form>
          );
        }}
      </Formik>
    </Container>
  );
}
