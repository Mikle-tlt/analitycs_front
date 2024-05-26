import React, { useEffect, useState } from 'react';
import { useProfilesStore } from '../../services/stores/profiles/profiles-service';
import { onHandler } from '../../utils/higher-order-func';
import { Button, Flex, Select, Typography } from 'antd';
import useAlert from '../../hooks/alert/alert';
import { StyledTable, StyledSelect } from '../../styled';

export const Profiles = () => {
  const { profiles, getProfiles, updateProfile, deleteProfile } = useProfilesStore();
  const [updatedProfiles, setUpdatedProfiles] = useState({});
  const { success, error } = useAlert();

  const onUpdateProfile = onHandler(async (userId) => {
    const role = updatedProfiles[userId];
    await updateProfile(role, userId);
    success('Профиль успешно изменен!')
  }, (e) => error(e));

  const onDeleteProfile = onHandler(async (userId) => {
    await deleteProfile(userId);
    success('Профиль успешно удален!');
  }, (e) => error(e))

  const handleRoleChange = (userId, value) => {
    const newProfiles = {...updatedProfiles};
    newProfiles[userId] = value;
    setUpdatedProfiles(newProfiles);
  };

  useEffect(() => {
    getProfiles()
  }, []);

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <Typography.Paragraph>{ text }</Typography.Paragraph>,
      align: 'center'
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      render: (text, record) => (
        <StyledSelect
          width='120px'
          value={updatedProfiles[record.id] || record.role}
          onChange={(value) => handleRoleChange(record.id, value)}>
          <Select.Option value='MANAGER'>Менеджер</Select.Option>
          <Select.Option value='ADMIN'>Админ</Select.Option>
        </StyledSelect>
      ),
    },
    {
      title: 'Действия',
      dataIndex: 'actions',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Flex justify='end' gap='20px'>
          <Button type="primary" onClick={() => onUpdateProfile(record.id)}>Обновить</Button>
          <Button type="danger" onClick={() => onDeleteProfile(record.id)}>Удалить</Button>
        </Flex>
      ),
    },
  ];

  return (
    <StyledTable
      columns={columns}
      dataSource={profiles}
      rowKey="id"
      pagination={false}
      virtual={true}
      scroll={{ y: 550 }}
    />
  );
};
