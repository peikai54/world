import http from "@/utils/http";

namespace TaskTypeList {
  export class Response {
    code: number;
    message: string;
    data: {
      target: string;
    }[];
  }

  export const url = "/target-list";

  export const request = (): Promise<Response> => {
    return http.get(url);
  };
}

export default TaskTypeList;
