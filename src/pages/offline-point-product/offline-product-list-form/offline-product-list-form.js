import { Button, Form } from 'antd';
import { onHandler } from '../../../utils/higher-order-func';
import { StyledListForm } from '../../../styled/list-form/list-from';
import { useForm } from 'antd/es/form/Form';
import useAlert from '../../../hooks/alert/alert';
import { StyledInput, StyledNumberInput } from '../../../styled/input/input';
import {
  useOfflinePointProductStore
} from '../../../services/stores/offline-point-products/offline-point-products-service';
import { useProductsStore } from '../../../services/stores/products/products-service';
import { useEffect } from 'react';
import { useCategoriesStore } from '../../../services/stores/categories/categories-service';

export const OfflineProductListForm = ({ offlineProduct }) => {
  const { deleteOfflineProduct, updateOfflineProduct } = useOfflinePointProductStore();
  const { success, error } = useAlert();
  const { products } = useProductsStore();
  const { categories } = useCategoriesStore();
  const [form] = useForm();

  const onUpdateOfflineProduct = onHandler(async ({ quantity }) => {
    await updateOfflineProduct({
      ...offlineProduct,
      quantity,
    });
    success('Количество товара из списка наличия успешно изменено!');
  }, (e)  => error(e));

  const onDeleteOfflineProduct = onHandler(async (offlineProductId) => {
    await deleteOfflineProduct(offlineProductId);
    success('Товар из списка наличия успешно удален!');
  }, (e)  => error(e));

  const product = products?.find(product => product.id === offlineProduct.productId);
  const getCategoryName = (categoryId) => categories.find(item => item.id === categoryId)?.name;

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        product: `${product.name} (${ getCategoryName(product.categoryId)})`,
      });
    }
    // eslint-disable-next-line
  }, [product])

  return (
    <StyledListForm
      name={`off_product_list_form_${offlineProduct.id}`}
      form={form} onFinish={onUpdateOfflineProduct}
      initialValues={{
        quantity: offlineProduct.quantity,
      }}
    >
      <Form.Item name="product">
        <StyledInput placeholder="Товар" size='large' readOnly />
      </Form.Item>
      <Form.Item name="quantity" rules={[{ required: true, message: '' }]}>
        <StyledNumberInput min={1} max={1000000} placeholder="Количество товара в наличии" size='large' />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size='large'>
          Обновить
        </Button>
      </Form.Item>
      <Form.Item>
        <Button size='large' onClick={() => onDeleteOfflineProduct(offlineProduct.id)}>
          Удалить
        </Button>
      </Form.Item>
    </StyledListForm>
  );
}

