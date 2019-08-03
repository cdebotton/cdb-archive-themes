import React, { useEffect } from 'react';
import { Formik, useField } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
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
    login(email: $email, password: $password) {
      id
      email
      profile {
        firstName
        lastName
      }
    }
  }
`;

export default function Admin() {
  const [mutate, result] = useMutation<Login, LoginVariables>(LOGIN_MUTATION);

  async function handleSubmit({ email, password }: Values) {
    mutate({
      variables: { email, password },
    });
  }

  useEffect(() => {
    if (result.called && result.data) {
      console.log(result.data.login.email);
    }
  }, [result]);

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
