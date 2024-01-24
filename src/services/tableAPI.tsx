import axios from "axios";

import { CartDataProps } from "../utils/type";

export async function searchTable(tableId: string) {
  const shoppingCar: [] = [];
  const totalAmount = 0;
  try {
    const response = await axios.patch(
      "https://simple-order-system.vercel.app/api/main",
      { shoppingCar, tableId, totalAmount }
    );
    const data = response.data;
    if (response.status >= 200 && response.status < 300) {
      return data;
    } else {
      throw new Error(data.message || "response.status 不在2xx範圍內");
    }
  } catch (error) {
    throw new Error("無法連接至伺服器或伺服器返回了錯誤訊息");
  }
}

export async function patchCart(props: CartDataProps) {
  const { shoppingCar, tableId, totalAmount } = props;
  try {
    const response = await axios.patch(
      "https://simple-order-system.vercel.app/api/main",
      { shoppingCar, tableId, totalAmount }
    );
    const data = response.data;
    if (response.status >= 200 && response.status < 300) {
      return data;
    } else {
      throw new Error(data.message || "response.status 不在2xx範圍內");
    }
  } catch (error) {
    throw new Error("無法連接至伺服器或伺服器返回了錯誤訊息");
  }
}
