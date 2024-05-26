import React, { useEffect } from 'react';
import { onHandler } from '../../../utils/higher-order-func';
import { useOfflineXYZStore } from '../../../services/stores/offline-analytics/xyz-analytics/offline-xyz-analytics';
import Title from 'antd/es/typography/Title';
import { FilterForm } from '../../../components/form/filter-form';
import { Divider } from 'antd';
import { StyledTable } from '../../../styled';
import { XYZColumns } from '../../../constants/columns/columns';
import { DescriptionStyled } from '../../../styled/description/description';
import { PageWrapper } from '../../../styled/wrapper/page-wrapper';
import moment from 'moment/moment';
import useAlert from '../../../hooks/alert/alert';

export const OfflineXYZAnalytics = () => {
  const { error } = useAlert();
  const { offlineXYZList, getOfflineXYZ, labelText } = useOfflineXYZStore();

  const onGetOfflineXYZ = onHandler(async ({ withDate, byDate }) => {
    const withDateForm = withDate.format("YYYY-MM-DD");
    const byDateForm = byDate.format("YYYY-MM-DD");
    await getOfflineXYZ(withDateForm, byDateForm)
  }, (e) => error(e));

  const resetDate = () => {
    onGetOfflineXYZ({ withDate: moment(), byDate: moment() });
  };

  useEffect(() => {
    onGetOfflineXYZ({ withDate: moment(), byDate: moment() });
  }, []);

  return (
    <PageWrapper vertical>
      <Title level={2}>XYZ-анализ онлайн продаж</Title>
      <FilterForm submitAction={onGetOfflineXYZ} cancelAction={resetDate} today={true} />
      <Divider />
      <StyledTable
        columns={XYZColumns}
        dataSource={offlineXYZList}
        rowKey="productName"
        pagination={false}
      />
      <DescriptionStyled>
        { labelText }
      </DescriptionStyled>
    </PageWrapper>
  );
};