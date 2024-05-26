import { App } from 'antd';

const useAlert = () => {
  const { message } = App.useApp();

  const success = (content, duration = 3) => {
    message.success(content, duration);
  };

  const info = (content, duration = 3) => {
    message.info(content, duration);
  };

  const warning = (content, duration = 3) => {
    message.warning(content, duration);
  };

  const error = (content, duration = 3) => {
    message.error(content, duration);
  };

  return { success, info, warning, error };
};

export default useAlert;