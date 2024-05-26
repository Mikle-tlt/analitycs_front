import { Typography } from 'antd';
import { styled } from 'styled-components';
import { theme } from '../../utils';

export const StyledLabel = styled(Typography.Text)`
  color: ${theme.colorTextBlack};
  font-size: 16px;
`;