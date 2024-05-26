import { Button, Dropdown, Form } from 'antd';
import { onHandler } from '../../../utils/higher-order-func';
import { StyledListForm } from '../../../styled/list-form/list-from';
import { useForm } from 'antd/es/form/Form';
import useAlert from '../../../hooks/alert/alert';
import { Typography } from 'antd';
import { StyledSelect } from '../../../styled';
import { StyledInput } from '../../../styled/input/input';
import { useOfflinePointsStore } from '../../../services/stores/offline-points/offline-points-service';
import { useRegionsStore } from '../../../services/stores/regions/regions';
import { useNavigate } from 'react-router-dom';

export const OfflinePointListForm = ({ point }) => {
  const { updateOfflinePoint, deleteOfflinePoint } = useOfflinePointsStore();
  const { success, error } = useAlert();
  const { regions } = useRegionsStore();
  const [form] = useForm();
  const navigate = useNavigate();

  const onUpdateOfflinePoint = onHandler(async (values) => {
    await updateOfflinePoint({
      id: point.id,
      ...values
    });
    success('Оффлайн точка  успешно изменена!');
  }, (e) => error(e));

  const onDeleteOfflinePoint = onHandler(async (offlinePointId) => {
    await deleteOfflinePoint(offlinePointId);
    success('Оффлайн точка успешно удалена!')
  }, (e) => error(e))

  const navigateToBuys = () => navigate(`/points/offline/${point.id}/buys`);
  const navigateToProducts = () => navigate(`/points/offline/${point.id}/products`);

  const items = [
    {
      key: '1',
      label: (
        <Button onClick={() => navigateToBuys()}> Продажи </Button>
      ),
    },
    {
      key: '2',
      label: (
        <Button onClick={() => navigateToProducts()}> Товары </Button>
      ),
    },
    {
      key: '3',
      label: (
        <Button onClick={() => onDeleteOfflinePoint(point.id)}> Удалить </Button>
      ),
    }
  ];

  return (
    <StyledListForm name={`offpoint_list_form_${point.id}`} form={form} onFinish={onUpdateOfflinePoint} initialValues={{
      name: point.name,
      address: point.address,
      regionId: point.regionId,
    }}>
      <Form.Item name="name" rules={[{ required: true, message: '' }]}>
        <StyledInput
          size="large"
          id='name'
          placeholder="Наименование точки"
        />
      </Form.Item>
      <Form.Item name="address" rules={[{ required: true, message: '' }]}>
        <StyledInput
          id='address'
          size="large"
          placeholder="Адрес"
        />
      </Form.Item>
      <Form.Item name="regionId" rules={[{ required: true, message: 'Пожалуйста, выберете регион из списка!' }]}>
        <StyledSelect
          placeholder="Выберете регион"
          size='large'
          options={regions && regions?.map((region) => ({
            value: region.id, label: <Typography.Text>{ region.name }</Typography.Text>
          })) || []}
        />
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

