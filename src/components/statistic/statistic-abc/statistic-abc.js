import { Card, Flex, Statistic as AntStatistic } from 'antd';
import React from 'react';

export const StatisticAbc = ({ sumInfo }) => (
  <Flex justify='space-between' style={{ padding: '20px 0' }} gap='30px'>
    <Card bordered={false} style={{ flex: 1 }}>
      <AntStatistic
        title="Количество проданных товаров:"
        value={sumInfo?.quantity}
        suffix="шт."
      />
    </Card>
    <Card bordered={false} style={{ flex: 1 }}>
      <AntStatistic
        title="Выручка:"
        value={sumInfo?.revenue}
        suffix="руб."
      />
    </Card>
    <Card bordered={false} style={{ flex: 1 }}>
      <AntStatistic
        title="Затраты:"
        value={sumInfo?.costPrice }
        valueStyle={{ color: '#cf1322' }}
        suffix="руб."
      />
    </Card>
    <Card bordered={false} style={{ flex: 1 }}>
      <AntStatistic
        title="Прибыль:"
        value={sumInfo?.different}
        valueStyle={{ color: '#3f8600' }}
        suffix="руб."
      />
    </Card>
  </Flex>
);