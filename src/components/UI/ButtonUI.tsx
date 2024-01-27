import { ReactNode } from "react";
import style from "./ButtonUI.module.scss";

interface ButtonUIProps {
  children: ReactNode;
  btnStyle: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
}

function ButtonUI({ children, btnStyle, type, onClick }: ButtonUIProps) {
  return (
    <button type={type} className={style[btnStyle]} onClick={onClick}>
      {children}
    </button>
  );
}
export default ButtonUI;
