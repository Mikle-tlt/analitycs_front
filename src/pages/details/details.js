import { useDetailsStore } from '../../services/stores/details/details-service';
import { useProductsStore } from '../../services/stores/products/products-service';
import { useBuysStore } from '../../services/stores/buys/buys-service';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { onHandler } from '../../utils/higher-order-func';
import { PageWrapper } from '../../styled/wrapper/page-wrapper';
import Title from 'antd/es/typography/Title';
import { Button, Col, Divider, Flex, Row, Typography } from 'antd';
import { Statistic } from './statistic/statistic';
import { DetailsListForm } from './details-list-form';
import { AddForm } from './add-form/add-form';
import useAlert from '../../hooks/alert/alert';
import { useCategoriesStore } from '../../services/stores/categories/categories-service';
import { BuysListForm } from '../buys/buys-list-form';

export const Details = () => {
  const { error } = useAlert();
  const { getProducts } = useProductsStore();
  const { getCategories } = useCategoriesStore();
  const { buy, getBuy } = useBuysStore();
  const { buyId } = useParams();
  const { details, getDetails } = useDetailsStore();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const onGetProducts = onHandler(async () => {
    await getProducts();
  }, (e) => error(e));
  const onGetCategories = onHandler(async () => {
    await getCategories();
  }, (e) => error(e));
  const onGetBuy = onHandler(async () => {
    await getBuy(buyId);
  }, (e) => error(e));
  const onGetDetails = onHandler(async () => {
    await getDetails(buyId);
  }, (e) => error(e));

  useEffect(() => {
    onGetProducts();
    onGetDetails();
    onGetCategories();
  }, []);

  useEffect(() => {
    onGetBuy();
  }, [details]);

  return (
    <>
      <PageWrapper vertical>
        <Title level={2}>Детальная информация покупки: { buy?.date } ({ buy?.pointAddress }) </Title>
        <Statistic buy={buy} />
        <Flex justify='flex-end' gap='20px'>
          <Button type="primary" size='large' onClick={() => setIsFormOpen(true)}>Добавить</Button>
        </Flex>
        <Divider />
        <Flex gap={10} vertical>
          <Row gutter={[30, 30]}>
            <Col xl={6} md={5} sm={4} xs={3} align='middle'><Typography.Title level={4}>Товар</Typography.Title></Col>
            <Col xl={6} md={5} sm={4} xs={3} align='middle'><Typography.Title level={4}>Количество</Typography.Title></Col>
            <Col xl={6} md={5} sm={4} xs={3} align='middle'><Typography.Title level={4}>Стоимость</Typography.Title></Col>
          </Row>
          <Flex vertical gap={10}>
            {details && details.map((detail) => (
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