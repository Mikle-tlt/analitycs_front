import { Card, Flex, Statistic as AntStatistic } from 'antd';
import React from 'react';

export const Statistic = ({ offlinePoint }) => (
  <Flex justify='space-around' style={{ padding: '20px 0' }}>
    <Card bordered={false} style={{ minWidth: '20%' }}>
      <AntStatistic
        title="Выручка:"
        value={offlinePoint?.revenue}
        suffix="руб."
      />
    </Card>
    <Card bordered={false}  style={{ minWidth: '20%' }}>
      <AntStatistic
        title="Затраты:"
        value={offlinePoint?.costPrice }
        valueStyle={{ color: '#cf1322' }}
        suffix="руб."
      />
    </Card>
    <Card bordered={false}  style={{ minWidth: '20%' }}>
      <AntStatistic
        title="Прибыль:"
        value={offlinePoint?.different}
        valueStyle={{ color: '#3f8600' }}
        suffix="руб."
      />
    </Card>
  </Flex>
);