import dayjs from 'dayjs';
import { IProject } from 'app/shared/model/project.model';
import { IOrganization } from 'app/shared/model/organization.model';

export interface IBusinessUnit {
  id?: number;
  code?: string;
  name?: string;
  detail?: string | null;
  creationDate?: string | null;
  lastUpdated?: string | null;
  projects?: IProject[] | null;
  organization?: IOrganization | null;
}

export const defaultValue: Readonly<IBusinessUnit> = {};
