import { AxiosError, AxiosResponse } from "axios";
import { HttpClient } from "./http";
import constants from "./constants";

export default class ApiHttpClient extends HttpClient {
  constructor(
    keys: { clientId?: string; apiKey?: string },
    tokens?: { accessToken: string; refreshToken: string }
  ) {
    super({
      baseURL: constants.ENDPOINT_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(tokens
          ? {
              Authorization: `Bearer ${tokens.accessToken}`,
              "X-Refresh": tokens.refreshToken,
            }
          : {}),
        ...(keys.apiKey ? { "Quyx-Api-Key": keys.apiKey } : {}),
        ...(keys.clientId ? { "Quyx-Client-Id": keys.clientId } : {}),
      },
    });
  }

  _handleResponse({ data, status: statusCode }: AxiosResponse<any>) {
    return { error: false, statusCode, data };
  }

  _handleError(error: AxiosError<any>) {
    const response = {
      error: true,
      statusCode: error.response?.status,
      data: error.response?.data,
    };

    return response;
  }

  getInstance() {
    return this.instance;
  }
}
