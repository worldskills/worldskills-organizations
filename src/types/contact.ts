import { ContactType } from './contact-type';
export interface ContactRequest {
  contact: number;
  type: ContactType;
}

export interface Contact {
  id: number;
  person_id: number;
  first_name: string;
  last_name: string;
  email: string;
  type: ContactType;
}
