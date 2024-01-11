import style from "./InputUI.module.scss";

interface InputUIProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  inputStyle: string;
}

function InputUI({ label, id, type, placeholder, inputStyle }: InputUIProps) {
  return (
    <div className={style[inputStyle]}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} />
    </div>
  );
}
export default InputUI;
