import { Request } from "express";
import { InjectedQuyx } from "../types";
import { Quyx } from "@quyx/fetch";

function getAccessAndRefreshToken(req: Request) {
  const accessToken = (req.session as any).accessToken as string | undefined;
  const refreshToken = (req.session as any).refreshToken as string | undefined;

  return { accessToken, refreshToken };
}

function setAccessAndRefreshToken(
  req: Request,
  tokens: { accessToken?: string; refreshToken?: string }
) {
  (req.session as any).accessToken = tokens.accessToken;
  (req.session as any).refreshToken = tokens.refreshToken;
}

function injectQuyx({ apiKey, req }: { apiKey: string; req: Request }): InjectedQuyx {
  return {
    appInfo: async function () {
      const quyx = new Quyx({ apiKey });
      const resp = await quyx.appInfo();
      return resp;
    },

    init: async function (options) {
      const quyx = new Quyx({ apiKey });
      const resp = await quyx.init(options);
      return resp;
    },

    siws: async function (options) {
      const quyx = new Quyx({ apiKey });
      const resp = await quyx.siws(options);

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

    import: async function ({ _id, filterSpam = false }) {
      const { accessToken, refreshToken } = getAccessAndRefreshToken(req);

      const quyx = new Quyx({ apiKey, accessToken, refreshToken });
      const resp = quyx.import({ _id, filterSpam });
      return resp;
    },

    findUser: async function ({ param }) {
      const quyx = new Quyx({ apiKey });
      const resp = await quyx.findUser({ param });
      return resp;
    },

    allUsers: async function (filterSpam = false, options) {
      const quyx = new Quyx({ apiKey });
      const resp = await quyx.allUsers(filterSpam, options);
      return resp;
    },

    disconnect: async function () {
      const { accessToken, refreshToken } = getAccessAndRefreshToken(req);

      const quyx = new Quyx({ apiKey, accessToken, refreshToken });
      const resp = quyx.disconnect();
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
