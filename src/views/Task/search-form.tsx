import { GetTargetList, GetTaskTypeList } from "@/api/Task";
import { useRequest } from "ahooks";
import { Form, Row, Col, Input, Select, DatePicker, Space, Button } from "antd";
import React, { useEffect, useState } from "react";
import { IFilter, TaskStateList } from "./type";

const { Option } = Select;

const { RangePicker } = DatePicker;

interface IProps {
  onChange: (filter: IFilter) => void;
}

const SearchForm = (props: IProps) => {
  const [form] = Form.useForm<IFilter>();
  const { onChange } = props;
  const [typeList, setTypeList] = useState<{ type: string }[]>([]);
  const [targetList, setTargetList] = useState<{ target: string }[]>([]);

  const { run: getTypeList } = useRequest(GetTaskTypeList.request, {
    manual: true,
    onSuccess: (res) => {
      setTypeList(res.data);
    },
  });

  const { run: getTargetList } = useRequest(GetTargetList.request, {
    manual: true,
    onSuccess: (res) => {
      setTargetList(res.data);
    },
  });

  const submit = () => {};

  useEffect(() => {
    getTypeList();
    getTargetList();
  }, []);

  return (
    <Form form={form} style={{ margin: "20px 0" }}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Form.Item name="task_name" label="任务名称">
            <Input placeholder="支持模糊查询" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="state" label="任务状态">
            <Select mode="tags">
              {TaskStateList.map((el) => (
                <Option value={el.state} key={el.state}>
                  {el.text}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="type" label="任务类型">
            <Select mode="tags" allowClear>
              {typeList.map((el) => (
                <Option key={el.type} value={el.type}>
                  {el.type}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="target" label="所属目标">
            <Select mode="tags" allowClear>
              {targetList.map((el) => (
                <Option key={el.target} value={el.target}>
                  {el.target}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 20]}>
        <Col span={7}>
          <Form.Item name="start_range" label="开始时间">
            <RangePicker />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item name="end_range" label="结束时间">
            <RangePicker />
          </Form.Item>
        </Col>
        <Col span={10} style={{ textAlign: "right", paddingRight: "30px" }}>
          <Space size="large">
            <Button type="primary" onClick={submit}>
              查询
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
                onChange({});
              }}
            >
              重置
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;
