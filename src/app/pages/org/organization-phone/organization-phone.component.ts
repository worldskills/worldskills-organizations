import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Organization } from '../../../../types/organization';
import { Phone, PhoneRequest } from '../../../../types/phone';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AlertService, AlertType } from '@worldskills/worldskills-angular-lib';
import { CountriesService } from '../../../../services/countries/countries.service';
import { PhoneTypesService } from '../../../../services/phone-types/phone-types.service';
import { Country } from '../../../../types/country';
import { PhoneType } from '../../../../types/phoneType';
import { OrganizationService } from 'src/services/organization/organization.service';
import { convertToObject } from 'typescript';

@Component({
  selector: 'app-organization-phone',
  templateUrl: './organization-phone.component.html',
  styleUrls: ['./organization-phone.component.css']
})
export class OrganizationPhoneComponent implements OnInit {

  @Input() loading: boolean;
  @Input() canEdit = false;
  @Input() org: Organization;

  phoneTypes: Array<PhoneType>;
  countries: Array<Country>;
  editingPhone: Phone = null;
  @ViewChild('form') form: NgForm;
  @ViewChild('editForm') editForm: NgForm;

  constructor(
    private orgService: OrganizationService,
    private phoneTypesService: PhoneTypesService,
    private countriesService: CountriesService,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.phoneTypesService.subject.subscribe(phoneTypes => {
      this.phoneTypes = phoneTypes.phone_types;
    });
    this.countriesService.subject.subscribe(countries => {
      this.countries = countries.country_list;
      this.loading = false;
    });
    this.phoneTypesService.fetch();
    this.countriesService.fetch();
  }

  get initialized() {
    return !!this.org && !!this.phoneTypes && !!this.countries;
  }

  editPhone(phone: Phone) {
    this.editingPhone = phone;
  }

  cancelEditPhone() {
    this.editingPhone = null;
  }

  unbindPhone(phone: Phone) {

    this.translateService.get('Are you sure you want to remove the phone entry').subscribe(t => {
      if (confirm(t)) {
        this.orgService.deletePhone(this.org.id, phone.id).subscribe(() => {
          this.translateService.get('Removed phone').subscribe(t2 => {
            this.alertService.setAlert('removed-phone', AlertType.success, null, t2, true);
            window.location.reload();
          });
        });
      }
    });
  }

  submitEditForm() {
    if (this.editForm.valid) {
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
      this.orgService.updatePhone(this.org.id, this.editingPhone.id, data).subscribe(() => {
        this.translateService.get('Updated phone entry').subscribe(t => {
          this.alertService.setAlert('updated-phone', AlertType.success, null, t, true);
          window.location.reload();
        });
      });
    }
  }

  submitForm() {
    if (this.form.valid) {

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
      this.orgService.createPhone(this.org.id, data).subscribe(() => {
        this.translateService.get('Add phone entry').subscribe(t => {
          this.alertService.setAlert('bound-phone', AlertType.success, null, t, true);
          window.location.reload();
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
