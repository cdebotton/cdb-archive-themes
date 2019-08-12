import styled from 'styled-components';
import { padding, rem } from 'polished';

export const Button = styled.button`
  padding: 0;
  border: none;
  background-color: hsl(212, 50%, 50%);
  border-radius: 3px;
  color: #fff;
  ${padding(rem(16))};
  cursor: pointer;
`;
