import { Button, Form } from 'antd';
import { onHandler } from '../../../utils/higher-order-func';
import { StyledListForm } from '../../../styled/list-form/list-from';
import { useForm } from 'antd/es/form/Form';
import useAlert from '../../../hooks/alert/alert';
import { Typography } from 'antd';
import { StyledSelect } from '../../../styled';
import { useProductsStore } from '../../../services/stores/products/products-service';
import { useCategoriesStore } from '../../../services/stores/categories/categories-service';
import { StyledInput, StyledNumberInput } from '../../../styled/input/input';

export const ProductListForm = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductsStore();
  const { success, error } = useAlert();
  const { categories } = useCategoriesStore();
  const [form] = useForm();

  const onUpdateProduct = onHandler(async (values) => {
    await updateProduct({
      id: product.id,
      ...values
    });
    success('Продукт успешно изменен!')
  }, (e) => error(e));

  const onDeleteProduct = onHandler(async (productId) => {
    await deleteProduct(productId);
    success('Продукт успешно удален!')
  }, (e) => error(e));

  return (
    <StyledListForm name={`product_list_form_${product.id}`} form={form} onFinish={onUpdateProduct} initialValues={{
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
    }}>
      <Form.Item name="name" rules={[{ required: true, message: '' }]}>
        <StyledInput
          style={{ width: '100%' }}
          size="large"
          id="name"
          placeholder="Наименование товара"
        />
      </Form.Item>
      <Form.Item name="categoryId" noStyle rules={[{ required: true, message: '' }]}>
        <StyledSelect
          style={{ flexGrow: 1, maxWidth: "300px" }}
          size='large'
          options={categories?.map((category) => ({
            value: category.id, label: <Typography.Text>{ category.name }</Typography.Text>
          }))}
        />
      </Form.Item>
      <Form.Item name="price" rules={[{ required: true, message: '' }]}>
        <StyledNumberInput min={1} max={1000000} step={0.1} placeholder="Себестоимость (BYN, руб.)" size='large' />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size='large'>
          Обновить
        </Button>
      </Form.Item>
      <Form.Item>
        <Button size='large' onClick={() => onDeleteProduct(product.id)}>
          Удалить
        </Button>
      </Form.Item>
    </StyledListForm>
  );
}