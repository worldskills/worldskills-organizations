import {Component, OnInit, ViewChild} from '@angular/core';
import {APIError, NgAuthService, RxjsUtil, WsComponent} from '@worldskills/worldskills-angular-lib';
import {NgForm} from '@angular/forms';
import {MemberService} from '../../../services/member/member.service';
import {CountriesService} from '../../../services/countries/countries.service';
import {CountryService} from '../../../services/country/country.service';
import {Member, MemberRequest} from '../../../types/member';
import {Country, CountryRequest} from '../../../types/country';
import {MembersService} from '../../../services/members/members.service';
import {Router} from '@angular/router';
import { Organization } from '../../../types/organization';
import { OrganizationService } from '../../../services/organization/organization.service';
import { PermissionHelper } from '../../helpers/permission-helper';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent extends WsComponent implements OnInit {

  members: Array<Member>;
  countries: Array<Country>;
  loading: boolean = false;
  existingOrg: boolean = false;
  noOrg: boolean = true;
  organizations: Organization[] = [];
  isAdmin = false;
  @ViewChild('form') form: NgForm;

  constructor(
    private auth: NgAuthService,
    private membersService: MembersService,
    private memberService: MemberService,
    private countriesService: CountriesService,
    private countryService: CountryService,
    private router: Router,
    private organizationService: OrganizationService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.membersService.subject.subscribe(members => (this.members = members.members)),
      this.countriesService.subject.subscribe(countries => (this.countries = countries.country_list)),
      RxjsUtil.loaderSubscriber(
        this.membersService,
        this.countriesService,
        this.countryService,
      ).subscribe(
        loading => {
          this.loading = loading;
          this.loadOrganizations();
        }
      ),
    );
    this.membersService.fetch({editable: true, offset: 0, limit: 9999});
    this.countriesService.fetch({offset: 0, limit: 9999});
    this.isAdmin = PermissionHelper.isAdmin(this.auth.currentUser.value);
  }

  loadOrganizations() {
    this.loading = true;
    this.organizationService.list(0, 9999, '').subscribe(
      next => {
        if (next && next.org_list) {
          this.organizations = next.org_list;
        }
      },
      error => this.loading = false,
      () => this.loading = false
    );
  }

  get initialized() {
    return !!this.members && !!this.countries;
  }

  get hasMembers() {
    return this.form &&
      this.form.value &&
      this.form.value.id &&
      this.members.find(m => m.id === parseInt(this.form.value.id)).member_of.length === 0;
  }

  checkMemberByCode(code: any, callback: (member: Member) => void) {
    if (code && code.length > 0) {
      this.memberService.getWithCode(code).subscribe(
        next => {
          callback(next);
        },
        error => callback(null)
      );
    }

  }

  submitForm() {
    if (this.form.valid) {
      const {code, name, id, status, year_joined, member_country} = this.form.value;

      const data: MemberRequest = {
        code,
        member_of: {id, status, year_joined},
        name: {lang_code: 'en', text: name},
        name_1058: {lang_code: 'en', text: name},
        organization: this.existingOrg ?  this.form.form.get('organization').value : null,
        no_org: this.noOrg
      };

      this.checkMemberByCode(code, member => {
        if (member != null) {
          alert(`A member with the code ${code} already exists`);
        } else {
          this.memberService.create(data).subscribe(
            member => {
              if (member_country) {
                // tslint:disable-next-line:no-shadowed-variable
                const country = this.countries.find(c => member_country === c.id);
                const countryData: CountryRequest = {
                  code: country.code,
                  phone_prefix: country.phone_prefix,
                  member: member.id,
                  name: country.name,
                };
                this.countryService.update(country.code, countryData).subscribe(
                  () => this.router.navigate(['members', member.id])
                );
              } else {
                this.router.navigate(['members', member.id]);
              }
            },
            error => {
              if (error.error) {
                const apiError = error.error as APIError;
                alert(apiError.dev_msg);
              } else {
                alert('An unknown error occurred');
              }
            }
          );
        }
      });
    }
  }

}
