/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminUsersQuery
// ====================================================

export interface AdminUsersQuery_viewer {
  __typename: "User";
  id: string;
}

export interface AdminUsersQuery_users {
  __typename: "User";
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: any;
  updatedAt: any;
  lastLogin: any | null;
}

export interface AdminUsersQuery {
  viewer: AdminUsersQuery_viewer;
  users: AdminUsersQuery_users[];
}
