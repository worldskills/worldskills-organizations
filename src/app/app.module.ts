import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {WorldskillsAngularLibModule, WsHttpInterceptor} from '@worldskills/worldskills-angular-lib';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {ErrorComponent} from './pages/error/error.component';
import {OAuthModule} from 'angular-oauth2-oidc';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {HttpInterceptorService} from '../services/http-interceptor/http-interceptor.service';
import {MembersComponent} from './pages/members/members.component';
import {MembersSearchFormComponent} from './members-search-form/members-search-form.component';
import {MemberComponent} from './pages/member/member.component';
import {MemberInfoComponent} from './pages/member-info/member-info.component';
import {OrganizationComponent} from './pages/organization/organization.component';
import {MembershipComponent} from './pages/membership/membership.component';
import {ContactsComponent} from './pages/contacts/contacts.component';
import {AddressesComponent} from './pages/addresses/addresses.component';
import {WebsitesComponent} from './pages/websites/websites.component';
import {PhoneNumbersComponent} from './pages/phone-numbers/phone-numbers.component';
import {SocialMediaComponent} from './pages/social-media/social-media.component';
import {PanelComponent} from './panel/panel.component';
import {PanelHeaderComponent} from './panel-header/panel-header.component';
import {PanelRowComponent} from './panel-row/panel-row.component';
import {PanelRowActionsComponent} from './panel-row-actions/panel-row-actions.component';
import {AddMemberComponent} from './pages/add-member/add-member.component';
import { MembershipSelectComponent } from './controls/membership-select/membership-select.component';
import { OrganizationsComponent } from './pages/org/organizations/organizations.component';
import { OrganizationSearchFormComponent } from './organization-search-form/organization-search-form.component';
import { OrganizationDetailComponent } from './pages/org/organization-detail/organization-detail.component';
import { OrganizationInfoComponent } from './pages/org/organization-info/organization-info.component';
import { OrganizationMembersComponent } from './pages/org/organization-members/organization-members.component';
import { OrganizationContactsComponent } from './pages/org/organization-contacts/organization-contacts.component';
import { OrganizationWebsitesComponent } from './pages/org/organization-websites/organization-websites.component';
import { OrganizationCreateComponent } from './pages/org/organization-create/organization-create.component';
import { NewPersonFormComponent } from './new-person-form/new-person-form.component';
import { OrganizationAddressComponent } from './pages/org/organization-address/organization-address.component';
import { OrganizationPhoneComponent } from './pages/org/organization-phone/organization-phone.component';
import { MemberAwardsComponent } from './pages/member-awards/member-awards.component';

export const cacheVersionn = '202308211643';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json?v=' + cacheVersionn);
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    MembersComponent,
    MembersSearchFormComponent,
    MemberComponent,
    MemberInfoComponent,
    OrganizationComponent,
    MembershipComponent,
    ContactsComponent,
    AddressesComponent,
    WebsitesComponent,
    PhoneNumbersComponent,
    SocialMediaComponent,
    PanelComponent,
    PanelHeaderComponent,
    PanelRowComponent,
    PanelRowActionsComponent,
    AddMemberComponent,
    MembershipSelectComponent,
    OrganizationsComponent,
    OrganizationSearchFormComponent,
    OrganizationDetailComponent,
    OrganizationInfoComponent,
    OrganizationMembersComponent,
    OrganizationContactsComponent,
    OrganizationWebsitesComponent,
    OrganizationCreateComponent,
    NewPersonFormComponent,
    OrganizationAddressComponent,
    OrganizationPhoneComponent,
    MemberAwardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OAuthModule.forRoot(),
    WorldskillsAngularLibModule,
    NgSelectModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: WsHttpInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
