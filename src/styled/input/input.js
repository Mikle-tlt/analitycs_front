import { styled } from 'styled-components';
import { Input, InputNumber } from 'antd';
import { theme } from '../../utils';

export const StyledInput = styled(Input)`
  color: ${theme.colorTextBlack};
`;

export const StyledNumberInput = styled(InputNumber)`
  width: 100%;
  & .ant-input-number-input  {
    color: ${theme.colorTextBlack};
  }
`;