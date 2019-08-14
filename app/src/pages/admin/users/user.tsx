import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Formik } from 'formik';
import * as yup from 'yup';
import 'styled-components/macro';
import { rem } from 'polished';

import { Container, Heading } from '../../../components/Heading';
import { useRouter } from '../../../hooks/useRouter';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Loading } from '../../../components/Loading';

import * as MutationTypes from './__generated__/UpdateUser';
import * as ApolloTypes from './__generated__/User';

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
  password: yup
    .string()
    .oneOf([yup.ref('repeatPassword'), ''], 'Passwords must match'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match'),
});

export default function AdminUsersIndex() {
  const { match, history } = useRouter<Params>();

  const { data, error } = useQuery<ApolloTypes.User, ApolloTypes.UserVariables>(
    QUERY,
    { variables: { id: match.params.userId } },
  );

  const [updateUser, updateUserResult] = useMutation<
    MutationTypes.UpdateUser,
    MutationTypes.UpdateUserVariables
  >(UPDATE_USER_MUTATION);

  useEffect(() => {
    if (updateUserResult.called && updateUserResult.data) {
      history.push('/admin/users');
    }
  }, [updateUserResult, history]);

  if (error) {
    throw error;
  }

  if (!data || !data.user) {
    return <Loading />;
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
      <Heading>Edit {data.user.email}</Heading>
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
            <form
              onSubmit={handleSubmit}
              css={{
                display: 'grid',
                grid:
                  "'a b c' min-content 'd e .' min-content '. f g' min-content / 1fr 1fr 1fr ",
                gridGap: rem(16),
              }}
            >
              <Input
                css={{ gridArea: 'a' }}
                label="Email"
                disabled
                type="email"
                name="email"
              />
              <Input
                css={{ gridArea: 'b' }}
                label="First name"
                type="text"
                name="firstName"
              />
              <Input
                css={{ gridArea: 'c' }}
                label="Last name"
                type="text"
                name="lastName"
              />
              <Input
                css={{ gridArea: 'd' }}
                label="Password"
                type="password"
                name="password"
              />
              <Input
                css={{ gridArea: 'e' }}
                label="Repeat Password"
                type="password"
                name="repeatPassword"
              />
              <Button css={{ gridArea: 'f' }} disabled={!isValid} type="submit">
                Save
              </Button>
              <Button css={{ gridArea: 'g' }} type="reset">
                Cancel
              </Button>
            </form>
          );
        }}
      </Formik>
    </Container>
  );
}
