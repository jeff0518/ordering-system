import { FormEvent, useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Form from "../UI/Form";
import InputUI from "../UI/InputUI";
import ButtonUI from "../UI/ButtonUI";
import Loading from "../error/Loading";
import MemberContext from "../../context/MemberContext";
import { useCheckLoginStatus } from "../../utils/checkLoginStatus";
import { createMember, getMember } from "../../services/memberAPI";
import { Alert, Toast } from "../../utils/getSweetalert";
import style from "./MemberAuthForm.module.scss";

function MemberAuthForm() {
  const memberCtx = useContext(MemberContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const checkLogin = useCheckLoginStatus();
  const { t } = useTranslation();

  async function createMemberHandler(phoneNumber: string) {
    setIsLoading(true);
    try {
      const response = await createMember(phoneNumber);

      if (response.status === 201) {
        Toast.fire({
          icon: "success",
          title: `${t(`messages.member.${response.data.message}`)}`,
        });
        await loginHandler(phoneNumber);
      } else if (response.status === 202) {
        Toast.fire({
          icon: "warning",
          title: `${t(`messages.member.${response.data.message}`)}`,
        });
      }

      setIsLoading(false);
    } catch (error) {
      Alert.fire({
        title: `${t(`messages.sever.${(error as Error).message}`)}`,
        icon: "error",
      });
      setIsLoading(false);
    }
  }

  async function loginHandler(phoneNumber: string) {
    setIsLoading(true);
    try {
      const { data } = await getMember(phoneNumber);
      memberCtx?.saveItem(data.data);
      Toast.fire({
        icon: "success",
        title: `${t("messages.success")}`,
      });
      setIsLoading(false);
      localStorage.setItem("phoneId", `${phoneNumber}`);
      navigate("/main");
    } catch (error) {
      Alert.fire({
        title: `${t(`messages.sever.${(error as Error).message}`)}`,
        icon: "error",
      });
      setIsLoading(false);
    }
  }

  function onSubmitHandler(event: FormEvent) {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const fd = new FormData(formElement);
    const phoneNumber = fd.get("phoneNumber");
    const formattedPhoneNumber = phoneNumber
      ? phoneNumber.toString().trim()
      : "";
    if (formattedPhoneNumber.length === 10) {
      if (isLogin) {
        loginHandler(formattedPhoneNumber);
      } else {
        createMemberHandler(formattedPhoneNumber);
      }
    } else {
      Alert.fire({
        title: `${t("messages.tableIncorrect")}`,
        icon: "error",
      });
      return;
    }
  }

  function switchAuthHandler() {
    setIsLogin((prev) => !prev);
  }

  useEffect(() => {
    if (!checkLogin) {
      navigate("/");
    }
  }, [checkLogin, navigate]);
  return (
    <Form className="member" onSubmit={onSubmitHandler}>
      {isLoading && <Loading />}
      <div className={style.memberAuthForm_container}>
        <h2 className={style.title}>
          {isLogin ? t("text.login") : t("text.create")}
        </h2>
        <InputUI
          label={t("input.phone")}
          id="phoneNumber"
          type="tel"
          placeholder={t("input.phoneNumber")}
          inputStyle="input_auth"
          maxLength={10}
          pattern="[0-9]*"
        />
        <div className={style.actions}>
          <ButtonUI
            type="button"
            btnStyle="btn__pill__mealItem"
            onClick={switchAuthHandler}
          >
            {isLogin ? t("button.create") : t("button.login")}
          </ButtonUI>
          <ButtonUI btnStyle="btn__pill__mealItem">
            {isLogin ? t("button.send") : t("button.save")}
          </ButtonUI>
        </div>
      </div>
    </Form>
  );
}
export default MemberAuthForm;
