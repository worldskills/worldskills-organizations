import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { OrganizationContact, OrganizationContactList } from '../../../../types/organization';
import { NgForm } from '@angular/forms';
import { Person } from '../../../../types/person';
import { OrganizationService } from '../../../../services/organization/organization.service';
import { PeopleService } from '../../../../services/people/people.service';
import { WsComponent, GenericUtil } from '@worldskills/worldskills-angular-lib';
import { DEFAULT_FETCH_PARAMS } from '../../../../services/organizations/organizations.service';
import { ContactType } from '../../../../types/contact-type';
import { ContactRequest } from '../../../../types/contact';

@Component({
  selector: 'app-organization-contacts',
  templateUrl: './organization-contacts.component.html',
  styleUrls: ['./organization-contacts.component.css']
})
export class OrganizationContactsComponent extends WsComponent implements OnInit {
  @Input() loading: boolean;
  @Input() contactList: OrganizationContactList;
  @Input() canEdit = false;
  @Output() save: EventEmitter<ContactRequest> = new EventEmitter();
  @Output() delete: EventEmitter<OrganizationContact> = new EventEmitter();

  people: Array<Person>;
  @ViewChild('generalForm') generalForm: NgForm;

  constructor(private orgs: OrganizationService, private peopleService: PeopleService) {
      super();
      this.search = this.search.bind(this);
    }

  ngOnInit(): void {
    this.subscribe(
      this.peopleService.subject.subscribe(people => (this.people = people.people)),
    );
  }

  get generalContacts(): OrganizationContact[] {
    if (GenericUtil.isNullOrUndefined(this.contactList)) {
      return [];
    }

    if (GenericUtil.isNullOrUndefined(this.contactList.contacts)) {
      return [];
    }

    return this.contactList.contacts;
  }

  // TODO: look at seperating people search into a seperate re-usable component
  search(name: string) {
    return this.peopleService.fetch({...DEFAULT_FETCH_PARAMS, name});
  }

  unbindContact(contact: OrganizationContact) {
    this.delete.emit(contact);
  }

  submitGeneralForm() {
    this.submitForm(this.generalForm, ContactType.GENERAL);
  }

  submitForm(form: NgForm, type: ContactType) {
    if (form.valid) {
      const {contact} = form.value;
      const data: ContactRequest = {
        contact,
        type
      };
      this.save.emit(data);
    }
  }

  renderContactName(person: Person) {
    let email = person.email_addresses.find(e => e.type.primary);
    if (!email) {
      email = person.email_addresses.find(e => !e.type.primary);
    }
    const emailString = email ? ` (${email.email_address})` : '';
    return `${person.first_name} ${person.last_name}${emailString}`;
  }

}
