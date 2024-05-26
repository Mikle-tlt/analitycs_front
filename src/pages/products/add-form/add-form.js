import Title from 'antd/es/typography/Title';
import { Button, Flex, Form, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { AddFormWrapper } from '../../../styled/add-form/add-form';
import { StyledForm } from '../../login/styled';
import { onHandler } from '../../../utils/higher-order-func';
import { useForm } from 'antd/es/form/Form';
import useAlert from '../../../hooks/alert/alert';
import { StyledInput, StyledNumberInput } from '../../../styled/input/input';
import { useProductsStore } from '../../../services/stores/products/products-service';
import { StyledSelect } from '../../../styled';
import { useCategoriesStore } from '../../../services/stores/categories/categories-service';

export const AddForm = ({ closeForm }) => {
  const { addProduct, isLoading } = useProductsStore();
  const { categories } = useCategoriesStore();
  const { success, error } = useAlert();
  const [form] = useForm();

  const onAddProduct = onHandler(async (values) => {
    await addProduct(values);
    closeForm();
    success('Продукт успешно добавлен!')
  }, (e) => error(e));

  return (
    <AddFormWrapper>
      <StyledForm name='product_add_form' form={form} onFinish={onAddProduct}>
        <Flex align='center' justify='space-between'>
          <Title level={2}>Добавление товара</Title>
          <Button type="primary" shape="circle" icon={<CloseOutlined />} size='middle' onClick={closeForm} />
        </Flex>
        <Form.Item name="name" rules={[{ required: true, message: 'Пожалуйста, введите название товара!' }]}>
          <StyledInput
            size="large"
            id="name"
            placeholder="Наименование товара"
          />
        </Form.Item>
        <Form.Item name="categoryId" rules={[{ required: true, message: 'Пожалуйста, выберете категорию из списка!' }]}>
          <StyledSelect
            placeholder="Выберете подходящую категорию"
            size='large'
            options={categories && categories?.map((category) => ({
              value: category.id, label: <Typography.Text>{ category.name }</Typography.Text>
            })) || []}
          />
        </Form.Item>
        <Form.Item name="price" rules={[{ required: true, message: 'Пожалуйста, введите себестоимость товара!' }]}>
          <StyledNumberInput min={1} max={1000000} step={0.1} placeholder="Себестоимость (BYN, руб.)" size='large' />
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