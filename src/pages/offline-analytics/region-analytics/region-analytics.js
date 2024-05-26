import React, { useEffect } from 'react';
import { onHandler } from '../../../utils/higher-order-func';
import { Chart } from 'react-google-charts';
import {
  useOfflineRegionAnalytics
} from '../../../services/stores/offline-analytics/region-analytics/region-analytics';
import useAlert from '../../../hooks/alert/alert';
import Title from 'antd/es/typography/Title';
import { Divider } from 'antd';
import { DescriptionStyled } from '../../../styled/description/description';
import { PageWrapper } from '../../../styled/wrapper/page-wrapper';

export const OfflineRegionAnalytics = () => {
  const { error } = useAlert();
  const { regionData, data, labelText, getOfflineSalesRegion } = useOfflineRegionAnalytics();

  const onGetOfflineSalesRegion = onHandler(async () => {
    await getOfflineSalesRegion();
  }, (e) => error(e));

  useEffect(() => {
    onGetOfflineSalesRegion();
  }, [])

  return (
    <PageWrapper vertical>
      <Title level={2}>Региональный анализ оффлайн продаж</Title>
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
              title: 'График анализа оффлайн продаж по категории',
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