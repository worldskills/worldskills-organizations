import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertService, AlertType, WsComponent} from '@worldskills/worldskills-angular-lib';
import {Member} from '../../types/member';
import {MemberService} from '../../services/member/member.service';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {Phone, PhoneRequest} from '../../types/phone';
import {NgForm} from '@angular/forms';
import {PhoneType} from '../../types/phoneType';
import {Country} from '../../types/country';
import {PhoneTypesService} from '../../services/phone-types/phone-types.service';
import {CountriesService} from '../../services/countries/countries.service';
import {TranslateService} from '@ngx-translate/core';
import {PhonesService} from '../../services/phones/phones.service';

@Component({
  selector: 'app-phone-numbers',
  templateUrl: './phone-numbers.component.html',
  styleUrls: ['./phone-numbers.component.css']
})
export class PhoneNumbersComponent extends WsComponent implements OnInit {

  member: Member;
  phoneTypes: Array<PhoneType>;
  countries: Array<Country>;
  loading = false;
  editingPhone: Phone = null;
  @ViewChild('form') form: NgForm;
  @ViewChild('editForm') editForm: NgForm;

  constructor(
    private memberService: MemberService,
    private phoneTypesService: PhoneTypesService,
    private countriesService: CountriesService,
    private phonesService: PhonesService,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.memberService.subject.subscribe(member => (this.member = member)),
      this.phoneTypesService.subject.subscribe(phoneTypes => (this.phoneTypes = phoneTypes.phone_types)),
      this.countriesService.subject.subscribe(countries => (this.countries = countries.country_list)),
      combineLatest([
        this.memberService.loading,
        this.phoneTypesService.loading,
        this.countriesService.loading,
        this.phonesService.loading,
      ]).pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading)),
    );
    this.countriesService.fetch();
    this.phoneTypesService.fetch();
  }

  get initialized() {
    return !!this.member && !!this.phoneTypes && !!this.countries;
  }

  editPhone(phone: Phone) {
    this.editingPhone = phone;
  }

  cancelEditPhone() {
    this.editingPhone = null;
  }

  unbindPhone(phone: Phone) {
    const memberId = this.member.id;
    this.translateService.get('Are you sure you want to remove the phone entry').subscribe(t => {
      if (confirm(t)) {
        this.phonesService.unbind(memberId, phone.id)
          .subscribe(() => {
            this.memberService.fetch(memberId);
            this.translateService.get('Removed phone').subscribe(t2 => {
              this.alertService.setAlert('removed-phone', AlertType.success, null, t2, true);
            });
          });
      }
    });
  }

  submitEditForm() {
    if (this.editForm.valid) {
      const memberId = this.member.id;
      const {
        country,
        phone_number,
        type,
      } = this.editForm.value;
      const data: PhoneRequest = {
        country,
        phone_number,
        type
      };
      this.phonesService.update(memberId, this.editingPhone.id, data)
        .subscribe(() => {
          this.editingPhone = null;
          this.memberService.fetch(memberId);
          this.translateService.get('Updated phone entry').subscribe(t => {
            this.alertService.setAlert('updated-phone', AlertType.success, null, t, true);
          });
        });
    }
  }

  submitForm() {
    if (this.form.valid) {
      const memberId = this.member.id;
      const {
        country,
        phone_number,
        type,
      } = this.form.value;
      const data: PhoneRequest = {
        country,
        phone_number,
        type
      };
      this.phonesService.bind(memberId, data)
        .subscribe(() => {
          this.memberService.fetch(memberId);
          this.translateService.get('Add phone entry').subscribe(t => {
            this.alertService.setAlert('bound-phone', AlertType.success, null, t, true);
          });
        });
    }
  }

  getPrefixFromForm(form: any) {
    if (form && form.value && form.value.country) {
      const prefix = this.countries.find(c => c.id === parseInt(form.value.country)).phone_prefix;
      return `+${prefix}`;
    } else {
      return null;
    }
  }

}
