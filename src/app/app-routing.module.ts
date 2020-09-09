import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ErrorComponent} from './error/error.component';
import {MembersComponent} from './members/members.component';
import {MemberComponent} from './member/member.component';
import {MemberInfoComponent} from './member-info/member-info.component';
import {OrganizationComponent} from './organization/organization.component';
import {MembershipComponent} from './membership/membership.component';
import {ContactsComponent} from './contacts/contacts.component';
import {AddressesComponent} from './addresses/addresses.component';
import {WebsitesComponent} from './websites/websites.component';
import {PhoneNumbersComponent} from './phone-numbers/phone-numbers.component';
import {SocialMediaComponent} from './social-media/social-media.component';
import {AddMemberComponent} from './add-member/add-member.component';
import {environment} from '../environments/environment';
import {GuardService} from '@worldskills/worldskills-angular-lib';

function forAppCode(appCode: number, roles: Array<string>) {
  return roles.map(name => ({
    appCode,
    name
  }));
}

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'members/add',
        component: AddMemberComponent,
        canActivate: [GuardService],
        data: {breadcrumb: 'Add Member', roles: forAppCode(environment.worldskillsAppId, ['Admin', 'EditMember'])},
      },
      {
        path: 'members',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: MembersComponent,
          },
          {
            path: ':memberId',
            component: MemberComponent,
            canActivate: [GuardService],
            data: {breadcrumb: 'Member', roles: forAppCode(environment.worldskillsAppId, ['Admin', 'EditMember'])},
            children: [
              {
                path: '',
                pathMatch: 'full',
                component: MemberInfoComponent,
                data: {breadcrumb: 'Member info'},
              },
              {
                path: 'organization',
                component: OrganizationComponent,
                data: {breadcrumb: 'Organization'},
              },
              {
                path: 'membership',
                component: MembershipComponent,
                data: {breadcrumb: 'Membership'},
              },
              {
                path: 'contacts',
                component: ContactsComponent,
                data: {breadcrumb: 'Contacts'},
              },
              {
                path: 'addresses',
                component: AddressesComponent,
                data: {breadcrumb: 'Addresses'},
              },
              {
                path: 'websites',
                component: WebsitesComponent,
                data: {breadcrumb: 'Websites'},
              },
              {
                path: 'phone-numbers',
                component: PhoneNumbersComponent,
                data: {breadcrumb: 'Phone numbers'},
              },
              {
                path: 'social-media',
                component: SocialMediaComponent,
                data: {breadcrumb: 'Social media'},
              },
            ],
          },
        ],
      }
    ]
  },
  {
    path: 'not-authorized',
    component: ErrorComponent,
    data: {breadcrumb: 'Not authorized', error: 'Not authorized'}
  },
  {
    path: '**',
    component: ErrorComponent,
    data: {breadcrumb: 'Not found', error: 'Not found'}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
