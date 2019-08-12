import gql from 'graphql-tag';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

import * as ApolloTypes from '../__generated__/Viewer';

const QUERY = gql`
  query Viewer {
    viewer {
      id
      email
    }
  }
`;

export default async function getViewer(
  apolloClient: ApolloClient<NormalizedCacheObject>,
) {
  try {
    const { data } = await apolloClient.query<ApolloTypes.Viewer>({
      query: QUERY,
    });
    return { viewer: data.viewer };
  } catch (err) {
    console.log(err);
    return { viewer: null };
  }
}
