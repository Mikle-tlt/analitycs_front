import React, { useEffect, useState } from 'react';
import { useOfflinePointsStore } from '../../services/stores/offline-points/offline-points-service';
import { useRegionsStore } from '../../services/stores/regions/regions';
import { onHandler } from '../../utils/higher-order-func';
import { PageWrapper } from '../../styled/wrapper/page-wrapper';
import Title from 'antd/es/typography/Title';
import { Button, Col, Divider, Flex, Row, Typography } from 'antd';
import { ImportButtonStyled } from '../../styled/button/import-button';
import { OfflinePointListForm } from './offline-point-list-form';
import { AddForm } from './add-form';
import { ImportForm } from './import-form';
import useAlert from '../../hooks/alert/alert';
import { ProductListForm } from '../products/product-list-form';

export const OfflinePoints = () => {
  const { regions, getRegions } = useRegionsStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isImportFomOpen, setIsImportFormOpen] = useState(false);
  const { offlinePoints, getOfflinePoints } = useOfflinePointsStore();
  const { error } = useAlert();

  const onGetOfflinePoints = onHandler(async () => {
    await getOfflinePoints();
  }, (e) => error(e));

  const onGetRegions = onHandler(async () => {
    !regions && await getRegions();
  }, (e) => error(e));

  useEffect(() => {
    onGetOfflinePoints();
    onGetRegions()
  }, [])

  return (
    <>
      <PageWrapper vertical>
        <Title level={2}>Оффлайн точки</Title>
        <Flex justify='flex-end' gap='20px'>
          <Button type="primary" size='large' onClick={() => setIsFormOpen(true)}>Добавить</Button>
          <ImportButtonStyled type="primary" size='large' onClick={() => setIsImportFormOpen(true)}>
            Импортировать данные
          </ImportButtonStyled>
        </Flex>
        <Divider />
        <Flex gap={10} vertical>
          <Row gutter={[30, 30]}>
            <Col xl={7} md={6} sm={5} xs={4} align='middle'><Typography.Title level={4}>Наименование точки</Typography.Title></Col>
            <Col xl={7} md={6} sm={5} xs={4} align='middle'><Typography.Title level={4}>Адрес</Typography.Title></Col>
            <Col xl={7} md={6} sm={5} xs={4} align='middle'><Typography.Title level={4}>Регион</Typography.Title></Col>
          </Row>
          <Flex vertical gap={10}>
            {offlinePoints && offlinePoints.map((offlinePoint) => (
              <OfflinePointListForm key={offlinePoint.id} point={offlinePoint}/>
            ))}
          </Flex>
        </Flex>
      </PageWrapper>
      {
        isFormOpen && <AddForm closeForm={() => setIsFormOpen(false)}/>
      }
      {
        isImportFomOpen && <ImportForm closeForm={() => setIsImportFormOpen(false)} />
      }
    </>
  );
};