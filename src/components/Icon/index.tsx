import Icon from '@ant-design/icons';
import type { IconComponentProps } from '@ant-design/icons/lib/components/Icon';
import SettingSvg from '../../assets/setting.svg';
import LogoSvg from '../../assets/xique.svg';

const createIcon = (component: any) => (props: IconComponentProps) =>
  <Icon {...props} component={component} />;

export const LogoIcon = createIcon(LogoSvg);

export const SettingIcon = createIcon(SettingSvg);
