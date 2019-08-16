/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateGalleryArgs {
  uri: string;
  title: string;
  description: string;
  publishedAt?: any | null;
}

export interface CreateMediaArgs {
  title: string;
  file: any;
}

export interface CreateUserArgs {
  email: string;
  password: string;
  repeatPassword: string;
  firstName?: string | null;
  lastName?: string | null;
}

export interface GalleryWhereArgs {
  deleted?: boolean | null;
  id?: string | null;
}

export interface LoginArgs {
  email: string;
  password: string;
}

export interface UpdateGalleryArgs {
  uri: string;
  title: string;
  description: string;
  publishedAt?: any | null;
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
