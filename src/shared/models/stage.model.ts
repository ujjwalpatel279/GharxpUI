import { StageComponentInterface } from './stage-component.model';
export interface StageInterface {
  createdBy: string;
  createdOn: Date;
  icon: string;
  isDefault: boolean;
  modifiedBy: string;
  modifiedOn: Date;
  name: string;
  stageId: number;
  components: StageComponentInterface[];
}
