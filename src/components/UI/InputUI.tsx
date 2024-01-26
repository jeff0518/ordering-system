import style from "./InputUI.module.scss";

interface InputUIProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  inputStyle: string;
  maxLength?: number;
  pattern?: string;
}

function InputUI({
  label,
  id,
  type,
  placeholder,
  inputStyle,
  maxLength,
  pattern,
}: InputUIProps) {
  return (
    <div className={style[inputStyle]}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        pattern={pattern}
        required
      />
    </div>
  );
}
export default InputUI;
