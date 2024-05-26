import React, { useEffect, useState } from 'react';
import { onHandler } from '../../utils/higher-order-func';
import { useOfflineDetailsStore } from '../../services/stores/offline-details/offline-details-service';
import { useParams } from 'react-router-dom';
import {
  useOfflinePointProductStore
} from '../../services/stores/offline-point-products/offline-point-products-service';
import { useProductsStore } from '../../services/stores/products/products-service';
import { useOfflineBuysStore } from '../../services/stores/offline-buys/offline-buys-service';
import { PageWrapper } from '../../styled/wrapper/page-wrapper';
import Title from 'antd/es/typography/Title';
import { Statistic } from './statistic';
import { Button, Col, Divider, Flex, Row, Typography } from 'antd';
import { DetailsListForm } from './details-list-form';
import { AddForm } from './add-form';
import useAlert from '../../hooks/alert/alert';
import { useOfflinePointsStore } from '../../services/stores/offline-points/offline-points-service';
import { useCategoriesStore } from '../../services/stores/categories/categories-service';
import { ProductListForm } from '../products/product-list-form';

export const OfflineDetails = () => {
  const { offlineDetails, getOfflineDetails } = useOfflineDetailsStore();
  const { offlinePointId, offlineBuyId } = useParams();
  const { getOfflinePoint, offlinePoint } = useOfflinePointsStore();
  const { getOfflineProducts } = useOfflinePointProductStore();
  const { products, getProducts } = useProductsStore();
  const { offlineBuy, getOfflineBuy } = useOfflineBuysStore();
  const { getCategories } = useCategoriesStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { error } = useAlert();

  const onGetAllProductsAndOfflineProducts = onHandler(async () => {
    await getOfflineProducts(offlinePointId);
    !products && await getProducts();
  }, (e) => error(e));

  const onGetOfflineBuy =  onHandler(async () => {
    await getOfflineBuy(offlineBuyId)
  }, (e) => error(e));

  const onGetOfflineDetails =  onHandler(async () => {
    await getOfflineDetails(offlineBuyId);
  }, (e) => error(e));

  const onGetOfflinePoint = onHandler(async () => {
    await getOfflinePoint(offlinePointId);
  }, (e) => error(e));

  const onGetCategories = onHandler(async () => {
    await getCategories();
  }, (e) => error(e));

  useEffect(() => {
    onGetAllProductsAndOfflineProducts();
    onGetOfflineDetails();
    onGetOfflinePoint();
    onGetCategories();
  }, [])

  useEffect(() => {
    onGetOfflineBuy();
  }, [offlineDetails]);

  return (
    <>
      <PageWrapper vertical>
        <Title level={2}>Детальная информация продажи за {offlineBuy?.date} в { offlinePoint?.name }{' '}
          ({ offlinePoint?.address }, {offlinePoint?.regionName})</Title>
        <Statistic offlineBuy={offlineBuy}/>
        <Flex justify='flex-end' gap='20px'>
          <Button type="primary" size='large' onClick={() => setIsFormOpen(true)}>Добавить</Button>
        </Flex>
        <Divider />
        <Flex gap={10} vertical>
          <Row gutter={[30, 30]}>
            <Col xl={7} md={6} sm={5} xs={4} align='middle'><Typography.Title level={4}>Товар</Typography.Title></Col>
            <Col xl={7} md={6} sm={5} xs={4} align='middle'><Typography.Title level={4}>Количество</Typography.Title></Col>
            <Col xl={7} md={6} sm={5} xs={4} align='middle'><Typography.Title level={4}>Стоимость</Typography.Title></Col>
          </Row>
          <Flex vertical gap={10}>
            {offlineDetails && offlineDetails.map((detail) => (
              <DetailsListForm key={detail.id} detail={detail} />
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