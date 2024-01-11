import style from "./ButtonUI.module.scss";

interface ButtonUIProps {
  children: string;
  btnStyle: string;
}

function ButtonUI({ children, btnStyle }: ButtonUIProps) {
  return <button className={style[btnStyle]}>{children}</button>;
}
export default ButtonUI;
