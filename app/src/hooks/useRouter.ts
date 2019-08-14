import { __RouterContext, RouteComponentProps } from 'react-router-dom';
import { useContext } from 'react';

export function useRouter<P>(): RouteComponentProps<P> {
  return useContext(__RouterContext);
}
