import React, { useImperativeHandle, useRef, forwardRef } from 'react';
import type { CSSProperties, ForwardRefRenderFunction } from 'react';
import classNames from 'classnames';
import styles from './index.module.less';
import QueryForm, { QueryFormRef, QueryType } from './QueryForm';
import Title from '../Title';

export type QueryProps = {
  onChangeQuery?: (queryData: QueryType[]) => void;
  className?: string;
  style?: CSSProperties;
  data?: QueryType[];
};

 
const Query: ForwardRefRenderFunction<QueryFormRef, QueryProps> = (props, ref) => {
  const formRef = useRef<QueryFormRef>(null);
  useImperativeHandle(ref, () => ({
    formInstance: formRef.current?.formInstance!,
  }));

  return (
    <div className={classNames(props.className)} style={props.style}>
      <Title size={18}>参数设置</Title>
      <div className={styles.quick}></div>
      <QueryForm ref={formRef} onChangeQuery={props.onChangeQuery}></QueryForm>
    </div>
  );
};

export default forwardRef(Query);
