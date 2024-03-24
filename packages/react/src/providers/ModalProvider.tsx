import React, { createContext, useContext, useState } from "react";
import { Modal } from "../helper-components";

type ModalProviderContextProps = {
  isVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalContent?: React.JSX.Element;
  setContent: (content: React.JSX.Element) => void;
};

const ModalProviderContext = createContext<ModalProviderContextProps>({
  isVisible: false,
  openModal() {},
  closeModal() {},
  setContent() {},
});

export const useModalProvider = () => useContext(ModalProviderContext);

const ModalProvider: React.FC<{ children: React.JSX.Element }> = ({ children }) => {
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.JSX.Element>();

  const openModal = () => setDisplayModal(true);
  const closeModal = () => setDisplayModal(false);
  const setContent = (content: React.JSX.Element) => setModalContent(content);

  return (
    <ModalProviderContext.Provider
      value={{
        isVisible: displayModal,
        modalContent,
        openModal,
        closeModal,
        setContent,
      }}
    >
      <Modal />
      {children}
    </ModalProviderContext.Provider>
  );
};

export default ModalProvider;
