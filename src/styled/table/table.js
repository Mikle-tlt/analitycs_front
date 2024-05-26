import { styled } from 'styled-components';
import { Table } from 'antd';
import { theme } from '../../utils';

export const StyledTable = styled(Table)`
  & .ant-table-tbody .ant-typography, & tbody td {
    color: ${ theme.colorTextBlack };
    font-size: 15px;
    font-weight: 500;
  }
  & thead {
    font-size: 17px;
  }
  & tfoot td {
    font-size: 16px;
    font-weight: 500;
  }
  .ant-table-summary {
    background: #e6e6fa;
    border: 1px solid #e0e1fc;
    border-radius: 0 0 8px 8px;
    & td:not(:first-child){
      text-align: center;
      color: rgba(49, 80, 125, 0.9);
    }
  }
`;