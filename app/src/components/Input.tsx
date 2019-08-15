import React, { useEffect, useCallback, ChangeEventHandler } from 'react';
import { useField } from 'formik';
import styled from 'styled-components/macro';
import { useSpring, animated } from 'react-spring';
import { modularScale, rem, padding } from 'polished';

type Props = {
  className?: string;
  type?: string;
  label?: string;
  name: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export function Input({
  className,
  type,
  disabled,
  name,
  label,
  onChange,
}: Props) {
  const [field, meta] = useField(name);

  const getLabelOffset = useCallback(() => (field.value === '' ? 50 : 0), [
    field,
  ]);
  const getLabelOpacity = useCallback(() => (field.value === '' ? 0 : 1), [
    field,
  ]);

  const [{ opacity, y }, set] = useSpring(() => {
    return {
      y: getLabelOffset(),
      opacity: getLabelOpacity(),
    };
  });

  useEffect(() => {
    set({
      y: getLabelOffset(),
      opacity: getLabelOpacity(),
    });
  }, [getLabelOffset, getLabelOpacity, set]);

  return (
    <Container className={className}>
      {label && (
        <InputLabel
          htmlFor={name}
          style={{
            opacity,
            transform: y.to(y => `translate3d(0, ${y}%, 0)`),
          }}
        >
          {label}
        </InputLabel>
      )}
      <InputText
        id={name}
        placeholder={label}
        disabled={disabled}
        type={type}
        name={name}
        {...field}
        onChange={event => {
          field.onChange(event);
          if (onChange) {
            onChange(event);
          }
        }}
      />
      {meta.touched && meta.error && <span>{meta.error}</span>}
    </Container>
  );
}

const Container = styled.span`
  position: relative;
  display: inline-grid;
`;

const InputLabel = styled(animated.label)`
  position: relative;
  left: ${rem(2)};
  font-weight: 800;
  font-size: ${modularScale(-2)};
  text-transform: uppercase;
  cursor: pointer;
  ${padding(rem(4), 0)};
`;

const InputText = styled.input`
  ${padding(rem(8))}
  border-radius: 3px;
  border: 1px solid #ccc;

  &:focus {
    outline: none;
  }

  &[disabled] {
    color: #ccc;
    border-color: #eee;
  }
`;
