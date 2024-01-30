import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Alert } from "../../utils/getSweetalert";
import MemberInfo from "../../components/member/MemberInfo";
import style from "../Pages.module.scss";

function InfoPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedPhoneId = localStorage.getItem("phoneId");
    if (!storedPhoneId) {
      Alert.fire({
        title: "您還未登錄會員",
        icon: "error",
      });
      navigate("/member");
    }
  }, [navigate]);
  return (
    <div className={`${style.pages} `}>
      <div className={style.memberInfo}>
        <MemberInfo />
      </div>
    </div>
  );
}
export default InfoPage;
