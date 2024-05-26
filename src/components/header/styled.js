import { Header } from 'antd/es/layout/layout';
import { styled } from 'styled-components';
import { theme } from '../../utils';

export const StyledHeader = styled(Header)`
  background: ${theme.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;