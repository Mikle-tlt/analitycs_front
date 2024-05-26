import React from 'react';
import { onHandler } from '../../../utils/higher-order-func';
import {
  useOfflineProfitabilityStore
} from '../../../services/stores/offline-analytics/profitability-analytics/offline-profitability-analytics';
import Title from 'antd/es/typography/Title';
import { FilterProfitabilityForm } from '../../../components/form/filter-profitability-form/filter-profitability-form';
import { Divider } from 'antd';
import { StyledTable } from '../../../styled';
import { ProfitabilityColumns } from '../../../constants/columns';
import { DescriptionStyled } from '../../../styled/description/description';
import { PageWrapper } from '../../../styled/wrapper/page-wrapper';
import useAlert from '../../../hooks/alert/alert';

export const OfflineProfitabilityAnalytics = () => {
  const { error } = useAlert();
  const {
    profitabilityData,
    setDefaultProfitability,
    getOfflineProfitability,
    labelText
  } = useOfflineProfitabilityStore();

  const onGetOfflineProfitability = onHandler(async ({ dateWithF, dateByF, dateWithS, dateByS }) => {
    const dateWithFForm = dateWithF.format("YYYY-MM-DD");
    const dateByFForm = dateByF.format("YYYY-MM-DD");
    const dateWithSForm = dateWithS.format("YYYY-MM-DD");
    const dateBySForm = dateByS.format("YYYY-MM-DD");
    await getOfflineProfitability(dateWithFForm, dateByFForm, dateWithSForm, dateBySForm)
  }, (e) => error(e));

  const resetDate = () => {
    setDefaultProfitability();
  }

  return (
    <PageWrapper vertical>
      <Title level={2}>Анализ рентабельности товаров по оффлайн продажам</Title>
      <FilterProfitabilityForm submitAction={onGetOfflineProfitability} cancelAction={resetDate} />
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