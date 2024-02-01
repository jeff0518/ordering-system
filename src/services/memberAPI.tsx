import axios from "axios";

interface MemberProps {
  phoneNumber: string;
  fixName: string;
}

interface NewSpendingProps {
  phoneNumber: string;
  newDate: string;
  newPoint: string;
  newSpendingId: string;
}

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

export async function patchMember({ fixName, phoneNumber }: MemberProps) {
  try {
    const response = await axios.patch(
      `https://simple-order-system.vercel.app/api/member/${phoneNumber}`,
      {
        newName: fixName,
        phoneNumber,
      }
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

export async function createNewSpending({
  phoneNumber,
  newSpendingId,
  newDate,
  newPoint,
}: NewSpendingProps) {
  try {
    const response = await axios.post(
      "https://simple-order-system.vercel.app/api/member/addNewSpending",
      { phoneNumber, newSpendingId, newDate, newPoint }
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
