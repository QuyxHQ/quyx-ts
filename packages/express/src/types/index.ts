import {
  PagingProps,
  QuyxCard,
  QuyxPaginationResponse,
  QuyxResponse,
  QuyxSDKUser,
  TokensProps,
  SIWSProps,
} from "@quyx/fetch";
import { QuyxSIWS, QuyxSIWSProps } from "@quyx/siws";

declare global {
  namespace Express {
    interface Request {
      quyx: InjectedQuyx;
    }
  }
}

export type InjectedQuyx = {
  init: (options: QuyxSIWSProps) => Promise<QuyxSIWS>;
  siws(options: SIWSProps): Promise<QuyxResponse<TokensProps>>;
  whoami: () => Promise<QuyxResponse<QuyxSDKUser>>;
  cards(options: PagingProps): Promise<QuyxPaginationResponse<QuyxCard[]>>;
  import({ _id }: { _id: string }): Promise<QuyxResponse<undefined>>;
  findUser({ address }: { address: string }): Promise<QuyxResponse<QuyxSDKUser>>;
  allUsers(options?: Required<PagingProps>): Promise<QuyxPaginationResponse<QuyxSDKUser[]>>;
  disconnect(): Promise<QuyxResponse<undefined>>;
  logout(): Promise<QuyxResponse<undefined>>;
};
