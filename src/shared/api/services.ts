import { Config } from './../../config/config';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

import { BrokerInterface } from './../../components/app/Broker.model';
import { getBrokerId, getToken } from './authentication';
import { api } from './server';

import { ApplicantInterface } from '../../components/sections/applicants/applicant.model';
import { CustomerInterface } from '../../components/sections/customer/customer.model';
import { CaseDetail } from '../../components/sections/case-dashboard/caseDetail.model';
import { LoanPurposesInterface } from '../../components/sections/loan-purpose/loan-purpose.model';

import { ServiceHandlingInterface } from '../types/service-handling';

import {
  CaseInterface,
  NetworkInterface,
  MortgageClubInterface,
  AddressListInterface,
  SubmissionRouteInterface,
  SubmissionRouteType,
  TitleInterface,
  QuestionSetInterface,
  CustomerDetailInterface,
  FeeInterface,
  AnswerInterface,
  ListItemInterface,
  SystemRuleInterface,
  ModuleTextInterface,
  AddressInterface,
  ProductInterface,
  ProductCategoryInterface,
  WorldPayOrderInterface,
  WorldPayResponseInterface,
  AutoDeclineAnswerInterface,
  QuestionInterface,
  NoteInterface,
  StageInterface,
  UserInterface,
  EsisSummaryInterface,
} from '../models';
import { WorkflowInterface, WorkflowCompletionInterface } from '../../components/sections/workflow/workflow.model';
import { PageInterface } from '../../components/sections/question-sets/section-menu/page.model';
import { CustomerDocumentsInterface } from '../../components/sections/documents/customer-documents/customer-documents.model';
import { DeclarationInterface } from '../../components/sections/declarations/declarations-table/declarations.model';

