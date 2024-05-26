import React from 'react';
import { onHandler } from '../../../utils/higher-order-func';
import {
  useTotalProfitabilityStore
} from '../../../services/stores/total-analytics/profitability-analytics/total-profitability-analytics';
import useAlert from '../../../hooks/alert/alert';
import Title from 'antd/es/typography/Title';
import { FilterProfitabilityForm } from '../../../components/form/filter-profitability-form/filter-profitability-form';
import { Divider } from 'antd';
import { StyledTable } from '../../../styled';
import { ProfitabilityColumns } from '../../../constants/columns';
import { DescriptionStyled } from '../../../styled/description/description';
import { PageWrapper } from '../../../styled/wrapper/page-wrapper';

export const TotalProfitabilityAnalytics = () => {
  const { error } = useAlert();
  const {
    profitabilityData,
    getTotalProfitability,
    labelText,
    setDefaultProfitability
  } = useTotalProfitabilityStore();

  const onGetTotalProfitability = onHandler(async ({ dateWithF, dateByF, dateWithS, dateByS }) => {
    const dateWithFForm = dateWithF.format("YYYY-MM-DD");
    const dateByFForm = dateByF.format("YYYY-MM-DD");
    const dateWithSForm = dateWithS.format("YYYY-MM-DD");
    const dateBySForm = dateByS.format("YYYY-MM-DD");
    await getTotalProfitability(dateWithFForm, dateByFForm, dateWithSForm, dateBySForm)
  }, (e) => error(e));

  const resetDate = () => {
    setDefaultProfitability();
  }

  return (
    <PageWrapper vertical>
      <Title level={2}>Анализ рентабельности товаров по онлайн и оффлайн продажам</Title>
      <FilterProfitabilityForm submitAction={onGetTotalProfitability} cancelAction={resetDate} />
      <Divider />
      <StyledTable
        columns={ProfitabilityColumns}
        dataSource={profitabilityData}
        rowKey="productName"
        pagination={false}
      />
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