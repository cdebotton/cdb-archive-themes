/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GalleryWhereArgs, UpdateGalleryArgs } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateGallery
// ====================================================

export interface UpdateGallery_updateGallery_media {
  __typename: "Media";
  id: string;
}

export interface UpdateGallery_updateGallery {
  __typename: "Gallery";
  id: string;
  title: string;
  description: string;
  uri: string;
  media: UpdateGallery_updateGallery_media[];
}

export interface UpdateGallery {
  updateGallery: UpdateGallery_updateGallery;
}

export interface UpdateGalleryVariables {
  where: GalleryWhereArgs;
  data: UpdateGalleryArgs;
}
