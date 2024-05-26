import React, { useEffect, useState } from 'react';
import { onHandler } from '../../utils/higher-order-func';
import { useBuysStore } from '../../services/stores/buys/buys-service';
import { useClientsStore } from '../../services/stores/clients/clients-service';
import { usePointsStore } from '../../services/stores/points/points-service';
import { useParams } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { Button, Col, Divider, Flex, Row, Typography } from 'antd';
import { PageWrapper } from '../../styled/wrapper/page-wrapper';
import { BuysListForm } from './buys-list-form';
import { AddForm } from './add-form/add-form';
import useAlert from '../../hooks/alert/alert';
import { useRegionsStore } from '../../services/stores/regions/regions';

export const Buys = () => {
  const { error } = useAlert();
  const { getBuys, buys } = useBuysStore();
  const { selectedClient, getClient } = useClientsStore();
  const { points, getPoints } = usePointsStore();
  const { getRegions } = useRegionsStore();
  const { clientId } = useParams();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const onGetBuys = onHandler(async () => {
    await getBuys(clientId);
  }, (e) => error(e));
  const onGetPoints = onHandler(async () => {
    await getPoints();
  }, (e) => error(e));
  const onGetClientInfo = onHandler(async () => {
    await getClient(clientId);
  }, (e) => error(e));
  const onGetRegions = onHandler(async () => {
    await getRegions();
  }, (e) => error(e));


  useEffect(() => {
    onGetClientInfo();
  }, [clientId])

  useEffect(() => {
    onGetBuys();
    onGetPoints();
    onGetRegions();
  }, [])

  return (
    <>
      <PageWrapper vertical>
        <Title level={2}>Покупки клиента: {selectedClient.name}</Title>
        <Flex justify='flex-end' gap='20px'>
          <Button type="primary" size='large' onClick={() => setIsFormOpen(true)}>Добавить</Button>
        </Flex>
        <Divider />
        <Flex gap={10} vertical>
          <Row gutter={[30, 30]}>
            <Col xl={10} md={8} sm={7} xs={6} align='middle'><Typography.Title level={4}>Дата покупки</Typography.Title></Col>
            <Col xl={10} md={8} sm={7} xs={6} align='middle'><Typography.Title level={4}>Пункт выдачи</Typography.Title></Col>
          </Row>
          <Flex vertical gap={10}>
            {buys && buys.map((buy) => (
              <BuysListForm key={buy.id} buy={buy} points={points} />
            ))}
          </Flex>
        </Flex>
      </PageWrapper>
      {
        isFormOpen && <AddForm closeForm={() => setIsFormOpen(false)} points={points} />
      }
    </>
  );
};