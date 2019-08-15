/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateGalleryArgs } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateGallery
// ====================================================

export interface CreateGallery_createGallery {
  __typename: "Gallery";
  id: string;
  uri: string;
  title: string;
  description: string;
  createdAt: any | null;
  updatedAt: any | null;
}

export interface CreateGallery {
  createGallery: CreateGallery_createGallery;
}

export interface CreateGalleryVariables {
  data: CreateGalleryArgs;
}
