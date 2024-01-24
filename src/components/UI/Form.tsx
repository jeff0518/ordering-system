import { FormEvent, ReactNode } from "react";

interface FormProps {
  children: ReactNode;
  className: string;
  onSubmit: (event: FormEvent) => void;
}

import style from "./Form.module.scss";
function Form({ children, className, onSubmit }: FormProps) {
  return (
    <form className={`${style.form} ${style[className]}`} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
export default Form;
