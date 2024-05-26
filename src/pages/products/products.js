import React, { useEffect, useState } from 'react';
import { useProductsStore } from '../../services/stores/products/products-service';
import { useCategoriesStore } from '../../services/stores/categories/categories-service';
import { onHandler } from '../../utils/higher-order-func';
import { PageWrapper } from '../../styled/wrapper/page-wrapper';
import Title from 'antd/es/typography/Title';
import { Button, Col, Divider, Flex, Row, Typography } from 'antd';
import { ProductListForm } from './product-list-form';
import { AddForm } from './add-form';
import useAlert from '../../hooks/alert/alert';
import { DetailsListForm } from '../details/details-list-form';

export const Products = () => {
  const { products, getProducts } = useProductsStore();
  const { categories, getCategories } = useCategoriesStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { error } = useAlert();

  const onGetProducts = onHandler(async () => {
    await getProducts();
  }, (e) => error(e))

  const onGetCategories = onHandler(async () => {
    !categories && await getCategories();
  }, (e) => error(e))

  useEffect(() => {
    onGetCategories();
    onGetProducts();
  }, [])

  return (
    <>
      <PageWrapper vertical>
        <Title level={2}>Товары</Title>
        <Flex justify='flex-end' gap='20px'>
          <Button type="primary" size='large' onClick={() => setIsFormOpen(true)}>Добавить</Button>
        </Flex>
        <Divider />
        <Flex gap={10} vertical>
          <Row gutter={[30, 30]}>
            <Col xl={6} md={5} sm={4} xs={3} align='middle'><Typography.Title level={4}>Товар</Typography.Title></Col>
            <Col xl={6} md={5} sm={4} xs={3} align='middle'><Typography.Title level={4}>Категория</Typography.Title></Col>
            <Col xl={6} md={5} sm={4} xs={3} align='middle'><Typography.Title level={4}>Себестоимость</Typography.Title></Col>
          </Row>
          <Flex vertical gap={10}>
            {products && products.map((product) => (
              <ProductListForm key={product.id} product={product}/>
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