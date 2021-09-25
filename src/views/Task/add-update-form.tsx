import { useRequest } from "ahooks";
import { DatePicker, Form, Input, message, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { PostAddTask, GetTaskTypeList, GetTargetList } from "@/api/Task";
import { IFormType, TaskState, TaskStateText } from "./type";
import { errorHandel } from "@/utils/handleError";
import moment from "moment";

interface IProps {
  formType: IFormType;
  onSuccess: (value: PostAddTask.Params) => Promise<PostAddTask.Response>;
  visible: boolean;
  onCancel: () => void;
  initVal?: PostAddTask.Params;
}

const { Option } = Select;

const FormComp = (props: IProps) => {
  const { visible, onCancel, formType, initVal } = props;
  const [modalVisible, setModalVisible] = useState<boolean>(visible);
  const [typeList, setTypeList] = useState<string[]>([]);
  const [targetList, setTargetList] = useState<string[]>([]);
  const [form] = useForm<PostAddTask.Params>();

  const { run: getTaskTypeList } = useRequest(GetTaskTypeList.request, {
    manual: true,
    onSuccess: (res) => {
      const data = res?.data;
      setTypeList(data?.map((el) => el.type) || []);
    },
    onError: errorHandel,
  });

  const { run: getTargetList } = useRequest(GetTargetList.request, {
    manual: true,
    onSuccess: (res) => {
      const data = res?.data;
      setTargetList(data?.map((el) => el.target) || []);
    },
    onError: errorHandel,
  });

  const { run: submit, loading: isLoading } = useRequest(PostAddTask.request, {
    manual: true,
    onSuccess: () => {
      setModalVisible(false);
      onCancel();
    },
    onError: errorHandel,
  });

  useEffect(() => {
    if (modalVisible) {
      getTaskTypeList();
      getTargetList();
    }
  }, [modalVisible]);

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  const submitForm = async () => {
    try {
      await form.validateFields();
    } catch (error) {
      return;
    }

    const values = form.getFieldsValue();
    const start_time = moment(values.start_time).valueOf();
    const end_time = moment(values.end_time).valueOf();

    submit({ ...values, start_time, end_time });
  };

  return (
    <Modal
      onCancel={onCancel}
      visible={modalVisible}
      width={700}
      title={formType === IFormType.Add ? "添加任务" : "编辑任务"}
      onOk={submitForm}
      okButtonProps={{ loading: isLoading }}
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
