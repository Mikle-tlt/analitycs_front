import React, { useEffect, useState } from 'react';
import { onHandler } from '../../../utils/higher-order-func';
import { useTotalABCStore } from '../../../services/stores/total-analytics/abc-analytics/total-abc-analytics';
import Title from 'antd/es/typography/Title';
import { StatisticAbc } from '../../../components/statistic/statistic-abc';
import { FilterForm } from '../../../components/form/filter-form';
import { Divider } from 'antd';
import { StyledTable } from '../../../styled';
import { ABCColumns } from '../../../constants/columns/columns';
import { DescriptionStyled } from '../../../styled/description/description';
import { PageWrapper } from '../../../styled/wrapper/page-wrapper';
import useAlert from '../../../hooks/alert/alert';

export const TotalABCAnalytics = () => {
  const { error } = useAlert();
  const {
    defaultTotalABCList,
    totalABCList,
    getFilteredTotalABC,
    getTotalABC,
    setTotalABC,
    labelText
  } = useTotalABCStore();
  const [sumInfo, setSumInfo] = useState({
    revenue: 0,
    costPrice: 0,
    different: 0,
    quantity: 0
  });

  const onGetFilteredTotalABC = onHandler(async ({ withDate, byDate }) => {
    const withDateForm = withDate.format("YYYY-MM-DD");
    const byDateForm = byDate.format("YYYY-MM-DD");
    await getFilteredTotalABC(withDateForm, byDateForm)
  }, (e) => error(e));

  const onGetTotalABC = onHandler(async () => {
    await getTotalABC();
  }, (e) => error(e));

  const calculateSumInfo = () => {
    setSumInfo({
      revenue: totalABCList.reduce((sum, current) => sum + current.revenue, 0),
      costPrice: totalABCList.reduce((sum, current) => sum + current.costPrice, 0),
      different: totalABCList.reduce((sum, current) => sum + current.different, 0),
      quantity: totalABCList.reduce((sum, current) => sum + current.quantity, 0),
    })
  }

  const resetDate = () => {
    setTotalABC(defaultTotalABCList);
  };

  useEffect(() => {
    onGetTotalABC();
  }, []);

  useEffect(() => {
    totalABCList && calculateSumInfo();
  }, [totalABCList])

  return (
    <PageWrapper vertical>
      <Title level={2}>ABC-анализ онлайн и оффлайн продаж</Title>
      <StatisticAbc sumInfo={sumInfo} />
      <FilterForm submitAction={onGetFilteredTotalABC} cancelAction={resetDate} />
      <Divider />
      <StyledTable
        columns={ABCColumns}
        dataSource={totalABCList}
        rowKey="productName"
        pagination={false}
      />
      <DescriptionStyled>
        { labelText }
      </DescriptionStyled>
    </PageWrapper>
  );
};