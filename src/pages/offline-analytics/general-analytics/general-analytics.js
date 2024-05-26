import React, { useEffect, useState } from 'react';
import { onHandler } from '../../../utils/higher-order-func';
import {
  useOfflineGeneralStore
} from '../../../services/stores/offline-analytics/general-analytics/offline-general-analytics';
import Title from 'antd/es/typography/Title';
import { FilterForm } from '../../../components/form/filter-form';
import { Divider, Table } from 'antd';
import { StyledTable } from '../../../styled';
import { GeneralColumns } from '../../../constants/columns';
import { PageWrapper } from '../../../styled/wrapper/page-wrapper';
import useAlert from '../../../hooks/alert/alert';

export const OfflineGeneralAnalytics = () => {
  const { error } = useAlert();
  const {
    defaultOfflineGeneralList,
    offlineGeneralList,
    setDefaultOfflineGeneral,
    getFilteredOfflineGeneral,
    getOfflineGeneral
  } = useOfflineGeneralStore();
  const [sumInfo, setSumInfo] = useState({
    revenue: 0,
    costPrice: 0,
    different: 0,
    quantity: 0
  });

  const onGetFilteredOfflineGeneral = onHandler(async ({ withDate, byDate }) => {
    const withDateForm = withDate.format("YYYY-MM-DD");
    const byDateForm = byDate.format("YYYY-MM-DD");
    await getFilteredOfflineGeneral(withDateForm, byDateForm);
  }, (e) => error(e));

  const onGetOfflineGeneral = onHandler(async () => {
    await getOfflineGeneral();
  }, (e) => error(e));

  const calculateSumInfo = () => {
    setSumInfo({
      revenue: offlineGeneralList.reduce((sum, current) => sum + current.revenue, 0),
      costPrice: offlineGeneralList.reduce((sum, current) => sum + current.costPrice, 0),
      different: offlineGeneralList.reduce((sum, current) => sum + current.different, 0),
      quantity: offlineGeneralList.reduce((sum, current) => sum + current.quantity, 0),
    })
  }

  const resetDate = () => {
    setDefaultOfflineGeneral(defaultOfflineGeneralList);
  };

  useEffect(() => {
    onGetOfflineGeneral();
  }, []);

  useEffect(() => {
    offlineGeneralList && calculateSumInfo();
  }, [offlineGeneralList])

  return (
    <PageWrapper vertical>
      <Title level={2}>Общая сводка по оффлайн продажам</Title>
      <FilterForm submitAction={onGetFilteredOfflineGeneral} cancelAction={resetDate} />
      <Divider />
      <StyledTable
        columns={GeneralColumns}
        dataSource={offlineGeneralList}
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