import Title from 'antd/es/typography/Title';
import { Button, Flex, Form, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { AddFormWrapper } from '../../../styled/add-form/add-form';
import { StyledForm } from '../../login/styled';
import { onHandler } from '../../../utils/higher-order-func';
import { useForm } from 'antd/es/form/Form';
import useAlert from '../../../hooks/alert/alert';
import { useParams } from 'react-router-dom';
import { StyledSelect } from '../../../styled';
import { StyledNumberInput } from '../../../styled/input/input';
import { useProductsStore } from '../../../services/stores/products/products-service';
import { useOfflineDetailsStore } from '../../../services/stores/offline-details/offline-details-service';
import {
  useOfflinePointProductStore
} from '../../../services/stores/offline-point-products/offline-point-products-service';
import { useCategoriesStore } from '../../../services/stores/categories/categories-service';

export const AddForm = ({ closeForm }) => {
  const { addOfflineDetail, isLoading } = useOfflineDetailsStore();
  const { success, error } = useAlert();
  const [form] = useForm();
  const { offlineProducts } = useOfflinePointProductStore();
  const { products } = useProductsStore();
  const { offlineBuyId } = useParams();
  const { categories } = useCategoriesStore();

  const onAddOfflineDetail = onHandler(async (values) => {
    await addOfflineDetail(offlineBuyId, values);
    closeForm();
    success('Товар был успешно добавлен в список проданных!')
  }, (e) => error(e));

  const getCategoryName = (categoryId) => categories.find(item => item.id === categoryId)?.name;

  return (
    <AddFormWrapper>
      <StyledForm name='off_detail_buy_add_form' form={form} onFinish={onAddOfflineDetail}>
        <Flex align='center' justify='space-between' gap='20px'>
          <Title level={2}>Добавление проданного товара</Title>
          <Button type="primary" shape="circle" icon={<CloseOutlined />} size='middle' onClick={closeForm} />
        </Flex>
        <Form.Item name="productId" rules={[{ required: true, message: 'Пожалуйста, выберете товар из списка!' }]}>
          <StyledSelect
            placeholder="Выберете необходимый товар"
            size='large'
            options={offlineProducts && offlineProducts?.map((offlineProduct) => {
              const product = products?.find((item) => item.id === offlineProduct.productId);
              if (product) {
                return  ({
                  value: offlineProduct.id, label: <Typography.Text>{ product.name } {' '}
                    ({ getCategoryName(product.categoryId)})</Typography.Text>
                })
              }
            })}
          />
        </Form.Item>
        <Form.Item name="quantity" rules={[{ required: true, message: 'Пожалуйста, введите количество!' }]}>
          <StyledNumberInput min={1} max={1000000} placeholder="Количество товара" size='large' />
        </Form.Item>
        <Form.Item  name="price" rules={[{ required: true, message: 'Пожалуйста, введите стоимость товара!' }]}>
          <StyledNumberInput min={1} max={50000} step={0.1} placeholder='Стоимость товара' size='large' />
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