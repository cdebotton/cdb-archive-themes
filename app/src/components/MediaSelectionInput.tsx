import React, { ChangeEvent, useState } from 'react';
import { createPortal } from 'react-dom';
import gql from 'graphql-tag';
import styled from 'styled-components/macro';
import { useField, useFormikContext } from 'formik';

import { usePortal } from '../hooks/usePortal';

import { MediaDetails } from './__generated__/MediaDetails';
import { Button } from './Button';
import { Modal } from './Modal';

type Props = {
  allMedia: MediaDetails[];
  name: string;
  label?: string;
  className?: string;
};

export function MediaSelectionInput<Values extends { [x: string]: unknown }>({
  allMedia,
  className,
  name,
  label = 'Add media',
}: Props) {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext<Values>();

  const [open, setOpen] = useState(false);
  const portal = usePortal();

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

  function handleSelect() {
    setOpen(false);
  }

  function handleReset() {
    setFieldValue(field.name, meta.initialValue);
    setOpen(false);
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>{label}</Button>
      {open &&
        createPortal(
          <Modal onClickOutside={handleReset}>
            <Button type="button" onClick={handleSelect}>
              Select
            </Button>
            <Button type="button" onClick={handleReset}>
              Cancel
            </Button>
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
          </Modal>,
          portal,
        )}
    </>
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
  max-height: 400px;
  overflow: auto;
  border: 1px solid #ccc;
  border-radius: 3px;
  position: relative;
`;
