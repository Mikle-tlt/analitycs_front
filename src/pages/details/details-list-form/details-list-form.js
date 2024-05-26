import { Button, Form } from 'antd';
import { onHandler } from '../../../utils/higher-order-func';
import { StyledListForm } from '../../../styled/list-form/list-from';
import { useForm } from 'antd/es/form/Form';
import useAlert from '../../../hooks/alert/alert';
import { useEffect } from 'react';
import { useDetailsStore } from '../../../services/stores/details/details-service';
import { StyledInput, StyledNumberInput } from '../../../styled/input/input';
import { useProductsStore } from '../../../services/stores/products/products-service';

export const DetailsListForm = ({ detail }) => {
  const { success, error } = useAlert();
  const [form] = useForm();
  const { deleteDetail, updateDetail, isLoading } = useDetailsStore();
  const { products } = useProductsStore();

  const onUpdateDetail = onHandler(async () => {
    const { quantity, price } = form.getFieldsValue();
    const detailUpdate = {
      id: detail.id,
      productId: detail.productId,
      quantity: quantity,
      price
    }
    await updateDetail(detailUpdate);
    success("Данные товара из покупки успешно обновлены!")
  }, (e) => error(e));

  const onDeleteDetail = onHandler(async (detailId) => {
    await deleteDetail(detailId);
    success("Товар из покупки успешно удален!")
  }, (e) => error(e));

  const getProductName = (productId) => products?.find(product => product.id === productId).name;

  useEffect(() => {
    form.setFieldsValue({
      quantity: detail.quantity,
    });
  }, [detail]);

  return (
    <StyledListForm name={`details_list_form_${detail.id}`} form={form} onFinish={onUpdateDetail} initialValues={{
      product: `${getProductName(detail.productId)} (${detail.category})`,
      quantity: detail.quantity,
      price: detail.price
    }}>
      <Form.Item name="product">
        <StyledInput placeholder="Товар" size='large' readOnly disabled/>
      </Form.Item>
      <Form.Item name="quantity" rules={[{ required: true, message: '' }]}>
        <StyledNumberInput min={1} max={1000000} placeholder="Количество" size='large' />
      </Form.Item>
      <Form.Item  name="price" rules={[{ required: true, message: '' }]}>
        <StyledNumberInput min={1} max={50000} step={0.1} placeholder='Цена' size='large' />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size='large'>
          Обновить
        </Button>
      </Form.Item>
      <Form.Item>
        <Button size='large' onClick={() => onDeleteDetail(detail.id)}>
          Удалить
        </Button>
      </Form.Item>
    </StyledListForm>
  );
};
