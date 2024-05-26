import { styled } from 'styled-components';
import { Form } from 'antd';

export const StyledListForm = styled(Form)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  & .ant-form-item:has(input) {
    flex-grow: 1;
  }
`;