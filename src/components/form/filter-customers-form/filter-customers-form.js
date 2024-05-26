import { Button, DatePicker, Form } from 'antd';
import { StyledListForm } from '../../../styled/list-form/list-from';
import { useForm } from 'antd/es/form/Form';
import { StyledNumberInput } from '../../../styled/input/input';

export const FilterCustomersForm = ({ submitAction, cancelAction }) => {
  const [form] = useForm();

  const resetForm = () => {
    cancelAction();
    form.resetFields();
  }

  return (
    <StyledListForm
      name='filter-form'
      form={form}
      onFinish={submitAction}
      style={{ marginTop: '20px' }}
    >
      <Form.Item name="year" noStyle rules={[{ required: true, message: '' }]}>
        <StyledNumberInput
          min={1980} max={2024}
          placeholder="Выберите год" size='large'
          style={{ flexGrow: 1, width: '100%' }}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size='large'>
          Сгенерировать
        </Button>
      </Form.Item>
      <Form.Item>
        <Button size='large' onClick={resetForm}>
          Сбросить
        </Button>
      </Form.Item>
    </StyledListForm>
  )
};