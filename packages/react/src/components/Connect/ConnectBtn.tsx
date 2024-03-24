import React from "react";
import { WalletConnectedButton } from ".";
import { useAddress, useConnect, useConnectionStatus, useModal, useTheme } from "../..";
import { Button } from "../../helper-components";
import { LoginIcon } from "../../icons";
import { useHelperProvider } from "../../providers/HelperProvider";

type Props = {
  isConnectedBtn?: React.JSX.Element;
  connectBtnText?: string;
  signinBtnText?: string;
};

const ConnectBtn: React.FC<Props> = ({ isConnectedBtn, connectBtnText, signinBtnText }) => {
  const {
    displayConnectModal,
    displaySignInModal,
    displayImportCardModal,
    displayConnectedWalletModal,
  } = useModal();

  const { isLoadingUserInfo } = useHelperProvider();

  const address = useAddress();
  const theme = useTheme();
  const connectionStatus = useConnectionStatus();

  const { isConnecting } = useConnect();

  return isConnecting || isLoadingUserInfo ? (
    // loading button
    <Button className="basic-btn d-flex">
      <span className={`span-loader ${theme}`} />
    </Button>
  ) : connectionStatus !== "unknown" && !address ? (
    // connect button
    <Button className="basic-btn d-flex" onClick={displayConnectModal}>
      {connectBtnText || "Connect Wallet"}
    </Button>
  ) : connectionStatus === "connected" ? (
    // sign in btn
    <Button className="basic-btn d-flex" onClick={displaySignInModal}>
      {signinBtnText || (
        <div className="d-flex" style={{ gap: "0.5rem" }}>
          <span>Sign in</span>
          <LoginIcon size={20} />
        </div>
      )}
    </Button>
  ) : connectionStatus === "authenticated" ? (
    // onboard button
    <Button className="basic-btn d-flex" onClick={displayImportCardModal}>
      Sync Card
    </Button>
  ) : address ? (
    // user connected button
    <div style={{ width: "max-content" }} onClick={displayConnectedWalletModal}>
      {isConnectedBtn ? isConnectedBtn : <WalletConnectedButton />}
    </div>
  ) : null;
};

export default ConnectBtn;
