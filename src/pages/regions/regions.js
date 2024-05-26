import React, { useEffect, useState } from 'react';
import { useRegionsStore } from '../../services/stores/regions/regions';
import { onHandler } from '../../utils/higher-order-func';
import { PageWrapper } from '../../styled/wrapper/page-wrapper';
import Title from 'antd/es/typography/Title';
import { Button, Col, Divider, Flex, Row, Typography } from 'antd';
import { RegionListForm } from './region_list_form';
import { AddForm } from './add-form';
import useAlert from '../../hooks/alert/alert';

export const Regions = () => {
  const { regions, getRegions } = useRegionsStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { error } = useAlert();

  const onGetRegions = onHandler(async () => {
    await getRegions();
  }, (e) => error(e))

  useEffect(() => {
    onGetRegions();
  }, [])

  return (
    <>
      <PageWrapper vertical>
        <Title level={2}>Регионы</Title>
        <Flex justify='flex-end' gap='20px'>
          <Button type="primary" size='large' onClick={() => setIsFormOpen(true)}>Добавить</Button>
        </Flex>
        <Divider />
        <Flex gap={10} vertical>
          <Row gutter={[30, 30]}>
            <Col><Typography.Title level={4}>Наименование</Typography.Title></Col>
          </Row>
          <Flex vertical gap={10}>
            {regions && regions.map((region) => (
              <RegionListForm key={region.id} region={region}/>
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