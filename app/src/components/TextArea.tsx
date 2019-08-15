import React, { useEffect, useCallback } from 'react';
import { useField } from 'formik';
import styled from 'styled-components/macro';
import { useSpring, animated } from 'react-spring';
import { modularScale, rem, padding } from 'polished';

type Props = {
  className?: string;
  label?: string;
  name: string;
  disabled?: boolean;
};

export function TextArea({ className, disabled, name, label }: Props) {
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
        <TextAreaLabel
          htmlFor={name}
          style={{
            opacity,
            transform: y.to(y => `translate3d(0, ${y}%, 0)`),
          }}
        >
          {label}
        </TextAreaLabel>
      )}
      <TextAreaText
        id={name}
        placeholder={label}
        disabled={disabled}
        name={name}
        {...field}
      />
      {meta.touched && meta.error && <span>{meta.error}</span>}
    </Container>
  );
}

const Container = styled.span`
  position: relative;
  display: inline-grid;
`;

const TextAreaLabel = styled(animated.label)`
  position: relative;
  left: ${rem(2)};
  font-weight: 800;
  font-size: ${modularScale(-2)};
  text-transform: uppercase;
  cursor: pointer;
  ${padding(rem(4), 0)};
`;

const TextAreaText = styled.textarea`
  ${padding(rem(8))}
  border-radius: 3px;
  border: 1px solid #ccc;
  resize: none;

  &:focus {
    outline: none;
  }

  &[disabled] {
    color: #ccc;
    border-color: #eee;
  }
`;
