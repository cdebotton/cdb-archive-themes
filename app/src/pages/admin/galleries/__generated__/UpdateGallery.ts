/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateGalleryArgs, GalleryWhereArgs } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateGallery
// ====================================================

export interface UpdateGallery_updateGallery {
  __typename: "Gallery";
  id: string;
  title: string;
  description: string;
  uri: string;
  publishedAt: any | null;
  createdAt: any | null;
  updatedAt: any | null;
}

export interface UpdateGallery {
  updateGallery: UpdateGallery_updateGallery;
}

export interface UpdateGalleryVariables {
  data: UpdateGalleryArgs;
  where: GalleryWhereArgs;
}
