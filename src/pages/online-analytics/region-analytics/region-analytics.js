import React, { useEffect } from 'react';
import { useOnlineRegionAnalytics } from '../../../services/stores/online-analytics/region-analytics/region-analytics';
import { onHandler } from '../../../utils/higher-order-func';
import { Chart } from 'react-google-charts';
import Title from 'antd/es/typography/Title';
import { Divider } from 'antd';
import { DescriptionStyled } from '../../../styled/description/description';
import { PageWrapper } from '../../../styled/wrapper/page-wrapper';
import useAlert from '../../../hooks/alert/alert';

export const OnlineRegionAnalytics = () => {
  const { error } = useAlert();
  const { regionData, data, labelText, getOnlineSalesRegion } = useOnlineRegionAnalytics();

  const onGetOnlineSalesRegion = onHandler(async () => {
    await getOnlineSalesRegion();
  }, (e) => error(e));

  useEffect(() => {
    onGetOnlineSalesRegion();
  }, [])

  return (
    <PageWrapper vertical>
      <Title level={2}>Региональный анализ онлайн продаж</Title>
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
              title: 'График анализа онлайн продаж по категории',
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