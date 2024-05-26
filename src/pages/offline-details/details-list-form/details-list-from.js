import { Button, Form } from 'antd';
import { onHandler } from '../../../utils/higher-order-func';
import { StyledListForm } from '../../../styled/list-form/list-from';
import { useForm } from 'antd/es/form/Form';
import useAlert from '../../../hooks/alert/alert';
import { StyledInput, StyledNumberInput } from '../../../styled/input/input';
import { useOfflineDetailsStore } from '../../../services/stores/offline-details/offline-details-service';
import { useProductsStore } from '../../../services/stores/products/products-service';
import { useEffect } from 'react';
import { useCategoriesStore } from '../../../services/stores/categories/categories-service';

export const DetailsListForm = ({ detail }) => {
  const { deleteOfflineDetail, isLoading, offlineDetails } = useOfflineDetailsStore();
  const { success, error } = useAlert();
  const { products } = useProductsStore();
  const { categories } = useCategoriesStore();
  const [form] = useForm();

  const onDeleteOfflineDetail = onHandler(async () => {
    await deleteOfflineDetail(detail.id);
    success('Товар был успешно удален из списка проданных!');
  }, (e) => error(e));

  const getProductName = (productId) => products?.find(product => product.id === productId);
  const getCategoryName = (categoryId) => categories.find(item => item.id === categoryId)?.name;

  useEffect(() => {
    if (products) {
      form.setFieldsValue({
        product: `${getProductName(detail.productId).name} (${getCategoryName(getProductName(detail.productId).categoryId)})`,
        quantity: detail.quantity,
      });
    }
  }, [products, offlineDetails]);

  return (
    <StyledListForm
      name={`details_list_form_${detail.id}`}
      form={form}
      onFinish={onDeleteOfflineDetail}
      initialValues={{
        product: getProductName(detail.productId),
        quantity: detail.quantity,
        price: detail.price
      }}
    >
      <Form.Item name="product">
        <StyledInput placeholder="Товар" size='large' readOnly  />
      </Form.Item>
      <Form.Item name="quantity">
        <StyledNumberInput min={1} max={1000000} placeholder="Количество" size='large' readOnly  />
      </Form.Item>
      <Form.Item  name="price">
        <StyledNumberInput min={1} max={50000} step={0.1} placeholder='Цена' size='large' readOnly  />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" size='large'>
          Удалить
        </Button>
      </Form.Item>
    </StyledListForm>
  );
}