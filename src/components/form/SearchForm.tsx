import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import Form from "../UI/Form";
import InputUI from "../UI/InputUI";
import ButtonUI from "../UI/ButtonUI";
import { Alert } from "../../utils/getSweetalert";
import { searchTable } from "../../services/tableAPI";
import style from "./SearchForm.module.scss";

interface SearchTableProps {
  tableId: string;
}

function SearchForm() {
  const navigate = useNavigate();

  const uploadData = async (tableData: SearchTableProps) => {
    console.log("uploadData:", tableData);
    const { tableId } = tableData;
    try {
      await searchTable(tableId);
    } catch (error) {
      console.log(error);
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
    uploadData(tableData);
    navigate("/main");
  }

  return (
    <Form className="search" onSubmit={onSubmitHandler}>
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
