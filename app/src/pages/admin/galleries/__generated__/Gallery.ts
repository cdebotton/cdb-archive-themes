/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GalleryWhereArgs } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: Gallery
// ====================================================

export interface Gallery_gallery_media {
  __typename: "Media";
  id: string;
}

export interface Gallery_gallery {
  __typename: "Gallery";
  id: string;
  title: string;
  description: string;
  uri: string;
  media: Gallery_gallery_media[];
}

export interface Gallery {
  gallery: Gallery_gallery;
}

export interface GalleryVariables {
  where: GalleryWhereArgs;
}
