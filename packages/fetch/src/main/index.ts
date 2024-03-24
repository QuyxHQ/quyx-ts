import {
  QuyxConstructorProps,
  QuyxResponse,
  QuyxSIWSProps,
  QuyxSDKUser,
  QuyxPaginationResponse,
  QuyxCard,
  PagingProps,
  QuyxInitProps,
  QuyxApp,
} from "../types";
import ApiHttpClient from "../utils/api";
import { QuyxSIWS, signatureToString } from "@quyx/siws";
import { isBrowser } from "../utils/helpers";

export interface QuyxInterface {
  appInfo(): Promise<QuyxResponse<QuyxApp>>;
  init({ domain, address, chainId, statement }: QuyxInitProps): Promise<QuyxSIWS>;
  siws({
    message,
    signature,
  }: QuyxSIWSProps): Promise<QuyxResponse<{ accessToken: string; refreshToken: string }>>;
  whoami(): Promise<QuyxResponse<QuyxSDKUser>>;
  cards({ limit, page }: PagingProps): Promise<QuyxPaginationResponse<QuyxCard[]>>;
  import({
    _id,
    filterSpam,
  }: {
    _id: string;
    filterSpam?: boolean;
  }): Promise<QuyxResponse<undefined>>;
  findUser({ param }: { param: string }): Promise<QuyxResponse<QuyxSDKUser>>;
  allUsers(
    filterSpam?: boolean,
    options?: Required<PagingProps>
  ): Promise<QuyxPaginationResponse<QuyxSDKUser[]>>;
  disconnect(): Promise<QuyxResponse<undefined>>;
  logout(): Promise<QuyxResponse<undefined>>;
}

export class Quyx implements QuyxInterface {
  private apiSdk: ApiHttpClient;
  private keys: { clientId?: string; apiKey?: string };
  private tokens?: { accessToken: string; refreshToken: string };

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
    const resp = await this.apiSdk.getInstance().get(`/session/nonce/${address}`);
    return resp as QuyxResponse<
      | {
          nonce: string;
          issuedAt: string;
          expirationTime: string;
        }
      | undefined
    >;
  }

  async appInfo() {
    const resp = await this.apiSdk.getInstance().get("/sdk/info");
    return resp as Promise<QuyxResponse<QuyxApp>>;
  }

  async init({ domain, address, chainId, statement }: QuyxInitProps) {
    const { error, data } = await this.getNonce({ address });
    if (error || !data.status) throw new Error(data.message || "unable to retrieve nonce");

    const message = new QuyxSIWS({
      domain,
      address,
      chainId,
      statement,
      ...data.data,
    });

    return message;
  }

  async siws({ message, signature }: QuyxSIWSProps) {
    const resp = await this.apiSdk
      .getInstance()
      .post("/sdk/login", { message, signature: signatureToString(signature) });

    return resp as Promise<QuyxResponse<{ accessToken: string; refreshToken: string }>>;
  }

  async whoami() {
    const resp = await this.apiSdk.getInstance().get("/sdk/whoami");
    return resp as Promise<QuyxResponse<QuyxSDKUser>>;
  }

  async cards({ limit = 10, page = 1 }: PagingProps) {
    const resp = await this.apiSdk.getInstance().get(`/sdk/cards?limit=${limit}&page=${page}`);
    return resp as Promise<QuyxPaginationResponse<QuyxCard[]>>;
  }

  async import({ _id, filterSpam = false }: { _id: string; filterSpam?: boolean }) {
    const resp = await this.apiSdk.getInstance().put(`/sdk/change/${_id}`, { filterSpam });
    return resp as Promise<QuyxResponse<undefined>>;
  }

  async findUser({ param }: { param: string }) {
    if (!this.keys.apiKey) throw new Error("apiKey is needed to access this route");

    const resp = await this.apiSdk.getInstance().get(`/sdk/user/single/${param}`);
    return resp as Promise<QuyxResponse<QuyxSDKUser>>;
  }

  async allUsers(filterSpam = false, options?: Required<PagingProps>) {
    if (!this.keys.apiKey) throw new Error("apiKey is needed to access this route");

    let endpoint = `/sdk/users/all`;
    if (options) {
      endpoint = `/sdk/users/all?page=${options.page}&limit=${options.limit}&filterSpam=${filterSpam}`;
    }

    const resp = await this.apiSdk.getInstance().get(endpoint);
    return resp as Promise<QuyxPaginationResponse<QuyxSDKUser[]>>;
  }

  async disconnect() {
    const resp = await this.apiSdk.getInstance().delete("/sdk/disconnect");
    return resp as Promise<QuyxResponse<undefined>>;
  }

  async logout() {
    const resp = await this.apiSdk.getInstance().delete("/session");
    return resp as Promise<QuyxResponse<undefined>>;
  }
}
