import axios from "axios";

export async function createMember(phoneNumber: string) {
  try {
    const response = await axios.post(
      "https://simple-order-system.vercel.app/api/member/addNewMember",
      { phoneNumber }
    );

    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(response.data.message || "rang");
    }
  } catch (error) {
    throw new Error("failed");
  }
}

export async function getMember(phoneNumber: string) {
  try {
    const response = await axios.get(
      `https://simple-order-system.vercel.app/api/member/${phoneNumber}`
    );

    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(response.data.message || "rang");
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
