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
import { useProductsStore } from '../../../services/stores/products/products-service';
import { useDetailsStore } from '../../../services/stores/details/details-service';
import { StyledNumberInput } from '../../../styled/input/input';
import { useCategoriesStore } from '../../../services/stores/categories/categories-service';

export const AddForm = ({ closeForm }) => {
  const { success, error } = useAlert();
  const [form] = useForm();
  const { products } = useProductsStore();
  const { categories } = useCategoriesStore();
  const { addDetail, isLoading } = useDetailsStore();
  const { buyId } = useParams();

  const onAddDetail = onHandler(async () => {
    const values = form.getFieldsValue();
    await addDetail(buyId, values);
    closeForm();
    success("Товар успешно добавлен в покупку!")
  }, (e) => error(e));

  const getCategoryName = (categoryId) => categories.find(item => item.id === categoryId)?.name;

  return (
    <AddFormWrapper>
      <StyledForm name='detail_add_form' form={form} onFinish={onAddDetail}>
        <Flex align='center' justify='space-between' gap='20px'>
          <Title level={2}>Добавление товара в покупку</Title>
          <Button type="primary" shape="circle" icon={<CloseOutlined />} size='middle' onClick={closeForm} />
        </Flex>
        <Form.Item name="productId" rules={[{ required: true, message: 'Пожалуйста, выберете товар из списка!' }]}>
          <StyledSelect
            placeholder="Выберете необходимый товар"
            size='large'
            options={products && products?.map((product) => ({
              value: product.id, label: <Typography.Text>{ product.name } ({ getCategoryName(product.categoryId)})</Typography.Text>
            })) || []}
          />
        </Form.Item>
        <Form.Item name="quantity" rules={[{ required: true, message: 'Пожалуйста, введите количество!' }]}>
          <StyledNumberInput min={1} max={1000000} placeholder="Количество товара" size='large' />
        </Form.Item>
        <Form.Item  name="price" rules={[{ required: true, message: 'Пожалуйста, введите цену товара!' }]}>
          <StyledNumberInput min={1} max={50000} step={0.1} placeholder='Цена товара' size='large' />
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