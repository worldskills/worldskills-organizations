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
import {OrganizationsComponent} from './organizations/organizations.component';
import {WsSpinnerComponent} from './ws-spinner/ws-spinner.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    OrganizationsComponent,
    WsSpinnerComponent,
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
