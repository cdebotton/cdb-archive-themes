import { __RouterContext } from 'react-router-dom';
import { useContext } from 'react';

export function useRouter() {
  return useContext(__RouterContext);
}
