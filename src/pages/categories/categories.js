import React, { useEffect, useState } from 'react';
import { onHandler } from '../../utils/higher-order-func';
import { useCategoriesStore } from '../../services/stores/categories/categories-service';
import { PageWrapper } from '../../styled/wrapper/page-wrapper';
import Title from 'antd/es/typography/Title';
import { Button, Col, Divider, Flex, Row, Typography } from 'antd';
import { AddForm } from './add-form';
import { CategoryListForm } from './category_list_form';
import useAlert from '../../hooks/alert/alert';
import { DetailsListForm } from '../details/details-list-form';

export const Categories = () => {
  const { error } = useAlert();
  const { categories, getCategories } = useCategoriesStore();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const onGetCategories = onHandler(async () => {
    await getCategories();
  }, (e) => error(e));

  useEffect(() => {
    onGetCategories();
  }, [])

  return (
    <>
      <PageWrapper vertical>
        <Title level={2}>Категории</Title>
        <Flex justify='flex-end' gap='20px'>
          <Button type="primary" size='large' onClick={() => setIsFormOpen(true)}>Добавить</Button>
        </Flex>
        <Divider />
        <Flex gap={10} vertical>
          <Row gutter={[30, 30]}>
            <Col><Typography.Title level={4}>Наименование</Typography.Title></Col>
          </Row>
          <Flex vertical gap={10}>
            {categories && categories.map((category) => (
              <CategoryListForm key={category.id} category={category}/>
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