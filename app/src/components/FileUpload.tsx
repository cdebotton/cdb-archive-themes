import React, {
  DragEvent as ReactDragEvent,
  useEffect,
  useReducer,
  ChangeEvent,
} from 'react';
import { useMutation } from '@apollo/react-hooks';
import { createPortal } from 'react-dom';
import styled from 'styled-components/macro';
import { padding, rem, size, modularScale, position } from 'polished';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import gql from 'graphql-tag';

import { usePortal } from '../hooks/usePortal';

import { Container, Heading } from './Heading';
import { Modal } from './Modal';

import { CreateMedia, CreateMediaVariables } from './__generated__/CreateMedia';

const CREATE_MEDIA_MUTATION = gql`
  mutation CreateMedia($data: CreateMediaArgs!) {
    createMedia(data: $data) {
      id
    }
  }
`;

type Props = {
  onFilesDropped?: (files: File[]) => void;
};

type State = {
  files: File[] | null;
};

type SetFilesAction = {
  type: 'SET_FILES';
  payload: File[];
};

type ClearFilesAction = {
  type: 'CLEAR_FILES';
};

type RemoveFileAction = {
  type: 'REMOVE_FILE';
  payload: File;
};

type Action = SetFilesAction | ClearFilesAction | RemoveFileAction;

export function FileUpload({ onFilesDropped }: Props) {
  const [createMedia] = useMutation<CreateMedia, CreateMediaVariables>(
    CREATE_MEDIA_MUTATION,
  );

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'SET_FILES':
        return { ...state, files: action.payload };
      case 'CLEAR_FILES':
        return { ...state, files: null };
      case 'REMOVE_FILE': {
        if (!state.files) {
          return state;
        }

        const files = state.files.filter(file => file !== action.payload);

        if (files.length === 0) {
          return { ...state, files: null };
        }

        return {
          ...state,
          files,
        };
      }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, { files: null });

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

  function uploadFiles(fileList: FileList) {
    const files: File[] = [];
    for (const file of fileList) {
      files.push(file);
    }

    dispatch({ type: 'SET_FILES', payload: files });

    files.forEach(async file => {
      await createMedia({ variables: { data: { file, title: file.name } } });
      dispatch({ type: 'REMOVE_FILE', payload: file });
    });

    if (onFilesDropped) {
      onFilesDropped(files);
    }
  }

  function handleDrop(event: ReactDragEvent<HTMLDivElement>) {
    if (!event.dataTransfer.files) {
      return;
    }

    uploadFiles(event.dataTransfer.files);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    uploadFiles(event.target.files);
  }

  const portal = usePortal();

  return (
    <DropTarget onDrop={handleDrop}>
      <HiddenInputFile type="file" onChange={handleInputChange} />
      <span css={{ fontSize: modularScale(-1) }}>Drag files</span>
      <FontAwesomeIcon
        css="color: hsla(212, 50%, 50%, 1.0)"
        size="3x"
        icon={faCloudUploadAlt}
      />
      {state.files &&
        createPortal(
          <Modal onClickOutside={() => void dispatch({ type: 'CLEAR_FILES' })}>
            <Container>
              <Heading>Upload {state.files.length} file(s)</Heading>
              {state.files.map(file => {
                return (
                  <div>
                    {file.name} - {file.size}{' '}
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

const HiddenInputFile = styled.input`
  ${position('absolute', 0, 0)};
  ${size('100%')};
  opacity: 0;
  cursor: pointer;
`;
