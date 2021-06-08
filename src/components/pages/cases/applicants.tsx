import React, {
  FunctionComponent,
  ReactElement,
  MouseEvent,
  KeyboardEvent,
  useState,
  useEffect,
  ChangeEvent,
} from 'react';
import { Redirect } from 'react-router-dom';
import { services } from '../../../shared';
import { SubmissionRouteInterface, TitleInterface, SubmissionRouteType } from '../../../shared/models';
import { CustomerInterface } from '../../sections/customer/customer.model';
import { ApplicantInterface } from '../../sections/applicants/applicant.model';
import { CustomerTable } from '../../sections/customer/customer-table';
import { ApplicantTable } from '../../sections/applicants/applicant-table';
import { CASES, APPLICATION } from '../../../config/routes';
import { Workflow } from '../../sections/workflow/workflow';
import { Button, Container, FormSelect, PageHeading, CtaBar } from '../../shared';
import { GridColumn } from '../../shared/grid/grid';
import { CaseInterface } from '../../../components/sections/question-sets/section-menu/case.model';

import { defaultErrorResponse, hasError, ServiceHandlingInterface } from '../../../shared/types/service-handling';

interface ClientPageInterface {
  location?: {
    state: {
      loanPurposeId: number;
      applicationApplicantId?: number;
    };
  };
}

export const applicationStartInitialState: ServiceHandlingInterface<CaseInterface> = {
  data: undefined,
  loading: false,
  error: false,
};

