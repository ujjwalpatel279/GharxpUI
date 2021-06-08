import { FormType } from './enums';
import { Dictionary, EnumDictionary, PageDictionary } from './dictionaries';

export const workflowConstants: EnumDictionary<Dictionary<string>> = {
  [FormType.DIP]: {
    referred: 'DIP_REFERRED__WORKFLOW_TEXTS',
    successful: 'DIP_SUCCESSFUL__WORKFLOW_TEXTS',
    unsuccessful: 'DIP_UNSUCCESSFUL__WORKFLOW_TEXTS',
  },
  [FormType.Application]: {
    successful: 'APPLICATION_FORM_COMPLETED__WORKFLOW_TEXTS',
    readyToSubmit: 'APPLICATION_READY_TO_SUBMIT__WORKFLOW_TEXTS',
  },
  [FormType.Enquiry]: { successful: '[ENQUIRY-COMPLETED]__WORKFLOW_TEXTS' },
  [FormType.Illustration]: {
    successful: 'KFI_SUCCESSFUL__WORKFLOW_TEXTS',
    unsuccessful: 'KFI_UNSUCCESSFUL__WORKFLOW_TEXTS',
  },
};

export const pageContentValues: PageDictionary<Dictionary<string>> = {
  helpPage: {
    content: 'HELPTXT__HELP',
  },
};
