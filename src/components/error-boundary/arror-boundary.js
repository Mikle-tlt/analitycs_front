import { Component } from 'react';
import ErrorImage from '../../assets/image/error.png';
import { Flex, Typography } from 'antd';

export class ErrorBoundary extends Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <Flex vertical justify='center' align='center' gap={20}>
          <img src={ErrorImage} alt="error icon" style={{ maxWidth: '300px' }}/>
          <Typography.Title level={4}>Упс...Произошла ошибка!</Typography.Title>
        </Flex>
      );
    }
    return this.props.children;
  }
}
