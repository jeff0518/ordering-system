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
      throw new Error(data.message || "rang");
    }
  } catch (error) {
    throw new Error("failed");
  }
}

export async function getCart(tableId: string) {
  try {
    const response = await axios.get(
      `https://simple-order-system.vercel.app/api/main/${tableId}`
    );
    return response;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.data &&
      error.response.data.error
    ) {
      const errorMessage = error.response.data.error;
      throw new Error(`${errorMessage}`);
    } else {
      throw new Error("failed");
    }
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
      throw new Error(data.message || "rang");
    }
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.data &&
      error.response.data.error
    ) {
      const errorMessage = error.response.data.error;
      throw new Error(`${errorMessage}`);
    } else {
      throw new Error("failed");
    }
  }
}

export async function getTheCheck(tableId: string) {
  try {
    const response = await axios.patch(
      `https://simple-order-system.vercel.app/api/main/${tableId}`,
      {
        tableId,
      }
    );

    const data = response.data;
    if (response.status >= 200 && response.status < 300) {
      return data;
    } else {
      throw new Error(data.message || "rang");
    }
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.data &&
      error.response.data.error
    ) {
      const errorMessage = error.response.data.error;
      throw new Error(`${errorMessage}`);
    } else {
      throw new Error("failed");
    }
  }
}
