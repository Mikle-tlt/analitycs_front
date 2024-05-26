import { Button, Form } from 'antd';
import { onHandler } from '../../../utils/higher-order-func';
import { StyledListForm } from '../../../styled/list-form/list-from';
import { StyledInput } from '../../../styled/input/input';
import { useForm } from 'antd/es/form/Form';
import useAlert from '../../../hooks/alert/alert';
import { useCategoriesStore } from '../../../services/stores/categories/categories-service';

export const CategoryListForm = ({ category }) => {
  const { deleteCategory, updateCategory } = useCategoriesStore();
  const { success, error } = useAlert();
  const [form] = useForm();

  const onUpdateCategory = onHandler(async () => {
    const { name } = form.getFieldsValue();
    await updateCategory(name, category.id)
    success("Категория успешно изменена!")
  }, (e) => error(e));

  const onDeleteCategory = onHandler(async (categoryId) => {
    await deleteCategory(categoryId)
    success("Категория успешно удалена!")
  }, (e) => error(e));

  return (
    <StyledListForm name={`category_list_form_${category.id}`} form={form} onFinish={onUpdateCategory} initialValues={{
      name: category.name
    }}>
      <Form.Item name="name" noStyle rules={[{ required: true, message: '' }]}>
        <StyledInput placeholder="Наименование категории" size='large' />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size='large'>
          Обновить
        </Button>
      </Form.Item>
      <Form.Item>
        <Button size='large' onClick={() => onDeleteCategory(category.id)}>
          Удалить
        </Button>
      </Form.Item>
    </StyledListForm>
  );
}
