import React from 'react';
import { Container, Heading } from '../components/Heading';
import withApollo from '../lib/withApollo';

function Login() {
  return (
    <Container>
      <Heading>Login</Heading>
    </Container>
  );
}

export default withApollo(Login);
