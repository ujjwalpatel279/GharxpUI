import {
  HomePage,
  CasesPage,
  ApplicantsPage,
  ApplicationPage,
  LoanPurposePage,
  CasePage,
  ClientsPage,
  ProductsPage,
  LendingCriteriaPage,
  MaintenancePage,
  SettingsPage,
  HelpPage,
  CompleteCasePage,
  SubmitPage,
  WorldPayPage,
  ErrorHandling,
  ProfilePage,
  UserRegPage,
} from '../components/pages';

interface RouteInterface {
  id: string;
  component: React.FunctionComponent;
  path?: string;
  paths?: string[];
}

export const HOME: RouteInterface = {
  id: 'home',
  component: HomePage,
  path: '/',
};

export const UserReg: RouteInterface = {
  id: 'UserReg',
  component: UserRegPage,
  path: '/UserReg',
}

export const CASES: RouteInterface = {
  id: 'cases',
  component: CasesPage,
  path: '/cases',
};

export const LOANPURPOSE: RouteInterface = {
  id: 'loanpurpose',
  component: LoanPurposePage,
  path: '/cases/loan-purpose',
};

export const APPLICANTS: RouteInterface = {
  id: 'applicants',
  component: ApplicantsPage,
  path: '/cases/applicants',
};

export const APPLICATION: RouteInterface = {
  id: 'application',
  component: ApplicationPage,
  paths: [
    '/cases/application',
    '/cases/application/:caseId',
    '/cases/application/:caseId/:loanPurposeId/:formId',
    '/cases/application/:caseId/:loanPurposeId/:formId/:pageId/:sectionId',
  ],
};

export const CASE: RouteInterface = {
  id: 'case',
  component: CasePage,
  paths: ['/cases/case', '/cases/case/:caseId'],
};

export const CASEDECLARATIONS: RouteInterface = {
  id: 'casedeclarations',
  component: ApplicationPage,
  paths: ['/cases/application/:caseId/:loanPurposeId/:formId/declarations'],
};

export const FEES: RouteInterface = {
  id: 'fees',
  component: ApplicationPage,
  paths: ['/cases/application/:caseId/:loanPurposeId/:formId/Fees'],
};

export const CASEDOCUMENTS: RouteInterface = {
  id: 'casedocuments',
  component: ApplicationPage,
  paths: ['/cases/application/:caseId/:loanPurposeId/:formId/Documents'],
};

export const CASECOMPLETE: RouteInterface = {
  id: 'complete',
  component: CompleteCasePage,
  paths: ['/cases/case/:caseId/:loanPurposeId/complete'],
};

export const WORLDPAY: RouteInterface = {
  id: 'worldpay',
  component: WorldPayPage,
  paths: ['/worldpay/:uniqueOrderCode?/:applicationFeeSummaryId?'],
};

export const SUBMIT: RouteInterface = {
  id: 'submit',
  component: SubmitPage,
  paths: ['/cases/application/:caseId/:loanPurposeId/:formId/submit'],
};

export const CLIENTS: RouteInterface = {
  id: 'clients',
  component: ClientsPage,
  path: '/clients',
};

export const PRODUCTS: RouteInterface = {
  id: 'products',
  component: ProductsPage,
  path: '/products',
};

export const LENDINGCRITERIA: RouteInterface = {
  id: 'lendingcriteria',
  component: LendingCriteriaPage,
  path: '/lending-criteria',
};

export const MAINTENANCE: RouteInterface = {
  id: 'maintenance',
  component: MaintenancePage,
  path: '/maintenance',
};

export const SETTINGS: RouteInterface = {
  id: 'settings',
  component: SettingsPage,
  path: '/settings',
};

export const HELP: RouteInterface = {
  id: 'help',
  component: HelpPage,
  path: '/help',
};

export const ERRORHANDLING: RouteInterface = {
  id: 'errorHandling',
  component: ErrorHandling,
  path: '/errorHandling',
};

export const PROFILE: RouteInterface = {
  id: 'profile',
  component: ProfilePage,
  path: '/profile',
};

export const ILLUSTRATION: RouteInterface = {
  id: 'illustration',
  component: ApplicationPage,
  path: '/cases/application/:caseId/:loanPurposeId/:formId/esis',
};

export default [
  HOME,
  WORLDPAY,
  CASES,
  LOANPURPOSE,
  APPLICANTS,
  APPLICATION,
  CASEDECLARATIONS,
  CASEDOCUMENTS,
  CASECOMPLETE,
  FEES,
  SUBMIT,
  CASE,
  CLIENTS,
  PRODUCTS,
  LENDINGCRITERIA,
  MAINTENANCE,
  SETTINGS,
  HELP,
  ERRORHANDLING,
  PROFILE,
  ILLUSTRATION,
  UserReg,
];
