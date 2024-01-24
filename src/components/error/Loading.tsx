import style from "./Loading.module.scss";

function Loading() {
  return (
    <div className={style.loading}>
      <div className={style.loading_spinner}></div>
    </div>
  );
}
export default Loading;
