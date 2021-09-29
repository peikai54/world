import { GetTaskList } from "@/api/Task";
import { errorHandel } from "@/utils/handleError";
import useRequest from "@ahooksjs/use-request";
import { Table, TableColumnsType, Button } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { IFilter, ITask, TaskState, TaskStateText } from "./type";

interface IProps {
  filter: IFilter;
}

const TaskTable = (props: IProps) => {
  const { filter = {} } = props;

  const [dataSource, setDataSource] = useState<ITask[]>([]);

  const { run: getTaskList, loading } = useRequest(GetTaskList.request, {
    manual: true,
    onSuccess: (res) => {
      setDataSource(res.data.items);
    },
    onError: errorHandel,
  });

  useEffect(() => {
    getTaskList(filter);
  }, [filter]);

  const columns: TableColumnsType<ITask> = [
    {
      title: "任务名称",
      dataIndex: "task_name",
    },
    {
      title: "开始时间",
      render: (_text, record) =>
        moment(record.start_time * 1000).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "结束时间",
      render: (_text, record) =>
        moment(record.end_time * 1000).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "任务状态",
      render: (_text, record) => {
        switch (record.state) {
          case TaskState.Pending:
            return TaskStateText.Pending;
          case TaskState.Fail:
            return TaskStateText.Fail;
          case TaskState.Runing:
            return TaskStateText.Runing;
          case TaskState.Stop:
            return TaskState.Runing;
          case TaskState.Success:
            return TaskStateText.Success;
          default:
            return "";
        }
      },
    },
    {
      title: "任务类型",
      dataIndex: "type",
    },
    {
      title: "所属目标",
      dataIndex: "target",
    },
    {
      title: "操作",
      width: "10%",
      render: (text, record) => {
        return (
          <section
            style={{ position: "relative", left: "-15px", display: "flex" }}
          >
            <Button type="link" size="small" style={{ color: "#1890ff" }}>
              编辑
            </Button>
            <Button type="link" size="small" style={{ color: "#1890ff" }}>
              结束
            </Button>
            <Button type="link" size="small" danger>
              删除
            </Button>
          </section>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey={(record) => record.task_id}
      bordered
    />
  );
};

export default TaskTable;
