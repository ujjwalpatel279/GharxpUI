export interface StageComponentInterface {
  stageId: number;
  stageComponentId: number;
  statusId: number;
  name: string;
  isAllowUploadDocumentAdmin: boolean;
  isAllowUploadDocumentBroker: boolean;
  isDefault: boolean;
  createdOn: Date;
  createdBy: string;
  modifiedOn: Date;
  modifiedBy: string;
  documentId: number;
  isComplete: boolean;
  statusDescription: string;
}
