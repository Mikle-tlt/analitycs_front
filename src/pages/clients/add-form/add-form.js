import Title from 'antd/es/typography/Title';
import { Button, Flex, Form, Input } from 'antd';
import { CloseOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { AddFormWrapper } from '../../../styled/add-form/add-form';
import { StyledForm } from '../../login/styled';
import { onHandler } from '../../../utils/higher-order-func';
import { useForm } from 'antd/es/form/Form';
import useAlert from '../../../hooks/alert/alert';
import { useClientsStore } from '../../../services/stores/clients/clients-service';

export const AddForm = ({ closeForm }) => {
  const { addClient } = useClientsStore();
  const { success, error } = useAlert();
  const [form] = useForm();

  const onAddClient = onHandler(async () => {
    const values = form.getFieldsValue();
    await addClient(values);
    closeForm();
    success('Клиент успешно добавлен!')
  }, (message) => {
    closeForm();
    error(message)
  });

  return (
    <AddFormWrapper>
      <StyledForm name='client_add_form' form={form} onFinish={onAddClient}>
        <Flex align='center' justify='space-between'>
          <Title level={2}>Добавление клиента</Title>
          <Button type="primary" shape="circle" icon={<CloseOutlined />} size='middle' onClick={closeForm} />
        </Flex>
        <Form.Item name="name" rules={[{ required: true, message: 'Пожалуйста, введите имя!' }]}>
          <Input
            size="large"
            id="name"
            placeholder="Имя"
           />
        </Form.Item>
        <Form.Item name="contact" rules={[{ required: true, message: 'Пожалуйста, введите контактную информацию!' }]}>
          <Input
            size="large"
            id="contact"
            placeholder="Контактная информация"
           />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block size='large'>
            Добавить
          </Button>
        </Form.Item>
      </StyledForm>
    </AddFormWrapper>
  )
}