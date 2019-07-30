import React from 'react';
import fetch from 'isomorphic-unfetch';

import { Text } from '../../components/Text';

type Gallery = {
  uri: string;
  title: string;
};

type Props = {
  gallery: Gallery;
};

export default function GalleryPage({ gallery }: Props) {
  return (
    <>
      <Text as="h2" scale={4}>
        {gallery.title}
      </Text>
    </>
  );
}

GalleryPage.getInitialProps = async function getInitialProps({ req, query }) {
  const gallery = await fetch(
    `http://${req.headers.host}/api/galleries/${query.gid}`,
  ).then(res => res.json());

  return { gallery };
};
