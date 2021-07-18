import dayjs from 'dayjs';
import { IEnvironment } from 'app/shared/model/environment.model';
import { IBusinessUnit } from 'app/shared/model/business-unit.model';

export interface IProject {
  id?: number;
  code?: string;
  name?: string;
  detail?: string | null;
  creationDate?: string | null;
  lastUpdated?: string | null;
  environments?: IEnvironment[] | null;
  businessUnit?: IBusinessUnit | null;
}

export const defaultValue: Readonly<IProject> = {};
