import axios from "axios";

export async function postRequestHandler<T>({
  values,
  url,
}: {
  values: T;
  url: string;
}) {
  if (!values) {
    return;
  }

  try {
    await axios.post(url, values);
    return true; // Indicate success
  } catch (error: any) {
    throw error.response?.data?.message || "An error occurred";
  }
}
