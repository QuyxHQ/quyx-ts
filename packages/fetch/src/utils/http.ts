import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  constructor(option: AxiosRequestConfig) {
    this.instance = axios.create(option);
    this._intializeResponseInterceptor();
  }

  private _intializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  }

  abstract _handleResponse({ data }: AxiosResponse): any;
  abstract _handleError(error: AxiosError): any;
}
