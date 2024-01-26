import { useState } from "react";
import { useTranslation } from "react-i18next";

import Form from "../UI/Form";
import InputUI from "../UI/InputUI";
import ButtonUI from "../UI/ButtonUI";
import style from "./MemberAuthForm.module.scss";

function MemberAuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const { t } = useTranslation();

  function switchAuthHandler() {
    setIsLogin((prev) => !prev);
  }
  return (
    <Form className="member" onSubmit={() => {}}>
      <div className={style.memberAuthForm_container}>
        <h2 className={style.title}>
          {isLogin ? t("text.login") : t("text.create")}
        </h2>
        <InputUI
          label={t("input.phone")}
          id="account"
          type="tel"
          placeholder={t("input.phoneNumber")}
          inputStyle="input_auth"
          maxLength={10}
          pattern="[0-9]*"
        />
        <div className={style.actions}>
          <ButtonUI btnStyle="btn__pill__mealItem" onClick={switchAuthHandler}>
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
