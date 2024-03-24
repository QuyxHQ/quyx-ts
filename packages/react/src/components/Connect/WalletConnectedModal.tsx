import React from "react";
import {
  Logo,
  CloseIcon,
  AlertIcon,
  ChangeIcon,
  CopyIcon,
  TrashIcon,
  LogoutIcon,
} from "../../icons";
import { copyToClipboard, useAddress, useBalance, useConnect, useModal, useUser } from "../..";
import { userImage } from "../../assets/images";
import { useHelperProvider } from "../../providers/HelperProvider";
import { Button } from "../../helper-components";

const WalletConnectedModal: React.FC<{}> = () => {
  const address = useAddress();
  const balance = useBalance();
  const { closeModal } = useModal();
  const { user } = useUser();
  const { disconnect, isDisconnecting } = useConnect();
  const { displayImportCardModal } = useModal();
  const { isChangingCard, isDisconnectingCard, isLoggingOut, disconnectCard, logout } =
    useHelperProvider();

  const options = [
    {
      icon: <ChangeIcon size={23} />,
      text: "Change card",
      isLoading: isChangingCard,
      fn: () => displayImportCardModal(),
    },
    {
      icon: <CopyIcon size={23} />,
      text: "Copy address",
      isLoading: false,
      fn: () => copyToClipboard(address || ""),
    },
    {
      icon: <TrashIcon size={23} />,
      text: "Disconnect card",
      isLoading: isDisconnectingCard,
      fn: async () => await disconnectCard(),
    },
    {
      icon: <LogoutIcon size={25} />,
      text: "Logout",
      isLoading: isLoggingOut,
      fn: async () => await logout(),
    },
  ];

  return (
    <div className="connected-wallet-modal">
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

      <div className="top">
        <img src={user && user.card ? user.card.pfp : userImage} alt="" />
        <h3>
          <span>@{user && user.card ? user.card.username : "----"}</span>
          {user && user.card && user.card.isFlagged ? (
            <AlertIcon size={25} color="goldenrod" />
          ) : null}
        </h3>
        <p>{!balance ? "--.--" : balance} SOL</p>
      </div>

      <div className="options-list d-flex">
        {options.map((option, i) => (
          <div key={`option-${i}`} onClick={option.fn}>
            <div>{option.isLoading ? <span className="span-loader" /> : option.icon}</div>
          </div>
        ))}
      </div>

      <div className="buttons">
        <Button className="modal-btns">View on Explorer</Button>
        <Button className="modal-btns red" onClick={disconnect}>
          {isDisconnecting ? <span className="span-loader" /> : "Disconnect Wallet"}
        </Button>
      </div>
    </div>
  );
};

export default WalletConnectedModal;
