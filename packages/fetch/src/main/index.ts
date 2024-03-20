import {
  AccessKeysProps,
  TokensProps,
  QuyxConstructorProps,
  QuyxResponse,
  SIWSProps,
  QuyxSDKUser,
  QuyxPaginationResponse,
  QuyxCard,
  PagingProps,
} from "../types";
import ApiHttpClient from "../utils/api";
import { QuyxSIWS, QuyxSIWSProps } from "@quyx/siws";
import { isBrowser } from "../utils/helpers";

export interface QuyxApi {
  init(options: QuyxSIWSProps): Promise<QuyxSIWS>;
  siws(options: SIWSProps): Promise<QuyxResponse<TokensProps>>;
  whoami(): Promise<QuyxResponse<QuyxSDKUser>>;
  cards(options?: PagingProps): Promise<QuyxPaginationResponse<QuyxCard[]>>;
  import({ _id }: { _id: string }): Promise<QuyxResponse<undefined>>;
  findUser({ address }: { address: string }): Promise<QuyxResponse<QuyxSDKUser>>;
  allUsers(options?: PagingProps): Promise<QuyxPaginationResponse<QuyxSDKUser[]>>;
  disconnect(): Promise<QuyxResponse<undefined>>;
  logout(): Promise<QuyxResponse<undefined>>;
}

export class Quyx implements QuyxApi {
  private apiSdk: ApiHttpClient;
  private keys: AccessKeysProps;
  private tokens?: TokensProps;

  constructor(options?: QuyxConstructorProps) {
    if (!options || (!options.apiKey && !options.clientId)) {
      throw new Error("an access key is required");
    }

    if (isBrowser() && options.apiKey) {
      console.warn("it is advised to use `clientId` instead of `apiKey` in client apps");
    }

    this.keys = {
      apiKey: options.apiKey,
      clientId: options.clientId,
    };

    this.tokens = {
      accessToken: options.accessToken,
      refreshToken: options.refreshToken,
    };

    this.apiSdk = new ApiHttpClient(this.keys, this.tokens);
  }

  private async getNonce({ address }: { address: string }) {
    type Response = {
      nonce: string;
      issuedAt: string;
      expirationTime: string;
    };

    const resp = await this.apiSdk.getInstance().get(`/session/nonce/${address}`);
    return resp as QuyxResponse<Response | undefined>;
  }

  async init(options: QuyxSIWSProps): Promise<QuyxSIWS> {
    const { error, data } = await this.getNonce({ address: options.address });
    if (error) throw new Error(data.message || "unable to retrieve nonce");

    const message = new QuyxSIWS({
      domain: options.domain ?? isBrowser() ? document.location.host : undefined,
      address: options.address,
      chainId: options.chainId,
      statement: options.statement,
      ...data.data,
    });

    return message;
  }

  async siws(options: SIWSProps): Promise<QuyxResponse<TokensProps>> {
    const resp = await this.apiSdk.getInstance().post("/sdk/login", options);
    return resp;
  }

  async whoami(): Promise<QuyxResponse<QuyxSDKUser>> {
    const resp = await this.apiSdk.getInstance().get("/sdk/whoami");
    return resp;
  }

  async cards(options?: PagingProps): Promise<QuyxPaginationResponse<QuyxCard[]>> {
    const resp = await this.apiSdk
      .getInstance()
      .get(`/sdk/cards?limit=${options ? options.limit : 10}&page=${options ? options.page : 1}`);

    return resp;
  }

  async import({ _id }: { _id: string }): Promise<QuyxResponse<undefined>> {
    const resp = await this.apiSdk.getInstance().put(`/sdk/change/${_id}`);
    return resp;
  }

  async findUser({ address }: { address: string }): Promise<QuyxResponse<QuyxSDKUser>> {
    const resp = await this.apiSdk.getInstance().get(`/sdk/user/single/${address}`);
    return resp;
  }

  async allUsers(options?: Required<PagingProps>): Promise<QuyxPaginationResponse<QuyxSDKUser[]>> {
    let endpoint = `/sdk/users/all`;
    if (options) endpoint = `/sdk/users/all?page=${options.page}&limit=${options.limit}`;

    const resp = await this.apiSdk.getInstance().get(endpoint);
    return resp;
  }

  async disconnect(): Promise<QuyxResponse<undefined>> {
    const resp = await this.apiSdk.getInstance().delete("/sdk/disconnect");
    return resp;
  }

  async logout(): Promise<QuyxResponse<undefined>> {
    const resp = await this.apiSdk.getInstance().delete("/session");
    return resp;
  }
}
