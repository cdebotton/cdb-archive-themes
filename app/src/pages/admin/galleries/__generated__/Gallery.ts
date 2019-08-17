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

export interface Gallery_allMedia_author {
  __typename: "User";
  id: string;
  email: string;
}

export interface Gallery_allMedia {
  __typename: "SignedMedia";
  id: string;
  url: string;
  author: Gallery_allMedia_author;
}

export interface Gallery {
  gallery: Gallery_gallery;
  allMedia: Gallery_allMedia[];
}

export interface GalleryVariables {
  id: string;
}
