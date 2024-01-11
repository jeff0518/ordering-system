import { ReactNode } from "react";
import style from "./ButtonUI.module.scss";

interface ButtonUIProps {
  children: ReactNode;
  btnStyle: string;
}

function ButtonUI({ children, btnStyle }: ButtonUIProps) {
  return <button className={style[btnStyle]}>{children}</button>;
}
export default ButtonUI;
