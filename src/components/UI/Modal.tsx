import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

import style from "./Modal.module.scss";

interface ModalProps {
  children: ReactNode;
  open: boolean;
  className?: string;
}

function Modal({ children, open, className = "" }: ModalProps) {
  const dialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;

    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`${style.modal} ${style[className]}`}>
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
}
export default Modal;
