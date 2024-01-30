import { useNavigate } from "react-router-dom";

import ButtonUI from "../UI/ButtonUI";
import style from "./Error.module.scss";
import { useTranslation } from "react-i18next";

function Error() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  function goToMainPageHandler() {
    navigate("/main");
  }

  return (
    <div className={style.container}>
      <div>
        <h1>Oops!</h1>
        <p>{t("text.error")}</p>
        <ButtonUI btnStyle="btn__link" onClick={goToMainPageHandler}>
          {t("button.return")}
        </ButtonUI>
      </div>
    </div>
  );
}

export default Error;
