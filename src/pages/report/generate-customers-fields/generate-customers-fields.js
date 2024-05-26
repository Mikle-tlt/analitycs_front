import { useReportStore } from '../../../services/stores/report/report';
import { Flex } from 'antd';
import { StyledNumberInput } from '../../../styled/input/input';
import React from 'react';
import { Form } from 'antd';
import { StyledLabel } from '../../../styled/label/label';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { useFormStore } from '../../../services/stores/form/form-service';

export const GenerateCustomersFields = ({ analyticName, label }) => {
  const { reportData, setReportData } = useReportStore();
  const data = reportData[analyticName];
  const { form } = useFormStore();

  const changeValue = (value, index) => {
    let newData = [...data];
    newData[index] = value;
    setReportData({
      ...reportData,
      [analyticName]: newData
    });
  }

  const addFields = () => {
    const newData = [...data, 2024];
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
              />            </Flex>
            <Flex vertical gap='10px'>
              {
                Array.isArray(data) && data.map((item, index) => (
                  <Flex key={uuidv4()} gap='10px'>
                    <Form.Item
                      name={`year[${index}${analyticName}]`}
                      style={{ flexGrow: 1, width: '100%' }}
                      rules={[{ required: true, message: '' }]}
                    >
                      <StyledNumberInput
                        min={1980} max={2024}
                        placeholder="Выберите год" size='large'
                        style={{ flexGrow: 1, width: '100%' }}
                        value={item}
                        onChange={(value) =>changeValue(value, index)}
                      />
                    </Form.Item>
                    {
                      index === data.length - 1 && index !== 0 && (
                        <DeleteOutlined
                          onClick={() => deleteFields(index,
                            [`year[${index}${analyticName}]`])}
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
  );
}