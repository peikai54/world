import HeaderContent from "@/components/HeaderContent";
import MainContent from "@/components/MainContent";
import WrapContent from "@/components/WrapContent";
import { Button } from "antd";
import React, { useState } from "react";
import FormComp from "./add-update-form";
import TaskTable from "./table";
import { IFormType } from "./type";

const Task = () => {
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [formType, setFormType] = useState<IFormType>(IFormType.Add);

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
          <TaskTable />
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
