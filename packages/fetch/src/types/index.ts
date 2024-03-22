export type QuyxConstructorProps = {
  apiKey?: string;
  clientId?: string;
  accessToken?: string;
  refreshToken?: string;
};

export type QuyxInitProps = {
  domain: string;
  address: string;
  chainId: string;
  statement?: string;
};

export type QuyxSIWSProps = {
  message: QuyxInitProps;
  signature: Uint8Array;
};

export type QuyxResponse<T> = {
  error: boolean;
  statusCode: number;
  data: {
    status: boolean;
    message: string;
    data: T;
  };
};

export type QuyxPaginationResponse<T> = {
  error: boolean;
  statusCode: number;
  data: {
    status: boolean;
    message: string;
    data: T;
    pagination: {
      page: number;
      limit: number;
      skip: number;
      total: number;
    };
  };
};

export type PagingProps = {
  limit: number;
  page: number;
};

export type QuyxSDKUser = {
  app: string;
  address: string;
  card: QuyxCard | null;
  isActive: boolean;
};

export type QuyxCard = Base & {
  owner: string;
  identifier: null | number;
  chainId: string;
  username: string;
  pfp: string;
  bio: string;
  description: string | null;
  isForSale: boolean;
};

export type QuyxApp = Base & {
  clientID: string;
  name: string;
  description: string;
  url: string;
  allowedDomains: string[] | null;
  allowedBundleIDs: string[] | null;
  blacklistedAddresses: string[] | null;
  whitelistedAddresses: string[] | null;
  isActive: boolean;
};

type Base = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};
