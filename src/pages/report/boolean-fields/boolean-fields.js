import { StyledLabel } from '../../../styled/label/label';
import { Flex } from 'antd';
import React from 'react';

export const BooleanFields = ({ label }) => (
  <Flex gap='10px' align='center' style={{ marginBottom: '10px' }}>
    <StyledLabel>{ label }</StyledLabel>
  </Flex>
)