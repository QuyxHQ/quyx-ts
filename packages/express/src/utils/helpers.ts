import { Request } from "express";
import { InjectedQuyx } from "../types";
import { Quyx, TokensProps } from "@quyx/fetch";

function getAccessAndRefreshToken(req: Request) {
  const accessToken = (req.session as any).accessToken;
  const refreshToken = (req.session as any).refreshToken;

  return { accessToken, refreshToken };
}

function setAccessAndRefreshToken(req: Request, tokens: TokensProps) {
  (req.session as any).accessToken = tokens.accessToken;
  (req.session as any).refreshToken = tokens.refreshToken;
}

function injectQuyx({ apiKey, req }: { apiKey: string; req: Request }): InjectedQuyx {
  return {
    init: async function (options) {
      const quyx = new Quyx({ apiKey });
      const resp = await quyx.init(options);
      return resp;
    },

    siwe: async function (options) {
      const quyx = new Quyx({ apiKey });
      const resp = await quyx.siwe(options);

      if (!resp.error && resp.data) {
        const { accessToken, refreshToken } = resp.data.data;
        setAccessAndRefreshToken(req, { accessToken, refreshToken });
      }

      return resp;
    },

    whoami: async function () {
      const { accessToken, refreshToken } = getAccessAndRefreshToken(req);

      const quyx = new Quyx({ apiKey, accessToken, refreshToken });
      const resp = quyx.whoami();
      return resp;
    },

    cards: async function (options) {
      const { accessToken, refreshToken } = getAccessAndRefreshToken(req);

      const quyx = new Quyx({ apiKey, accessToken, refreshToken });
      const resp = quyx.cards(options);
      return resp;
    },

    import: async function ({ _id }) {
      const { accessToken, refreshToken } = getAccessAndRefreshToken(req);

      const quyx = new Quyx({ apiKey, accessToken, refreshToken });
      const resp = quyx.import({ _id });
      return resp;
    },

    findUser: async function ({ address }) {
      const quyx = new Quyx({ apiKey });
      const resp = await quyx.findUser({ address });
      return resp;
    },

    allUsers: async function (options) {
      const quyx = new Quyx({ apiKey });
      const resp = await quyx.allUsers(options);
      return resp;
    },

    diconnect: async function () {
      const { accessToken, refreshToken } = getAccessAndRefreshToken(req);

      const quyx = new Quyx({ apiKey, accessToken, refreshToken });
      const resp = quyx.diconnect();
      return resp;
    },

    logout: async function () {
      const { accessToken, refreshToken } = getAccessAndRefreshToken(req);

      const quyx = new Quyx({ apiKey, accessToken, refreshToken });
      const resp = quyx.logout();
      return resp;
    },
  };
}

export { injectQuyx };
