/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser {
  __typename: "User";
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  updatedAt: any;
}

export interface UpdateUser {
  updateUser: UpdateUser_updateUser;
}

export interface UpdateUserVariables {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  password?: string | null;
  repeatPassword?: string | null;
}
