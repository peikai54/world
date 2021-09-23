import HeaderContent from "@/components/HeaderContent";
import MainContent from "@/components/MainContent";
import WrapContent from "@/components/WrapContent";
import { Button, Table, TableColumnsType } from "antd";
import React, { useState } from "react";
import FormComp from "./add-update-form";
import { IFormType, ITaskList } from "./type";

const Task = () => {
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [formType, setFormType] = useState<IFormType>(IFormType.Add);

  const columns: TableColumnsType<ITaskList> = [
    {
      title: "任务名称",
      dataIndex: "task_name",
    },
  ];

  return (
    <WrapContent>
      <>
        <HeaderContent
          title="任务管理"
          button={
            <Button
              type="primary"
              onClick={() => {
                setFormVisible(true);
                setFormType(IFormType.Add);
              }}
            >
              添加任务
            </Button>
          }
        />
        <MainContent>
          <Table columns={columns} />
        </MainContent>
        <FormComp
          onCancel={() => setFormVisible(false)}
          visible={formVisible}
          onSuccess={null}
          formType={formType}
        />
      </>
    </WrapContent>
  );
};

export default Task;
