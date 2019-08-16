import React, {
  DragEvent as ReactDragEvent,
  useEffect,
  useReducer,
  useMemo,
} from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components/macro';
import { padding, rem, size, modularScale } from 'polished';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { usePortal } from '../hooks/usePortal';

import { Container, Heading } from './Heading';
import { Modal } from './Modal';
import { Button } from './Button';

import { CreateMedia, CreateMediaVariables } from './__generated__/CreateMedia';

const CREATE_MEDIA_MUTATION = gql`
  mutation CreateMedia($data: CreateMediaArgs!) {
    createMedia(data: $data) {
      id
    }
  }
`;

type Props = {
  onFilesDropped?: (files: FileList) => void;
};

type State = {
  fileList: FileList | null;
};

type SetFileListAction = {
  type: 'SET_FILE_LIST';
  payload: FileList;
};

type ClearFileListAction = {
  type: 'CLEAR_FILE_LIST';
};

type Action = SetFileListAction | ClearFileListAction;

export function FileUpload({ onFilesDropped }: Props) {
  const [createMedia, createMediaCalled] = useMutation<
    CreateMedia,
    CreateMediaVariables
  >(CREATE_MEDIA_MUTATION);

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'SET_FILE_LIST':
        return { ...state, fileList: action.payload };
      case 'CLEAR_FILE_LIST':
        return { ...state, fileList: null };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, { fileList: null });

  useEffect(() => {
    function handleDragOrDrop(event: DragEvent) {
      event.preventDefault();
    }

    window.addEventListener('dragover', handleDragOrDrop);
    window.addEventListener('drop', handleDragOrDrop);

    return () => {
      window.removeEventListener('dragover', handleDragOrDrop);
      window.removeEventListener('drop', handleDragOrDrop);
    };
  }, []);

  function handleDrop(event: ReactDragEvent<HTMLDivElement>) {
    if (!event.dataTransfer.files) {
      return;
    }

    dispatch({ type: 'SET_FILE_LIST', payload: event.dataTransfer.files });

    if (onFilesDropped) {
      onFilesDropped(event.dataTransfer.files);
    }
  }

  const portal = usePortal();
  const files = useMemo(() => {
    if (!state.fileList) {
      return [];
    }

    const files: File[] = [];
    for (const file of state.fileList) {
      files.push(file);
    }

    return files;
  }, [state.fileList]);

  return (
    <DropTarget onDrop={handleDrop}>
      <span css={{ fontSize: modularScale(-1) }}>Drag files</span>
      <FontAwesomeIcon
        css="color: hsla(212, 50%, 50%, 1.0)"
        size="3x"
        icon={faCloudUploadAlt}
      />
      {state.fileList &&
        createPortal(
          <Modal
            onClickOutside={() => void dispatch({ type: 'CLEAR_FILE_LIST' })}
          >
            <Container>
              <Heading>Upload {state.fileList.length} file(s)</Heading>
              {files.map(file => {
                return (
                  <div>
                    <span>
                      {file.name} - {file.size}{' '}
                      <Button
                        type="button"
                        onClick={() =>
                          createMedia({
                            variables: { data: { file, title: file.name } },
                          })
                        }
                      >
                        Upload
                      </Button>
                    </span>
                  </div>
                );
              })}
            </Container>
          </Modal>,
          portal,
        )}
    </DropTarget>
  );
}

const DropTarget = styled.div`
  ${padding(rem(16))};
  ${size(rem(200), rem(200))};
  background: #fafafa;
  grid-gap: ${rem(16)};
  display: grid;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
  position: relative;
  border-radius: 3px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    ${size(`calc(100% - ${rem(16)})`)};
    border: 1px dashed black;
  }
`;
