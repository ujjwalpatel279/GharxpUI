export interface CustomerDocumentsInterface {
  canBeDeleted?: boolean;
  compressed?: boolean;
  customerId: number;
  description: string;
  docCode?: string;
  documentBinaryString?: string;
  formId?: number;
  id: number;
  mimeType?: string;
  typeCatagory?: string;
  typeId?: number;
  uploadedOn?: string;
}
