import React, { useEffect } from "react";
import { useTheme } from "../..";
import { useModalProvider } from "../../providers/ModalProvider";

const Modal: React.FC<{}> = () => {
  const theme = useTheme();
  const { isVisible, modalContent, closeModal } = useModalProvider();

  function handleOverlayClick(e: any) {
    if (e.target.classList.contains("modal-dialog")) closeModal();
    return;
  }

  useEffect(() => {
    if (isVisible) document.body.classList.add("scroll-disabled");
    else document.body.classList.remove("scroll-disabled");

    const handleEsc = (e: any) => {
      if (e.keyCode === 27 && isVisible) closeModal();
    };

    if (isVisible) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isVisible]);

  return (
    <div
      className={`quyx ${theme} modal-dialog ${isVisible ? "d-block" : "d-none"}`}
      onClick={handleOverlayClick}
    >
      <div className="modal">{modalContent}</div>
    </div>
  );
};

export default Modal;
