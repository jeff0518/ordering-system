import axios from "axios";

export async function getMeals() {
  try {
    const response = await axios.get(
      "https://simple-order-system.vercel.app/api/menu"
    );
    return response;
  } catch (error) {
    throw new Error("failed");
  }
}
