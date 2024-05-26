import { useEffect } from 'react';
import { useUserStore } from '../../services/stores/user/user-service';
import { Role, route } from '../../constants';
import { onHandler } from '../../utils/higher-order-func';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';
import { StyledForm } from './styled';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import useAlert from '../../hooks/alert/alert';
const { Text, Title } = Typography;

export const Login = () => {
  const { signIn, role } = useUserStore();
  const navigate = useNavigate();
  const [form] = useForm();
  const { success, error } = useAlert();

  const onSignIn = onHandler(async () => {
    const values = form.getFieldsValue();
    await signIn(values);
    success('Добро пожаловать в систему!')
  }, (message) => error(message));

  const getNavigate = () => {
    if (role === Role.ADMIN) {
      navigate(route.PROFILES)
    } else if (role === Role.MANAGER){
      navigate(route.CLIENTS.MAIN)
    }else {
      navigate(route.LOGIN)
    }
  }

  useEffect(() => {
    getNavigate();
  }, [role])

  return (
    <StyledForm name='login_form' form={form} onFinish={onSignIn}>
      <Title level={2}>Добро пожаловать!</Title>
      <Text>Введите данные для доступа к вашей учетной записи</Text>
      <Form.Item name="username" rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}>
        <Input
          size="large"
          id="username"
          placeholder="Логин"
          prefix={<UserOutlined style={{ color: '#6266f1' }} />} />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}>
        <Input.Password
          size="large"
          id="password"
          placeholder="Пароль"
          prefix={<LockOutlined style={{ color: '#6266f1' }} />} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block size='large'>
          Войти
        </Button>
      </Form.Item>
    </StyledForm>
  );
};