import { Button, DatePicker, Dropdown, Form } from 'antd';
import { onHandler } from '../../../utils/higher-order-func';
import { useNavigate, useParams } from 'react-router-dom';
import { StyledListForm } from '../../../styled/list-form/list-from';
import { useForm } from 'antd/es/form/Form';
import useAlert from '../../../hooks/alert/alert';
import { useBuysStore } from '../../../services/stores/buys/buys-service';
import { useState } from 'react';
import { Typography } from 'antd';
import moment from 'moment';
import { StyledSelect } from '../../../styled';
import { useRegionsStore } from '../../../services/stores/regions/regions';

export const BuysListForm = ({ buy, points }) => {
  const { deleteBuy, updateBuy } = useBuysStore();
  const { regions } = useRegionsStore();
  const { success, error } = useAlert();
  const navigate = useNavigate();
  const [form] = useForm();
  const { clientId } = useParams();
  const [updatedBuys, setUpdatedBuys] = useState([]);

  const getRegionName = (regionId) => regions?.find(item => item.id === regionId)?.name;

  const onUpdateBuy = onHandler(async () => {
    const { date, pointId } = form.getFieldsValue();
    await updateBuy({
      id: buy.id,
      date: date.format("YYYY-MM-DD"),
      pointId
    })
    success("Данные покупки успешно изменены!")
  }, (message) => {
    form.resetFields();
    error(message)
  });

  const onDeleteBuy = onHandler(async (buyId) => {
    await deleteBuy(buyId);
    success('Покупка успешно удалена!');
  }, (message) => error(message));

  const navigateToDetails = (buyId) => {
    navigate(`/clients/${clientId}/buys/${buyId}/details`)
  }

  const handlePointChange = (buyId) => {
    const { pointId } = form.getFieldsValue();
    const newBuys = [...updatedBuys];
    newBuys[buyId] = { ...newBuys[buyId], pointId };
    setUpdatedBuys(newBuys);
  };

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
        <Button onClick={() => onDeleteBuy(buy.id)}> Удалить </Button>
      ),
    }
  ];

  return (
    <StyledListForm name={`buys_list_form_${buy.id}`} form={form} onFinish={onUpdateBuy} initialValues={{
      date: moment(buy.date),
      pointId: buy.pointId
    }}>
      <Form.Item name="date" noStyle rules={[{ required: true, message: '' }]}>
        <DatePicker name="date" size='large' style={{ flexGrow: 1, width: '100%' }} format='DD-MM-YYYY' />
      </Form.Item>
      <Form.Item
        name="pointId" noStyle
        rules={[{ required: true, message: '' }]}
        onChange={() => handlePointChange(buy.id)}
      >
        <StyledSelect
          style={{ flexGrow: 1 }}
          size='large'
          value={updatedBuys[buy.id]?.pointId || buy.pointId}
          options={points?.map((point) => ({
            value: point.id, label: <Typography.Text>{ point.address }{' '}
              ({ getRegionName(point.regionId)})</Typography.Text>
          }))}
        />
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