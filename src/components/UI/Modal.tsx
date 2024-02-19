import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

import style from "./Modal.module.scss";

interface ModalProps {
  children: ReactNode;
  open: boolean;
  className?: string;
  onClose: () => void;
}

function Modal({ children, open, className = " ", onClose }: ModalProps) {
  const dialog = useRef<HTMLDialogElement | null>(null);

  function backdropClickHandle(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;

    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog
      ref={dialog}
      className={`${style.modal} ${style[className]}`}
      onClose={onClose}
      onClick={backdropClickHandle}
    >
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
}
export default Modal;
