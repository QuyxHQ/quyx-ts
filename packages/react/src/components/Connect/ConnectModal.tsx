import { WalletReadyState } from "@solana/wallet-adapter-base";
import { useConnect, useModal, useTheme, useWallet } from "../..";
import { Button } from "../../helper-components";
import { Wallet } from "@solana/wallet-adapter-react";
import { CloseIcon, EmptyIcon, HelpIcon, Logo } from "../../icons";
import React, { useEffect } from "react";

const ConnectModal: React.FC<{}> = () => {
  const { wallets, wallet } = useWallet();
  const { isConnecting, connected } = useConnect();
  const { closeModal } = useModal();

  useEffect(() => {
    if (connected) closeModal();
  }, [connected]);

  return (
    <div className="connect-wallet-ui d-flex">
      <div className="header d-flex w-100">
        <div className="brand d-flex">
          <h2 className="d-flex">
            <Logo />
            <hr />
            <span>Quyx</span>
          </h2>
        </div>

        <div onClick={closeModal}>
          <CloseIcon className="pointer" />
        </div>
      </div>

      {isConnecting && wallet ? (
        <div className="connecting-wallet">
          <div className="image-loader">
            <img src={wallet.adapter.icon} alt={wallet.adapter.name} />
            <div className="loader">
              <span className="span-loader" />
            </div>
          </div>

          <div className="text">
            <h2>Requesting Connection</h2>
            <p>Open your {wallet.adapter.name} app or browser extension to connect your wallet</p>
          </div>
        </div>
      ) : (
        <React.Fragment>
          <div className="wallets">
            {wallets.length > 0 ? (
              <React.Fragment>
                {wallets.map((wallet) => (
                  <RenderWalletsButton wallet={wallet} key={wallet.adapter.name} />
                ))}

                <div className="footer w-100">
                  <a href="#" target="_blank" className="d-flex w-100">
                    <HelpIcon size={20} />
                    <p>Learn more about wallets</p>
                  </a>
                </div>
              </React.Fragment>
            ) : (
              <EmptyWallet />
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

const EmptyWallet = () => {
  const theme = useTheme();

  return (
    <div className="empty d-flex">
      <EmptyIcon color={theme == "light" ? "#ccc" : "#555"} />
      <p>You don't seem to have configured any wallet yet!</p>
    </div>
  );
};

const RenderWalletsButton = ({ wallet }: { wallet: Wallet }) => {
  const { connect } = useConnect();

  return (
    <Button
      className="w-100 d-flex wallet-select-button"
      key={wallet.adapter.name}
      onClick={() => connect(wallet.adapter.name)}
      disabled={
        wallet.readyState == WalletReadyState.NotDetected ||
        wallet.readyState == WalletReadyState.Unsupported
      }
    >
      <div className="name">
        <h4>{wallet.adapter.name}</h4>

        {wallet.readyState === WalletReadyState.Installed ? (
          <p>Installed</p>
        ) : (
          <span>{wallet.readyState}</span>
        )}
      </div>

      <div className="image">
        <img src={wallet.adapter.icon} alt={wallet.adapter.name} />
      </div>
    </Button>
  );
};

export default ConnectModal;
