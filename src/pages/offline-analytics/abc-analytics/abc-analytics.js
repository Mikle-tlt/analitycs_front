import React, { useEffect, useState } from 'react';
import { onHandler } from '../../../utils/higher-order-func';
import { useOfflineABCStore } from '../../../services/stores/offline-analytics/abc-analytics/offline-abc-analytics';
import useAlert from '../../../hooks/alert/alert';
import Title from 'antd/es/typography/Title';
import { StatisticAbc } from '../../../components/statistic/statistic-abc';
import { FilterForm } from '../../../components/form/filter-form';
import { Divider } from 'antd';
import { StyledTable } from '../../../styled';
import { ABCColumns } from '../../../constants/columns/columns';
import { DescriptionStyled } from '../../../styled/description/description';
import { PageWrapper } from '../../../styled/wrapper/page-wrapper';

export const OfflineABCAnalytics = () => {
  const { error } = useAlert();
  const {
    defaultOfflineABCList,
    getOfflineABC,
    getFilteredOfflineABC,
    setDefaultOfflineABC,
    labelText,
    offlineABCList
  } = useOfflineABCStore();
  const [sumInfo, setSumInfo] = useState({
    revenue: 0,
    costPrice: 0,
    different: 0,
    quantity: 0
  });

  const onGetFilteredOfflineABC = onHandler(async ({ withDate, byDate }) => {
    const withDateForm = withDate.format("YYYY-MM-DD");
    const byDateForm = byDate.format("YYYY-MM-DD");
    await getFilteredOfflineABC(withDateForm, byDateForm)
  }, (e) => error(e));

  const onGetOfflineABC = onHandler(async () => {
    await getOfflineABC();
  }, (e) => error(e));

  const calculateSumInfo = () => {
    setSumInfo({
      revenue: offlineABCList.reduce((sum, current) => sum + current.revenue, 0),
      costPrice: offlineABCList.reduce((sum, current) => sum + current.costPrice, 0),
      different: offlineABCList.reduce((sum, current) => sum + current.different, 0),
      quantity: offlineABCList.reduce((sum, current) => sum + current.quantity, 0),
    })
  }

  const resetDate = () => {
    setDefaultOfflineABC(defaultOfflineABCList);
  };

  useEffect(() => {
    onGetOfflineABC();
  }, []);

  useEffect(() => {
    offlineABCList && calculateSumInfo();
  }, [offlineABCList])

  return (
    <PageWrapper vertical>
      <Title level={2}>ABC-анализ оффлайн продаж</Title>
      <StatisticAbc sumInfo={sumInfo} />
      <FilterForm submitAction={onGetFilteredOfflineABC} cancelAction={resetDate} />
      <Divider />
      <StyledTable
        columns={ABCColumns}
        dataSource={offlineABCList}
        rowKey="productName"
        pagination={false}
      />
      <DescriptionStyled>
        { labelText }
      </DescriptionStyled>
    </PageWrapper>
  );
};