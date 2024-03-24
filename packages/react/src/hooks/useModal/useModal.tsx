import React from "react";
import { ConnectModal, ImportCardUI, SignInUI, WalletConnectedModal } from "../../components";
import { useModalProvider } from "../../providers/ModalProvider";

function useModal() {
  const { isVisible, setContent, closeModal, openModal } = useModalProvider();

  const displayConnectModal = () => {
    setContent(<ConnectModal />);
    openModal();
  };

  const displayConnectedWalletModal = () => {
    setContent(<WalletConnectedModal />);
    openModal();
  };

  const displaySignInModal = () => {
    setContent(<SignInUI />);
    openModal();
  };

  const displayImportCardModal = () => {
    setContent(<ImportCardUI />);
    openModal();
  };

  return {
    isVisible,
    closeModal,
    displayConnectModal,
    displayConnectedWalletModal,
    displaySignInModal,
    displayImportCardModal,
  };
}

export default useModal;
