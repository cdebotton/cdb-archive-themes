import React, { ReactNode, MouseEventHandler } from 'react';
import styled from 'styled-components/macro';
import { padding, rem } from 'polished';

type Props = {
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler;
};

export function Button(props: Props) {
  return (
    <ButtonComponent
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
      className={props.className}
    >
      {props.children}
    </ButtonComponent>
  );
}

const ButtonComponent = styled.button`
  ${padding(rem(8))};
  cursor: pointer;
  border-radius: 3px;
  background-color: hsla(212, 50%, 50%, 1);
  color: hsla(212, 50%, 100%, 1);
  border: none;

  &[disabled] {
    opacity: 0.25;
    cursor: default;
  }
`;
