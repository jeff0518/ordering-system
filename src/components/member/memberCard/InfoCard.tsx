import { ChangeEvent } from "react";
import style from "./InfoCard.module.scss";

interface InfoCardProps {
  fistText: string;
  lastText: string | number | undefined;
  readOnly?: boolean;
  setFixName?: (fixName: string) => void;
}

function InfoCard({
  fistText,
  lastText,
  readOnly = true,
  setFixName,
}: InfoCardProps) {
  function inputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const newName = event.target.value;
    if (!readOnly && setFixName) {
      setFixName(newName);
    }
  }
  return (
    <div className={style.infoCard_container}>
      <div className={style.infoCard_fist}>{fistText}</div>
      <input
        type="text"
        className={style.infoCard_last}
        value={lastText}
        readOnly={readOnly}
        onChange={inputChangeHandler}
      />
    </div>
  );
}
export default InfoCard;
