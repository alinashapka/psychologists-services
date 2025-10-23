import { createPortal } from "react-dom";
import { useEffect } from "react";
import css from "./Modal.module.css";

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
