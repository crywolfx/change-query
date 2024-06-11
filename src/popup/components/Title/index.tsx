import React from 'react';
import type { FC, CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './index.module.less';

export type TitleProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  size?: number;
};
const Title: FC<TitleProps> = (props) => {
  return (
    <div
      className={classNames(props.className, styles.title)}
      style={{
        ...props.style,
        fontSize: props.size,
      }}
    >
      {props.children}
    </div>
  );
};

export default Title;
