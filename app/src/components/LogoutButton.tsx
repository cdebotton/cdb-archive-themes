import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import cookie from 'cookie';

import { useRouter } from '../hooks/useRouter';

import { Button } from './Button';

export function LogoutButton() {
  const client = useApolloClient();
  const router = useRouter();

  function handleClick() {
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1,
    });

    client.resetStore().then(() => {
      router.history.push('/login');
    });
  }

  return <Button onClick={handleClick}>Log out</Button>;
}
