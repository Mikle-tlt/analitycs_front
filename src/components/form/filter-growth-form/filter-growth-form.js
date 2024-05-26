import { Button, DatePicker, Form, Typography } from 'antd';
import { StyledListForm } from '../../../styled/list-form/list-from';
import { useForm } from 'antd/es/form/Form';
import { StyledSelect } from '../../../styled';
import { useProductsStore } from '../../../services/stores/products/products-service';
import { useEffect } from 'react';
import { onHandler } from '../../../utils/higher-order-func';
import { useCategoriesStore } from '../../../services/stores/categories/categories-service';

export const FilterGrowthForm = ({ submitAction, cancelAction }) => {
  const [form] = useForm();
  const { products } = useProductsStore();
  const { categories, getCategories } = useCategoriesStore();
  const { error } = useCategoriesStore();

  const resetForm = () => {
    cancelAction();
    form.resetFields();
  }

  const onGetCategories = onHandler(async () => {
    !categories && await getCategories();
  }, (e) => error(e));

  const getCategoryName = (categoryId) => categories.find(item => item.id === categoryId)?.name;

  useEffect(() => {
    onGetCategories();
  }, [])

  return (
    <StyledListForm
      name='filter-form'
      form={form}
      onFinish={submitAction}
      style={{ marginTop: '20px' }}
    >
      <Form.Item name="productId" noStyle rules={[{ required: true, message: '' }]}>
        <StyledSelect
          style={{ flexGrow: 1 }}
          size='large'
          placeholder='Выберите товар'
          options={products?.map((product) => ({
            value: product.id, label: <Typography.Text>{ product.name } {' '}
              ({ getCategoryName(product.categoryId)})</Typography.Text>
          }))}
        />
      </Form.Item>
      <Form.Item name="withDate" noStyle rules={[{ required: true, message: '' }]}>
        <DatePicker size='large' style={{ flexGrow: 1, width: '100%' }} placeholder='Начало периода'  format='DD-MM-YYYY' />
      </Form.Item>
      <Form.Item name="byDate" noStyle rules={[{ required: true, message: '' }]}>
        <DatePicker size='large' style={{ flexGrow: 1, width: '100%' }} placeholder='Окончание периода' format='DD-MM-YYYY' />
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