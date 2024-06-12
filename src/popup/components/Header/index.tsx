import { CSSProperties, FC } from 'react';
import { LogoIcon, SettingIcon } from '../../../components/Icon';
import styles from './index.module.less';
import classNames from 'classnames';
export type HeaderProps = {
  className?: string;
  style?: CSSProperties;
};

const Header: FC<HeaderProps> = (props) => {
  return (
    <div className={classNames(styles.header, props.className)}>
      <div className={styles.left}>
        <LogoIcon className={styles.logo} />
        <div className={styles.title}>Magpie</div>
      </div>
      <SettingIcon className={styles.setting} onClick={() => {
        chrome.runtime.openOptionsPage();
      }} />
    </div>
  );
};

export default Header;
