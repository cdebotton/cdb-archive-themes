import React, { useEffect } from 'react';
import { Formik, useField } from 'formik';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import cookie from 'cookie';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';

import { redirect } from '../../libs/redirect';

import { Login, LoginVariables } from './__generated__/Login';

type Values = { email: string; password: string };

type FieldProps = {
  type: string;
  name: keyof Values;
};

function TextField({ type, name }: FieldProps) {
  const [field] = useField<Values>(name);
  return <input type={type} name={name} {...field} />;
}

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export default function LoginPage() {
  const [mutate, result] = useMutation<Login, LoginVariables>(LOGIN_MUTATION);

  async function handleSubmit({ email, password }: Values) {
    mutate({
      variables: { email, password },
    });
  }

  const client = useApolloClient();
  const router = useRouter();

  useEffect(() => {
    if (result.called && result.data) {
      document.cookie = cookie.serialize('token', result.data.login, {
        maxAge: 30 * 24 * 60 * 60,
      });

      client.cache.reset().then(() => {
        let { from } = router.query;

        if (Array.isArray(from)) {
          from = from[0];
        }

        redirect({}, from || '/admin');
      });
    }
  }, [result, client, router]);

  return (
    <div>
      <h1>Admin</h1>
      <Formik<Values>
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextField name="email" type="text" />
            <TextField name="password" type="password" />
            <button type="submit">Login</button>
          </form>
        )}
      </Formik>
    </div>
  );
}
