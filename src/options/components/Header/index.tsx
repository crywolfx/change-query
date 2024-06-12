import React from 'react';
import type { FC, CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './index.module.less';
import { LogoIcon } from 'src/components/Icon';

export type HeaderProps = {
  className?: string;
  style?: CSSProperties;
}
const Header: FC<HeaderProps> = (props) => {
  return (
    <div
      className={classNames(props.className, styles.header)}
      style={props.style}
    >
      <LogoIcon className={styles.logo} />
      <div className={styles.title}>Magpie</div>
    </div>
  );
}

export default Header;