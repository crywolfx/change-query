import React, {
  CSSProperties,
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, FormInstance, Input, Row } from 'antd';
import styles from './index.module.less';

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

export type QueryType = {
  key: string;
  value: string;
};

export type QueryFormType = {
  query: QueryType[];
};

export type QueryFormProps = {
  className?: string;
  style?: CSSProperties;
};

export type QueryFormRef = {
  formInstance: FormInstance<QueryFormType>;
};

const QueryForm: ForwardRefRenderFunction<QueryFormRef, QueryFormProps> = (
  props,
  ref
) => {
  const [formInstance] = Form.useForm<QueryFormType>();
  const htmlRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    formInstance,
  }));

  return (
    <div>
      <Form<QueryFormType> form={formInstance} {...formItemLayoutWithOutLabel}>
        <Form.List name="query">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={null}
                  required={false}
                  key={field.key}
                >
                  <Row key={field.key} gutter={8} align="middle">
                    <Col span={8}>
                      <Form.Item
                        noStyle
                        name={[field.name, 'key']}
                        rules={[
                          {
                            required: true,
                            message: '请输入参数名',
                          },
                        ]}
                      >
                        <Input placeholder="参数名" />
                      </Form.Item>
                    </Col>
                    <Col span={14}>
                      <Form.Item noStyle name={[field.name, 'value']}>
                        <Input placeholder="参数值" />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <MinusCircleOutlined
                        className={styles.deleteIcon}
                        onClick={() => remove(field.name)}
                      />
                    </Col>
                  </Row>
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={async () => {
                    try {
                      await formInstance.validateFields();
                      add();
                      htmlRef.current?.scrollIntoView({
                        behavior: 'smooth',
                      });
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  style={{ width: '100%' }}
                  icon={<PlusOutlined />}
                >
                  添加参数
                </Button>
                <div style={{ height: 50, width: '100%' }} ref={htmlRef}></div>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
};

export default forwardRef(QueryForm);
