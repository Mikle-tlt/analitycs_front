import React from 'react';
import {
  useOnlineCustomersAnalytics
} from '../../../services/stores/online-analytics/customers-analytics/customers-analytics';
import { onHandler } from '../../../utils/higher-order-func';
import Title from 'antd/es/typography/Title';
import { Divider } from 'antd';
import { StyledTable } from '../../../styled';
import { CustomersColumns } from '../../../constants/columns';
import { DescriptionStyled } from '../../../styled/description/description';
import { PageWrapper } from '../../../styled/wrapper/page-wrapper';
import { FilterCustomersForm } from '../../../components/form/filter-customers-form';
import useAlert from '../../../hooks/alert/alert';

export const OnlineCustomersAnalytics = () => {
  const { error } = useAlert();
  const {
    month,
    customers,
    labelText,
    getOnlineCustomers,
    setDefaultOnlineCustomers
  } = useOnlineCustomersAnalytics();

  const onGetOnlineCustomers = onHandler(async ({ year }) => {
    await getOnlineCustomers(year);
  }, (e) => error(e));

  const resetDate = () => setDefaultOnlineCustomers();

  const dataSource = customers.map((item, index) => ({
    key: index,
    month: month[index],
    okb: item[1],
    akb: item[2],
    epb: `~${item[3]}%`,
  }));

  return (
    <PageWrapper vertical>
      <Title level={2}>Анализ клиентской базы</Title>
      <FilterCustomersForm submitAction={onGetOnlineCustomers} cancelAction={resetDate} />
      <Divider />
      <StyledTable
        columns={CustomersColumns}
        dataSource={dataSource}
        rowKey="key"
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