import { Button, Form } from 'antd';
import { onHandler } from '../../../utils/higher-order-func';
import { StyledListForm } from '../../../styled/list-form/list-from';
import { StyledInput } from '../../../styled/input/input';
import { useForm } from 'antd/es/form/Form';
import useAlert from '../../../hooks/alert/alert';
import { useRegionsStore } from '../../../services/stores/regions/regions';

export const RegionListForm = ({ region }) => {
  const { deleteRegion, updateRegion } = useRegionsStore();
  const { success, error } = useAlert();
  const [form] = useForm();

  const onUpdateRegion = onHandler(async () => {
    const { name } = form.getFieldsValue();
    await updateRegion(name, region.id);
    success('Регион успешно изменён!')
  }, (e) => error(e))

  const onDeleteRegion = onHandler(async (regionId) => {
    await deleteRegion(regionId);
    success('Регион успешно удален!')
  }, (e) => error(e));

  return (
    <StyledListForm name={`region_list_form_${region.id}`} form={form} onFinish={onUpdateRegion} initialValues={{
      name: region.name
    }}>
      <Form.Item name="name" noStyle rules={[{ required: true, message: '' }]}>
        <StyledInput placeholder="Наименование региона" size='large' />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size='large'>
          Обновить
        </Button>
      </Form.Item>
      <Form.Item>
        <Button size='large' onClick={() => onDeleteRegion(region.id)}>
          Удалить
        </Button>
      </Form.Item>
    </StyledListForm>
  );
}
