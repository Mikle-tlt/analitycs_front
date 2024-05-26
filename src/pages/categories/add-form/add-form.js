import Title from 'antd/es/typography/Title';
import { Button, Flex, Form } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { AddFormWrapper } from '../../../styled/add-form/add-form';
import { StyledForm } from '../../login/styled';
import { onHandler } from '../../../utils/higher-order-func';
import { useForm } from 'antd/es/form/Form';
import useAlert from '../../../hooks/alert/alert';
import { StyledInput } from '../../../styled/input/input';
import { useCategoriesStore } from '../../../services/stores/categories/categories-service';

export const AddForm = ({ closeForm }) => {
  const { addCategory } = useCategoriesStore();
  const { success, error } = useAlert();
  const [form] = useForm();

  const onAddCategory = onHandler(async () => {
    const { name } = form.getFieldsValue();
    await addCategory(name);
    closeForm();
    success("Категория успешно добавлена!");
  }, (e) => error(e));

  return (
    <AddFormWrapper>
      <StyledForm name='category_add_form' form={form} onFinish={onAddCategory}>
        <Flex align='center' justify='space-between'>
          <Title level={2}>Добавление категории</Title>
          <Button type="primary" shape="circle" icon={<CloseOutlined />} size='middle' onClick={closeForm} />
        </Flex>
        <Form.Item name="name" rules={[{ required: true, message: 'Пожалуйста, введите название категории!' }]}>
          <StyledInput
            size="large"
            id="name"
            placeholder="Наименование категории"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block size='large'>
            Добавить
          </Button>
        </Form.Item>
      </StyledForm>
    </AddFormWrapper>
  )
}