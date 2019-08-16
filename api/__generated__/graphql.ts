import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
  File: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  JSON: { [key: string]: any };
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type CreateGalleryArgs = {
  uri: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  publishedAt?: Maybe<Scalars['DateTime']>;
};

export type CreateMediaArgs = {
  title: Scalars['String'];
  file: Scalars['File'];
};

export type CreateUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  repeatPassword: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type Gallery = {
  __typename?: 'Gallery';
  id: Scalars['ID'];
  uri: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  author?: Maybe<User>;
  deleted?: Maybe<Scalars['Boolean']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GalleryWhereArgs = {
  deleted?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
};

export type LoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Media = {
  __typename?: 'Media';
  id: Scalars['ID'];
  author: User;
  key: Scalars['String'];
  etag: Scalars['String'];
  bucket: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
  deleted: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  updateUser: User;
  deleteUser: User;
  createGallery: Gallery;
  updateGallery: Gallery;
  deleteGallery: Gallery;
  login: Scalars['String'];
  createMedia: Media;
};

export type MutationCreateUserArgs = {
  data: CreateUserArgs;
};

export type MutationUpdateUserArgs = {
  data: UpdateUserArgs;
};

export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};

export type MutationCreateGalleryArgs = {
  data: CreateGalleryArgs;
};

export type MutationUpdateGalleryArgs = {
  data: UpdateGalleryArgs;
  where: GalleryWhereArgs;
};

export type MutationDeleteGalleryArgs = {
  id: Scalars['ID'];
};

export type MutationLoginArgs = {
  data: LoginArgs;
};

export type MutationCreateMediaArgs = {
  data: CreateMediaArgs;
};

export type Query = {
  __typename?: 'Query';
  viewer: User;
  gallery: Gallery;
  galleries: Array<Gallery>;
  user: User;
  allMedia: Array<SignedMedia>;
  users: Array<User>;
};

export type QueryGalleryArgs = {
  id: Scalars['ID'];
};

export type QueryGalleriesArgs = {
  where?: Maybe<GalleryWhereArgs>;
};

export type QueryUserArgs = {
  id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
}

export type SignedMedia = {
  __typename?: 'SignedMedia';
  id: Scalars['ID'];
  url: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
};

export type UpdateGalleryArgs = {
  uri: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  publishedAt?: Maybe<Scalars['DateTime']>;
};

export type UpdateUserArgs = {
  id: Scalars['ID'];
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  repeatPassword?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  lastLogin?: Maybe<Scalars['DateTime']>;
};
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Gallery: ResolverTypeWrapper<Gallery>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  GalleryWhereArgs: GalleryWhereArgs;
  SignedMedia: ResolverTypeWrapper<SignedMedia>;
  Mutation: ResolverTypeWrapper<{}>;
  CreateUserArgs: CreateUserArgs;
  UpdateUserArgs: UpdateUserArgs;
  CreateGalleryArgs: CreateGalleryArgs;
  UpdateGalleryArgs: UpdateGalleryArgs;
  LoginArgs: LoginArgs;
  CreateMediaArgs: CreateMediaArgs;
  File: ResolverTypeWrapper<Scalars['File']>;
  Media: ResolverTypeWrapper<Media>;
  CacheControlScope: CacheControlScope;
  Role: Role;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  User: User;
  ID: Scalars['ID'];
  String: Scalars['String'];
  DateTime: Scalars['DateTime'];
  Gallery: Gallery;
  Boolean: Scalars['Boolean'];
  GalleryWhereArgs: GalleryWhereArgs;
  SignedMedia: SignedMedia;
  Mutation: {};
  CreateUserArgs: CreateUserArgs;
  UpdateUserArgs: UpdateUserArgs;
  CreateGalleryArgs: CreateGalleryArgs;
  UpdateGalleryArgs: UpdateGalleryArgs;
  LoginArgs: LoginArgs;
  CreateMediaArgs: CreateMediaArgs;
  File: Scalars['File'];
  Media: Media;
  CacheControlScope: CacheControlScope;
  Role: Role;
  Upload: Scalars['Upload'];
  Int: Scalars['Int'];
}>;

export type CacheControlDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = {
    maxAge?: Maybe<Maybe<Scalars['Int']>>;
    scope?: Maybe<Maybe<CacheControlScope>>;
  }
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface FileScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['File'], any> {
  name: 'File';
}

export type GalleryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Gallery'] = ResolversParentTypes['Gallery']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  publishedAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
}>;

export type MediaResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Media'] = ResolversParentTypes['Media']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  etag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bucket?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
}>;

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  createUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    MutationCreateUserArgs
  >;
  updateUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    MutationUpdateUserArgs
  >;
  deleteUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    MutationDeleteUserArgs
  >;
  createGallery?: Resolver<
    ResolversTypes['Gallery'],
    ParentType,
    ContextType,
    MutationCreateGalleryArgs
  >;
  updateGallery?: Resolver<
    ResolversTypes['Gallery'],
    ParentType,
    ContextType,
    MutationUpdateGalleryArgs
  >;
  deleteGallery?: Resolver<
    ResolversTypes['Gallery'],
    ParentType,
    ContextType,
    MutationDeleteGalleryArgs
  >;
  login?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    MutationLoginArgs
  >;
  createMedia?: Resolver<
    ResolversTypes['Media'],
    ParentType,
    ContextType,
    MutationCreateMediaArgs
  >;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  viewer?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  gallery?: Resolver<
    ResolversTypes['Gallery'],
    ParentType,
    ContextType,
    QueryGalleryArgs
  >;
  galleries?: Resolver<
    Array<ResolversTypes['Gallery']>,
    ParentType,
    ContextType,
    QueryGalleriesArgs
  >;
  user?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    QueryUserArgs
  >;
  allMedia?: Resolver<
    Array<ResolversTypes['SignedMedia']>,
    ParentType,
    ContextType
  >;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type SignedMediaResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SignedMedia'] = ResolversParentTypes['SignedMedia']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
}>;

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  firstName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastLogin?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  File?: GraphQLScalarType;
  Gallery?: GalleryResolvers<ContextType>;
  Media?: MediaResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignedMedia?: SignedMediaResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
}>;

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<
  ContextType
>;
