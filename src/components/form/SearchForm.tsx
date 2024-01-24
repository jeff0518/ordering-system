import { FormEvent, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

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

  const uploadData = async (tableData: SearchTableProps) => {
    const { tableId } = tableData;
    try {
      await searchTable(tableId);
      localStorage.setItem("tableId", tableId);
      setIsLoading(false);
      navigate("/main");
    } catch (error) {
      console.log(error);
      throw new Error("資料上傳失敗");
    }
  };

  function onSubmitHandler(event: FormEvent) {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const fd = new FormData(formElement);
    const tableId = fd.get("tableId");
    if (!tableId || tableId.toString().length > 2) {
      Alert.fire({
        title: "您輸入的桌號有誤！",
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
      title: `已經在 ${storedTableId} 點過餐`,
      icon: "warning",
      confirmButtonText: `回到 ${storedTableId}`,
      showCancelButton: true,
      cancelButtonText: "重新輸入桌號",
    }).then((result) => {
      if (result.isConfirmed === undefined) return;

      if (result.isConfirmed) {
        navigateCallback("/main");
      } else {
        localStorage.removeItem("tableId");
        navigateCallback("/");
      }
    });
  }, [navigateCallback]);
  return (
    <Form className="search" onSubmit={onSubmitHandler}>
      {isLoading && <Loading />}
      <div className={style.searchForm_input}>
        <InputUI
          label="桌號"
          id="tableId"
          type="number"
          placeholder="請輸入桌號"
          inputStyle="input_search"
        />
      </div>
      <div className={style.searchForm_bnt}>
        <ButtonUI btnStyle="btn__pill">送出</ButtonUI>
      </div>
    </Form>
  );
}
export default SearchForm;
