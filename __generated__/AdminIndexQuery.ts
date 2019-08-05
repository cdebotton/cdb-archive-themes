/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminIndexQuery
// ====================================================

export interface AdminIndexQuery_user_profile {
  __typename: "Profile";
  firstName: string | null;
  lastName: string | null;
}

export interface AdminIndexQuery_user {
  __typename: "User";
  id: string;
  email: string;
  profile: AdminIndexQuery_user_profile;
}

export interface AdminIndexQuery {
  user: AdminIndexQuery_user;
}

export interface AdminIndexQueryVariables {
  id?: string | null;
  email?: string | null;
}
