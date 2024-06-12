import React, {
  CSSProperties,
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, FormInstance, Input, Row } from 'antd';
import styles from './index.module.less';
import useStore from 'src/hooks/useStore';
import { QuickQueryData } from 'src/store';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

export type QuickQueryType = {
  query: QuickQueryData[];
};

export type QuickQueryProps = {
  className?: string;
  style?: CSSProperties;
};

export type QuickQueryRef = {
  formInstance: FormInstance<QuickQueryType>;
};

const QuickQuery: ForwardRefRenderFunction<QuickQueryRef, QuickQueryProps> = (
  props,
  ref
) => {
  const [formInstance] = Form.useForm<QuickQueryType>();
  const [quickQueryData, setQuickQueryData] = useStore('quickQuery');

  useEffect(() => {
    formInstance.setFieldsValue({ query: quickQueryData });
  }, [formInstance, quickQueryData]);

  useImperativeHandle(ref, () => ({
    formInstance,
  }));

  return (
    <div>
      <Form<QuickQueryType>
        form={formInstance}
        {...formItemLayoutWithOutLabel}
        style={{ width: 800 }}
      >
        <Form.List name="query">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...formItemLayout}
                  label={null}
                  required={false}
                  key={field.key}
                >
                  <Row key={field.key} gutter={8} align="middle">
                    <Col span={6}>
                      <Form.Item
                        noStyle
                        name={[field.name, 'title']}
                        rules={[
                          {
                            required: true,
                            message: '请输入快捷参数标题',
                            validator: (_, value) => {
                              if (!value)
                                return Promise.reject(
                                  new Error('参数标题不能为空')
                                );
                              const currentFormValues =
                                formInstance.getFieldsValue();
                              const sameTitle = currentFormValues.query.filter(
                                (item) => item?.title === value
                              );
                              if (sameTitle.length > 1)
                                return Promise.reject(
                                  new Error('参数标题不能重复')
                                );
                              return Promise.resolve();
                            },
                          },
                        ]}
                      >
                        <Input placeholder="参数标题" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        noStyle
                        name={[field.name, 'key']}
                        rules={[
                          {
                            required: true,
                            message: '请输入快捷参数名',
                          },
                        ]}
                      >
                        <Input placeholder="参数名" />
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <Form.Item
                        noStyle
                        name={[field.name, 'value']}
                      >
                        <Input placeholder="参数值" />
                      </Form.Item>
                    </Col>
                    <Col span={1}>
                      <MinusCircleOutlined
                        className={styles.deleteIcon}
                        onClick={() => remove(field.name)}
                      />
                    </Col>
                  </Row>
                </Form.Item>
              ))}
              <Button
                type="dashed"
                onClick={async () => {
                  try {
                    await formInstance.validateFields();
                    add();
                  } catch (error) {
                    console.log(error);
                  }
                }}
                style={{ width: '400px' }}
                icon={<PlusOutlined />}
              >
                添加参数
              </Button>
            </>
          )}
        </Form.List>
      </Form>
      <Button
        type="primary"
        style={{ width: '400px', marginTop: 30 }}
        onClick={async () => {
          try {
            const data = await formInstance.validateFields();
            setQuickQueryData(data.query);
          } catch (error) {}
        }}
      >
        保存
      </Button>
    </div>
  );
};

export default forwardRef(QuickQuery);
