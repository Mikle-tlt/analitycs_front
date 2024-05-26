import styled from 'styled-components';
import { Form } from 'antd';

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: #fff;
  padding: 30px 40px;
  max-width: 700px;
  min-width: 450px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(98, 102, 241, 0.1);
  & h2, & span {
    text-align: center;
  }
  max-height: calc(100vh - 50px);
  overflow-y: auto;
  z-index: 100001;
`;