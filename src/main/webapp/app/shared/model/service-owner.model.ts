import { IEnvironment } from 'app/shared/model/environment.model';

export interface IServiceOwner {
  id?: number;
  firstName?: string;
  lastName?: string;
  name?: string;
  role?: string;
  email?: string;
  contactNumber?: string;
  extension?: string | null;
  location?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  country?: string | null;
  imageContentType?: string | null;
  image?: string | null;
  environments?: IEnvironment[] | null;
}

export const defaultValue: Readonly<IServiceOwner> = {};