export const ApplicantsPage: FunctionComponent<ClientPageInterface> = ({ location }): ReactElement => {
  const [formTitles, setAddClientTitles] = useState<TitleInterface[] | []>([]);
  const [submissionRoutes, setSubmissionRoutes] = useState<SubmissionRouteInterface[] | []>([]);
  const [customerList, setCustomerList] = useState<CustomerInterface[] | []>([]);
  const [applicantList, setApplicantList] = useState<ApplicantInterface[] | []>([]);
  const [mainApplicantId, setMainApplicantId] = useState<string>('');
  const [maxApplicants, setMaxApplicants] = useState<number>(0);
  const [selectedApplicantId, setSelectedApplicantId] = useState<string>('');
  const [selectedSubmissionRoute, setSelectedSubmissionRoute] = useState<SubmissionRouteInterface>(null);
  const [removedApplicantId, setRemovedApplicantId] = useState<string>('');
  const [keyPressed, setKeyPressed] = useState<string | null>(' ');
  const [sortColumn, setSortColumn] = useState<string>('Id');
  const [sortOrder, setSortOrder] = useState<string>('Desc');
  const [searchTerm, setSearchTerm] = useState<string>(' ');
  const [activeCase, setActiveCase] = useState<CaseInterface | null>(null);
  const [applicationStart, setApplicationStart] = useState<ServiceHandlingInterface<CaseInterface>>(
    applicationStartInitialState,
  );
  const pageSize = 5;

  const selectExistingCustomer: (e: MouseEvent<HTMLButtonElement>) => void = (e) => {
    const id = e.currentTarget.getAttribute('data-value');
    setSelectedApplicantId(id);
  };

  const changeMainApplicant: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const id = e.currentTarget.getAttribute('data-value');
    setMainApplicantId(id);
  };

  const changeSubmissionRoute: (e: ChangeEvent<HTMLSelectElement>) => void = (e) => {
    if (
      e.currentTarget.selectedOptions.length > 0 &&
      (e.currentTarget.selectedOptions[0].value.startsWith(SubmissionRouteType.MortgageClub.toString()) ||
        e.currentTarget.selectedOptions[0].value.startsWith(SubmissionRouteType.Network.toString()))
    ) {
      const selectedRoute = (submissionRoutes ?? []).filter(
        (route) => route.value === e.currentTarget.selectedOptions[0].value,
      );
      if (selectedRoute.length > 0) {
        setSelectedSubmissionRoute(selectedRoute[0]);
      }
    }
  };

  const removeApplicant: (e: MouseEvent<HTMLButtonElement>) => void = (e) => {
    const id = e.currentTarget.getAttribute('data-value');
    setRemovedApplicantId(id);
  };

  const handleKey: (event: KeyboardEvent<HTMLInputElement>) => void = (e) => {
    setKeyPressed(e.currentTarget.value);
  };

  const startApplication = async () => {
    setApplicationStart({ ...applicationStart, loading: true });
    const result = await services.startApplication(
      mainApplicantId,
      Number(location.state.loanPurposeId),
      applicantList,
      selectedSubmissionRoute,
    );
    setApplicationStart(result);
    if (result.data) setActiveCase(result.data);
  };

  const fetchCustomers = async (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const customers = (await services.search(searchTerm ?? ' ', 1, pageSize)).data;
    (customers ?? []).forEach((c) => {
      if ((applicantList ?? []).map((a) => a.id).indexOf(c.id) === -1) {
        c.isSelected = false;
      } else {
        c.isSelected = true;
      }
    });
    setCustomerList(customers);
  };

  const getMaxApplicants = async () => {
    const max = await (await services.getMaxApplicants()).data;
    setMaxApplicants(parseInt(max));
  };

  const fetchPageData = async (pageNumber: number, pageSize: number) => {
    const customers = await (await services.search(searchTerm ?? ' ', pageNumber, pageSize, sortColumn, sortOrder))
      .data;
    (customers ?? []).forEach((c) => {
      if ((applicantList ?? []).map((a) => a.id).indexOf(c.id) === -1) {
        c.isSelected = false;
      } else {
        c.isSelected = true;
      }
    });
    setCustomerList(customers);
    return (customers ?? []).filter((c) => !c.isSelected);
  };

  const fetchSortedData = async (column: GridColumn, order: string) => {
    setSortOrder(order);
    setSortColumn(column.id);
    const customers = await (await services.search(searchTerm ?? ' ', 1, pageSize, column.id, order)).data;
    (customers ?? []).forEach((c) => {
      if ((applicantList ?? []).map((a) => a.id).indexOf(c.id) === -1) {
        c.isSelected = false;
      } else {
        c.isSelected = true;
      }
    });
    setCustomerList(customers);
    return (customers ?? []).filter((c) => !c.isSelected);
  };

  const fetchTitlesData = async () => {
    const res = (await services.getTitles()).data;
    setAddClientTitles(res);
  };

  const getSubmissionRoutes = async () => {
    const mortageClubs: SubmissionRouteInterface[] = ((await (await services.getMortgageClubs()).data) ?? []).map(
      (club) => ({
        id: club.mortgageClubId,
        displayText: club.name,
        value: SubmissionRouteType.MortgageClub + '_' + club.name,
        type: SubmissionRouteType.MortgageClub,
        selectable: true,
      }),
    );
    const networks: SubmissionRouteInterface[] = ((await (await services.getNetworks()).data) ?? []).map((network) => ({
      id: network.networkId,
      displayText: network.name,
      value: SubmissionRouteType.Network + '_' + network.name,
      type: SubmissionRouteType.Network,
      selectable: true,
    }));
    let routes: SubmissionRouteInterface[] = [];

    routes.push({ id: 1000, value: 'Direct Route', type: SubmissionRouteType.DirectRoute, selectable: false });

    if (mortageClubs.length > 0) {
      mortageClubs.splice(0, 0, {
        id: 999,
        value: ' -- Mortgage Clubs -- ',
        type: SubmissionRouteType.None,
        selectable: false,
      });
      routes = [...routes, ...mortageClubs];
    }

    if (networks.length > 0) {
      networks.splice(0, 0, { id: 998, value: '-- Networks --', type: SubmissionRouteType.None, selectable: false });
      routes = [...routes, ...networks];
    }
    setSubmissionRoutes(routes);
  };

  useEffect(() => {
    getMaxApplicants();
  }, [maxApplicants]);

  useEffect(() => {
    const applicants: CustomerInterface[] = (customerList ?? []).filter((a) => a.id.toString() === selectedApplicantId);
    if (
      applicants.length > 0 &&
      (applicantList ?? []).filter((a) => a.id.toString() === selectedApplicantId).length === 0 &&
      applicantList.length < maxApplicants
    ) {
      const mappedApplicants: ApplicantInterface[] = applicants.map((a) => ({
        id: a.id,
        firstName: a.firstName,
        surname: a.surname,
      }));
      if (mainApplicantId === '') {
        setMainApplicantId(mappedApplicants[0].id.toString());
      }
      setApplicantList([...(applicantList ?? []), mappedApplicants[0]]);
    }
  }, [selectedApplicantId]);

  useEffect(() => {
    fetchCustomers(keyPressed);
  }, [keyPressed]);

  useEffect(() => {
    setRemovedApplicantId('');
    if (removedApplicantId !== null && removedApplicantId !== undefined && removedApplicantId !== '') {
      const applicants: ApplicantInterface[] = (applicantList ?? []).filter(
        (a) => a.id.toString() === removedApplicantId,
      );
      if (
        applicants.length > 0 &&
        (applicantList ?? []).filter((a) => a.id.toString() === removedApplicantId).length > 0
      ) {
        const a: ApplicantInterface[] = applicantList.filter((a) => a.id.toString() !== removedApplicantId);
        if ((mainApplicantId === '' || mainApplicantId == removedApplicantId) && a.length > 0) {
          setMainApplicantId(a[0].id.toString());
        } else if (a.length === 0) {
          setMainApplicantId('');
        }
        setSelectedApplicantId('');
        setApplicantList(a);
      }
    }
  }, [removedApplicantId]);

  useEffect(() => {
    const customers = [...customerList];
    (customers ?? []).forEach((c) => {
      if ((applicantList ?? []).map((a) => a.id).indexOf(c.id) === -1) {
        c.isSelected = false;
      } else {
        c.isSelected = true;
      }
    });
    if (mainApplicantId === '' && applicantList.length > 0) {
      setMainApplicantId(applicantList[0].id.toString());
    }

    setCustomerList(customers);
  }, [applicantList]);

  useEffect(() => {
    const customers = [...customerList];
    (customers ?? []).forEach((c) => {
      if ((applicantList ?? []).map((a) => a.id).indexOf(c.id) === -1) {
        c.isSelected = false;
      } else {
        c.isSelected = true;
      }
    });
    if (mainApplicantId === '' && applicantList.length > 0) {
      setMainApplicantId(applicantList[0].id.toString());
    }
    setCustomerList(customers);
  }, [applicantList]);

  useEffect(() => {
    fetchTitlesData();
    fetchCustomers(keyPressed);
    getMaxApplicants();
    getSubmissionRoutes();
  }, []);

  if (!location.state) {
    return <Redirect to={{ pathname: CASES.path }} />;
  }
  if (activeCase !== null) {
    return (
      <Redirect
        to={{
          pathname: APPLICATION.paths[0],
          state: {
            loanPurposeId: location.state.loanPurposeId,
            case: activeCase,
            applicants: activeCase.applicants,
          },
        }}
      />
    );
  }

  if (hasError([applicationStart])) {
    return defaultErrorResponse();
  }

  return (
    <>
      <Workflow caseId={location?.state?.applicationApplicantId} loanPurposeId={location.state.loanPurposeId} />
      <PageHeading headingLevel={2} title="Applicants" icon="applicants" mb={6} />
      <Container ctabar>
        <CustomerTable
          customerList={customerList.filter((c) => !c.isSelected)}
          selectFunction={selectExistingCustomer}
          pageSize={pageSize}
          sortFunction={fetchSortedData}
          pageFunction={fetchPageData}
          selectEnabled={applicantList.length < maxApplicants}
          handleKey={handleKey}
          formTitles={formTitles}
          fetchCustomers={fetchCustomers}
        />
        <ApplicantTable
          applicantList={applicantList}
          selectFunction={removeApplicant}
          changeMainApplicant={changeMainApplicant}
          mainApplicantId={mainApplicantId}
        />
        <div className="u-flex">
          {submissionRoutes.length > 1 && (
            <FormSelect
              id="submissionRoutes"
              options={submissionRoutes}
              displayDefaultSelect={false}
              changeHandler={changeSubmissionRoute}
            />
          )}
        </div>
        <CtaBar>
          <Button
            type="button"
            variant="primary"
            childClasses="u-flex__align-right"
            onClick={startApplication}
            disabled={applicantList.length < 1 || mainApplicantId == ''}
            icon="chevronRight"
            iconPosition="right"
          >
            Continue
          </Button>
        </CtaBar>
      </Container>
    </>
  );
};
