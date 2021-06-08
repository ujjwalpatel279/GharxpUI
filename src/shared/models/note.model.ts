export interface NoteInterface {
  id: number;
  customerId: number;
  text: string;
  formattedCreated: string;
  advisorId?: number;
  adminId?: number;
  adminOnly?: boolean;
  canBeDeleted?: boolean;
  applicationId: number;
}
