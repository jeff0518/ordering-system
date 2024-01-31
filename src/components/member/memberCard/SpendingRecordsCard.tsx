import style from "./SpendingRecordsCard.module.scss";

interface SpendingRecordsCardProps {
  time: string;
  spend: number | string;
  className?: string;
}

function SpendingRecordsCard({
  time,
  spend,
  className = " ",
}: SpendingRecordsCardProps) {
  return (
    <div
      className={`${style.spendingRecordsCard_container} ${style[className]}`}
    >
      <div className={style.time}>{time}</div>
      <div className={style.spend}>{spend}</div>
    </div>
  );
}
export default SpendingRecordsCard;
