import { AddFormWrapper } from '../../../styled/add-form/add-form';
import { StyledForm } from '../../login/styled';
import useAlert from '../../../hooks/alert/alert';
import { useForm } from 'antd/es/form/Form';
import { Button, Flex, Form, Spin } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { CloseOutlined, InboxOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { onHandler } from '../../../utils/higher-order-func';
import { Typography } from 'antd';
import { useState } from 'react';
import { useOfflineBuysStore } from '../../../services/stores/offline-buys/offline-buys-service';

export const ImportForm = ({ closeForm }) => {
  const { uploadExel, isLoading } = useOfflineBuysStore();
  const { success, error } = useAlert();
  const [form] = useForm();
  const [fileName, setFileName] = useState('');

  const onImportFile = onHandler(async () => {
    const { file } = form.getFieldsValue();
    const formData = new FormData();
    formData.append('excelFile', file.file);
    await uploadExel(formData);
    closeForm();
    success("Импорт успешно завершен!")
  }, (e) => error(e));

  const handleFileChange = (info) => {
    const { file } = info;
    setFileName(file.name);
  };

  return (
    <AddFormWrapper>
      <StyledForm name='client_import_form' form={form} onFinish={onImportFile}>
        <Flex align='center' justify='space-between'>
          <Title level={2}>Импортирование файла</Title>
          <Button type="primary" shape="circle" icon={<CloseOutlined />} size='middle' onClick={closeForm} />
        </Flex>
        <Form.Item name="file" rules={[{ required: true, message: 'Пожалуйста, выберете файл!' }]}>
          <Dragger
            multiple={false}
            showUploadList={false}
            beforeUpload={() => false}
            fileList={[]}
            accept=".xlsx, .xls"
            onChange={handleFileChange}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Нажмите или перетащите файл в эту область для загрузки</p>
            <p className="ant-upload-hint">
              Поддерживается загрузка одного файла. Строго запрещается загружать данные компании или другие
              запрещенные файлы.
            </p>
            {fileName && fileName !== '' && (
              <Typography.Text strong>{ fileName }</Typography.Text>
            )}
          </Dragger>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size='large'
            loading={isLoading}
          >
            Импортировать
          </Button>
        </Form.Item>
      </StyledForm>
    </AddFormWrapper>
  )
}