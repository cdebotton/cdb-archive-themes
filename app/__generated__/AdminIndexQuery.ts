/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminIndexQuery
// ====================================================

export interface AdminIndexQuery_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

export interface AdminIndexQuery_users {
  __typename: "User";
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

export interface AdminIndexQuery {
  user: AdminIndexQuery_user;
  users: AdminIndexQuery_users[];
}

export interface AdminIndexQueryVariables {
  id?: string | null;
}
