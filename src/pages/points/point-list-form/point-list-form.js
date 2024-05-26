import { Button, Form } from 'antd';
import { onHandler } from '../../../utils/higher-order-func';
import { StyledListForm } from '../../../styled/list-form/list-from';
import { useForm } from 'antd/es/form/Form';
import useAlert from '../../../hooks/alert/alert';
import { Typography } from 'antd';
import { StyledSelect } from '../../../styled';
import { StyledInput } from '../../../styled/input/input';
import { useRegionsStore } from '../../../services/stores/regions/regions';
import { usePointsStore } from '../../../services/stores/points/points-service';

export const PointListForm = ({ point }) => {
  const { deletePoint, updatePoint } = usePointsStore();
  const { success, error } = useAlert();
  const { regions } = useRegionsStore();
  const [form] = useForm();

  const onUpdatePoint = onHandler(async (values) => {
    await updatePoint({
      id: point.id,
      ...values
    });
    success('Пункт выдачи успешно изменен!');
  }, (e) => {
    form.resetFields();
    error(e);
  })

  const onDeletePoint = onHandler(async (pointId) => {
    await deletePoint(pointId);
    success('Пункт выдачи успешно удален!');
  }, (e) => error(e))


  return (
    <StyledListForm
      name={`point_list_form_${point.id}`}
      form={form}
      onFinish={onUpdatePoint}
      initialValues={{
        address: point.address,
        regionId: point.regionId,
      }}
    >
      <Form.Item name="address" rules={[{ required: true, message: '' }]}>
        <StyledInput
          id='address'
          size="large"
          placeholder="Адрес пункта выдачи"
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
        <Button size='large' onClick={() => onDeletePoint(point.id)}>
          Удалить
        </Button>
      </Form.Item>
    </StyledListForm>
  );
}

