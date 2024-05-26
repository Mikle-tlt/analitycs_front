import React, { useEffect, useState } from 'react';
import { useOnlineABCStore } from '../../../services/stores/online-analytics/abc-analytics/online-abc-analytics';
import { onHandler } from '../../../utils/higher-order-func';
import Title from 'antd/es/typography/Title';
import { FilterForm } from '../../../components/form/filter-form';
import { Divider, Table } from 'antd';
import { StyledTable } from '../../../styled';
import { PageWrapper } from '../../../styled/wrapper/page-wrapper';
import { StatisticAbc } from '../../../components/statistic/statistic-abc';
import useAlert from '../../../hooks/alert/alert';
import { DescriptionStyled } from '../../../styled/description/description';
import { ABCColumns } from '../../../constants/columns/columns';

export const OnlineABCAnalytics = () => {
  const { error } = useAlert();
  const {
    defaultOnlineABCList,
    onlineABCList,
    getFilteredOnlineABC,
    getOnlineABC,
    setOnlineABC,
    labelText
  } = useOnlineABCStore();
  const [sumInfo, setSumInfo] = useState({
    revenue: 0,
    costPrice: 0,
    different: 0,
    quantity: 0
  });

  const onGetFilteredOnlineABC = onHandler(async ({ withDate, byDate }) => {
    const withDateForm = withDate.format("YYYY-MM-DD");
    const byDateForm = byDate.format("YYYY-MM-DD");
    await getFilteredOnlineABC(withDateForm, byDateForm)
  }, (e) => error(e));

  const onGetOnlineABC = onHandler(async () => {
    await getOnlineABC();
  }, (e) => error(e));

  const calculateSumInfo = () => {
    setSumInfo({
      revenue: onlineABCList.reduce((sum, current) => sum + current.revenue, 0),
      costPrice: onlineABCList.reduce((sum, current) => sum + current.costPrice, 0),
      different: onlineABCList.reduce((sum, current) => sum + current.different, 0),
      quantity: onlineABCList.reduce((sum, current) => sum + current.quantity, 0),
    })
  }

  const resetDate = () => {
    setOnlineABC(defaultOnlineABCList);
  };

  useEffect(() => {
    onGetOnlineABC();
  }, []);

  useEffect(() => {
    onlineABCList && calculateSumInfo();
  }, [onlineABCList])

  return (
    <PageWrapper vertical>
      <Title level={2}>ABC-анализ онлайн продаж</Title>
      <StatisticAbc sumInfo={sumInfo} />
      <FilterForm submitAction={onGetFilteredOnlineABC} cancelAction={resetDate} />
      <Divider />
      <StyledTable
        columns={ABCColumns}
        dataSource={onlineABCList}
        rowKey="productName"
        pagination={false}
      />
      <DescriptionStyled>
        { labelText }
      </DescriptionStyled>
    </PageWrapper>
  );
};