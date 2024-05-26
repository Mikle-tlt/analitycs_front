import {
  useOnlineSalesByCategoryAnalytics
} from '../../../services/stores/online-analytics/sales-by-category-analytics/online-sales-category-analytics';
import React, { useEffect } from 'react';
import { useCategoriesStore } from '../../../services/stores/categories/categories-service';
import { Chart } from 'react-google-charts';
import { onHandler } from '../../../utils/higher-order-func';
import { PageWrapper } from '../../../styled/wrapper/page-wrapper';
import Title from 'antd/es/typography/Title';
import { FilterCategoryForm } from '../../../components/form/filter-category-form';
import { Divider } from 'antd';
import { DescriptionStyled } from '../../../styled/description/description';
import useAlert from '../../../hooks/alert/alert';

export const OnlineByCategoryAnalytics = () => {
  const { error } = useAlert();
  const {
    salesData,
    getOnlineSalesByCategory,
    labelText,
    setDefaultSalesByCategory
  } = useOnlineSalesByCategoryAnalytics();
  const { categories, getCategories } = useCategoriesStore();

  const onGetOnlineSalesByCategory = onHandler(async ({ categoryId, year }) => {
    await getOnlineSalesByCategory(categoryId, year)
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
      <Title level={2}>Анализ онлайн продаж по категории</Title>
      <FilterCategoryForm submitAction={onGetOnlineSalesByCategory} cancelAction={resetDate} />
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
              title: 'График анализа онлайн продаж по категории',
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