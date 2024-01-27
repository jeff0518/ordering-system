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
      throw new Error(
        response.data.message ||
          "The response status is not in the 2xx rang.(不在2xx範圍內)"
      );
    }
  } catch (error) {
    throw new Error(
      "Connection to the Server Failed or the Server Returned an Error.(無法連接至伺服器或伺服器返回了錯誤訊息)"
    );
  }
}
