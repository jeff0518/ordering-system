import { useTranslation } from "react-i18next";

import { Alert } from "./getSweetalert";

export function useCheckLoginStatus() {
  const storedTableId = localStorage.getItem("tableId");
  const { t } = useTranslation();
  if (!storedTableId) {
    Alert.fire({
      title: `${t("messages.again")}`,
      icon: "error",
    });
  }

  return storedTableId;
}
