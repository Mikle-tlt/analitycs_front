import React, { useEffect } from 'react';
import { onHandler } from '../../../utils/higher-order-func';
import { Chart } from 'react-google-charts';
import {
  useOfflineAssortmentAnalytics
} from '../../../services/stores/offline-analytics/assortment-analytics/assortment-analytics';
import useAlert from '../../../hooks/alert/alert';
import Title from 'antd/es/typography/Title';
import { Divider } from 'antd';
import { PageWrapper } from '../../../styled/wrapper/page-wrapper';

export const OfflineAssortmentAnalytics = () => {
  const { error } = useAlert();
  const { pointsData, data, getOfflineAssortment } = useOfflineAssortmentAnalytics();

  const onGetOfflineAssortment = onHandler(async () => {
    await getOfflineAssortment();
  }, (e) => error(e));

  useEffect(() => {
    onGetOfflineAssortment();
  }, [])

  return (
    <PageWrapper vertical>
      <Title level={2}>Анализ ассортимента оффлайн магазинов</Title>
      <Divider />
      {
        pointsData && (
          <Chart
            width='100%'
            height='500px'
            chartType='ColumnChart'
            loader={<div>Loading Chart</div>}
            data={[
              ['Регион', 'Количество'],
              ...pointsData.map((item, index) => [item, data[index]])
            ]}
            options={{
              title: 'График анализа ассортимента оффлайн магазинов',
              hAxis: { title: 'Оффлайн точка' },
              vAxis: { title: 'Количество' },
              bar: { groupWidth: "80%" },
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        )
      }
    </PageWrapper>
  );
};