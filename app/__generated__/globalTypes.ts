/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateUserArgs {
  email: string;
  password: string;
  repeatPassword: string;
  firstName?: string | null;
  lastName?: string | null;
}

export interface LoginArgs {
  email: string;
  password: string;
}

export interface UpdateUserArgs {
  id: string;
  email: string;
  password?: string | null;
  repeatPassword?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
