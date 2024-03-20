import { QuyxSIWSProps } from "@quyx/siws";

export type TokensProps = {
  accessToken: string;
  refreshToken: string;
};

export type AccessKeysProps = {
  clientId?: string;
  apiKey?: string;
};

export type QuyxConstructorProps = {
  apiKey?: string;
  clientId?: string;
  accessToken?: string;
  refreshToken?: string;
};

export type QuyxResponse<T> = {
  error: boolean;
  statusCode: number;
  data?: {
    status: boolean;
    message: string;
    data: T;
  };
};

export type QuyxPaginationResponse<T> = QuyxResponse<T> & {
  pagination: {
    page: number;
    limit: number;
    skip: number;
    total: number;
  };
};

export type SIWSProps = {
  message: QuyxSIWSProps;
  signature: string;
};

export type PagingProps = {
  limit: number;
  page: number;
};

export type QuyxSDKUser = {
  app: string;
  address: string;
  card: QuyxCard;
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

type Base = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};
