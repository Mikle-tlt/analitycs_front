import React from 'react';
import { useProfilesStore } from '../../services/stores/profiles/profiles-service';
import { useNavigate } from 'react-router-dom';
import { onHandler } from '../../utils/higher-order-func';
import { route } from '../../constants';
import { StyledForm } from '../login/styled';
import { Button, Flex, Form, Input, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import useAlert from '../../hooks/alert/alert';

const { Text, Title } = Typography;

export const Registration = () => {
  const { addProfile } = useProfilesStore();
  const { success, error } = useAlert();
  const navigate = useNavigate();
  const [form] = useForm();

  const onSignUp = onHandler(async () => {
    const values = form.getFieldsValue();
    await addProfile(values);
    success('Учетная запись менеджера успешно создана!')
    navigate(route.PROFILES);
  }, (message) => error(message))

  return (
    <Flex align="center" justify="center">
      <StyledForm name='sighup_form' form={form} onFinish={onSignUp}>
        <Title level={2}>Регистрация клиента</Title>
        <Text>Введите данные для добавления учетной записи клиента</Text>
        <Form.Item name="username" rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}>
          <Input
            size="large"
            id="username"
            placeholder="Логин"
            autocompete="false"
            prefix={<UserOutlined style={{ color: '#6266f1' }} />} />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}>
          <Input.Password
            size="large"
            id="password"
            placeholder="Пароль"
            autocompete="false"
            prefix={<LockOutlined style={{ color: '#6266f1' }} />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block size='large'>
            Добавить
          </Button>
        </Form.Item>
      </StyledForm>
    </Flex>
  );
};