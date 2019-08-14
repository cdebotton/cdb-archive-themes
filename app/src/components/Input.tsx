import React, { useEffect, useCallback } from 'react';
import { useField } from 'formik';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { modularScale, rem } from 'polished';

type Props = {
  className?: string;
  type?: string;
  label?: string;
  name: string;
  disabled?: boolean;
};

export const Input = styled(function Input<Values = {}>({
  className,
  type,
  disabled,
  name,
  label,
}: Props) {
  const [field] = useField<Values>(name);

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
    <span className={className}>
      {label && (
        <InputLabel
          style={{
            opacity,
            transform: y.to(y => `translate3d(0, ${y}%, 0)`),
          }}
        >
          {label}
        </InputLabel>
      )}
      <InputText
        placeholder={label}
        disabled={disabled}
        type={type}
        name={name}
        {...field}
      />
    </span>
  );
})`
  position: relative;
  display: inline-grid;
`;

const InputLabel = styled(animated.label)`
  position: relative;
  pointer-events: none;
  left: ${rem(2)};
  font-weight: 800;
  font-size: ${modularScale(-2)};
  text-transform: uppercase;
`;

const InputText = styled.input`
  &:focus {
    outline: none;
  }
`;
