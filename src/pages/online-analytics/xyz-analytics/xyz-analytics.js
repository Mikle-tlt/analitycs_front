import React, { useEffect } from 'react';
import { useOnlineXYZStore } from '../../../services/stores/online-analytics/xyz-analytics/online-xyz-analytics';
import { onHandler } from '../../../utils/higher-order-func';
import moment from 'moment';
import Title from 'antd/es/typography/Title';
import { FilterForm } from '../../../components/form/filter-form';
import { Divider } from 'antd';
import { StyledTable } from '../../../styled';
import { XYZColumns } from '../../../constants/columns/columns';
import { DescriptionStyled } from '../../../styled/description/description';
import { PageWrapper } from '../../../styled/wrapper/page-wrapper';
import useAlert from '../../../hooks/alert/alert';

export const OnlineXYZAnalytics = () => {
  const { error } = useAlert();
  const { onlineXYZList, getOnlineXYZ, labelText } = useOnlineXYZStore();

  const onGetOnlineXYZ = onHandler(async ({ withDate, byDate }) => {
    const withDateForm = withDate.format("YYYY-MM-DD");
    const byDateForm = byDate.format("YYYY-MM-DD");
    await getOnlineXYZ(withDateForm, byDateForm)
  }, (e) => error(e));

  const resetDate = () => {
    onGetOnlineXYZ({ withDate: moment(), byDate: moment() });
  };

  useEffect(() => {
    onGetOnlineXYZ({ withDate: moment(), byDate: moment() });
  }, []);

  return (
    <PageWrapper vertical>
      <Title level={2}>XYZ-анализ онлайн продаж</Title>
      <FilterForm submitAction={onGetOnlineXYZ} cancelAction={resetDate} today={true} />
      <Divider />
      <StyledTable
        columns={XYZColumns}
        dataSource={onlineXYZList}
        rowKey="productName"
        pagination={false}
      />
      <DescriptionStyled>
        { labelText }
      </DescriptionStyled>
    </PageWrapper>
  );
};