import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Connection, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
import { usePublickey, useCluster, useAddress, useConnect } from "..";
import { Quyx, QuyxApp, QuyxCard, QuyxPaginationResponse, QuyxSDKUser } from "@quyx/fetch";
import { QuyxSIWS } from "@quyx/siws";
import { useQuyxProvider } from "./QuyxProvider";
import { createAsyncLocalStorage } from "../misc/AsyncStorage";
import { TOAST_STATUS, customToast } from "../misc/customToast";

type HelperProviderContextProps = {
  // variables
  balance?: number;
  user?: QuyxSDKUser;
  app?: QuyxApp;
  // loading states
  isLoadingAppInfo: boolean;
  isLoadingUserInfo: boolean;
  isPreparingMessage: boolean;
  isSigningIn: boolean;
  isChangingCard: boolean;
  isFetchingUserCard: boolean;
  isDisconnectingCard: boolean;
  isLoggingOut: boolean;
  // fns
  getAppInfo(displayError?: boolean): Promise<void>;
  whoami(): Promise<void>;
  prepareSignInMessage(): Promise<QuyxSIWS | undefined>;
  signIn({ message, signature }: { message: any; signature: Uint8Array }): Promise<void>;
  changeCard(cardId: string): Promise<void>;
  listUserCards({ limit, page }: any): Promise<QuyxPaginationResponse<QuyxCard[]> | undefined>;
  disconnectCard(): Promise<void>;
  logout(): Promise<void>;
};

const HelperProviderContext = createContext<HelperProviderContextProps>({
  // loading states
  isLoadingAppInfo: true,
  isLoadingUserInfo: true,
  isPreparingMessage: true,
  isSigningIn: true,
  isChangingCard: true,
  isFetchingUserCard: true,
  isDisconnectingCard: true,
  isLoggingOut: true,
  // fns
  async getAppInfo() {},
  async whoami() {},
  prepareSignInMessage: async () => undefined,
  async signIn() {},
  async changeCard() {},
  listUserCards: async () => undefined,
  async disconnectCard() {},
  async logout() {},
});

export const useHelperProvider = () => useContext(HelperProviderContext);

