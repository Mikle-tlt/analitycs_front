import { Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import React, { memo } from 'react';
import { route } from '../../constants';
import { useUserStore } from '../../services/stores/user/user-service';
import { useNavigate } from 'react-router-dom';
import { StyledHeader } from './styled';

export const Header = memo(({ collapsed, setCollapsed }) => {
  const { logout } = useUserStore();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    window.location.replace(route.LOGIN);
  }

  return (
    <StyledHeader theme="light">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
      />
      <Button onClick={onLogout}>Выход</Button>
    </StyledHeader>
  )
});