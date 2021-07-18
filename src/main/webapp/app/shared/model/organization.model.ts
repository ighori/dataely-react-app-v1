import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IBusinessUnit } from 'app/shared/model/business-unit.model';

export interface IOrganization {
  id?: number;
  code?: string;
  name?: string;
  detail?: string | null;
  creationDate?: string | null;
  lastUpdated?: string | null;
  user?: IUser;
  businessUnits?: IBusinessUnit[] | null;
}

export const defaultValue: Readonly<IOrganization> = {};
