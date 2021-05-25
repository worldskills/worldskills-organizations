import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertService, AlertType, RxjsUtil, WsComponent} from '@worldskills/worldskills-angular-lib';
import {MemberService} from '../../../services/member/member.service';
import {Member} from '../../../types/member';
import {Address, AddressRequest} from '../../../types/address';
import {NgForm} from '@angular/forms';
import {CountriesService} from '../../../services/countries/countries.service';
import {Country} from '../../../types/country';
import {AddressesService} from '../../../services/addresses/addresses.service';
import {TranslateService} from '@ngx-translate/core';
import { AddressType } from 'src/types/address-type';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent extends WsComponent implements OnInit {

  member: Member;
  countries: Array<Country>;
  loading = false;
  editingAddress: Address = null;
  addressType = AddressType;
  addressTypes: string[];
  @ViewChild('form') form: NgForm;
  @ViewChild('editForm') editForm: NgForm;

  constructor(
    private memberService: MemberService,
    private countriesService: CountriesService,
    private addressesService: AddressesService,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.addressTypes = Object.keys(this.addressType);
    this.subscribe(
      this.memberService.subject.subscribe(member => (this.member = member)),
      this.countriesService.subject.subscribe(countries => (this.countries = countries.country_list)),
      RxjsUtil.loaderSubscriber(
        this.memberService,
        this.countriesService,
        this.addressesService,
      ).subscribe(loading => (this.loading = loading)),
    );
    this.countriesService.fetch();
  }

  get initialized() {
    return !!this.member && !!this.countries;
  }

  editAddress(address: Address) {
    this.editingAddress = address;
  }

  cancelEditAddress() {
    this.editingAddress = null;
  }

  unbindAddress(address: Address) {
    const memberId = this.member.id;
    this.translateService.get('Are you sure you want to remove the address').subscribe(t => {
      if (confirm(t)) {
        this.addressesService.unbind(memberId, address.id)
          .subscribe(() => {
            this.memberService.fetch(memberId);
            this.translateService.get('Removed address').subscribe(t2 => {
              this.alertService.setAlert('removed-address', AlertType.success, null, t2, true);
            });
          });
      }
    });
  }

  submitEditForm() {
    if (this.editForm.valid) {
      const memberId = this.member.id;
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
      this.addressesService.update(memberId, this.editingAddress.id, data)
        .subscribe(() => {
          this.editingAddress = null;
          this.memberService.fetch(memberId);
          this.translateService.get('Updated address').subscribe(t2 => {
            this.alertService.setAlert('updated-address', AlertType.success, null, t2, true);
          });
        });
    }
  }

  submitForm() {
    if (this.form.valid) {
      const memberId = this.member.id;
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
      this.addressesService.bind(memberId, data)
        .subscribe(() => {
          this.memberService.fetch(memberId);
          this.translateService.get('Added address').subscribe(t => {
            this.alertService.setAlert('added-address', AlertType.success, null, t, true);
          });
        });
    }
  }

}
