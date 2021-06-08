export interface CustomerDocumentsInterface {
  canBeDeleted?: boolean;
  compressed?: boolean;
  customerId: number;
  description: string;
  docCode?: string;
  document?: Int32Array;
  formId?: number;
  id: number;
  mimeType?: string;
  typeCatagory?: string;
  typeId?: number;
  uploadedOn?: string;
}
