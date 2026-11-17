import { useContext } from "react";
import { AlertContext } from "./AlertContext.jsx";

export const useAlert = () => {
  return useContext(AlertContext);
};