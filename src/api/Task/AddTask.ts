import http from "@/utils/http";

namespace AddTask {
  export class Params {
    task_name: string;
    start_time: number;
    end_time: number;
    state: number;
    creater: string;
    type: string;
    target: string;
  }

  export class Response {
    code: number;
    message: string;
  }

  export const url = "/task/add";

  export const request = (params: Params): Promise<Response> => {
    return http.post(url, { ...params });
  };
}

export default AddTask;
