import { StyledListForm } from '../../../styled/list-form/list-from';
import { Button, DatePicker, Flex, Form, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';

export const FilterProfitabilityForm = ({ submitAction, cancelAction }) => {
  const [form] = useForm();

  const resetForm = () => {
    cancelAction();
    form.resetFields();
  }

  return (
    <StyledListForm
      name='profitability-form'
      form={form}
      onFinish={submitAction}
      style={{ marginTop: '20px', flexDirection: 'column', gap: '20px' }}
    >
      <Flex justify='space-between' gap='20px'>
        <Form.Item><Typography.Text>Первый период</Typography.Text></Form.Item>
        <Form.Item name="dateWithF" rules={[{ required: true, message: '' }]}>
          <DatePicker size='large' placeholder='Начало периода' style={{ flexGrow: 1, width: '100%' }} format='DD-MM-YYYY' />
        </Form.Item>
        <Form.Item name="dateByF" rules={[{ required: true, message: '' }]}>
          <DatePicker size='large' placeholder='Окончание периода' style={{ flexGrow: 1, width: '100%' }} format='DD-MM-YYYY' />
        </Form.Item>
      </Flex>
      <Flex justify='space-between' gap='20px'>
        <Form.Item><Typography.Text>Второй период</Typography.Text></Form.Item>
        <Form.Item name="dateWithS" rules={[{ required: true, message: '' }]}>
          <DatePicker size='large' placeholder='Начало периода' style={{ flexGrow: 1, width: '100%' }} format='DD-MM-YYYY' />
        </Form.Item>
        <Form.Item name="dateByS" rules={[{ required: true, message: '' }]}>
          <DatePicker size='large' placeholder='Окончание периода' style={{ flexGrow: 1, width: '100%' }} format='DD-MM-YYYY' />
        </Form.Item>
      </Flex>
      <Flex justify='space-between' gap='50px'>
        <Form.Item style={{ flexGrow: 1 }}>
          <Button type="primary" htmlType="submit" size='large' style={{ width: '100%' }}>
            Сгенерировать
          </Button>
        </Form.Item>
        <Form.Item style={{ flexGrow: 1 }}>
          <Button size='large' onClick={resetForm} style={{ width: '100%' }}>
            Сбросить
          </Button>
        </Form.Item>
      </Flex>
    </StyledListForm>
  )
}