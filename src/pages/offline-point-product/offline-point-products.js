import React, { useEffect, useState } from 'react';
import {
  useOfflinePointProductStore
} from '../../services/stores/offline-point-products/offline-point-products-service';
import { useProductsStore } from '../../services/stores/products/products-service';
import { useParams } from 'react-router-dom';
import { onHandler } from '../../utils/higher-order-func';
import { PageWrapper } from '../../styled/wrapper/page-wrapper';
import Title from 'antd/es/typography/Title';
import { Button, Col, Divider, Flex, Row, Typography } from 'antd';
import { OfflineProductListForm } from './offline-product-list-form';
import { AddForm } from './add-form';
import useAlert from '../../hooks/alert/alert';
import { useCategoriesStore } from '../../services/stores/categories/categories-service';
import { BuysListForm } from '../buys/buys-list-form';

export const OfflinePointProducts = () => {
  const { offlineProducts, getOfflineProducts } = useOfflinePointProductStore();
  const { products, getProducts } = useProductsStore();
  const { getCategories } = useCategoriesStore();
  const { offlinePointId } = useParams();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { error } = useAlert();

  const onGetAllProductsAndOfflineProducts = onHandler(async () => {
    await getOfflineProducts(offlinePointId);
    !products && await getProducts();
  }, (e) => error(e));

  const onGetCategories = onHandler(async () => {
    await getCategories();
  }, (e) => error(e));

  useEffect(() => {
    onGetAllProductsAndOfflineProducts();
    onGetCategories();
  }, [])

  return (
    <>
      <PageWrapper vertical>
        <Title level={2}>Товары в наличии</Title>
        <Flex justify='flex-end' gap='20px'>
          <Button type="primary" size='large' onClick={() => setIsFormOpen(true)}>Добавить</Button>
        </Flex>
        <Divider />
        <Flex gap={10} vertical>
          <Row gutter={[30, 30]}>
            <Col xl={10} md={8} sm={7} xs={6} align='middle'><Typography.Title level={4}>Товар (категория)</Typography.Title></Col>
            <Col xl={10} md={8} sm={7} xs={6} align='middle'><Typography.Title level={4}>Количество в наличии</Typography.Title></Col>
          </Row>
          <Flex vertical gap={10}>
            {offlineProducts && offlineProducts.map((offlineProduct) => (
              <OfflineProductListForm key={offlineProduct.id} offlineProduct={offlineProduct} />
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