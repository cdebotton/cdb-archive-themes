/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Gallery
// ====================================================

export interface Gallery_gallery {
  __typename: "Gallery";
  id: string;
  title: string;
  uri: string;
  description: string;
  createdAt: any | null;
  updatedAt: any | null;
}

export interface Gallery {
  gallery: Gallery_gallery;
}

export interface GalleryVariables {
  id: string;
}
