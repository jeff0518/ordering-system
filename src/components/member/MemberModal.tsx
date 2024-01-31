import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../UI/Modal";
import ButtonUI from "../UI/ButtonUI";
import UserProgressContext from "../../context/UserProgressContext.";
import MemberContext from "../../context/MemberContext";
import style from "./MemberModal.module.scss";

function MemberModal() {
  const userProgressCtx = useContext(UserProgressContext);
  const memberCtx = useContext(MemberContext);
  const navigate = useNavigate();

  function closeMemberHandler() {
    userProgressCtx.hideMember();
  }

  function goToMemberInfoHandler() {
    navigate("/member/info");
    closeMemberHandler();
  }

  function signOutHandler() {
    memberCtx?.clearMember();
    localStorage.removeItem("phoneId");
    navigate("/main");
    closeMemberHandler();
  }

  return (
    <Modal
      className="member"
      open={userProgressCtx.progress === "member"}
      onClose={
        userProgressCtx.progress === "member" ? closeMemberHandler : () => {}
      }
    >
      <div className={style.memberModal}>
        <ul className={style.navItem}>
          <li onClick={goToMemberInfoHandler}>會員資訊</li>
          <li>點數兌換</li>
        </ul>
        <div className={style.action}>
          <ButtonUI btnStyle="btn__text" onClick={signOutHandler}>
            登出
          </ButtonUI>
        </div>
      </div>
    </Modal>
  );
}
export default MemberModal;