const HelperProvider: React.FC<{ children: React.JSX.Element }> = ({ children }) => {
  const { refreshAppInfoAfter, clientId, setConnectionStatus, filterSpam } = useQuyxProvider();

  const cluster = useCluster();
  const connection = useMemo(
    () => (cluster ? new Connection(clusterApiUrl(cluster)) : undefined),
    [cluster]
  );

  const [tokens, setTokens] = useState<{
    accessToken: string;
    refreshToken: string;
  }>();

  const provider = useMemo(() => new Quyx({ clientId, ...tokens }), [clientId, tokens]);

  const [balance, setBalance] = useState<number>();
  const [user, setUser] = useState<QuyxSDKUser>();
  const [app, setApp] = useState<QuyxApp>();

  //# loading states
  const [isLoadingAppInfo, setIsLoadingAppInfo] = useState<boolean>(true);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState<boolean>(false);
  const [isPreparingMessage, setIsPreparingMessage] = useState<boolean>(false);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [isChangingCard, setIsChangingCard] = useState<boolean>(false);
  const [isFetchingUserCard, setIsFetchingUserCard] = useState<boolean>(false);
  const [isDisconnectingCard, setIsDisconnectingCard] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const publicKey = usePublickey();
  const address = useAddress();
  const connect = useConnect();

  const tokenStorage = createAsyncLocalStorage("sdk-tokens");
  const appStorage = createAsyncLocalStorage("app");

  useEffect(() => {
    if (connect.isConnecting) setConnectionStatus("connecting");
    if (connect.connected) setConnectionStatus("connected");
    if (!connect.connected) setConnectionStatus("disconnected");
    if (connect.isDisconnecting) setConnectionStatus("disconnecting");
    if (user && user.card == null) setConnectionStatus("authenticated");
    if (user && user.card) setConnectionStatus("onboarded");
  }, [connect, user]);

  useEffect(() => {
    (async function () {
      const accessToken = await tokenStorage.getItem("accessToken");
      const refreshToken = await tokenStorage.getItem("refreshToken");

      if (accessToken && refreshToken) setTokens({ accessToken, refreshToken });

      await getAppInfo();
      return;
    })();
  }, []);

  useEffect(() => {
    whoami();
  }, [tokens, address]);

  async function getAppInfo(displayError = false) {
    if (!clientId) return;
    setIsLoadingAppInfo(true);

    const appInStorage = await appStorage.getItem("app");
    let appInStorageJSON: { app?: QuyxApp; insertedAt?: number } | undefined;
    if (appInStorage) appInStorageJSON = JSON.parse(appInStorage);

    // check the date to ensure it is still within ttl age
    const now = Date.now();
    if (
      appInStorageJSON &&
      appInStorageJSON.insertedAt &&
      now - appInStorageJSON.insertedAt <= refreshAppInfoAfter
    ) {
      setApp(appInStorageJSON.app);
      setIsLoadingAppInfo(false);
      return;
    }

    // otherwise go ahead and refresh app info
    setIsLoadingAppInfo(true);

    const { data, error } = await provider.appInfo();
    if (error || !data || !data.status) {
      if (displayError) {
        customToast({
          type: TOAST_STATUS.ERROR,
          message: data?.message || "Unable to retrieve app at the moment",
        });
      }

      setIsLoadingAppInfo(false);
      return;
    }

    await appStorage.setItem("app", JSON.stringify({ app: data.data, insertedAt: Date.now() }));
    setApp(data.data);
    setIsLoadingAppInfo(false);
  }

  async function whoami() {
    if (!tokens || isLoadingUserInfo || !address) return;
    setIsLoadingUserInfo(true);

    const user = await provider.whoami();
    if (user.error || !user.data || !user.data.status) {
      // might have to check with jwt to see if user is logged in or not
      customToast({
        type: TOAST_STATUS.ERROR,
        message: user.data?.message || "Unable to retrieve user at the moment",
      });

      setIsLoadingUserInfo(false);
      return;
    }

    setUser(user.data.data);
    setIsLoadingUserInfo(false);
  }

  async function prepareSignInMessage() {
    if (!address || !cluster || isPreparingMessage) return;
    setIsPreparingMessage(true);

    let message: QuyxSIWS | undefined;

    try {
      message = await provider.init({
        domain: window.location.host,
        address,
        chainId: cluster,
      });
    } catch (e: any) {
      console.error("Error while preparing message to sign: ", e);
      customToast({ type: TOAST_STATUS.ERROR, message: e.message || "Request timed out" });
    } finally {
      setIsPreparingMessage(false);
    }

    return message;
  }

  async function signIn({ message, signature }: { message: any; signature: Uint8Array }) {
    if (isSigningIn) return;
    setIsSigningIn(true);

    try {
      const msg = new QuyxSIWS(message);

      const { error, data } = await provider.siws({
        message: { ...message, statement: msg.statement, domain: msg.domain },
        signature,
      });

      if (error || !data || !data.status) {
        customToast({
          type: TOAST_STATUS.ERROR,
          message: data?.message || "Unable to complete request",
        });

        return;
      }

      const { accessToken, refreshToken } = data.data;
      await tokenStorage.setItem("accessToken", accessToken);
      await tokenStorage.setItem("refreshToken", refreshToken);

      setTokens({ accessToken, refreshToken });
      await whoami();
    } catch (e: any) {
      console.error("Error while signing user in: ", e);
      customToast({ type: TOAST_STATUS.ERROR, message: e.message || "Request timed out" });
    } finally {
      setIsSigningIn(false);
    }
  }

  async function changeCard(cardId: string) {
    if (isChangingCard) return;
    setIsChangingCard(true);

    try {
      if (!/^[0-9a-fA-F]{24}$/.test(cardId)) throw new Error("Invalid cardId");

      const { error, data } = await provider.import({ _id: cardId, filterSpam });
      if (error || !data?.status) {
        customToast({
          type: TOAST_STATUS.ERROR,
          message: data?.message || "Unable to complete request",
        });

        return;
      }

      await whoami(); // re-call this to update the current card data
    } catch (e: any) {
      console.error("Error while changing user card: ", e);
      customToast({ type: TOAST_STATUS.ERROR, message: e.message || "Request timed out" });
    } finally {
      setIsChangingCard(false);
    }
  }

  async function listUserCards({ limit = 10, page = 1 }: { limit?: number; page?: number }) {
    if (isFetchingUserCard) return;
    setIsFetchingUserCard(true);

    let cards: QuyxPaginationResponse<QuyxCard[]> | undefined;

    try {
      const response = await provider.cards({ limit, page });
      if (response.error || !response.data?.status) {
        customToast({
          type: TOAST_STATUS.ERROR,
          message: response.data?.message || "Unable to complete request",
        });
      } else cards = response;
    } catch (e: any) {
      console.error("Error while fetching user card(s): ", e);
      customToast({ type: TOAST_STATUS.ERROR, message: e.message || "Request timed out" });
    } finally {
      setIsFetchingUserCard(false);
    }

    return cards;
  }

  async function disconnectCard() {
    if (isDisconnectingCard) return;
    setIsDisconnectingCard(true);

    try {
      const response = await provider.disconnect();
      if (response.error || !response.data?.status) {
        customToast({
          type: TOAST_STATUS.ERROR,
          message: response.data?.message || "Unable to complete request",
        });
      } else setConnectionStatus("authenticated"); // user have onboarded themselves - no card linked to app
    } catch (e: any) {
      console.error("Error while disconnecting card: ", e);
      customToast({ type: TOAST_STATUS.ERROR, message: e.message || "Request timed out" });
    } finally {
      setIsDisconnectingCard(false);
    }
  }

  async function logout() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      const response = await provider.logout();
      if (response.error || !response.data?.status) {
        customToast({
          type: TOAST_STATUS.ERROR,
          message: response.data?.message || "Unable to complete request",
        });
      } else {
        await Promise.all([
          tokenStorage.removeItem("accessToken"),
          tokenStorage.removeItem("refreshToken"),
        ]);

        setConnectionStatus("connected"); // user is no longer authenticated
        setUser(undefined);
        setTokens(undefined);
      }
    } catch (e: any) {
      console.error("Error while logging out: ", e);
      customToast({ type: TOAST_STATUS.ERROR, message: e.message || "Request timed out" });
    } finally {
      setIsLoggingOut(false);
    }
  }

  useEffect(() => {
    (async function () {
      if (!connection || !publicKey) return;

      const _balance = await connection.getBalance(publicKey);
      setBalance(_balance / LAMPORTS_PER_SOL);
    })();
  }, [publicKey, connection]);

  return (
    <HelperProviderContext.Provider
      value={{
        // variables
        balance,
        user,
        app,
        // loading states
        isLoadingAppInfo,
        isLoadingUserInfo,
        isPreparingMessage,
        isSigningIn,
        isChangingCard,
        isFetchingUserCard,
        isDisconnectingCard,
        isLoggingOut,
        // fns
        changeCard,
        disconnectCard,
        getAppInfo,
        listUserCards,
        logout,
        prepareSignInMessage,
        signIn,
        whoami,
      }}
    >
      {children}
    </HelperProviderContext.Provider>
  );
};

export default HelperProvider;
