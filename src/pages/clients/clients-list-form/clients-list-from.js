import { Button, Col, Dropdown, Flex, Form, Row } from 'antd';
import { onHandler } from '../../../utils/higher-order-func';
import { useClientsStore } from '../../../services/stores/clients/clients-service';
import { useNavigate } from 'react-router-dom';
import { StyledListForm } from '../../../styled/list-form/list-from';
import { StyledInput } from '../../../styled/input/input';
import { useForm } from 'antd/es/form/Form';
import useAlert from '../../../hooks/alert/alert';

export const ClientsListForm = ({ client }) => {
  const {
    updateClient,
    deleteClient,
    setSelectedClient
  } = useClientsStore();
  const { success, error } = useAlert();
  const navigator = useNavigate();
  const [form] = useForm();

  const onUpdateClient = onHandler(async () => {
    const values = form.getFieldsValue();
    await updateClient({
      id: client.id,
      ...values
    })
    success("Данные клиента успешно изменены!")
  }, (message) => error(message));

  const onDeleteClient = onHandler(async (clientId) => {
    await deleteClient(clientId)
    success("Клиент успешно удален!")
  }, (message) => error(message));

  const goToClientBuys = (client) => {
    setSelectedClient(client);
    const clientId = client.id;
    navigator(`/clients/${clientId}/buys`)
  }

  const items = [
    {
      key: '1',
      label: (
        <Button onClick={() => goToClientBuys(client)}> Покупки </Button>
      ),
    },
    {
      key: '2',
      label: (
        <Button onClick={() => onDeleteClient(client.id)}> Удалить </Button>
      ),
    }
  ];

  return (
    <StyledListForm
      name={`clients_list_form_${client.id}`}
      form={form}
      onFinish={onUpdateClient}
      initialValues={{
        name: client.name,
        contact: client.contact
      }}
    >
      <Form.Item name="name" noStyle rules={[{ required: true, message: '' }]}>
        <StyledInput placeholder="Имя" size='large' />
      </Form.Item>
      <Form.Item name="contact" noStyle rules={[{ required: true, message: '' }]}>
        <StyledInput placeholder="Контактные данные" size='large' />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size='large'>
          Обновить
        </Button>
      </Form.Item>
      <Form.Item>
        <Dropdown menu={{ items }}>
          <Button size='large'>Действия</Button>
        </Dropdown>
      </Form.Item>
    </StyledListForm>
  );
}
