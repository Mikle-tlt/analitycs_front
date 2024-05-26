import { usePointsStore } from '../../services/stores/points/points-service';
import React, { useEffect, useState } from 'react';
import { useRegionsStore } from '../../services/stores/regions/regions';
import { onHandler } from '../../utils/higher-order-func';
import { PageWrapper } from '../../styled/wrapper/page-wrapper';
import Title from 'antd/es/typography/Title';
import { Button, Col, Divider, Flex, Row, Typography } from 'antd';
import { AddForm } from './add-form';
import { PointListForm } from './point-list-form';
import useAlert from '../../hooks/alert/alert';
import { BuysListForm } from '../buys/buys-list-form';

export const Points = () => {
  const { points, getPoints } = usePointsStore();
  const { regions, getRegions } = useRegionsStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { error } = useAlert();

  const onGetPoints = onHandler(async () => {
    await getPoints();
  }, (e) => error(e))

  const onGetRegions = onHandler(async () => {
    !regions && await getRegions();
  }, (e) => error(e))

  useEffect(() => {
    onGetPoints();
    onGetRegions();
  }, [])

  return (
    <>
      <PageWrapper vertical>
        <Title level={2}>Пункты выдачи</Title>
        <Flex justify='flex-end' gap='20px'>
          <Button type="primary" size='large' onClick={() => setIsFormOpen(true)}>Добавить</Button>
        </Flex>
        <Divider />
        <Flex gap={10} vertical>
          <Row gutter={[30, 30]}>
            <Col xl={10} md={8} sm={7} xs={6} align='middle'><Typography.Title level={4}>Адрес пункта выдачи</Typography.Title></Col>
            <Col xl={10} md={8} sm={7} xs={6} align='middle'><Typography.Title level={4}>Регион</Typography.Title></Col>
          </Row>
          <Flex vertical gap={10}>
            {points && points.map((point) => (
              <PointListForm key={point.id} point={point}/>
            ))}
          </Flex>
        </Flex>
      </PageWrapper>
      {
        isFormOpen && <AddForm closeForm={() => setIsFormOpen(false)}/>
      }
    </>
  );
};