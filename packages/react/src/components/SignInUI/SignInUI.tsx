import React, { useEffect, useState } from "react";
import { useApp, useModal, useSigner, useTheme } from "../..";
import { Button } from "../../helper-components";
import {
  CloseIcon,
  Logo,
  RefreshIcon,
  ErrorIcon,
  SwitchIcon,
  WorldIcon,
  CheckIcon,
} from "../../icons";
import { useHelperProvider } from "../../providers/HelperProvider";
import { SiginPriviledges } from "../../constants";
import { TOAST_STATUS, customToast } from "../../misc/customToast";

const SignInUI: React.FC<{}> = () => {
  const theme = useTheme();
  const { closeModal } = useModal();
  const { app, isLoading: isAppLoading } = useApp();
  const { getAppInfo, prepareSignInMessage, signIn } = useHelperProvider();
  const { signMessage } = useSigner();

  const [appIcon, setAppIcon] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']");
    if (link) setAppIcon((link as any).href);
  }, []);

  const init = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const message = await prepareSignInMessage();
      if (message && signMessage) {
        const signature = await signMessage(message.prepare());
        await signIn({ message, signature });

        closeModal();
      }
    } catch (e: any) {
      console.error("Error catched: ", e);

      customToast({
        type: TOAST_STATUS.ERROR,
        message: e.message || "Unable to complete request",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sign-in-modal position-relative">
      {isAppLoading ? (
        <div className="loading">
          <span className={`span-loader ${theme == "light" ? "dark" : "light"}`} />
          <h3>Fetching App Metadata</h3>
        </div>
      ) : !app ? (
        <div className="error">
          <ErrorIcon />

          <h3>Oops! unable to fetch metadata for app</h3>

          <Button className="refresh-btn d-flex" onClick={() => getAppInfo(true)}>
            <span>Try again</span>
            <RefreshIcon size={18} />
          </Button>
        </div>
      ) : (
        <div className="app-singin">
          <div className="linking-header">
            <div>
              <div>
                <Logo />
              </div>
            </div>
            <hr />
            <div>
              <div>
                <SwitchIcon color="dodgerblue" />
              </div>
            </div>
            <hr />
            <div>
              <div>{appIcon ? <img src={appIcon} alt="app icon" /> : "*?!"}</div>
            </div>
          </div>

          <div className="info">
            <h2>
              Sign in to <span>{app.name}</span>
            </h2>
            <p>
              <WorldIcon size={25} />
              <a href={app.url} target="_blank">
                {app.url}
              </a>
            </p>
          </div>

          <div className="perks">
            {SiginPriviledges.map((item, i) => (
              <div key={`perks-${i}`}>
                <div>
                  <div className={item.isValid ? "green" : "red"}>
                    {item.isValid ? <CheckIcon size={14} /> : <CloseIcon size={18} />}
                  </div>
                </div>

                <p>{item.message}</p>
              </div>
            ))}
          </div>

          <Button className="basic-btn w-100 mb-1" disabled={isLoading} onClick={init}>
            {isLoading ? <span className={`span-loader ${theme}`} /> : "Proceed"}
          </Button>
          <Button children="Cancel" className="basic-cancel-btn w-100" onClick={closeModal} />
        </div>
      )}
    </div>
  );
};

export default SignInUI;
