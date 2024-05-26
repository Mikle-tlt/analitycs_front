import React, { useEffect, useState } from 'react';
import Title from 'antd/es/typography/Title';
import { Button, Divider, Flex, Form, Typography } from 'antd';
import { PageWrapper } from '../../styled/wrapper/page-wrapper';
import { StyledCheckboxGroup } from '../../styled/checkbox';
import { offlineOptions, onlineOptions, totalOptions } from '../../constants/report-data';
import { useReportStore } from '../../services/stores/report/report';
import { useForm } from 'antd/es/form/Form';
import { StyledForm } from '../login/styled';
import { AddFormWrapper } from '../../styled/add-form/add-form';
import { GenerateFields } from './generate-fields';
import { useProductsStore } from '../../services/stores/products/products-service';
import { onHandler } from '../../utils/higher-order-func';
import useAlert from '../../hooks/alert/alert';
import { useCategoriesStore } from '../../services/stores/categories/categories-service';
import { CloseOutlined } from '@ant-design/icons';
import { useFormStore } from '../../services/stores/form/form-service';

export const Report = () => {
  const [form] = useForm();
  const { error, success } = useAlert();
  const { reportData, setReportData, generateReport, isLoading } = useReportStore();
  const [onlineChecks, setOnlineChecks] = useState([]);
  const [offlineChecks, setOfflineChecks] = useState([]);
  const [totalChecks, setTotalChecks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { products, getProducts} = useProductsStore();
  const { categories, getCategories } = useCategoriesStore();
  const { setForm } = useFormStore();

  const onChangeOnline = (checkedValues) => {
    setOnlineChecks(checkedValues);
  };
  const onChangeOffline = (checkedValues) => {
    setOfflineChecks(checkedValues);
  };
  const onChangeTotal = (checkedValues) => {
    setTotalChecks(checkedValues);
  };

  const closeForm = () => {
    setReportData({});
    setIsFormOpen(false);
    form.resetFields();
  }

  const onGetProducts = onHandler(async () => {
    !products && await getProducts();
  }, (e) => error(e));

  const onGetCategories = onHandler(async () => {
    !categories && await getCategories();
  }, (e) => error(e));

  const onGenerateReport = onHandler(async () => {
    await generateReport(reportData);
    closeForm();
    success('Отчет успешно создан!');
    setTotalChecks([]);
    setOnlineChecks([]);
    setOfflineChecks([]);
  }, (e) => error(e));

  useEffect(() => {
    setForm(form);
  }, [])

  const addDatesFields = () => ([{ startPeriod: null, endPeriod: null }]);
  const addCategoryFields = () => ([{ categoryId: null, year: null }]);
  const addGrowthFields = () => ([{ productId: null, startPeriod: null, endPeriod: null }]);
  const addProfitabilityFields = () => ([{
    startPeriodFirst: null,
    endPeriodFirst: null,
    startPeriodSecond: null,
    endPeriodSecond: null
  }]);

  useEffect(() => {
    onGetProducts();
    onGetCategories();
  }, [])

  const addReport = () => {
    const reportObject = {};
    if (onlineChecks.includes(onlineOptions[0].value)) reportObject[onlineOptions[0].value] = addDatesFields();
    if (onlineChecks.includes(onlineOptions[1].value)) reportObject[onlineOptions[1].value] = addDatesFields();
    if (onlineChecks.includes(onlineOptions[2].value)) reportObject[onlineOptions[2].value] = addDatesFields();
    if (onlineChecks.includes(onlineOptions[3].value)) reportObject[onlineOptions[3].value] = addProfitabilityFields();
    if (onlineChecks.includes(onlineOptions[4].value)) reportObject[onlineOptions[4].value] = addGrowthFields();
    if (onlineChecks.includes(onlineOptions[5].value)) reportObject[onlineOptions[5].value] = addCategoryFields();
    if (onlineChecks.includes(onlineOptions[6].value)) reportObject[onlineOptions[6].value] = true
    if (onlineChecks.includes(onlineOptions[7].value)) reportObject[onlineOptions[7].value] = [2024]

    if (offlineChecks.includes(offlineOptions[0].value)) reportObject[offlineOptions[0].value] = addDatesFields()
    if (offlineChecks.includes(offlineOptions[1].value)) reportObject[offlineOptions[1].value] = addDatesFields();
    if (offlineChecks.includes(offlineOptions[2].value)) reportObject[offlineOptions[2].value] = addDatesFields();
    if (offlineChecks.includes(offlineOptions[3].value)) reportObject[offlineOptions[3].value] = addProfitabilityFields();
    if (offlineChecks.includes(offlineOptions[4].value)) reportObject[offlineOptions[4].value] = addGrowthFields();
    if (offlineChecks.includes(offlineOptions[5].value)) reportObject[offlineOptions[5].value] = addCategoryFields();
    if (offlineChecks.includes(offlineOptions[6].value)) reportObject[offlineOptions[6].value] = true
    if (offlineChecks.includes(offlineOptions[7].value)) reportObject[offlineOptions[7].value] = true;

    if (totalChecks.includes(totalOptions[0].value)) reportObject[totalOptions[0].value] = addDatesFields()
    if (totalChecks.includes(totalOptions[1].value)) reportObject[totalOptions[1].value] = addDatesFields();
    if (totalChecks.includes(totalOptions[2].value)) reportObject[totalOptions[2].value] = addDatesFields();
    if (totalChecks.includes(totalOptions[3].value)) reportObject[totalOptions[3].value] = addProfitabilityFields();
    if (totalChecks.includes(totalOptions[4].value)) reportObject[totalOptions[4].value] = addGrowthFields();
    if (totalChecks.includes(totalOptions[5].value)) reportObject[totalOptions[5].value] = addCategoryFields();
    if (totalChecks.includes(totalOptions[6].value)) reportObject[totalOptions[6].value] = true;
    setReportData(reportObject);
  }

  const openGenerateForm = () => {
    addReport();
    setIsFormOpen(true);
  }

  return (
    <>
      <PageWrapper vertical>
        <Title level={2}>Отчет</Title>
        <Flex justify='flex-end' gap='20px'>
          <Button
            type="primary"
            size='large'
            disabled={onlineChecks.length === 0 && offlineChecks.length === 0 && totalChecks.length === 0 }
            onClick={openGenerateForm}
          >
            Сгенерировать
          </Button>
        </Flex>
        <Divider />
        <Flex justify='space-between' gap='20px'>
          <Flex vertical gap='20px'>
            <Typography.Title level={4}>Онлайн аналитика</Typography.Title>
            <StyledCheckboxGroup
              value={onlineChecks}
              options={onlineOptions}
              onChange={onChangeOnline}
            />
          </Flex>
          <Flex vertical gap='20px'>
            <Typography.Title level={4}>Оффлайн аналитика</Typography.Title>
            <StyledCheckboxGroup
              value={offlineChecks}
              options={offlineOptions}
              onChange={onChangeOffline}
            />
          </Flex>
          <Flex vertical gap='20px'>
            <Typography.Title level={4}>Общая аналитика</Typography.Title>
            <StyledCheckboxGroup
              value={totalChecks}
              options={totalOptions}
              onChange={onChangeTotal}
            />
          </Flex>
        </Flex>
      </PageWrapper>
      {
        isFormOpen && (
          <AddFormWrapper>
            <StyledForm name='report_form' form={form} onFinish={onGenerateReport}>
              <Flex vertical gap='20px'>
                <Flex align='center' justify='space-between' gap='20px'>
                  <Title level={2}>Формирование данных для отчета</Title>
                  <Button type="primary" shape="circle" icon={<CloseOutlined />} size='middle'
                          onClick={closeForm} />
                </Flex>
                {
                  onlineChecks && onlineChecks.length > 0 && (
                    <Flex vertical gap='20px' >
                      <Typography.Title level={4}>Онлайн аналитика</Typography.Title>
                      {
                        onlineChecks.map((analyticName, index) => (
                          <div key={index}>
                            {
                              <GenerateFields
                                analyticName={analyticName}
                                label={onlineOptions.find(item => item.value === analyticName).label}
                              />
                            }
                          </div>
                        ))
                      }
                    </Flex>
                  )
                }
                {
                  offlineChecks && offlineChecks.length > 0 && (
                    <Flex vertical gap='20px'>
                      <Typography.Title level={4}>Оффлайн аналитика</Typography.Title>
                      {
                        offlineChecks.map((analyticName, index) => (
                          <div key={index}>
                            {
                              <GenerateFields
                                analyticName={analyticName}
                                label={offlineOptions.find(item => item.value === analyticName).label} />
                            }
                          </div>
                        ))
                      }
                    </Flex>
                  )
                }
                {
                  totalChecks && totalChecks.length > 0 && (
                    <Flex vertical gap='20px'>
                      <Typography.Title level={4}>Общая аналитика</Typography.Title>
                      {
                        totalChecks.map((analyticName, index) => (
                          <div key={index}>
                            {
                              <GenerateFields
                                analyticName={analyticName}
                                label={totalOptions.find(item => item.value === analyticName).label}
                              />
                            }
                          </div>
                        ))
                      }
                    </Flex>
                  )
                }
              </Flex>
              <Form.Item>
                <Button type="primary" htmlType="submit" block size='large' loading={isLoading}>
                  Сформировать
                </Button>
              </Form.Item>
            </StyledForm>
          </AddFormWrapper>
        )
      }
    </>
  );
};

