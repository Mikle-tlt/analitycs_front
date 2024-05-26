import React from 'react';
import {
  useOnlineProfitabilityStore
} from '../../../services/stores/online-analytics/profitability-analytics/online-profitability-analytics';
import { onHandler } from '../../../utils/higher-order-func';
import { PageWrapper } from '../../../styled/wrapper/page-wrapper';
import Title from 'antd/es/typography/Title';
import { Divider } from 'antd';
import { StyledTable } from '../../../styled';
import { ProfitabilityColumns } from '../../../constants/columns';
import { DescriptionStyled } from '../../../styled/description/description';
import useAlert from '../../../hooks/alert/alert';
import { FilterProfitabilityForm } from '../../../components/form/filter-profitability-form/filter-profitability-form';

export const OnlineProfitabilityAnalytics = () => {
  const { error } = useAlert();
  const {
    profitabilityData,
    getOnlineProfitability,
    labelText,
    setDefaultProfitability
  } = useOnlineProfitabilityStore();

  const onGetOnlineProfitability = onHandler(async ({ dateWithF, dateByF, dateWithS, dateByS }) => {
    const dateWithFForm = dateWithF.format("YYYY-MM-DD");
    const dateByFForm = dateByF.format("YYYY-MM-DD");
    const dateWithSForm = dateWithS.format("YYYY-MM-DD");
    const dateBySForm = dateByS.format("YYYY-MM-DD");
    await getOnlineProfitability(dateWithFForm, dateByFForm, dateWithSForm, dateBySForm)
  }, (e) => error(e));

  const resetDate = () => {
    setDefaultProfitability();
  }

  return (
    <PageWrapper vertical>
      <Title level={2}>Анализ рентабельности товаров по онлайн продажам</Title>
      <FilterProfitabilityForm submitAction={onGetOnlineProfitability} cancelAction={resetDate} />
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