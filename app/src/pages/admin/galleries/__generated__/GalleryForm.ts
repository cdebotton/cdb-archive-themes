/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GalleryForm
// ====================================================

export interface GalleryForm_media {
  __typename: "Media";
  id: string;
}

export interface GalleryForm {
  __typename: "Gallery";
  id: string;
  title: string;
  description: string;
  uri: string;
  media: GalleryForm_media[];
}
