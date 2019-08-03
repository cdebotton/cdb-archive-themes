/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Viewer
// ====================================================

export interface Viewer_viewer_profile {
  __typename: "Profile";
  firstName: string | null;
  lastName: string | null;
}

export interface Viewer_viewer {
  __typename: "User";
  id: string;
  email: string;
  profile: Viewer_viewer_profile;
}

export interface Viewer {
  viewer: Viewer_viewer;
}

export interface ViewerVariables {
  jwt: string;
}
