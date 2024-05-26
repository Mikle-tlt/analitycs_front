import { styled } from 'styled-components';
import { Menu } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { theme } from '../../../utils';

export const StyledMenu = styled(Menu)`
  height: 100% - 50px;
`;

export const StyledContent = styled(Content)`
  background-color: ${theme.colorBg};
  overflow-y: auto;
  padding: 20px;
`;

export const StyledLogo = styled.img`
  display: block;
  width: 50px;
  margin: 0 auto;
  padding: 8px 0;
`;