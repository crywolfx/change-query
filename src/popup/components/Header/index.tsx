import { CSSProperties, FC } from 'react';
import { ChristmasTree } from '../Icon';
import style from './index.module.less';
import classNames from 'classnames';
export type HeaderProps = {
  className?: string;
  style?: CSSProperties;
};

const Header: FC<HeaderProps> = (props) => {
  return (
    <div className={classNames(style.header, props.className)}>
      <ChristmasTree className={style.logo} />
      <div className={style.right}>Christmas</div>
    </div>
  );
};

export default Header;
