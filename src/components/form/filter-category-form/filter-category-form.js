import { Button, DatePicker, Form, Typography } from 'antd';
import { StyledListForm } from '../../../styled/list-form/list-from';
import { useForm } from 'antd/es/form/Form';
import { StyledSelect } from '../../../styled';
import { useCategoriesStore } from '../../../services/stores/categories/categories-service';
import { StyledNumberInput } from '../../../styled/input/input';

export const FilterCategoryForm = ({ submitAction, cancelAction }) => {
  const [form] = useForm();
  const { categories } = useCategoriesStore();

  const resetForm = () => {
    cancelAction();
    form.resetFields();
  }

  return (
    <StyledListForm
      name='filter-form'
      form={form}
      onFinish={submitAction}
      style={{ marginTop: '20px' }}
    >
      <Form.Item name="categoryId" noStyle rules={[{ required: true, message: '' }]}>
        <StyledSelect
          style={{ flexGrow: 1 }}
          size='large'
          placeholder='Выберите категорию'
          options={categories?.map((category) => ({
            value: category.id, label: <Typography.Text>{ category.name }</Typography.Text>
          }))}
        />
      </Form.Item>
      <Form.Item name="year" noStyle rules={[{ required: true, message: '' }]}>
        <StyledNumberInput
          min={1980} max={2024}
          placeholder="Выберите год" size='large'
          style={{ flexGrow: 1, width: '100%' }}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size='large'>
          Сгенерировать
        </Button>
      </Form.Item>
      <Form.Item>
        <Button size='large' onClick={resetForm}>
          Сбросить
        </Button>
      </Form.Item>
    </StyledListForm>
  )
};