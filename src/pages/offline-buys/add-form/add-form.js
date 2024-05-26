import Title from 'antd/es/typography/Title';
import { Button, DatePicker, Flex, Form, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { AddFormWrapper } from '../../../styled/add-form/add-form';
import { StyledForm } from '../../login/styled';
import { onHandler } from '../../../utils/higher-order-func';
import { useForm } from 'antd/es/form/Form';
import useAlert from '../../../hooks/alert/alert';
import { useParams } from 'react-router-dom';
import { useOfflineBuysStore } from '../../../services/stores/offline-buys/offline-buys-service';

export const AddForm = ({ closeForm }) => {
  const { addOfflineBuy, isLoading } = useOfflineBuysStore();
  const { success, error } = useAlert();
  const [form] = useForm();
  const { offlinePointId } = useParams();

  const onAddOfflineBuy = onHandler(async ({ date }) => {
    const formattedDate = date.format("YYYY-MM-DD");
    await addOfflineBuy(formattedDate, offlinePointId);
    closeForm();
    success('Продажа успешно добавлена!');
  }, (e) => error(e));

  return (
    <AddFormWrapper>
      <StyledForm name='offbuy_add_form' form={form} onFinish={onAddOfflineBuy}>
        <Flex align='center' justify='space-between'>
          <Title level={2}>Добавление продажи</Title>
          <Button type="primary" shape="circle" icon={<CloseOutlined />} size='middle' onClick={closeForm} />
        </Flex>
        <Form.Item name="date" noStyle rules={[{ required: true, message: 'Пожалуйста, выберите дату!' }]}>
          <DatePicker name="date" size='large' style={{ flexGrow: 1, width: '100%' }} format='DD-MM-YYYY' />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block size='large' loading={isLoading}>
            Добавить
          </Button>
        </Form.Item>
      </StyledForm>
    </AddFormWrapper>
  )
}