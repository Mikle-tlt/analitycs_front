import { Select } from 'antd';
import { styled } from 'styled-components';
import { theme } from '../../utils';

export const StyledSelect = styled(Select)`
  width: ${({ width }) => width || '100%'};
  & span {
    color: ${theme.colorTextBlack};
    text-align: left;
  }
`;