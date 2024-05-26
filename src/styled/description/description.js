import { styled } from 'styled-components';
import { theme } from '../../utils';

export const DescriptionStyled = styled.div`
  margin-top: 20px;
  width: 100%;
  padding: 15px 30px;
  color: ${theme.colorTextBlack};
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid rgba(49, 80, 125, 0.5);
`;