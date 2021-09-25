import { message } from "antd";

export const errorHandel = (error) => {
  message.error(error.message);
};
