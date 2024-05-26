import { Button, DatePicker, Form } from 'antd';
import { StyledListForm } from '../../../styled/list-form/list-from';
import { useForm } from 'antd/es/form/Form';
import moment from 'moment';

export const FilterForm = ({ submitAction, cancelAction, today = false }) => {
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
      initialValues={{
        withDate: today ? moment() : null,
        byDate: today ? moment() : null,
      }}
    >
      <Form.Item name="withDate" noStyle rules={[{ required: true, message: '' }]}>
        <DatePicker size='large' style={{ flexGrow: 1, width: '100%' }} placeholder='Начало периода'  format='DD-MM-YYYY' />
      </Form.Item>
      <Form.Item name="byDate" noStyle rules={[{ required: true, message: '' }]}>
        <DatePicker size='large' style={{ flexGrow: 1, width: '100%' }} placeholder='Окончание периода' format='DD-MM-YYYY' />
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