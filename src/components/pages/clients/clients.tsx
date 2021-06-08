import React, {
  FunctionComponent,
  ReactElement,
  useState,
  useEffect,
  KeyboardEvent,
  MouseEvent,
  useMemo,
  useCallback,
} from 'react';

import { services } from '../../../shared';
import { TitleInterface } from '../../../shared/models';

import { PageHeading, Row } from '../../shared';
import { ClientDashboard } from '../../sections';
import { Container, Column, Button, Dialog } from '../../shared';
import { BackButton } from './BackButton';

import { CustomerInterface } from '../../sections/customer/customer.model';
import { CustomerDetailInterface, CustomerDocumentsInterface } from '../../../shared/models';
import { GridColumn } from '../../shared/grid/grid';

import { CardClientDetails } from '../../sections/card-client-details';
import { CardClientDownloads } from '../../sections/card-client-downloads';

import { defaultErrorResponse, hasError, ServiceHandlingInterface } from '../../../shared/types/service-handling';

import { CaseDetail } from '../../sections/case-dashboard/caseDetail.model';

export interface DocumentRefresh {
  (): Promise<void>;
}

export const clientInitialState: ServiceHandlingInterface<CustomerInterface[]> = {
  data: [],
  loading: false,
  error: false,
};

export const ClientsPage: FunctionComponent = (): ReactElement => {
  const [formTitles, setAddClientTitles] = useState<TitleInterface[] | []>([]);
  const [clientList, setClientList] = useState<CustomerInterface[] | []>([]);
  const [searchTerm, setSearchTerm] = useState<string>(' ');
  const [sortColumn, setSortColumn] = useState<string>('Id');
  const [sortOrder, setSortOrder] = useState<string>('Desc');
  const [keyPressed, setKeyPressed] = useState<string | null>(' ');
  const [clientCases, setClientCases] = useState<CaseDetail[]>([]);
  const [activeClient, setActiveClient] = useState<CustomerDetailInterface | null>(null);
  const [activeSelectClient, setActiveSelectClient] = useState<boolean>(false);
  const [activeClientDocuments, setActiveClientDocuments] = useState<CustomerDocumentsInterface[] | []>([]);
  const [activeClientDocumentUrl, setActiveClientDocumentUrl] = useState<string>(null);
  const [testClientData, setClientData] = useState<ServiceHandlingInterface<CustomerInterface[]>>(clientInitialState);
  const [modalVisible, setModalVisible] = useState<boolean>();
  const pageSize = 10;

  const fetchTitlesData = async () => {
    const res = await services.getTitles();
    setAddClientTitles(res.data);
  };
  const getActiveClientByList = async (clients: CustomerInterface[]) => {
    if (clients?.length) {
      const firstId = clients[0].id;
      return await services.getCustomer(Number(firstId));
    }
    return null;
  };

  const fetchClients = async (searchTerm: string) => {
    setClientData({ ...testClientData, loading: true });
    setSearchTerm(searchTerm);
    const clients = await services.search(searchTerm ?? ' ', 1, pageSize);
    setClientData(clients);
    if (clients.data) {
      setClientList(clients.data);
      const firstClient = await getActiveClientByList(clients.data);
      setActiveClient(firstClient.data);
    }
    return clients.data;
  };

  const fetchPageData = async (pageNumber: number, pageSize: number) => {
    const clients = await services.search(searchTerm ?? ' ', pageNumber, pageSize, sortColumn, sortOrder);

    setClientList(clients.data);
    return clients.data;
  };

  const fetchSortedData = async (column: GridColumn, order: string) => {
    setSortOrder(order);
    setSortColumn(column.id);
    const clients = await services.search(searchTerm ?? ' ', 1, pageSize, column.id, order);

    setClientList(clients.data);
    return clients.data;
  };

  const handleKey: (event: KeyboardEvent<HTMLInputElement>) => void = (e) => {
    setKeyPressed(e.currentTarget.value);
  };

  const handleBack = async () => {
    setActiveSelectClient(false);
  };
  const setClientValues = async (customerId: number) => {
    if (customerId) {
      const cases = await services.getCaseSummary('', 1, 10, 'LastUpdatedDate', 'Desc', customerId);
      setClientCases(cases.data);
      const clientDocuments = await services.getCustomerDocuments(Number(customerId));
      setActiveClientDocuments(clientDocuments.data);
      const clientDocumentUrl = await services.getCustomerDocumentUrl();
      setActiveClientDocumentUrl(clientDocumentUrl);
    }
  };

  const documentGridRefresh: DocumentRefresh = async () => {
    setClientValues(activeClient?.id);
  };

  const getRowId = async (customerId: number) => {
    const client = await services.getCustomer(customerId);
    setActiveClient(client.data);
    setActiveSelectClient(true);
    const cases = (await services.getCaseSummary('', 1, 10, 'ApplicationId', 'Desc', customerId)).data;
    setClientCases(cases);
    const clientDocuments = (await services.getCustomerDocuments(customerId)).data;
    setActiveClientDocuments(clientDocuments);
    const clientDocumentUrl = await services.getCustomerDocumentUrl();
    setActiveClientDocumentUrl(clientDocumentUrl);
    setClientValues(customerId);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    fetchTitlesData();
  }, []);

  useEffect(() => {
    fetchClients(keyPressed);
  }, [keyPressed]);

  const handleRemoveClient: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> = async () => {
    const clientId = Number(activeClient.id);
    await services.removeClient(clientId);
    const restOfClients: CustomerInterface[] = (clientList ?? []).filter(
      (client) => client.id.toString() !== clientId.toString(),
    );
    setClientList(restOfClients);
    const firstClient = await getActiveClientByList(restOfClients);
    setActiveClient(firstClient.data);
    setModalVisible(false);
  };

  const renderClientDocuments = useCallback(() => {
    return (
      <CardClientDownloads
        documents={activeClientDocuments}
        documentUrl={activeClientDocumentUrl}
        clientId={activeClient.id}
        documentGridRefresh={documentGridRefresh}
      />
    );
  }, [activeClient, activeClientDocuments, activeClientDocumentUrl, documentGridRefresh]);
  const renderClientCard = useMemo(() => {
    if (!activeClient) {
      return null;
    }
    return (
      <>
        <CardClientDetails client={activeClient} cases={clientCases} />
        {renderClientDocuments()}
        <div className="u-flex u-mt-2 u-width-100">
          <Button
            type="button"
            variant="outline"
            dataValue={activeClient.id}
            onClick={() => setModalVisible(!modalVisible)}
            width="full"
          >
            Remove client
          </Button>
        </div>
      </>
    );
  }, [activeClient, activeClientDocumentUrl, activeClientDocuments, clientCases]);

  if (hasError([testClientData])) {
    return defaultErrorResponse();
  }

  return (
    <section>
      <Dialog
        message="Are you sure you want to remove this client?"
        show={modalVisible}
        handleClose={hideModal}
        submit={handleRemoveClient}
      ></Dialog>
      <PageHeading headingLevel={2} title="Clients" icon="clients" mb={6} />
      <BackButton
        type="button"
        variant="outline"
        onClick={handleBack}
        width="full"
        hiddenInLargerScreens
        visibility={activeSelectClient}
      >
        back
      </BackButton>
      <Container fullWidth>
        <Row>
          <Column hiddenInSmallerScreens={!!activeSelectClient}>
            <ClientDashboard
              clientList={clientList}
              pageSize={pageSize}
              formTitles={formTitles}
              sortFunction={fetchSortedData}
              pageFunction={fetchPageData}
              handleKey={handleKey}
              getRowId={getRowId}
              fetchClients={fetchClients}
            />
          </Column>
          <Column spaced hiddenInSmallerScreens={!activeSelectClient}>
            {renderClientCard}
          </Column>
        </Row>
      </Container>
    </section>
  );
};
