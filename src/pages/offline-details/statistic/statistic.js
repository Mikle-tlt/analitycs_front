import { Card, Flex, Statistic as AntStatistic } from 'antd';
import React from 'react';

export const Statistic = ({ offlineBuy }) => (
  <Flex justify='space-around' style={{ padding: '20px 0' }}>
    <Card bordered={false} style={{ minWidth: '20%' }}>
      <AntStatistic
        title="Выручка:"
        value={offlineBuy?.revenue}
        suffix="руб."
      />
    </Card>
    <Card bordered={false}  style={{ minWidth: '20%' }}>
      <AntStatistic
        title="Затраты:"
        value={offlineBuy?.costPrice }
        valueStyle={{ color: '#cf1322' }}
        suffix="руб."
      />
    </Card>
    <Card bordered={false}  style={{ minWidth: '20%' }}>
      <AntStatistic
        title="Прибыль:"
        value={offlineBuy?.different}
        valueStyle={{ color: '#3f8600' }}
        suffix="руб."
      />
    </Card>
  </Flex>
);