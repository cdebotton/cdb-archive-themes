import React from 'react';
import { useRouter } from '../hooks/useRouter';
import { Page } from '../components/Page';
import { Heading } from '../components/Heading';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <Page>
      <Heading scale={4}>Page not found</Heading>
      <p>
        The page at <code>{router.location.pathname}</code> could not be found.
      </p>
    </Page>
  );
}
