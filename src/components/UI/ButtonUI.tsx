import { ReactNode } from "react";
import style from "./ButtonUI.module.scss";

interface ButtonUIProps {
  children: ReactNode;
  btnStyle: string;
  onClick?: () => void;
}

function ButtonUI({ children, btnStyle, onClick }: ButtonUIProps) {
  return (
    <button className={style[btnStyle]} onClick={onClick}>
      {children}
    </button>
  );
}
export default ButtonUI;
