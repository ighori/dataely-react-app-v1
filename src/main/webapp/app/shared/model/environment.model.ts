import dayjs from 'dayjs';
import { IServiceOwner } from 'app/shared/model/service-owner.model';
import { IProject } from 'app/shared/model/project.model';
import { EAppType } from 'app/shared/model/enumerations/e-app-type.model';
import { EEnvType } from 'app/shared/model/enumerations/e-env-type.model';
import { EEnvPurpose } from 'app/shared/model/enumerations/e-env-purpose.model';

export interface IEnvironment {
  id?: number;
  code?: string;
  name?: string;
  detail?: string | null;
  appType?: EAppType;
  type?: EEnvType;
  purpose?: EEnvPurpose;
  creationDate?: string | null;
  lastUpdated?: string | null;
  serviceOwner?: IServiceOwner | null;
  project?: IProject | null;
}

export const defaultValue: Readonly<IEnvironment> = {};
