import Title from 'antd/es/typography/Title';
import { Button, DatePicker, Flex, Form, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { AddFormWrapper } from '../../../styled/add-form/add-form';
import { StyledForm } from '../../login/styled';
import { onHandler } from '../../../utils/higher-order-func';
import { useForm } from 'antd/es/form/Form';
import useAlert from '../../../hooks/alert/alert';
import { useParams } from 'react-router-dom';
import { useBuysStore } from '../../../services/stores/buys/buys-service';
import { StyledSelect } from '../../../styled';
import { useRegionsStore } from '../../../services/stores/regions/regions';

export const AddForm = ({ closeForm, points }) => {
  const { addBuy, isLoading } = useBuysStore();
  const { success, error } = useAlert();
  const [form] = useForm();
  const { regions } = useRegionsStore();
  const { clientId } = useParams();

  const onAddBuy = onHandler(async () => {
    const { date, pointId } = form.getFieldsValue();
    await addBuy(clientId, {
      date: date.format("YYYY-MM-DD"),
      pointId
    });
    closeForm();
    success('Покупка успешно добавлена!');
  }, (message) => error(message));

  const getRegionName = (regionId) => regions?.find(item => item.id === regionId)?.name;

  return (
    <AddFormWrapper>
      <StyledForm name='buy_add_form' form={form} onFinish={onAddBuy}>
        <Flex align='center' justify='space-between'>
          <Title level={2}>Добавление покупки</Title>
          <Button type="primary" shape="circle" icon={<CloseOutlined />} size='middle' onClick={closeForm} />
        </Flex>
        <Form.Item name="date" rules={[{ required: true, message: 'Пожалуйста, введите дату покупки!' }]}>
          <DatePicker style={{ width: '100%'}} size='large' placeholder='Дата покупки' format='DD-MM-YYYY' />
        </Form.Item>
        <Form.Item name="pointId" rules={[{ required: true, message: 'Пожалуйста, введите адрес пункта выдачи!' }]}>
          <StyledSelect
            placeholder="Выберете адрес пункта выдачи"
            style={{ flexGrow: 1 }}
            size='large'
            options={points && points?.map((point) => ({
              value: point.id, label: <Typography.Text>{ point.address } {' '}
                ({ getRegionName(point.regionId)})</Typography.Text>
            })) || []}
          />
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