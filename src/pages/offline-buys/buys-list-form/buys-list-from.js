import { Button, DatePicker, Dropdown, Form, Select } from 'antd';
import { onHandler } from '../../../utils/higher-order-func';
import { useNavigate, useParams } from 'react-router-dom';
import { StyledListForm } from '../../../styled/list-form/list-from';
import { useForm } from 'antd/es/form/Form';
import useAlert from '../../../hooks/alert/alert';
import moment from 'moment';
import { useOfflineBuysStore } from '../../../services/stores/offline-buys/offline-buys-service';

export const BuysListForm = ({ buy }) => {
  const { deleteOfflineBuy, updateOfflineBuy, offlineBuys } = useOfflineBuysStore();
  const { success, error } = useAlert();
  const navigate = useNavigate();
  const [form] = useForm();
  const { offlinePointId } = useParams();

  const onUpdateOfflineBuy = onHandler(async ({ date }) => {
    const formattedDate = date.format("YYYY-MM-DD");
    await updateOfflineBuy(formattedDate, buy.id);
    success('Дата продажи успешно изменена!');
  }, (e) => {
    form.resetFields();
    error(e);
  });

  const onDeleteOfflineBuy = onHandler(async (offlineBuyId) => {
    await deleteOfflineBuy(offlineBuyId);
    success('Продажа успешно удалена!');
  }, (e) => error(e));

  const navigateToDetails = (offlineBuyId) => {
    navigate(`/points/offline/${offlinePointId}/buys/${offlineBuyId}/details`);
  }

  const items = [
    {
      key: '1',
      label: (
        <Button onClick={() => navigateToDetails(buy.id)}> Детали </Button>
      ),
    },
    {
      key: '2',
      label: (
        <Button onClick={() => onDeleteOfflineBuy(buy.id)}> Удалить </Button>
      ),
    }
  ];

  return (
    <StyledListForm name={`offbuys_list_form_${buy.id}`} form={form} onFinish={onUpdateOfflineBuy} initialValues={{
      date: moment(buy.date)
    }}>
      <Form.Item name="date" noStyle rules={[{ required: true, message: '' }]}>
        <DatePicker name="date" size='large' style={{ flexGrow: 1, width: '100%' }} format='DD-MM-YYYY' />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size='large'>
          Обновить
        </Button>
      </Form.Item>
      <Dropdown menu={{ items }}>
        <Button size='large'>Действия</Button>
      </Dropdown>
    </StyledListForm>
  );
}