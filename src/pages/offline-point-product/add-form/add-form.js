import Title from 'antd/es/typography/Title';
import { Button, Flex, Form, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { AddFormWrapper } from '../../../styled/add-form/add-form';
import { StyledForm } from '../../login/styled';
import { onHandler } from '../../../utils/higher-order-func';
import { useForm } from 'antd/es/form/Form';
import useAlert from '../../../hooks/alert/alert';
import { StyledNumberInput } from '../../../styled/input/input';
import { StyledSelect } from '../../../styled';
import { useParams } from 'react-router-dom';
import {
  useOfflinePointProductStore
} from '../../../services/stores/offline-point-products/offline-point-products-service';
import { useProductsStore } from '../../../services/stores/products/products-service';
import { useCategoriesStore } from '../../../services/stores/categories/categories-service';

export const AddForm = ({ closeForm }) => {
  const { addOfflineProduct, isLoading} = useOfflinePointProductStore();
  const { success, error } = useAlert();
  const { offlinePointId } = useParams();
  const [form] = useForm();
  const { products } = useProductsStore();
  const { categories } = useCategoriesStore();

  const onOfflineProductAdd = onHandler(async (values) => {
    await addOfflineProduct(offlinePointId, values);
    closeForm();
    success('Товар успешно добавлен в наличие!')
  }, (e) => error(e));

  const getCategoryName = (categoryId) => categories.find(item => item.id === categoryId)?.name;

  return (
    <AddFormWrapper>
      <StyledForm name='offline_product_add_form' form={form} onFinish={onOfflineProductAdd}>
        <Flex align='center' justify='space-between' gap='20px'>
          <Title level={2}>Добавление товара в наличие</Title>
          <Button type="primary" shape="circle" icon={<CloseOutlined />} size='middle' onClick={closeForm} />
        </Flex>
        <Form.Item name="productId" rules={[{ required: true, message: 'Пожалуйста, выберите товар из списка!' }]}>
          <StyledSelect
            placeholder="Выберете товар"
            size='large'
            options={products && products?.map((product) => ({
              value: product.id, label: <Typography.Text>{ product.name } {' '}
                ({ getCategoryName(product.categoryId)})</Typography.Text>
            })) || []}
          />
        </Form.Item>
        <Form.Item name="quantity" rules={[{ required: true, message: 'Пожалуйста, введите количество!' }]}>
          <StyledNumberInput min={1} max={1000000} placeholder="Количество товара в наличии" size='large' />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block size='large' loading={isLoading}>
            Добавить
          </Button>
        </Form.Item>
      </StyledForm>
    </AddFormWrapper>
  )
}