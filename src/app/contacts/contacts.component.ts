import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertService, AlertType, RxjsUtil, WsComponent} from '@worldskills/worldskills-angular-lib';
import {Member} from '../../types/member';
import {MemberService} from '../../services/member/member.service';
import {PeopleService} from '../../services/people/people.service';
import {Person} from '../../types/person';
import {Contact, ContactRequest} from '../../types/contact';
import {NgForm} from '@angular/forms';
import {ContactsService} from '../../services/contacts/contacts.service';
import {TranslateService} from '@ngx-translate/core';
import {DEFAULT_FETCH_PARAMS} from '../../services/organizations/organizations.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent extends WsComponent implements OnInit {

  member: Member;
  people: Array<Person>;
  loading = false;
  @ViewChild('form') form: NgForm;

  constructor(
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
      this.memberService.subject.subscribe(member => (this.member = member)),
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

  submitForm() {
    if (this.form.valid) {
      const memberId = this.member.id;
      const {contact} = this.form.value;
      const data: ContactRequest = {
        contact,
      };
      this.contactsService.bind(memberId, data)
        .subscribe(() => {
          this.memberService.fetch(memberId);
          this.translateService.get('Added new contact').subscribe(t2 => {
            this.alertService.setAlert('add-contact', AlertType.success, null, t2, true);
          });
        });
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
