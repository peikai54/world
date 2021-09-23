import { useSetState } from "ahooks";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react";
import { AddTask } from "src/api/Task";
import { IFormType, TaskState, TaskStateText } from "./type";

interface IProps {
  formType: IFormType;
  onSuccess: (value: AddTask.Params) => Promise<AddTask.Response>;
  visible: boolean;
  onCancel: () => void;
  initVal?: AddTask.Params;
}

const { Option } = Select;

const FormComp = (props: IProps) => {
  const { visible, onCancel, formType, initVal } = props;
  const [typeList, setTypeList] = useSetState<string[]>([]);
  const [targetList, setTargetList] = useSetState<string[]>([]);
  const [form] = useForm<AddTask.Params>();

  return (
    <Modal
      onCancel={onCancel}
      visible={visible}
      width={700}
      title={formType === IFormType.Add ? "添加任务" : "编辑任务"}
    >
      <section style={{ padding: "0 40px" }}>
        <Form form={form} labelCol={{ span: 6 }}>
          <Form.Item
            label="任务名称"
            name="task_name"
            initialValue={initVal?.task_name}
            rules={[{ required: true, message: "请输入任务名称" }]}
          >
            <Input placeholder="请输入任务名称" />
          </Form.Item>
          <Form.Item
            label="开始时间"
            name="start_time"
            initialValue={initVal?.start_time}
            rules={[{ required: true, message: "请输入开始名称" }]}
          >
            <DatePicker showTime style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="结束时间"
            name="end_time"
            initialValue={initVal?.end_time}
            rules={[{ required: true, message: "请输入结束名称" }]}
          >
            <DatePicker showTime style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="任务状态"
            name="state"
            initialValue={initVal?.state || TaskState.Pending}
            required
          >
            <Select>
              <>
                <Option key={TaskState.Pending} value={TaskState.Pending}>
                  {TaskStateText.Pending}
                </Option>
                <Option key={TaskState.Success} value={TaskState.Success}>
                  {TaskStateText.Success}
                </Option>
              </>
            </Select>
          </Form.Item>
          <Form.Item
            label="任务类型"
            name="type"
            initialValue={initVal?.type}
            rules={[{ required: true, message: "请输入任务类型" }]}
          >
            <Select mode="tags">
              {typeList?.map((el) => (
                <Option key={el} value={el}>
                  {el}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="所属目标"
            name="target"
            initialValue={initVal?.target}
            rules={[{ required: true, message: "所属目标为必填" }]}
          >
            <Select mode="tags">
              {targetList?.map((el) => (
                <Option key={el} value={el}>
                  {el}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </section>
    </Modal>
  );
};

export default FormComp;
