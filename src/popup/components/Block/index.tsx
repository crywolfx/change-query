import React from 'react';
import type { FC, CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './index.module.less';

export type BlockProps = {
  className?: string;
  style?: CSSProperties;
}
const Block: FC<BlockProps> = (props) => {
  return (
    <div className={classNames(props.className, styles.block)} style={props.style}>
    </div>
  );
}

export default Block;