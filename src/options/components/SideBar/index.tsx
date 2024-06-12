import React, { useMemo } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { RouteConfig } from 'src/options/types/route';
import { useLocation } from 'react-router-dom';

export type SideBarProps = {
  router: RouteConfig[];
};

const SideBar: React.FC<SideBarProps> = ({ router }) => {
  const location = useLocation();
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  const items = useMemo(() => {
    return router.map((item) => ({
      key: item.path as any,
      label: item.title,
      icon: item.icon,
    }));
  }, [router]);

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256, height: '100%' }}
      defaultSelectedKeys={[location.pathname]}
      mode="inline"
      items={items}
    />
  );
};

export default SideBar;
