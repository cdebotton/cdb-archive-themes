import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';

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

  return (
    <span className={className}>
      {label && <label>{label}</label>}
      <input disabled={disabled} type={type} name={name} {...field} />
    </span>
  );
})`
  display: inline-grid;
`;
