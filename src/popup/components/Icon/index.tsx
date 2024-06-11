import Icon from '@ant-design/icons';
import type { IconComponentProps } from '@ant-design/icons/lib/components/Icon';
import ChristmasSvg from '../../assets/christmas.svg';

const createIcon = (component: any) => (props: IconComponentProps) =>
  <Icon {...props} component={component} />;

export const ChristmasTree = createIcon(ChristmasSvg);
