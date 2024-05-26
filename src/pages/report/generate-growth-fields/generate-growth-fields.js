import { useReportStore } from '../../../services/stores/report/report';
import { DatePicker, Flex, Typography } from 'antd';
import moment from 'moment/moment';
import React, { useEffect } from 'react';
import { StyledSelect } from '../../../styled';
import { useProductsStore } from '../../../services/stores/products/products-service';
import { Form } from 'antd';
import { StyledLabel } from '../../../styled/label/label';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { useFormStore } from '../../../services/stores/form/form-service';
import { useCategoriesStore } from '../../../services/stores/categories/categories-service';
import { onHandler } from '../../../utils/higher-order-func';
import useAlert from '../../../hooks/alert/alert';

export const GenerateGrowthFields = ({ analyticName, label }) => {
  const { form } = useFormStore();
  const { reportData, setReportData } = useReportStore();
  const data = reportData[analyticName];
  const { products } = useProductsStore();
  const { categories, getCategories } = useCategoriesStore();
  const { error } = useAlert();

  const changeValue = (value, index, fieldName) => {
    let newValue = value;
    if (fieldName !== 'productId') {
      newValue = newValue?.format("YYYY-MM-DD") || null
    }
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      [fieldName]: newValue
    };
    setReportData({
      ...reportData,
      [analyticName]: newData
    });
  }

  const onGetCategories = onHandler(async () => {
    await getCategories();
  }, (e) => error(e));

  const getCategoryName = (categoryId) => categories.find(item => item.id === categoryId)?.name;

  useEffect(() => {
    onGetCategories();
  }, [])

  const addFields = () => {
    const newData = [...data, { productId: null, startPeriod: null, endPeriod: null }];
    setReportData({
      ...reportData,
      [analyticName]: newData
    });
  }

  const deleteFields = (indexField, fields) => {
    if (data.length > 1) {
      const newData = [...data];
      newData.splice(indexField, 1);
      setReportData({
        ...reportData,
        [analyticName]: newData
      });
      form.resetFields(fields)
    }
  }

  return (
    <>
      {
        data && Array.isArray(data) && (
          <>
            <Flex gap='10px' align='center' style={{ marginBottom: '10px' }}>
              <StyledLabel>{ label }</StyledLabel>
              <PlusCircleOutlined
                onClick={addFields}
                style={{ color: 'green', cursor: 'pointer', fontSize: '15px' }}
              />
            </Flex>
            <Flex vertical gap='10px'>
              {
                Array.isArray(data) && data.map((item, index) => (
                  <Flex key={uuidv4()} gap='10px'>
                    <Form.Item
                      name={`productId[${index}${analyticName}]`}
                      style={{ flexGrow: 1, width: '100%' }}
                      rules={[{ required: true, message: '' }]}
                    >
                      <StyledSelect
                        style={{ flexGrow: 1 }}
                        size='large'
                        value={item.productId}
                        placeholder='Выберите товар'
                        options={products?.map((product) => ({
                          value: product.id, label: <Typography.Text>{ product.name }{' '}
                            ({ getCategoryName(product.categoryId)})</Typography.Text>
                        }))}
                        onChange={(value) =>changeValue(value, index, 'productId')}
                      />
                    </Form.Item>
                    <Form.Item
                      name={`startPeriod[${index}${analyticName}]`}
                      style={{ flexGrow: 1, width: '100%' }}
                      rules={[{ required: true, message: '' }]}
                    >
                      <DatePicker
                        size='large'
                        format='DD-MM-YYYY'
                        style={{ flexGrow: 1, width: '100%' }}
                        value={item.startPeriod ? moment(item.startPeriod) : null}
                        placeholder='Начало периода'
                        onChange={(value) =>changeValue(value, index, 'startPeriod')}
                      />
                    </Form.Item>
                    <Form.Item
                      name={`endPeriod[${index}${analyticName}]`}
                      style={{ flexGrow: 1, width: '100%' }}
                      rules={[{ required: true, message: '' }]}
                    >
                      <DatePicker
                        size='large'
                        format='DD-MM-YYYY'
                        style={{ flexGrow: 1, width: '100%' }}
                        value={item.endPeriod ? moment(item.endPeriod) : null}
                        placeholder='Окончание периода'
                        onChange={(value) =>changeValue(value, index, 'endPeriod')}
                      />
                    </Form.Item>
                    {
                      index === data.length - 1 && index !== 0 && (
                        <DeleteOutlined
                          onClick={() => deleteFields(index,
                            [`productId[${index}${analyticName}]`,
                              `startPeriod[${index}${analyticName}]`,
                              `endPeriod[${index}${analyticName}]`])}
                          style={{ color: 'red', cursor: 'pointer', fontSize: '15px' }}
                        />
                      )
                    }
                  </Flex>
                ))
              }
            </Flex>
          </>
        )
      }
    </>
  )
}