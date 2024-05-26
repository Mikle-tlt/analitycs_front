import React, { useEffect } from 'react';
import { useCategoriesStore } from '../../../services/stores/categories/categories-service';
import { Chart } from 'react-google-charts';
import { onHandler } from '../../../utils/higher-order-func';
import {
  useOfflineSalesByCategoryAnalytics
} from '../../../services/stores/offline-analytics/sales-by-category-analytics/offline-sales-category-analytics';
import Title from 'antd/es/typography/Title';
import { Divider } from 'antd';
import { DescriptionStyled } from '../../../styled/description/description';
import { PageWrapper } from '../../../styled/wrapper/page-wrapper';
import useAlert from '../../../hooks/alert/alert';
import { FilterCategoryForm } from '../../../components/form/filter-category-form';

export const OfflineByCategoryAnalytics = () => {
  const { error } = useAlert();
  const {
    salesData,
    getOfflineSalesByCategory,
    labelText,
    setDefaultSalesByCategory } = useOfflineSalesByCategoryAnalytics();
  const { categories, getCategories } = useCategoriesStore();

  const onGetOfflineGrowth = onHandler(async ({ categoryId, year }) => {
    await getOfflineSalesByCategory(categoryId, year)
  }, (e) => error(e));

  const onGetCategories = onHandler(async () => {
    !categories && await getCategories();
  }, (e) => error(e))

  useEffect(() => {
    onGetCategories();
  }, [])

  const resetDate = () => setDefaultSalesByCategory();

  return (
    <PageWrapper vertical>
      <Title level={2}>Анализ оффлайн продаж по категории</Title>
      <FilterCategoryForm submitAction={onGetOfflineGrowth} cancelAction={resetDate} />
      <Divider />
      {
        salesData && (
          <Chart
            width='100%'
            height='500px'
            chartType='ColumnChart'
            loader={<div>Loading Chart</div>}
            data={[
              ['Месяц', 'Продано'],
              ...salesData.map((item, index) => [index + 1, item])
            ]}
            options={{
              title: 'График анализа оффлайн продаж по категории',
              hAxis: { title: 'Месяц' },
              vAxis: { title: 'Продано' },
              bar: { groupWidth: "80%" },
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
}