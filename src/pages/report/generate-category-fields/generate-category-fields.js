import { useReportStore } from '../../../services/stores/report/report';
import { Flex, Typography } from 'antd';
import { StyledSelect } from '../../../styled';
import React from 'react';
import { StyledNumberInput } from '../../../styled/input/input';
import { useCategoriesStore } from '../../../services/stores/categories/categories-service';
import { Form } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { StyledLabel } from '../../../styled/label/label';
import { v4 as uuidv4 } from 'uuid';
import { useFormStore } from '../../../services/stores/form/form-service';

export const GenerateCategoryFields = ({ analyticName, label }) => {
  const { form } = useFormStore();
  const { reportData, setReportData } = useReportStore();
  const data = reportData[analyticName];
  const { categories } = useCategoriesStore();

  const changeValue = (value, index, fieldName) => {
    let newValue = value;
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

  const addFields = () => {
    const newData = [...data, { categoryId: null, year: null }];
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
                      name={`categoryId[${index}${analyticName}]`}
                      style={{ flexGrow: 1, width: '100%' }}
                      rules={[{ required: true, message: '' }]}
                    >
                      <StyledSelect
                        style={{ flexGrow: 1 }}
                        size='large'
                        value={item.categoryId}
                        placeholder='Выберите категорию'
                        options={categories?.map((category) => ({
                          value: category.id, label: <Typography.Text>{ category.name }</Typography.Text>
                        }))}
                        onChange={(value) =>changeValue(value, index, 'categoryId')}
                      />
                    </Form.Item>
                    <Form.Item
                      name={`year[${index}${analyticName}]`}
                      style={{ flexGrow: 1, width: '100%' }}
                      rules={[{ required: true, message: '' }]}
                    >
                      <StyledNumberInput
                        min={1980} max={2024}
                        placeholder="Выберите год" size='large'
                        style={{ flexGrow: 1, width: '100%' }}
                        onChange={(value) =>changeValue(value, index, 'year')}
                      />
                    </Form.Item>
                    {
                      index === data.length - 1 && index !== 0 && (
                        <DeleteOutlined
                          onClick={() => deleteFields(index,
                            [`categoryId[${index}${analyticName}]`, `year[${index}${analyticName}]`])}
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