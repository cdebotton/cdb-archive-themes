/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: any;
  updatedAt: any;
  lastLogin: any | null;
}

export interface User {
  user: User_user;
}

export interface UserVariables {
  id?: string | null;
}
