import http from "@/utils/http";
namespace TaskList {
  export class Params {
    size?: number;
    index?: number;
  }

  export class Response {
    message: string;
    code: number;
    data: {
      task_name: string;
      task_id: number;
      start_time: number;
      end_time: number;
      state: number;
      creater: string;
      type: string;
      target: string;
    };
  }
}

export default TaskList;
