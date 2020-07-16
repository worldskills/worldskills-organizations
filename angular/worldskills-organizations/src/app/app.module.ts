import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
  AppConfig,
  ServiceConfig,
  WorldskillsAngularLibModule,
  WSHttpConfig,
  WsHttpInterceptor
} from '@worldskills/worldskills-angular-lib';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ErrorComponent} from './error/error.component';
import {AuthConfig, OAuthModule} from 'angular-oauth2-oidc';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {HttpInterceptorService} from '../services/http-interceptor/http-interceptor.service';
import {WsSpinnerComponent} from './ws-spinner/ws-spinner.component';
import {MembersComponent} from './members/members.component';
import {MembersSearchFormComponent} from './members-search-form/members-search-form.component';
import {MemberComponent} from './member/member.component';
import {MemberInfoComponent} from './member-info/member-info.component';
import {OrganizationComponent} from './organization/organization.component';
import {MembershipComponent} from './membership/membership.component';
import {ContactsComponent} from './contacts/contacts.component';
import {AddressesComponent} from './addresses/addresses.component';
import {WebsitesComponent} from './websites/websites.component';
import {PhoneNumbersComponent} from './phone-numbers/phone-numbers.component';
import {SocialMediaComponent} from './social-media/social-media.component';
import {PanelComponent} from './panel/panel.component';
import {PanelHeaderComponent} from './panel-header/panel-header.component';
import {PanelRowComponent} from './panel-row/panel-row.component';
import {PanelRowActionsComponent} from './panel-row-actions/panel-row-actions.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    WsSpinnerComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OAuthModule.forRoot(),
    WorldskillsAngularLibModule.forFn(mod => {
      mod.service = new ServiceConfig({
        appCode: [environment.worldskillsAppId, environment.worldskillsPeopleAppId],
        apiEndpoint: environment.worldskillsApi
      });
      mod.auth = new AuthConfig({
        loginUrl: environment.worldskillsAuthorizeUrl,
        redirectUri: environment.worldskillsAuthorizeRedirect,
        userinfoEndpoint: environment.worldskillsAuthorizeUserinfoEndpoint,
        clientId: environment.worldskillsClientId,
        requireHttps: environment.production,
        oidc: false
      });
      mod.encoder = new WSHttpConfig({
        encoderUriPatterns: [],
        authUriPatterns: environment.worldskillsAuthUriPatterns
      });
      mod.app = new AppConfig();
      return mod;
    }),
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
