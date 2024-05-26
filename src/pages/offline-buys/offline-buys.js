import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOfflineBuysStore } from '../../services/stores/offline-buys/offline-buys-service';
import { useOfflinePointsStore } from '../../services/stores/offline-points/offline-points-service';
import { onHandler } from '../../utils/higher-order-func';
import { PageWrapper } from '../../styled/wrapper/page-wrapper';
import Title from 'antd/es/typography/Title';
import { Button, Col, Divider, Flex, Row, Typography } from 'antd';
import { AddForm } from './add-form';
import { Statistic } from './statistic';
import { BuysListForm } from './buys-list-form';
import useAlert from '../../hooks/alert/alert';

export const OfflineBuys = () => {
  const { error } = useAlert();
  const { offlineBuys, getOfflineBuys } = useOfflineBuysStore();
  const { getOfflinePoint, offlinePoint } = useOfflinePointsStore();
  const { offlinePointId } = useParams();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const onGetOfflineBuys = onHandler(async () => {
    await getOfflineBuys(offlinePointId);
  }, (e) => error(e));

  const onGetOfflinePoint = onHandler(async () => {
    await getOfflinePoint(offlinePointId);
  }, (e) => error(e));

  useEffect(() => {
    onGetOfflineBuys();
  }, [offlinePointId])

  useEffect(() => {
    onGetOfflinePoint();
  }, [offlineBuys])

  return (
    <>
      <PageWrapper vertical>
        <Title level={2}>Продажа в  { offlinePoint?.name } ({ offlinePoint?.address }, {offlinePoint?.regionName}) </Title>
        <Statistic offlinePoint={offlinePoint} />
        <Flex justify='flex-end' gap='20px'>
          <Button type="primary" size='large' onClick={() => setIsFormOpen(true)}>Добавить</Button>
        </Flex>
        <Divider />
        <Flex gap={10} vertical>
          <Row gutter={[30, 30]}>
            <Col><Typography.Title level={4}>Дата продажи</Typography.Title></Col>
          </Row>
          <Flex vertical gap={10}>
            {offlineBuys && offlineBuys.map((offlineBuy) => (
              <BuysListForm key={offlineBuy.id} buy={offlineBuy} />
            ))}
          </Flex>
        </Flex>
      </PageWrapper>
      {
        isFormOpen && <AddForm closeForm={() => setIsFormOpen(false)} />
      }
    </>
  );
};