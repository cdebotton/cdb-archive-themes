import 'react-router-dom';
import { Context } from 'react';

declare module 'react-router-dom' {
  import { RouteComponentProps } from 'react-router-dom';
  export const __RouterContext: Context<RouteComponentProps>;
}
