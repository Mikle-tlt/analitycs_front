import React, { useEffect, useState } from 'react';
import { onHandler } from '../../../utils/higher-order-func/on-handler/onHandler';
import {
  useTotalGeneralStore
} from '../../../services/stores/total-analytics/general-analytics/total-general-analytics';
import { PageWrapper } from '../../../styled/wrapper/page-wrapper';
import Title from 'antd/es/typography/Title';
import { FilterForm } from '../../../components/form/filter-form';
import { Divider, Table } from 'antd';
import { StyledTable } from '../../../styled';
import { GeneralColumns } from '../../../constants/columns';
import useAlert from '../../../hooks/alert/alert';

export const TotalGeneralAnalytics = () => {
  const { error } = useAlert();
  const {
    defaultTotalGeneralList,
    getFilteredTotalGeneral,
    getTotalGeneral,
    setTotalGeneral,
    totalGeneralList
  } = useTotalGeneralStore();
  const [sumInfo, setSumInfo] = useState({
    revenue: 0,
    costPrice: 0,
    different: 0,
    quantity: 0
  });

  const onGetFilteredTotalGeneral = onHandler(async ({ withDate, byDate }) => {
    const withDateForm = withDate.format("YYYY-MM-DD");
    const byDateForm = byDate.format("YYYY-MM-DD");
    await getFilteredTotalGeneral(withDateForm, byDateForm);
  }, (e) => error(e));

  const onGetTotalGeneral = onHandler(async () => {
    await getTotalGeneral();
  }, (e) => error(e));

  const calculateSumInfo = () => {
    setSumInfo({
      revenue: totalGeneralList.reduce((sum, current) => sum + current.revenue, 0),
      costPrice: totalGeneralList.reduce((sum, current) => sum + current.costPrice, 0),
      different: totalGeneralList.reduce((sum, current) => sum + current.different, 0),
      quantity: totalGeneralList.reduce((sum, current) => sum + current.quantity, 0),
    })
  }

  const resetDate = () => {
    setTotalGeneral(defaultTotalGeneralList);
  };

  useEffect(() => {
    onGetTotalGeneral();
  }, []);

  useEffect(() => {
    totalGeneralList && calculateSumInfo();
  }, [totalGeneralList])

  return (
    <PageWrapper vertical>
      <Title level={2}>Общая сводка по онлайн и оффлайн продажам</Title>
      <FilterForm submitAction={onGetFilteredTotalGeneral} cancelAction={resetDate} />
      <Divider />
      <StyledTable
        columns={GeneralColumns}
        dataSource={totalGeneralList}
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