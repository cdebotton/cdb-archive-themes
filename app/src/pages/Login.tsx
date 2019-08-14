import React, { useRef, useEffect } from 'react';
import { Formik } from 'formik';
import gql from 'graphql-tag';
import cookie from 'cookie';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import { Heading } from '../components/Heading';
import { Page } from '../components/Page';
import { Input } from '../components/Input';
import { useRouter } from '../hooks/useRouter';

import * as ApolloTypes from './__generated__/Login';

type Values = {
  email: string;
  password: string;
};

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export default function Admin() {
  const [login, loginResult] = useMutation<
    ApolloTypes.Login,
    ApolloTypes.LoginVariables
  >(LOGIN_MUTATION);

  const client = useApolloClient();
  const router = useRouter();

  const initialValues = useRef({ email: '', password: '' });

  function onSubmit({ email, password }: Values) {
    login({ variables: { email, password } });
  }

  useEffect(() => {
    if (loginResult.called && loginResult.data) {
      const { login } = loginResult.data;

      document.cookie = cookie.serialize('token', login, {
        maxAge: 60 * 60 * 24 * 14,
        secure: process.env.NODE_ENV === 'production',
      });

      client.resetStore().then(() => {
        router.history.push('/admin');
      });
    }
  }, [loginResult, client, router]);

  return (
    <Page>
      <Heading scale={4}>Login</Heading>
      <Formik<Values> initialValues={initialValues.current} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Input type="email" name="email" />
            <Input type="password" name="password" />
            <button type="submit">Login</button>
          </form>
        )}
      </Formik>
    </Page>
  );
}
