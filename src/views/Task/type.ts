import { GetTaskList } from "@/api/Task";

export type ITaskList = GetTaskList.Response;

export enum IFormType {
  Edit = "edit",
  Add = "add",
}

export enum TaskState {
  Pending = 1,
  Runing = 2,
  Success = 3,
  Fail = 4,
  Stop = 5,
}

export enum TaskStateText {
  Pending = "未开始",
  Runing = "进行中",
  Success = "已成功",
  Fail = "已失败",
  Stop = "已停止",
}