export const services = {
  getBroker: async (): Promise<ServiceHandlingInterface<BrokerInterface>> => {
    return api.get<BrokerInterface>(`${process.env.REACT_APP_ACCOUNT_SERVICE_URL}broker/get/${await getBrokerId()}`);
  },
  getLoanPurposes: (): Promise<ServiceHandlingInterface<LoanPurposesInterface[]>> =>
    api.get<LoanPurposesInterface[]>(`${Config.lookupService}list/getlist/loanpurchase`),

  getTitles: (): Promise<ServiceHandlingInterface<TitleInterface[]>> =>
    api.get<TitleInterface[]>(`${Config.lookupService}List/getList/Title`),

  getjobTitles: (): Promise<ServiceHandlingInterface<TitleInterface[]>> =>
    api.get<TitleInterface[]>(`${process.env.REACT_APP_LOOKUP_SERVICE_URL}List/getList/JobTitle`),

  getList: (listType: string): Promise<ServiceHandlingInterface<ListItemInterface[]>> =>
    api.get<ListItemInterface[]>(`${Config.lookupService}List/getList/${listType}`),

  getWorkflowSteps: (loanPurposeId: number): Promise<ServiceHandlingInterface<WorkflowInterface>> =>
    api.get<WorkflowInterface>(`${Config.productService}workflow/GetDynamicWorkflow/${loanPurposeId}`),

  getDynamicWorkflow: async (
    applicationId: number,
    loanPurposeId: number,
  ): Promise<ServiceHandlingInterface<WorkflowInterface>> =>
    api.get<WorkflowInterface>(
      `${Config.applicationService
      }Application/GetDynamicWorkflow/${await getBrokerId()}/${applicationId}/${loanPurposeId}`,
    ),

  getWorkflowCompletionStatus: (
    applicantId: number,
  ): Promise<ServiceHandlingInterface<WorkflowCompletionInterface[]>> =>
    api.get<WorkflowCompletionInterface[]>(
      `${Config.productService}workflow/WorkflowCompletionStatus?applicantId=${applicantId}`,
    ),

  getPagesWithStatus: async (
    applicationId: number,
    formId: number,
  ): Promise<ServiceHandlingInterface<PageInterface[]>> =>
    api.get<PageInterface[]>(
      `${Config.applicationService}Application/GetPages/${await getBrokerId()}/${applicationId}/${formId}`,
    ),

  getCustomer: async (customerId: number): Promise<ServiceHandlingInterface<CustomerDetailInterface>> =>
    api.get<CustomerDetailInterface>(`${Config.accountService}customer/get/${await getBrokerId()}/${customerId}`),

  getPages: async (formId: number): Promise<ServiceHandlingInterface<PageInterface[]>> => {
    return api.get<PageInterface[]>(`${process.env.REACT_APP_PRODUCT_SERVICE_URL}workflow/getPages/${formId}/false`);
  },

  getAllUsers: (
    pageNumber: number,
    pageSize: number,
    sort: string,
    sortOrder: string,
  ): Promise<ServiceHandlingInterface<UserInterface[]>> =>
    api.get<UserInterface[]>(`${Config.accountService}user/GetAll/${pageNumber}/${pageSize}/${sort}/${sortOrder}`),

  getUserStatuses: (): Promise<ServiceHandlingInterface<ListItemInterface[]>> =>
    api.get<ListItemInterface[]>(`${Config.accountService}user/GetUserStatuses`),

  getAllCustomers: async (): Promise<ServiceHandlingInterface<CustomerInterface[]>> => {
    return api.get<CustomerInterface[]>(`${process.env.REACT_APP_ACCOUNT_SERVICE_URL}customer/GetAll/{testBrokerId}`);
  },
  search: async (
    searchText = ' ',
    pageNumber = 1,
    pageSize = 10,
    sort = 'id',
    sortOrder = 'desc',
  ): Promise<ServiceHandlingInterface<CustomerInterface[]>> => {
    //Call for mock
    // api.get<CustomerInterface[]>(`${Config.accountService}customer/Search/${testBrokerId}`),
    return api.get<CustomerInterface[]>(
      `${Config.accountService}customer/Search/${await getBrokerId()}/${searchText.trim().length > 0 ? searchText.trim() : ' '
      }/${pageNumber}/${pageSize}/${sort}/${sortOrder}`,
    );
  },

  startApplication: async (
    customerId: string,
    loanPurposeId: number,
    selectedApplicants: ApplicantInterface[],
    selectedSubmissionRoute: SubmissionRouteInterface,
  ): Promise<ServiceHandlingInterface<CaseInterface>> =>
    api.post(
      `${Config.applicationService}application/save/${await getBrokerId()}`,
      JSON.stringify({
        customerId: parseInt(customerId),
        loanPurposeId: loanPurposeId,
        applicants: selectedApplicants.map((a) => ({ customerId: a.id })),
        mortgageclub:
          selectedSubmissionRoute != null && selectedSubmissionRoute.type === SubmissionRouteType.MortgageClub
            ? {
              id: selectedSubmissionRoute.id,
            }
            : null,
        network:
          selectedSubmissionRoute != null && selectedSubmissionRoute.type === SubmissionRouteType.Network
            ? {
              id: selectedSubmissionRoute.id,
            }
            : null,
      }),
    ),

  saveAddress: async (address: AddressInterface): Promise<ServiceHandlingInterface<AddressInterface>> =>
    api.post(`${Config.accountService}address/address`, JSON.stringify(address)),

  getAddress: (addressId: number): Promise<ServiceHandlingInterface<AddressInterface>> =>
    api.get(`${Config.accountService}address/address/${addressId}`),

  getAddressList: (
    searchBy: string,
    searchFilter: 'Postcode' | 'Sid',
  ): Promise<ServiceHandlingInterface<AddressListInterface[]>> =>
    api.get<AddressListInterface[]>(`${Config.lookupService}AddressLookup/GetAddressList/${searchFilter}/${searchBy}`),

  getAddressDetail: (
    searchBy: string,
    searchFilter: 'Postcode' | 'Sid',
  ): Promise<ServiceHandlingInterface<AddressListInterface>> =>
    api.get<AddressListInterface>(`${Config.lookupService}AddressLookup/GetAddressList/${searchFilter}/${searchBy}`),

  getMaxApplicants: (): Promise<ServiceHandlingInterface<string>> =>
    api.get(`${Config.lookupService}systemrule/getvalue/APP-NUMBER`),

  getMortgageClubs: async (): Promise<ServiceHandlingInterface<MortgageClubInterface[]>> =>
    api.get(`${Config.accountService}mortgageclub/getorganisations/${await getBrokerId()}`),

  getNetworks: async (): Promise<ServiceHandlingInterface<NetworkInterface[]>> =>
    api.get(`${Config.accountService}network/getnetworks/${await getBrokerId()}`),

  getFees: async (caseId: number, formId: number): Promise<ServiceHandlingInterface<FeeInterface[]>> =>
    api.get(`${Config.applicationService}Application/GetFees/${await getBrokerId()}/${caseId}/${formId}`),

  saveFee: async (
    caseId: number,
    formId: number,
    fee: FeeInterface[],
  ): Promise<ServiceHandlingInterface<FeeInterface[]>> =>
    api.post(
      `${Config.applicationService}Application/SaveFees/${await getBrokerId()}/${caseId}/${formId}`,
      JSON.stringify(fee),
    ),

  updateUserStatus: async (userId: number, statusId: number): Promise<ServiceHandlingInterface<UserInterface>> =>
    api.post(`${Config.accountService}User/UpdateStatus/${userId}/${statusId}`, JSON.stringify({})),

  removeFee: async (caseId: number, formId: number, loanToValueId: number): Promise<boolean> =>
    api.delete(
      `${Config.applicationService}Application/DeleteFee/${await getBrokerId()}/${caseId}/${formId}/${loanToValueId}`,
    ),

  saveClient: async (customer: CustomerDetailInterface): Promise<ServiceHandlingInterface<void>> =>
    api.post(`${Config.accountService}Customer/Save/${await getBrokerId()}`, JSON.stringify(customer)),



  removeClient: async (customerId: number): Promise<boolean> =>
    api.delete(`${Config.accountService}Customer/Delete/${await getBrokerId()}/${customerId}`),


  UpdateBroker: async (broker: BrokerInterface): Promise<ServiceHandlingInterface<void>> =>
    api.post(
      `${process.env.REACT_APP_ACCOUNT_SERVICE_URL}Broker/Update/${await getBrokerId()}`,
      JSON.stringify(broker),
    ),

  saveSectionAnswers: async (
    applicationId: number,
    formId: number,
    answers: AnswerInterface[],
  ): Promise<ServiceHandlingInterface<AnswerInterface[]>> =>
    api.post(
      `${Config.applicationService}Application/SaveSection/${await getBrokerId()}/${applicationId}/${formId}`,
      JSON.stringify(answers),
    ),

  getQuestionSets: async (caseId: number, sectionId: number): Promise<ServiceHandlingInterface<QuestionSetInterface>> =>
    api.get(`${Config.applicationService}Application/GetSection/${await getBrokerId()}/${caseId}/${sectionId}`),

  getCase: async (caseId: number): Promise<ServiceHandlingInterface<CaseInterface>> =>
    api.get(`${Config.applicationService}Application/Get/${await getBrokerId()}/${caseId}`),

  getCaseDetails: async (caseId: number): Promise<ServiceHandlingInterface<QuestionInterface[]>> =>
    api.get(`${Config.applicationService}Application/GetDetails/${await getBrokerId()}/${caseId}`),

  submitCase: async (applicationId: number, formId: number): Promise<ServiceHandlingInterface<CaseInterface>> =>
    api.post(
      `${Config.applicationService}Application/SubmitCase/${await getBrokerId()}/${applicationId}/${formId}`,
      JSON.stringify({}),
    ),

  getCustomerDocuments: async (customerId: number): Promise<ServiceHandlingInterface<CustomerDocumentsInterface[]>> =>
    api.get(`${Config.accountService}Customer/GetDocuments/${await getBrokerId()}/${customerId}`),

  getCustomerDocument: async (documentId: number): Promise<Blob> =>
    api.getAsBlob(`${Config.accountService}Customer/GetDocument/${await getBrokerId()}/${documentId}`),

  deleteCustomerDocument: async (documentId: number): Promise<boolean> =>
    api.delete(`${Config.accountService}Customer/DeleteDocument/${await getBrokerId()}/${documentId}`),

  getCustomerDocumentUrl: (): Promise<string> => {
    return getBrokerId()
      .then((result) => {
        return `${Config.accountService}Customer/GetDocument/${result}/`;
      })
      .catch((err) => {
        return err;
      });
  },

  uploadDocument: async (
    customerDocument: CustomerDocumentsInterface,
  ): Promise<ServiceHandlingInterface<CustomerDocumentsInterface>> => {
    return api.post(
      `${Config.accountService}Customer/UploadDocument/${await getBrokerId()}`,
      JSON.stringify(customerDocument),
    );
  },
  getModuleText: async (code: string): Promise<ServiceHandlingInterface<ModuleTextInterface>> => {
    return api.get<ModuleTextInterface>(`${Config.lookupService}ModuleText/GetByCode/${code}`);
  },
  submitApplication: async (applicationId: number, formId: number): Promise<ServiceHandlingInterface<CaseInterface>> =>
    api.post(`${Config.applicationService}Application/Submit/${applicationId}/${formId}/${await getBrokerId()}`, null),
  getMandatoryDocuments: (): Promise<ServiceHandlingInterface<SystemRuleInterface>> =>
    api.get(`${Config.lookupService}systemrule/GetByRuleCode/MANDATORY_DOCUMENTS`),

  getProductCategories: async (): Promise<ServiceHandlingInterface<ProductCategoryInterface[]>> =>
    api.get(`${Config.productService}product/GetProductCategories/${await getBrokerId()}`),

  getProducts: async (
    categoryId: number,
    isFixed = 0,
    searchText = ' ',
    pageNumber = 1,
    pageSize = 10,
    sort = 'description',
    sortOrder = 'Asc',
  ): Promise<ServiceHandlingInterface<ProductInterface[]>> =>
    api.get(
      `${process.env.REACT_APP_PRODUCT_SERVICE_URL}product/GetProducts/${await getBrokerId()}/${categoryId}/${searchText.trim().length > 0 ? searchText.trim() : ' '
      }/${isFixed}/${pageNumber}/${pageSize}/${sort}/${sortOrder}`,
    ),
  getUser: async (): Promise<ServiceHandlingInterface<UserInterface[]>> =>
    api.get(
      `${process.env.REACT_APP_LOOKUP_SERVICE_URL}api/User/`,
    ),
  saveUser: async (user: UserInterface): Promise<ServiceHandlingInterface<void>> =>
    api.post(`${process.env.REACT_APP_LOOKUP_SERVICE_URL}api/User/`, JSON.stringify(user)),


  deleteUser: async (id: number): Promise<boolean> =>
    api.delete(`${process.env.REACT_APP_LOOKUP_SERVICE_URL}api/User/,${id}`),

  // removeClient: async (customerId: number): Promise<boolean> =>
  // api.delete(`${Config.accountService}Customer/Delete/${await getBrokerId()}/${customerId}`),

  // deleteCustomerDocument: async (documentId: number): Promise<boolean> =>
  // api.delete(`${Config.accountService}Customer/DeleteDocument/${await getBrokerId()}/${documentId}`),

  getAutoDeclineAnswers: async (
    formSectionId: number,
  ): Promise<ServiceHandlingInterface<AutoDeclineAnswerInterface[]>> =>
    api.get(`${Config.productService}workflow/GetAutoDeclineAnswers/${await getBrokerId()}/${formSectionId}`),

  getDeclarations: async (
    applicationId: number,
    formId: number,
  ): Promise<ServiceHandlingInterface<DeclarationInterface[]>> =>
    api.get(
      `${Config.applicationService}Application/GetDeclarations/${await getBrokerId()}/${applicationId}/${formId}`,
    ),

  getDeclarationDocumentUrl: (): string => {
    return `${Config.productService}Workflow/GetDeclarationDocument/`;
  },

  getDownloadCertificateUrl: async (): Promise<string> => {
    return `${Config.applicationService}Application/DownloadDipCertificate/${await getBrokerId()}/`;
  },

  isDipCertificateAvailable: async (
    applicationId: number,
    formId: number,
  ): Promise<ServiceHandlingInterface<boolean>> =>
    api.get(
      `${Config.applicationService
      }Application/IsDipCertificateAvailable/${await getBrokerId()}/${applicationId}/${formId}`,
    ),

  getDownloadFormUrl: async (): Promise<string> => {
    return `${Config.applicationService}Application/DownloadPdfForm/${await getBrokerId()}/`;
  },

  getDownloadDocumentUrl: async (): Promise<string> => {
    return `${Config.applicationService}Case/GetDocument/${await getBrokerId()}/`;
  },

  getNotificationsUrl: (): string => {
    return `${Config.applicationService}notificationshub`;
  },

  getHubConnection: (): HubConnection => {
    return new HubConnectionBuilder()
      .withUrl(services.getNotificationsUrl(), {
        accessTokenFactory: () => getToken(),
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();
  },

  submitWorldPayOrder: async (
    applicationId: number,
    formId: number,
    worldPayOrder: WorldPayOrderInterface,
  ): Promise<ServiceHandlingInterface<WorldPayResponseInterface>> => {
    return api.post(
      `${Config.applicationService}Application/SubmitOrder/${await getBrokerId()}/${applicationId}/${formId}`,
      JSON.stringify(worldPayOrder),
    );
  },

  worldPayOrderResponse: async (
    uniqueOrderCode: string,
    applicationFeeSummaryId: string,
    worldPayOrderResponse: string,
  ): Promise<ServiceHandlingInterface<void>> =>
    api.get(
      `${Config.applicationService
      }Application/WorldPayOrderResponse/${await getBrokerId()}/${uniqueOrderCode}/${applicationFeeSummaryId}${worldPayOrderResponse}`,
    ),

  isWorldPayProviderActive: (): Promise<ServiceHandlingInterface<boolean>> =>
    api.get(`${Config.applicationService}Application/IsWorldPayProviderActive`),

  saveDeclarations: async (
    applicationId: number,
    formId: number,
    documentDeclarationIds: number[],
  ): Promise<ServiceHandlingInterface<CustomerDocumentsInterface>> => {
    return api.post(
      `${Config.applicationService
      }Application/SaveDeclarationDocuments/${applicationId}/${formId}/${await getBrokerId()}`,
      JSON.stringify(documentDeclarationIds),
    );
  },
  getCaseSummary: async (
    searchText = ' ',
    pageNumber = 1,
    pageSize = 10,
    sort = 'id',
    sortOrder = 'desc',
    customerId = 0,
  ): Promise<ServiceHandlingInterface<CaseDetail[]>> =>
    api.get<CaseDetail[]>(
      `${Config.applicationService}Application/GetCaseSummary/${await getBrokerId()}/${searchText.trim().length > 0 ? searchText.trim() : ' '
      }/${pageNumber}/${pageSize}/${sort}/${sortOrder}/${customerId}`,
    ),

  getNotes: async (applicationId: number): Promise<ServiceHandlingInterface<NoteInterface[]>> =>
    api.get(`${Config.applicationService}Application/GetNotes/${await getBrokerId()}/${applicationId}`),

  saveNote: async (
    applicationId: number,
    customerId: number,
    text: string,
  ): Promise<ServiceHandlingInterface<NoteInterface>> => {
    return api.post(
      `${Config.applicationService}Application/SaveNote/${await getBrokerId()}/${applicationId}`,
      JSON.stringify({
        id: 0,
        customerId: customerId,
        text: text,
        formattedCreated: '',
        advisorId: 0,
        adminId: 0,
        adminOnly: false,
        canBeDeleted: false,
        applicationId: applicationId,
      }),
    );
  },

  cancelCase: async (applicationId: number): Promise<ServiceHandlingInterface<CaseInterface>> => {
    return api.post(
      `${Config.applicationService}Application/CancelCase/${await getBrokerId()}/${applicationId}`,
      JSON.stringify({}),
    );
  },

  getCaseTracking: async (applicationId: number): Promise<ServiceHandlingInterface<StageInterface[]>> => {
    return api.get(`${Config.applicationService}Case/GetStages/${await getBrokerId()}/${applicationId}`);
  },

  getPaidFees: async (caseId: number): Promise<ServiceHandlingInterface<FeeInterface[]>> =>
    api.get(`${Config.applicationService}Application/GetPaidFees/${await getBrokerId()}/${caseId}`),

  getEsisSummary: async (
    applicationId: number,
    formId: number,
    sort = 'description',
    sortOrder = 'Asc',
  ): Promise<ServiceHandlingInterface<EsisSummaryInterface[]>> => {
    return api.get(
      `${Config.applicationService
      }Application/GetEsisSummary/${await getBrokerId()}/${applicationId}/${formId}/${sort}/${sortOrder}`,
    );
  },
};
