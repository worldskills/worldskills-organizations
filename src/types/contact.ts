export interface ContactRequest {
  contact: number;
}

export interface Contact {
  id: number;
  person_id: number;
  first_name: string;
  last_name: string;
  email: string;
}
