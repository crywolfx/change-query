import React, {
  CSSProperties,
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, FormInstance, Input, Row } from 'antd';
import styles from './index.module.less';
import { useMemoizedFn } from 'ahooks';

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
  onChangeQuery?: (query: QueryType[]) => void;
};

export type QueryFormRef = {
  formInstance: FormInstance<QueryFormType>;
};

const QueryForm: ForwardRefRenderFunction<QueryFormRef, QueryFormProps> = (
  props,
  ref
) => {
  const [formInstance] = Form.useForm<QueryFormType>();
  const query = Form.useWatch('query', formInstance);
  const buttonRef = useRef<HTMLButtonElement>(null)

  const onChangeQueryMemo = useMemoizedFn(props?.onChangeQuery || (() => {}));

  useEffect(() => {
    const formatedQueryData = query?.filter?.((item) => item?.key);
    onChangeQueryMemo(formatedQueryData);
  }, [onChangeQueryMemo, query]);

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
                  ref={buttonRef}
                  onClick={async () => {
                    try {
                      await formInstance.validateFields();
                      add();
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  style={{ width: '100%' }}
                  icon={<PlusOutlined />}
                >
                  添加参数
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
};

export default forwardRef(QueryForm);
