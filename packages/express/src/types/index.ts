import {
  PagingProps,
  QuyxCard,
  QuyxInitProps,
  QuyxPaginationResponse,
  QuyxResponse,
  QuyxSDKUser,
  QuyxSIWEProps,
  TokensProps,
} from "@quyx/fetch";
import { SiweMessage } from "siwe";

declare global {
  namespace Express {
    interface Request {
      quyx: InjectedQuyx;
    }
  }
}

export type InjectedQuyx = {
  init: (options: QuyxInitProps) => Promise<SiweMessage>;
  siwe(options: QuyxSIWEProps): Promise<QuyxResponse<TokensProps>>;
  whoami: () => Promise<QuyxResponse<QuyxSDKUser>>;
  cards(options: PagingProps): Promise<QuyxPaginationResponse<QuyxCard[]>>;
  import({ _id }: { _id: string }): Promise<QuyxResponse<undefined>>;
  findUser({ address }: { address: string }): Promise<QuyxResponse<QuyxSDKUser>>;
  allUsers(options?: Required<PagingProps>): Promise<QuyxPaginationResponse<QuyxSDKUser[]>>;
  disconnect(): Promise<QuyxResponse<undefined>>;
  logout(): Promise<QuyxResponse<undefined>>;
};
