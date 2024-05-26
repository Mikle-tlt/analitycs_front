import React, { useEffect } from 'react';
import { onHandler } from '../../../utils/higher-order-func';
import { Chart } from 'react-google-charts';
import { useTotalRegionAnalytics } from '../../../services/stores/total-analytics/region-analytics/region-analytics';
import { PageWrapper } from '../../../styled/wrapper/page-wrapper';
import Title from 'antd/es/typography/Title';
import { Divider } from 'antd';
import { DescriptionStyled } from '../../../styled/description/description';
import useAlert from '../../../hooks/alert/alert';

export const TotalRegionAnalytics = () => {
  const { error } = useAlert();
  const {
    regionData,
    data,
    labelText,
    getTotalSalesRegion
  } = useTotalRegionAnalytics();

  const onGetTotalSalesRegion = onHandler(async () => {
    await getTotalSalesRegion();
  }, (e) => error(e));

  useEffect(() => {
    onGetTotalSalesRegion();
  }, [])

  return (
    <PageWrapper vertical>
      <Title level={2}>Региональный анализ онлайн и оффлайн продаж</Title>
      <Divider />
      {
        regionData && (
          <Chart
            width='100%'
            height='500px'
            chartType='ColumnChart'
            loader={<div>Loading Chart</div>}
            data={[
              ['Регион', 'Продано'],
              ...regionData.map((item, index) => [item, data[index]])
            ]}
            options={{
              title: 'График анализа онлайн и оффлайн продаж по категории',
              hAxis: { title: 'Регион' },
              vAxis: { title: 'Продано' },
              bar: { groupWidth: "80%" },
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        )
      }
      <DescriptionStyled>
        { labelText }
      </DescriptionStyled>
    </PageWrapper>
  );
};