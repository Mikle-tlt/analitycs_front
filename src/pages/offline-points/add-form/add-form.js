import Title from 'antd/es/typography/Title';
import { Button, Flex, Form, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { AddFormWrapper } from '../../../styled/add-form/add-form';
import { StyledForm } from '../../login/styled';
import { onHandler } from '../../../utils/higher-order-func';
import { useForm } from 'antd/es/form/Form';
import useAlert from '../../../hooks/alert/alert';
import { StyledInput } from '../../../styled/input/input';
import { StyledSelect } from '../../../styled';
import { useOfflinePointsStore } from '../../../services/stores/offline-points/offline-points-service';
import { useRegionsStore } from '../../../services/stores/regions/regions';

export const AddForm = ({ closeForm }) => {
  const { addOfflinePoint, isLoading } = useOfflinePointsStore();
  const { regions } = useRegionsStore();
  const { success, error } = useAlert();
  const [form] = useForm();

  const onAddOfflinePoint = onHandler(async (values) => {
    await addOfflinePoint(values);
    closeForm();
    success('Оффлайн точка успешно добавлена!')
  }, (e) => error(e))

  return (
    <AddFormWrapper>
      <StyledForm name='offline_point_add_form' form={form} onFinish={onAddOfflinePoint}>
        <Flex align='center' justify='space-between' gap='20px'>
          <Title level={2}>Добавление оффлайн точки</Title>
          <Button type="primary" shape="circle" icon={<CloseOutlined />} size='middle' onClick={closeForm} />
        </Flex>
        <Form.Item name="name" rules={[{ required: true, message: 'Пожалуйста, введите название оффлайн точки!' }]}>
          <StyledInput
            size="large"
            id="name"
            placeholder="Наименование точки"
          />
        </Form.Item>
        <Form.Item name="address" rules={[{ required: true, message: 'Пожалуйста, введите адрес оффлайн точки!' }]}>
          <StyledInput
            size="large"
            id="address"
            placeholder="Адрес"
          />
        </Form.Item>
        <Form.Item name="regionId" rules={[{ required: true, message: 'Пожалуйста, выберете регион из списка!' }]}>
          <StyledSelect
            placeholder="Выберете регион"
            size='large'
            options={regions && regions?.map((region) => ({
              value: region.id, label: <Typography.Text>{ region.name }</Typography.Text>
            })) || []}
          />
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