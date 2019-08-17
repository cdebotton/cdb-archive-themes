import React, { ChangeEvent } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components/macro';
import { useField, useFormik, useFormikContext } from 'formik';

import { MediaDetails } from './__generated__/MediaDetails';

type Props = {
  allMedia: MediaDetails[];
  name: string;
  className?: string;
};

export function MediaSelectionInput<Values extends { [x: string]: unknown }>({
  allMedia,
  className,
  name,
}: Props) {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext<Values>();

  function handleToggle(id: string) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setFieldValue(name, [...field.value, id]);
      } else {
        setFieldValue(
          name,
          field.value.filter((fieldId: string) => fieldId !== id),
        );
      }
    };
  }

  return (
    <Container>
      {allMedia.map(media => {
        return (
          <div className={className}>
            <input
              checked={field.value.some((f: string) => f === media.id)}
              type="checkbox"
              onChange={handleToggle(media.id)}
            />
            <img
              css="object-fit: contain; width: 100%; height: 100%;"
              key={media.id}
              alt={media.__typename}
              src={media.url}
            />
          </div>
        );
      })}
    </Container>
  );
}

MediaSelectionInput.fragments = {
  media: gql`
    fragment MediaDetails on SignedMedia {
      id
      url
      author {
        id
        email
      }
    }
  `,
};

const Container = styled.div`
  display: grid;
  grid-area: m;
  grid-auto-rows: 200px;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
`;
