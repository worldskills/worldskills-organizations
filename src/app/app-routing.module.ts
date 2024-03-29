import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { MembersComponent } from './pages/members/members.component';
import { MemberComponent } from './pages/member/member.component';
import { MemberInfoComponent } from './pages/member-info/member-info.component';
import { OrganizationComponent } from './pages/organization/organization.component';
import { MembershipComponent } from './pages/membership/membership.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AddressesComponent } from './pages/addresses/addresses.component';
import { WebsitesComponent } from './pages/websites/websites.component';
import { PhoneNumbersComponent } from './pages/phone-numbers/phone-numbers.component';
import { SocialMediaComponent } from './pages/social-media/social-media.component';
import { AddMemberComponent } from './pages/add-member/add-member.component';
import { environment } from '../environments/environment';
import { GuardService } from '@worldskills/worldskills-angular-lib';
import { OrganizationsComponent } from './pages/org/organizations/organizations.component';
import { OrganizationDetailComponent } from './pages/org/organization-detail/organization-detail.component';
import { OrganizationCreateComponent } from './pages/org/organization-create/organization-create.component';
import { MemberAwardsComponent } from "./pages/member-awards/member-awards.component";
import { MemberStatusComponent } from './pages/member-status/member-status.component';

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
  },
  {
    path: 'organizations',
    children: [
      {
        path: '',
        pathMatch: 'full',
        data: { breadcrumb: {key: 'organizations', label: 'Organizations'}},
        component: OrganizationsComponent,
      },
      {
        path: 'add',
        component: OrganizationCreateComponent,
        canActivate: [GuardService],
        data: { breadcrumb: 'Add Organization', roles: forAppCode(environment.worldskillsAppId, ['Admin', 'EditOrganization']) },
      },
      {
        path: ':orgId',
        children: [
          {
            path: '',
            pathMatch: 'full',
            data: { breadcrumb: {key: 'organization', label: 'Organization'}},
            component: OrganizationDetailComponent,
          },
          {
            path: ':viewName',
            pathMatch: 'full',
            data: { breadcrumb: {key: 'organization', label: 'Organization'}},
            component: OrganizationDetailComponent,
          },
        ]
      }
    ]
  },
  {
    path: 'members',
    children: [
      {
        path: '',
        pathMatch: 'full',
        data: { breadcrumb: 'Members' },
        component: MembersComponent,
      },
      {
        path: 'members-status',
        pathMatch: 'full',
        data: { breadcrumb: 'Members Status' },
        component: MemberStatusComponent
      },
      {
        path: 'add',
        component: AddMemberComponent,
        canActivate: [GuardService],
        data: { breadcrumb: 'Add Member', roles: forAppCode(environment.worldskillsAppId, ['Admin', 'EditMember']) },
      },
      {
        path: ':memberId',
        component: MemberComponent,
        canActivate: [GuardService],
        data: { breadcrumb: 'Member', roles: forAppCode(environment.worldskillsAppId, ['Admin', 'EditMember']) },
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: MemberInfoComponent,
            data: { breadcrumb: 'Member info' },
          },
          {
            path: 'organization',
            component: OrganizationComponent,
            data: { breadcrumb: 'Organization' },
          },
          {
            path: 'membership',
            component: MembershipComponent,
            data: { breadcrumb: 'Membership' },
          },
          {
            path: 'contacts',
            component: ContactsComponent,
            data: { breadcrumb: 'Contacts' },
          },
          {
            path: 'addresses',
            component: AddressesComponent,
            data: { breadcrumb: 'Addresses' },
          },
          {
            path: 'websites',
            component: WebsitesComponent,
            data: { breadcrumb: 'Websites' },
          },
          {
            path: 'phone-numbers',
            component: PhoneNumbersComponent,
            data: { breadcrumb: 'Phone numbers' },
          },
          {
            path: 'social-media',
            component: SocialMediaComponent,
            data: { breadcrumb: 'Social media' },
          },
          {
            path: 'awards',
            component: MemberAwardsComponent,
            data: { breadcrumb: 'Awards and recognition' },
          },
        ],
      },
    ],
  },
  {
    path: 'not-authorized',
    component: ErrorComponent,
    data: { breadcrumb: 'Not authorized', error: 'Not authorized' }
  },
  {
    path: '**',
    component: ErrorComponent,
    data: { breadcrumb: 'Not found', error: 'Not found' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
