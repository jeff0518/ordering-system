import style from "./SpendingRecordsCard.module.scss";

interface SpendingRecordsCardProps {
  time: string;
  spend: number | string;
}

function SpendingRecordsCard({ time, spend }: SpendingRecordsCardProps) {
  return (
    <div className={style.spendingRecordsCard_container}>
      <div className={style.time}>{time}</div>
      <div className={style.spend}>{spend}</div>
    </div>
  );
}
export default SpendingRecordsCard;
