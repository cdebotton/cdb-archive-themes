/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateUserArgs } from "./../../../../../__generated__/globalTypes";

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
  data: UpdateUserArgs;
}
