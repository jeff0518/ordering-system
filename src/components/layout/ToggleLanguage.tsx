import { useTranslation } from "react-i18next";

import { RiTranslate } from "react-icons/ri";
import ButtonUI from "../UI/ButtonUI";

function ToggleLanguage() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const currentLanguage = i18n.language;
    const newLanguage = currentLanguage === "en" ? "zh" : "en";
    i18n.changeLanguage(newLanguage);
  };
  return (
    <ButtonUI btnStyle="btn__icon" onClick={toggleLanguage}>
      <RiTranslate size={30} />
    </ButtonUI>
  );
}
export default ToggleLanguage;
