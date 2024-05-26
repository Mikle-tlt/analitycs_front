import React, { useEffect, useState } from 'react';
import { onHandler } from '../../../utils/higher-order-func';
import { useTotalXYZStore } from '../../../services/stores/total-analytics/xyz-analytics/total-xyz-analytics';
import { PageWrapper } from '../../../styled/wrapper/page-wrapper';
import Title from 'antd/es/typography/Title';
import { FilterForm } from '../../../components/form/filter-form';
import { Divider } from 'antd';
import { StyledTable } from '../../../styled';
import { XYZColumns } from '../../../constants/columns/columns';
import { DescriptionStyled } from '../../../styled/description/description';
import moment from 'moment/moment';
import useAlert from '../../../hooks/alert/alert';

export const TotalXYZAnalytics = () => {
  const { error } = useAlert();
  const { totalXYZList, getTotalXYZ, labelText } = useTotalXYZStore();

  const onGetTotalXYZ = onHandler(async ({ withDate, byDate }) => {
    const withDateForm = withDate.format("YYYY-MM-DD");
    const byDateForm = byDate.format("YYYY-MM-DD");
    await getTotalXYZ(withDateForm, byDateForm)
  }, (e) => error(e));

  const resetDate = () => {
    onGetTotalXYZ({ withDate: moment(), byDate: moment() });
  };

  useEffect(() => {
    onGetTotalXYZ({ withDate: moment(), byDate: moment() });
  }, []);

  return (
    <PageWrapper vertical>
      <Title level={2}>XYZ-анализ онлайн и оффлайн продаж</Title>
      <FilterForm submitAction={onGetTotalXYZ} cancelAction={resetDate} today={true} />
      <Divider />
      <StyledTable
        columns={XYZColumns}
        dataSource={totalXYZList}
        rowKey="productName"
        pagination={false}
      />
      <DescriptionStyled>
        { labelText }
      </DescriptionStyled>
    </PageWrapper>
  );
};