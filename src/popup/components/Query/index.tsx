import React, {
  useImperativeHandle,
  useRef,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import type { CSSProperties, ForwardRefRenderFunction } from 'react';
import classNames from 'classnames';
import styles from './index.module.less';
import QueryForm, { QueryFormRef, QueryType } from './QueryForm';
import Title from '../Title';
import useStore from 'src/hooks/useStore';
import { Form, Switch } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { QuickQueryData } from 'src/store';
import { simpleClone } from 'src/lib/type';

export type QueryProps = {
  onChangeQuery?: (queryData: QueryType[]) => void;
  className?: string;
  style?: CSSProperties;
  data?: QueryType[];
};

const Query: ForwardRefRenderFunction<QueryFormRef, QueryProps> = (
  props,
  ref
) => {
  const [quickData] = useStore('quickQuery');
  const [currentQueryData, setCurrentQueryData] = useState<QueryType[]>();
  const formRef = useRef<QueryFormRef>(null);
  const query = Form.useWatch('query', formRef.current?.formInstance);

  const onChangeQueryMemo = useMemoizedFn(props?.onChangeQuery || (() => {}));

  useImperativeHandle(ref, () => ({
    formInstance: formRef.current?.formInstance!,
  }));

  useEffect(() => {
    const formatedQueryData = query?.filter?.((item) => item?.key);
    setCurrentQueryData(formatedQueryData);
    onChangeQueryMemo(formatedQueryData);
  }, [onChangeQueryMemo, query]);

  const checkIsChecked = (quickDataItem: QuickQueryData) =>
    currentQueryData?.some(
      (item) =>
        item?.key === quickDataItem.key && item?.value === quickDataItem.value
    );

  const onChangeIsChecked = (
    checked: boolean,
    quickDataItem: QuickQueryData
  ) => {
    let newQueryData: QueryType[] = [];
    const clonedQueryData = simpleClone(currentQueryData);
    if (checked) {
      const sameOne = clonedQueryData?.find(
        (item) => item.key === quickDataItem.key
      );
      if (sameOne) {
        sameOne.value = quickDataItem.value;
        newQueryData = clonedQueryData || [];
      } else {
        newQueryData = [
          ...(clonedQueryData || []),
          {
            key: quickDataItem.key,
            value: quickDataItem.value,
          },
        ];
      }
    } else {
      newQueryData =
        currentQueryData?.filter(
          (item) =>
            item.key !== quickDataItem.key && item.value !== quickDataItem.value
        ) || [];
    }
    formRef.current?.formInstance.setFieldsValue({
      query: newQueryData,
    });
  };

  return (
    <div className={classNames(props.className)} style={props.style}>
      <Title size={18}>参数设置</Title>
      {(quickData.length && (
        <div className={styles.quick}>
          {quickData.map((item) => (
            <div className={styles.quickItem} key={item.title}>
              <div className={styles.quickTitle}>{item.title}</div>
              <Switch
                size="small"
                checked={checkIsChecked(item)}
                onChange={(e) => onChangeIsChecked(e, item)}
              />
            </div>
          ))}
        </div>
      )) ||
        null}
      <QueryForm ref={formRef}></QueryForm>
    </div>
  );
};

export default forwardRef(Query);
