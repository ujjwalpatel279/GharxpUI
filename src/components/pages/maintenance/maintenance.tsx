import { Grid, GridColumn, GridRow } from '../../shared/grid/grid';
import React, { ChangeEvent, FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { ListItemInterface, UserInterface } from 'shared/models';

import { services } from '../../../shared';

import { Container, FormSelect, Heading, PageHeading, Section } from '../../shared';

export const MaintenancePage: FunctionComponent = (): ReactElement => {
  const [userList, setUserList] = useState<UserInterface[] | []>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [title, setTitle] = useState<string>('');
  const [statuses, setStatuses] = useState<ListItemInterface[] | []>([]);
  const [sortColumn, setSortColumn] = useState<string>('Id');
  const [sortOrder, setSortOrder] = useState<string>('Desc');
  const pageSize = 10;

  const columns = [
    {
      id: 'userName',
      description: 'User name',
    },
    {
      id: 'name',
      description: 'Name',
    },
    {
      id: 'telephone',
      description: 'Phone number',
    },
    {
      id: 'jobTitle',
      description: 'Job Title',
    },
    {
      id: 'status',
      description: 'Status',
      render(column: GridColumn, row: GridRow) {
        return <FormSelect id={row.id} options={statuses} value={row.statusId} changeHandler={changeStatus} />;
      },
    },
  ];

  const changeStatus: (e: ChangeEvent<HTMLSelectElement>) => void = async (e) => {
    if (confirm('Are you sure you want to update the status of this user?')) {
      await services.updateUserStatus(Number(e.currentTarget.id), Number(e.currentTarget.selectedOptions[0].value));
      await fetchPageData(pageNo, pageSize);
    }
  };

  const fetchUsers = async () => {
    setUserList((await services.getAllUsers(1, pageSize, sortColumn, sortOrder)).data);
    setStatuses((await services.getUserStatuses()).data);
    const broker = (await services.getBroker()).data;
    const text =
      broker.organisationUniqueIdentifier === null
        ? ''
        : '- Organisation Identifier ' + broker.organisationUniqueIdentifier;
    setTitle(text);
  };

  const fetchPageData = async (pageNumber: number, pageSize: number) => {
    setPageNo(pageNumber);
    const list = (await services.getAllUsers(pageNumber, pageSize, sortColumn, sortOrder)).data;
    setUserList(list);
    return list;
  };

  const fetchSortedData = async (column: GridColumn, order: string) => {
    setSortOrder(order);
    setSortColumn(column.id);
    const users = (await services.getAllUsers(1, pageSize, column.id, order)).data;

    setUserList(users);
    return users;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section>
      <PageHeading headingLevel={2} title="Maintenance" mb={6} icon="wrench" />
      <Container>
        <Section headerChildren={<Heading level={'h2'} title={'Broker Maintenance ' + title} />}>
          <Grid
            rowData={userList}
            columns={columns}
            noRowsMessage="No existing users"
            disablePaging={false}
            sortRows={fetchSortedData}
            gotoPage={fetchPageData}
            pageSize={pageSize}
          />
        </Section>
      </Container>
    </section>
  );
};
