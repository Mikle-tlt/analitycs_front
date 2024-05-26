import { useState } from 'react';
import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../../../components/header';
import { ManagerItems, Role } from '../../../constants';
import { StyledContent, StyledLogo, StyledMenu } from './styled';
import Logo from '../../../assets/image/Without text.png';
import { useUserStore } from '../../../services/stores/user/user-service';
import { AdminItems } from '../../../constants/menu-items/menu-items';
import { ErrorBoundary } from '../../../components/error-boundary';

export const MainContent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { role } = useUserStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSelect = async ({ key }) => {
    navigate(key);
  }

  return (
    <Layout style={{ height: '100vh', maxHeight: '100vh', width: '100%'}}>
      <Sider trigger={null} collapsible collapsed={collapsed} width={'250px'} style={{ overflowY: 'auto' }}>
        <StyledLogo src={Logo} alt='logo' />
        <StyledMenu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[0]}
          selectedKeys={[pathname]}
          items={role === Role.MANAGER ? ManagerItems : AdminItems}
          onSelect={handleSelect}
        />
      </Sider>
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <StyledContent>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </StyledContent>
      </Layout>
    </Layout>
  );
};