import { BrowserRouter } from 'react-router-dom';
import { Routes_ } from '../../routes/routes';
import { Flex } from 'antd';
import React from 'react';

const App = () => (
  <Flex align="center" justify="center" vertical style={{ minHeight: '100vh', width: '100%', backgroundColor: '#f2f6ff' }}>
    <BrowserRouter>
      <Routes_/>
    </BrowserRouter>
  </Flex>
);

export default App;
