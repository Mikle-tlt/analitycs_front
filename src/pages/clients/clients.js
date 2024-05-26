import { useClientsStore } from '../../services/stores/clients/clients-service';
import { onHandler } from '../../utils/higher-order-func';
import { useEffect, useState } from 'react';
import { Button, Col, Divider, Flex, Form, Input, Row, Typography } from 'antd';
import { ClientsListForm } from './clients-list-form';
import { PageWrapper } from '../../styled/wrapper/page-wrapper';
import Title from 'antd/es/typography/Title';
import { ImportButtonStyled } from '../../styled/button/import-button';
import { AddForm } from './add-form/add-form';
import { ImportForm } from './import-form/import-form';
import useAlert from '../../hooks/alert/alert';
import { StyledListForm } from '../../styled/list-form/list-from';

export const Clients = () => {
  const {
    clients,
    getClients,
   } = useClientsStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isImportFomOpen, setIsImportFormOpen] = useState(false);
  const { error } = useAlert();

  const onGetClients = onHandler(async () => {
    await getClients();
  }, (e) => error(e));

  useEffect(() => {
    onGetClients();
  }, [])

  return (
    <>
      <PageWrapper vertical>
        <Title level={2}>Клиенты</Title>
        <Flex justify='flex-end' gap={20}>
          <Button type="primary" size='large' onClick={() => setIsFormOpen(true)}>Добавить</Button>
          <ImportButtonStyled type="primary" size='large' onClick={() => setIsImportFormOpen(true)}>
            Импортировать данные
          </ImportButtonStyled>
        </Flex>
        <Divider />
        <Flex gap={10} vertical>
          <Row gutter={[30, 30]}>
            <Col xl={10} md={8} sm={7} xs={6} align='middle'><Typography.Title level={4}>ФИО</Typography.Title></Col>
            <Col xl={10} md={8} sm={7} xs={6} align='middle'><Typography.Title level={4}>Контактные данные</Typography.Title></Col>
          </Row>
          <Flex vertical gap={10}>
            {clients && clients.map((client) => (
              <ClientsListForm key={client.id} client={client}/>
            ))}
          </Flex>
        </Flex>
      </PageWrapper>
      {
        isFormOpen && <AddForm closeForm={() => setIsFormOpen(false)}/>
      }
      {
        isImportFomOpen && <ImportForm getClients={onGetClients} closeForm={() => setIsImportFormOpen(false)} />
      }
    </>
  );
};