import React, { useEffect, useState } from 'react';
import {
  useOnlineGrowthStore
} from '../../../services/stores/online-analytics/growth-analytics/online-growth-analytics';
import { useProductsStore } from '../../../services/stores/products/products-service';
import {
  calculateApproximation
} from '../../../services/stores/online-analytics/growth-analytics/chart-generate-data/chart-generate-data';
import { Chart } from 'react-google-charts';
import { onHandler } from '../../../utils/higher-order-func';
import { PageWrapper } from '../../../styled/wrapper/page-wrapper';
import Title from 'antd/es/typography/Title';
import { Divider } from 'antd';
import { DescriptionStyled } from '../../../styled/description/description';
import { FilterGrowthForm } from '../../../components/form/filter-growth-form';
import useAlert from '../../../hooks/alert/alert';

export const OnlineGrowthAnalytics = () => {
  const { error } = useAlert();
  const { revenues, days, labelText, getOnlineGrowth, setDefaultData } = useOnlineGrowthStore();
  const { products, getProducts } = useProductsStore();
  const [approximations, setApproximations] = useState([]);

  const onGetProducts = onHandler(async () => {
    !products && await getProducts();
  }, (e) => error(e));

  const onGetOnlineGrowth = onHandler(async ({ productId, withDate, byDate }) => {
    const withDateForm = withDate.format("YYYY-MM-DD");
    const byDateForm = byDate.format("YYYY-MM-DD");
    await getOnlineGrowth(productId, withDateForm, byDateForm)
  }, (e) => error(e));

  const resetDate = () => {
    setDefaultData();
  }

  useEffect(() => {
    onGetProducts();
  }, [])

  useEffect(() => {
    if (revenues && days && revenues.length === days.length) {
      const approximations = revenues.map((_, index) => calculateApproximation(index, revenues));
      setApproximations(approximations);
    }
  }, [revenues, days]);


  return (
    <PageWrapper vertical>
      <Title level={2}>Анализ темпов онлайн продаж</Title>
      <FilterGrowthForm submitAction={onGetOnlineGrowth} cancelAction={resetDate} />
      <Divider />
      {
        days && revenues && (
          <Chart
            width='100%'
            height='500px'
            chartType='ComboChart'
            loader={<div>Loading Chart</div>}
            data={[
              ['Дата', 'Темп продаж', 'Аппроксимация'],
              ...days.map((day, index) => [day, revenues[index], approximations[index]])
            ]}
            options={{
              title: 'График темпов онлайн продаж',
              hAxis: { title: 'Дата' },
              vAxis: { title: 'Темп продаж' },
              bar: { groupWidth: "80%" },
              seriesType: 'line',
              series: { 1: { type: 'line' } }
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        )
      }
      {
        labelText && (
          <DescriptionStyled>
            { labelText }
          </DescriptionStyled>
        )
      }
    </PageWrapper>
  );
};
