/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateUserArgs } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUser
// ====================================================

export interface CreateUser_createUser {
  __typename: "User";
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: any;
  updatedAt: any;
  lastLogin: any | null;
}

export interface CreateUser {
  createUser: CreateUser_createUser;
}

export interface CreateUserVariables {
  data: CreateUserArgs;
}
