/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MediaDetails
// ====================================================

export interface MediaDetails_author {
  __typename: "User";
  id: string;
  email: string;
}

export interface MediaDetails {
  __typename: "SignedMedia";
  id: string;
  url: string;
  author: MediaDetails_author;
}
