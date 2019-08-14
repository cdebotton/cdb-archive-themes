import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Formik } from 'formik';
import * as yup from 'yup';

import { Container, Heading } from '../components/Heading';
import { useRouter } from '../hooks/useRouter';
import { Input } from '../components/Input';

import * as ApolloTypes from './__generated__/User';
import * as MutationTypes from './__generated__/UpdateUser';

const QUERY = gql`
  query User($id: String) {
    user(id: $id) {
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

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $id: ID!
    $email: String!
    $firstName: String
    $lastName: String
    $password: String
    $repeatPassword: String
  ) {
    updateUser(
      id: $id
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      repeatPassword: $repeatPassword
    ) {
      id
      email
      firstName
      lastName
      updatedAt
    }
  }
`;

type Params = { userId: string };

type Values = {
  email: string;
  firstName: string | null;
  lastName: string | null;
  password: string | null;
  repeatPassword: string | null;
};

const schema = yup.object({
  email: yup.string().required(),
  firstName: yup.string(),
  lastName: yup.string(),
  password: yup.string(),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match'),
});

export default function AdminUsersIndex() {
  const { match } = useRouter<Params>();

  const { data, error, loading } = useQuery<
    ApolloTypes.User,
    ApolloTypes.UserVariables
  >(QUERY, { variables: { id: match.params.userId } });

  const [updateUser, updateUserResult] = useMutation<
    MutationTypes.UpdateUser,
    MutationTypes.UpdateUserVariables
  >(UPDATE_USER_MUTATION);

  if (!data || !data.user) {
    return <>Loading...</>;
  }

  function onSubmit(values: Values) {
    if (!(data && data.user)) {
      return;
    }

    updateUser({
      variables: { id: data.user.id, ...values },
    });
  }

  return (
    <Container>
      <Heading scale={2}>Edit {data.user.email}</Heading>
      <Formik<Values>
        initialValues={{
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          password: '',
          repeatPassword: '',
        }}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, isValid }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Input label="Email" disabled type="email" name="email" />
              <Input label="First name" type="text" name="firstName" />
              <Input label="Last name" type="text" name="lastName" />
              <Input label="Password" type="password" name="password" />
              <Input
                label="Repeat Password"
                type="password"
                name="repeatPassword"
              />
              <button disabled={!isValid} type="submit">
                Save
              </button>
              <button type="reset">Cancel</button>
            </form>
          );
        }}
      </Formik>
    </Container>
  );
}
