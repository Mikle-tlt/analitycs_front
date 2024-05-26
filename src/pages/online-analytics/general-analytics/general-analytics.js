import React, { useEffect, useState } from 'react';
import { useOnlineGeneralStore }
  from '../../../services/stores/online-analytics/general-analytics/online-general-analytics';
import { onHandler } from '../../../utils/higher-order-func';
import { PageWrapper } from '../../../styled/wrapper/page-wrapper';
import Title from 'antd/es/typography/Title';
import { Divider } from 'antd';
import { StyledSelect, StyledTable } from '../../../styled';
import { Table } from 'antd';
import { FilterForm } from '../../../components/form/filter-form';
import useAlert from '../../../hooks/alert/alert';
import { GeneralColumns } from '../../../constants/columns';

export const OnlineGeneralAnalytics = () => {
  const { error } = useAlert();
  const {
    defaultOnlineGeneralList,
    onlineGeneralList,
    getFilteredOnlineGeneral,
    getOnlineGeneral,
    setOnlineGeneral
  } = useOnlineGeneralStore();
  const [sumInfo, setSumInfo] = useState({
    revenue: 0,
    costPrice: 0,
    different: 0,
    quantity: 0
  });

  const onGetFilteredOnlineGeneral = onHandler(async ({ withDate, byDate }) => {
    const withDateForm = withDate.format("YYYY-MM-DD");
    const byDateForm = byDate.format("YYYY-MM-DD");
    await getFilteredOnlineGeneral(withDateForm, byDateForm);
  }, (e) => error(e));

  const onGetOnlineGeneral = onHandler(async () => {
    await getOnlineGeneral();
  }, (e) => error(e));

  const calculateSumInfo = () => {
    setSumInfo({
      revenue: onlineGeneralList.reduce((sum, current) => sum + current.revenue, 0),
      costPrice: onlineGeneralList.reduce((sum, current) => sum + current.costPrice, 0),
      different: onlineGeneralList.reduce((sum, current) => sum + current.different, 0),
      quantity: onlineGeneralList.reduce((sum, current) => sum + current.quantity, 0),
    })
  }

  const resetDate = () => {
    setOnlineGeneral(defaultOnlineGeneralList);
  };

  useEffect(() => {
    onGetOnlineGeneral();
  }, []);

  useEffect(() => {
    onlineGeneralList && calculateSumInfo();
  }, [onlineGeneralList])

  return (
    <PageWrapper vertical>
      <Title level={2}>Общая сводка по онлайн продажам</Title>
      <FilterForm submitAction={onGetFilteredOnlineGeneral} cancelAction={resetDate} />
      <Divider />
      <StyledTable
        columns={GeneralColumns}
        dataSource={onlineGeneralList}
        rowKey="productName"
        pagination={false}
        scroll={{ y: 400 }}
        summary={() => (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>Итого: </Table.Summary.Cell>
              <Table.Summary.Cell index={1} />
              <Table.Summary.Cell index={2}>{ sumInfo.quantity }</Table.Summary.Cell>
              <Table.Summary.Cell index={3}>{ sumInfo.revenue }</Table.Summary.Cell>
              <Table.Summary.Cell index={4}>{ sumInfo.costPrice }</Table.Summary.Cell>
              <Table.Summary.Cell index={5}>{ sumInfo.different }</Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
    </PageWrapper>
  );
};