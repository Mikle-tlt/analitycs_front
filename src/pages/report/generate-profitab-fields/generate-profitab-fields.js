import { useReportStore } from '../../../services/stores/report/report';
import { DatePicker, Flex } from 'antd';
import moment from 'moment/moment';
import React from 'react';
import { Form } from 'antd';
import { StyledLabel } from '../../../styled/label/label';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { useFormStore } from '../../../services/stores/form/form-service';

export const GenerateProfitabFields = ({ analyticName, label }) => {
  const { form } = useFormStore();
  const { reportData, setReportData } = useReportStore();
  const data = reportData[analyticName];

  const changeValue = (value, index, fieldName) => {
    let newValue = value;
    newValue = newValue?.format("YYYY-MM-DD") || null
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
    const newData = [...data, {
      startPeriodFirst: null,
      endPeriodFirst: null,
      startPeriodSecond: null,
      endPeriodSecond: null
    }];
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
                  <React.Fragment key={uuidv4()}>
                    <Flex gap='10px'>
                     <Flex vertical style={{ flexGrow: 1, gap: '5px' }}>
                       <Flex gap='10px' style={{ width: '100%' }}>
                         <Form.Item
                           name={`startPeriodFirst[${index}${analyticName}]`}
                           style={{ flexGrow: 1, width: '100%' }}
                           rules={[{ required: true, message: '' }]}
                         >
                           <DatePicker
                             size='large'
                             style={{ flexGrow: 1, width: '100%' }}
                             value={item.startPeriodFirst ? moment(item.startPeriodFirst) : null}
                             placeholder='Начало первого периода'
                             format='DD-MM-YYYY'
                             onChange={(value) => changeValue(value, index, 'startPeriodFirst')}
                           />
                         </Form.Item>
                         <Form.Item
                           name={`endPeriodFirst[${index}${analyticName}]`}
                           style={{ flexGrow: 1, width: '100%' }}
                           rules={[{ required: true, message: '' }]}
                         >
                           <DatePicker
                             size='large'
                             format='DD-MM-YYYY'
                             style={{ flexGrow: 1, width: '100%' }}
                             value={item.endPeriodFirst ? moment(item.endPeriodFirst) : null}
                             placeholder='Окончание первого периода'
                             onChange={(value) =>changeValue(value, index, 'endPeriodFirst')}
                           />
                         </Form.Item>
                       </Flex>
                       <Flex key={index} gap='10px'>
                         <Form.Item
                           name={`startPeriodSecond[${index}${analyticName}]`}
                           style={{ flexGrow: 1, width: '100%' }}
                           rules={[{ required: true, message: '' }]}
                         >
                           <DatePicker
                             size='large'
                             format='DD-MM-YYYY'
                             style={{ flexGrow: 1, width: '100%' }}
                             value={item.startPeriodSecond ? moment(item.startPeriodSecond) : null}
                             placeholder='Начало второго периода'
                             onChange={(value) =>changeValue(value, index, 'startPeriodSecond')}
                           />
                         </Form.Item>
                         <Form.Item
                           name={`endPeriodSecond[${index}${analyticName}]`}
                           style={{ flexGrow: 1, width: '100%' }}
                           rules={[{ required: true, message: '' }]}
                         >
                           <DatePicker
                             size='large'
                             format='DD-MM-YYYY'
                             style={{ flexGrow: 1, width: '100%' }}
                             value={item.endPeriodSecond ? moment(item.endPeriodSecond) : null}
                             placeholder='Окончание второго периода'
                             onChange={(value) =>changeValue(value, index, 'endPeriodSecond')}
                           />
                         </Form.Item>
                       </Flex>
                     </Flex>
                      {
                        index === data.length - 1 && index !== 0 && (
                          <DeleteOutlined
                            onClick={() => deleteFields(index,
                              [`startPeriodFirst[${index}${analyticName}]`, `endPeriodFirst[${index}${analyticName}]`,
                                `startPeriodSecond[${index}${analyticName}]`, `endPeriodSecond[${index}${analyticName}]`])}
                            style={{ color: 'red', cursor: 'pointer', fontSize: '15px' }}
                          />
                        )
                      }
                    </Flex>
                  </React.Fragment>
                ))
              }
            </Flex>
          </>
        )
      }
    </>
  )
}