import { styled } from 'styled-components';
import { Checkbox } from 'antd';

export const StyledCheckboxGroup = styled(Checkbox.Group)`
  display: flex;
  flex-direction: column;
  .ant-checkbox-inner {
    width: 18px;
    height: 18px;
  }
  span {
    font-size: 17px;
  }
`;