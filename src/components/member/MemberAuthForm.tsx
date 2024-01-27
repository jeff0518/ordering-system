import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import Form from "../UI/Form";
import InputUI from "../UI/InputUI";
import ButtonUI from "../UI/ButtonUI";
import Loading from "../error/Loading";
import { createMember } from "../../services/memberAPI";
import { Alert, Toast } from "../../utils/getSweetalert";
import style from "./MemberAuthForm.module.scss";

function MemberAuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(false);
      } else if (response.status === 202) {
        Toast.fire({
          icon: "warning",
          title: `${t(`messages.member.${response.data.message}`)}`,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log();
      setIsLoading(false);
    }
  }

  function onSubmitHandler(event: FormEvent) {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const fd = new FormData(formElement);
    const phoneNumber = fd.get("phoneNumber");

    if (phoneNumber && phoneNumber.toString().trim().length === 10) {
      createMemberHandler(phoneNumber.toString().trim());
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
