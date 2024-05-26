import React, { useEffect, useState } from 'react';
import { useProductsStore } from '../../../services/stores/products/products-service';
import {
  calculateApproximation
} from '../../../services/stores/online-analytics/growth-analytics/chart-generate-data/chart-generate-data';
import { Chart } from 'react-google-charts';
import { onHandler } from '../../../utils/higher-order-func';
import { useTotalGrowthStore } from '../../../services/stores/total-analytics/growth-analytics/total-growth-analytics';
import Title from 'antd/es/typography/Title';
import { FilterGrowthForm } from '../../../components/form/filter-growth-form';
import { Divider } from 'antd';
import { DescriptionStyled } from '../../../styled/description/description';
import { PageWrapper } from '../../../styled/wrapper/page-wrapper';
import useAlert from '../../../hooks/alert/alert';

export const TotalGrowthAnalytics = () => {
  const { error } = useAlert();
  const { revenues, days, labelText, getTotalGrowth, setDefaultData } = useTotalGrowthStore();
  const { products, getProducts } = useProductsStore();
  const [approximations, setApproximations] = useState([]);

  const onGetProducts = onHandler(async () => {
    !products && await getProducts();
  }, (e) => error(e));

  const onGetTotalGrowth = onHandler(async ({ productId, withDate, byDate }) => {
    const withDateForm = withDate.format("YYYY-MM-DD");
    const byDateForm = byDate.format("YYYY-MM-DD");
    await getTotalGrowth(productId, withDateForm, byDateForm)
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
      <Title level={2}>Анализ темпов онлайн и оффлайн продаж</Title>
      <FilterGrowthForm submitAction={onGetTotalGrowth} cancelAction={resetDate} />
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
              title: 'График темпов онлайн и оффлайн продаж',
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
