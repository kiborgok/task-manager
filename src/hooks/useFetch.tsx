import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_API_URL } from "../lib/constants";
import { TodoType } from "../types/types";

export const useFetch = () => {
  return useQuery({
    queryKey: ["todosData", `${BASE_API_URL}/todos`],
    queryFn: () => axios.get<TodoType[]>(`${BASE_API_URL}/todos`),
  });
};