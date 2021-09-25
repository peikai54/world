import http from "@/utils/http";

namespace TaskTypeList {
  export class Response {
    code: number;
    message: string;
    data: {
      type: string;
    }[];
  }

  export const url = "/task-type-list";

  export const request = (): Promise<Response> => {
    return http.get(url);
  };
}

export default TaskTypeList;
