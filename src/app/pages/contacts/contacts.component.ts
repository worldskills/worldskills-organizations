import {Component, OnInit, ViewChild} from '@angular/core';
import { AlertService, AlertType, RxjsUtil, WsComponent, GenericUtil, NgAuthService } from '@worldskills/worldskills-angular-lib';
import {Member} from '../../../types/member';
import {MemberService} from '../../../services/member/member.service';
import {PeopleService} from '../../../services/people/people.service';
import { Person, NewPerson } from '../../../types/person';
import {Contact, ContactRequest} from '../../../types/contact';
import {NgForm} from '@angular/forms';
import {ContactsService} from '../../../services/contacts/contacts.service';
import {TranslateService} from '@ngx-translate/core';
import {DEFAULT_FETCH_PARAMS} from '../../../services/organizations/organizations.service';
import { ContactType } from 'src/types/contact-type';
import { PersonEntityRequest } from '../../../types/entity';
import { take } from 'rxjs/operators';
import { PermissionHelper } from '../../helpers/permission-helper';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent extends WsComponent implements OnInit {

  member: Member;
  people: Array<Person>;
  loading = false;
  toggleGenneralContact = false;
  toggleFinanceContact = false;
  canEdit = false;
  @ViewChild('generalForm') generalForm: NgForm;
  @ViewChild('financeForm') financeForm: NgForm;

  constructor(
    private auth: NgAuthService,
    private memberService: MemberService,
    private peopleService: PeopleService,
    private contactsService: ContactsService,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) {
    super();
    this.search = this.search.bind(this);
  }

  ngOnInit(): void {
    this.subscribe(
      this.memberService.subject.subscribe(member => {
        this.member = member;
        this.canEdit = PermissionHelper.canEditMember(this.auth.currentUser.value, member.ws_entity.id);
      }),
      this.peopleService.subject.subscribe(people => (this.people = people.people)),
      RxjsUtil.loaderSubscriber(
        this.memberService,
        this.contactsService,
      ).subscribe(loading => (this.loading = loading)),
    );
  }

  get initialized() {
    return !!this.member;
  }

  get generalContacts(): Contact[] {
    if (GenericUtil.isNullOrUndefined(this.member)) {
      return [];
    }

    if (GenericUtil.isNullOrUndefined(this.member.contacts)) {
      return [];
    }

    return this.member.contacts.filter(c => c.type === ContactType.GENERAL);
  }

  get financeContacts(): Contact[] {
    if (GenericUtil.isNullOrUndefined(this.member)) {
      return [];
    }

    if (GenericUtil.isNullOrUndefined(this.member.contacts)) {
      return [];
    }

    return this.member.contacts.filter(c => c.type === ContactType.FINANCE);
  }

  search(name: string) {
    return this.peopleService.fetch({...DEFAULT_FETCH_PARAMS, name, entity: this.member.id});
  }

  unbindContact(contact: Contact) {
    const memberId = this.member.id;
    this.translateService.get('Are you sure you want to remove the contact').subscribe(t => {
      if (confirm(t)) {
        this.contactsService.unbind(memberId, contact.id)
          .subscribe(() => {
            this.memberService.fetch(memberId);
            this.translateService.get('Removed contact').subscribe(t2 => {
              this.alertService.setAlert('removed-contact', AlertType.success, null, t2, true);
            });
          });
      }
    });
  }

  addNewPerson(data: NewPerson, type: string) {
    const contactType = type === 'general' ? ContactType.GENERAL : ContactType.FINANCE;
    // ensure the contact is ccreated against this entity
    const entity: PersonEntityRequest = {
      ws_entity: { id: this.member.ws_entity.id }
    };
    data.entities = [entity];

    this.peopleService.create(data).pipe(take(1)).subscribe(
      result => {
        console.log(result);
        this.attachContact(result.id, ContactType.GENERAL);
      },
      error => console.log(error),
      () => this.cancelNewPerson()
    );
  }

  cancelNewPerson() {
    this.toggleGenneralContact = false;
    this.toggleFinanceContact = false;
  }

  submitGeneralForm() {
    this.submitForm(this.generalForm, ContactType.GENERAL);
  }

  submitFinanceForm() {
    this.submitForm(this.financeForm, ContactType.FINANCE);
  }

  submitForm(form: NgForm, type: ContactType) {
    if (form.valid) {
      const {contact} = form.value;
      this.attachContact(contact, type);
    }
  }

  attachContact(contact: number, type: ContactType) {
    const memberId = this.member.id;
    const data: ContactRequest = {
      contact,
      type
    };
    this.contactsService.bind(memberId, data)
      .subscribe(() => {
        this.memberService.fetch(memberId);
        this.translateService.get('Added new contact').subscribe(t2 => {
          this.alertService.setAlert('add-contact', AlertType.success, null, t2, true);
        });
      });
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
