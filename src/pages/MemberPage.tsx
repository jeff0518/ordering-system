import MemberAuthForm from "../components/member/MemberAuthForm";
import style from "./Pages.module.scss";

function MemberPage() {
  return (
    <div className={`${style.pages} ${style.member}`}>
      <div className={style.form}>
        <MemberAuthForm />
      </div>
    </div>
  );
}
export default MemberPage;
