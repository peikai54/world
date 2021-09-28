import http from "@/utils/http";
namespace TaskList {
  export class Params {
    task_name?: string;
    state?: number;
    creater?: string;
    type?: string;
    target?: string;
    start_range?: string;
    end_range?: string;
    size?: number;
    index?: number;
  }

  export class Response {
    message: string;
    code: number;
    data: {
      items: {
        task_name: string;
        task_id: number;
        start_time: number;
        end_time: number;
        state: number;
        creater: string;
        type: string;
        target: string;
      }[];
      total: number;
    };
  }

  export const url = "/task-list";

  export const request = async (query: Params): Promise<Response> => {
    return http.get(url, { params: query });
  };
}

export default TaskList;
