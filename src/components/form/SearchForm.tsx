import { FormEvent, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Form from "../UI/Form";
import InputUI from "../UI/InputUI";
import ButtonUI from "../UI/ButtonUI";
import Loading from "../error/Loading";
import { Alert, Dialog } from "../../utils/getSweetalert";
import { searchTable } from "../../services/tableAPI";
import style from "./SearchForm.module.scss";

interface SearchTableProps {
  tableId: string;
}

function SearchForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const navigateCallback = useCallback(navigate, [navigate]);
  const { t } = useTranslation();

  const uploadData = async (tableData: SearchTableProps) => {
    const { tableId } = tableData;
    try {
      await searchTable(tableId);
      localStorage.setItem("tableId", tableId);
      setIsLoading(false);
      navigate("/main");
    } catch (error) {
      console.log(error);
      throw new Error(`${t("messages.Upload data failed")}`);
    }
  };

  function onSubmitHandler(event: FormEvent) {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const fd = new FormData(formElement);
    const tableId = fd.get("tableId");
    if (!tableId || tableId.toString().length > 2) {
      Alert.fire({
        title: `${t("messages.tableIncorrect")}`,
        icon: "error",
      });
      return;
    }
    const tableData = { tableId: `${tableId}桌` };
    // const tableData = Object.fromEntries(fd.entries()); 由於資料庫的值有桌這個字，因此這段不適用。
    setIsLoading(true);
    uploadData(tableData);
  }

  useEffect(() => {
    const storedTableId = localStorage.getItem("tableId");
    console.log(storedTableId);

    if (!storedTableId) return;

    Dialog.fire({
      title: `${t("messages.alreadyOrder", {
        storedTableId: `${storedTableId}`,
      })}`,
      icon: "warning",
      confirmButtonText: `${t("messages.return", {
        storedTableId: `${storedTableId}`,
      })}`,
      showCancelButton: true,
      cancelButtonText: `${t("messages.again")}`,
    }).then((result) => {
      if (result.isConfirmed === undefined) return;

      if (result.isConfirmed) {
        navigateCallback("/main");
      } else {
        localStorage.removeItem("tableId");
        localStorage.removeItem("cart");
        navigateCallback("/");
      }
    });
  }, [navigateCallback, t]);
  return (
    <Form className="search" onSubmit={onSubmitHandler}>
      {isLoading && <Loading />}
      <div className={style.searchForm_input}>
        <InputUI
          label={t("input.table")}
          id="tableId"
          type="number"
          placeholder={t("input.tableNumber")}
          inputStyle="input_search"
        />
      </div>
      <div className={style.searchForm_bnt}>
        <ButtonUI btnStyle="btn__pill">{t("button.send")}</ButtonUI>
      </div>
    </Form>
  );
}
export default SearchForm;
