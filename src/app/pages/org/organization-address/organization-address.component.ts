import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgAuthService, AlertService, AlertType } from '@worldskills/worldskills-angular-lib';
import { PermissionHelper } from '../../../../app/helpers/permission-helper';
import { CountriesService } from '../../../../services/countries/countries.service';
import { Address, AddressRequest } from '../../../../types/address';
import { AddressType } from '../../../../types/address-type';
import { Country } from '../../../../types/country';
import { Member } from '../../../../types/member';
import { Organization, OrganizationContactList } from '../../../../types/organization';
import { OrganizationService } from '../../../../services/organization/organization.service';

@Component({
  selector: 'app-organization-address',
  templateUrl: './organization-address.component.html',
  styleUrls: ['./organization-address.component.css']
})
export class OrganizationAddressComponent implements OnInit {

  @Input() loading: boolean;
  @Input() canEdit = false;
  @Input() org: Organization;

  countries: Array<Country>;
  editingAddress: Address = null;
  addressType = AddressType;
  addressTypes: string[];
  @ViewChild('form') form: NgForm;
  @ViewChild('editForm') editForm: NgForm;

  constructor(
    private auth: NgAuthService,
    private orgService: OrganizationService,
    private countriesService: CountriesService,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) {

  }

  ngOnInit(): void {
    this.addressTypes = Object.keys(this.addressType);
    this.countriesService.getCountries({}).subscribe(countries => {
      this.countries = countries.country_list;
      this.loading = false;
    });
  }

  calculateCanEdit(member: Member)
  {
    let canEdit = PermissionHelper.canEditMember(this.auth.currentUser.value, member.ws_entity.id);
    if (!canEdit) {
      member.member_of.forEach(parent => {
        if (!canEdit) {
          canEdit = PermissionHelper.canEditMember(this.auth.currentUser.value, parent.ws_entity.id);
        }
      });
    }

    this.canEdit = canEdit;
  }

  get initialized() {
    return !!this.org && !!this.countries;
  }

  editAddress(address: Address) {
    this.editingAddress = address;
  }

  cancelEditAddress() {
    this.editingAddress = null;
  }

  unbindAddress(address: Address) {

    this.translateService.get('Are you sure you want to remove the address').subscribe(t => {
      if (confirm(t)) {
        this.orgService.deleteAddress(this.org.id, address.id).subscribe(() => {
          this.translateService.get('Removed address').subscribe(t2 => {
            this.alertService.setAlert('removed-address', AlertType.success, null, t2, true);
            window.location.reload();
          });
        });
      }
    });
  }

  submitEditForm() {
    if (this.editForm.valid) {
      const {
        city,
        country,
        line1,
        line2,
        line3,
        line4,
        zip_code,
        type,
        attention
      } = this.editForm.value;
      const data: AddressRequest = {
        city,
        country,
        line1,
        line2,
        line3,
        line4,
        zip_code,
        type,
        attention
      };
      this.orgService.updateAddress(this.org.id, this.editingAddress.id, data).subscribe(() => {
        this.editingAddress = null;
        this.translateService.get('Updated address').subscribe(t2 => {
          this.alertService.setAlert('updated-address', AlertType.success, null, t2, true);
          window.location.reload();
        });
      });

    }
  }

  submitForm() {
    if (this.form.valid) {
      const {
        city,
        country,
        line1,
        line2,
        line3,
        line4,
        zip_code,
        type,
        attention
      } = this.form.value;
      const data: AddressRequest = {
        city,
        country,
        line1,
        line2,
        line3,
        line4,
        zip_code,
        type,
        attention
      };

      this.orgService.createAddress(this.org.id, data).subscribe(
        () => {
          this.translateService.get('Added address').subscribe(t => {
            this.alertService.setAlert('added-address', AlertType.success, null, t, true);
            window.location.reload();
          });
        }
      );
    }
  }
}
