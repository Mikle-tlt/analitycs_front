import { useReportStore } from '../../../services/stores/report/report';
import { DatePicker, Flex, Form } from 'antd';
import React from 'react';
import moment from 'moment';
import { StyledLabel } from '../../../styled/label/label';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { useFormStore } from '../../../services/stores/form/form-service';

export const GenerateDateFields = ({ analyticName, label }) => {
  const { form } = useFormStore();
  const { reportData, setReportData } = useReportStore();
  const data = reportData[analyticName];

  const changeValue = (value, index, fieldName) => {
    let newValue = value;
    newValue = newValue?.format("YYYY-MM-DD") || null;
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
    const newData = [...data, { startPeriod: null, endPeriod: null }];
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
                      name={`startPeriod[${index}${analyticName}]`}
                      style={{ flexGrow: 1, width: '100%' }}
                      rules={[{ required: true, message: '' }]}
                    >
                      <DatePicker
                        size='large'
                        style={{ flexGrow: 1, width: '100%' }}
                        value={item.startPeriod ? moment(item.startPeriod) : null}
                        placeholder='Начало периода'
                        onChange={(value) =>changeValue(value, index, 'startPeriod')}
                      />
                    </Form.Item>
                    <Form.Item
                      style={{ flexGrow: 1, width: '100%' }}
                      name={`endPeriod[${index}${analyticName}]`}
                      rules={[{ required: true, message: '' }]}>
                      <DatePicker
                        size='large'
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
                            [`startPeriod[${index}${analyticName}]`, `endPeriod[${index}${analyticName}]`])}
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
};