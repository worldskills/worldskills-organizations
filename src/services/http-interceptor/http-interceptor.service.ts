import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  AlertService,
  AlertType,
  AuthService,
  NgAuthService,
  I18nUtil,
  HttpUtil
} from '@worldskills/worldskills-angular-lib';
import { LocaleContextService } from '../locale-context/locale-context.service';
import { notLoggedInCode, authorizationMissingCode } from '../../app/app-config';
import { AppService } from '../app/app.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  private static ignoredPaths: Array<string> = [];
  private currentLanguage = 'en';
  private overrideLanguage: string = undefined;

  constructor(
    private app: AppService,
    private injector: Injector,
    private router: Router,
    private authService: AuthService,
    private ngAuthService: NgAuthService,
    private alertService: AlertService,
  ) {
    setTimeout(() => {
      this.injector.get(LocaleContextService).subject.subscribe(language => (this.currentLanguage = language.code));
      this.injector.get(LocaleContextService).override.subscribe(language => (this.overrideLanguage = language ? language.code : null));
    });
  }

  ignorePush(path: string) {
    if (!HttpInterceptorService.ignoredPaths.includes(path)) {
      HttpInterceptorService.ignoredPaths.push(path);
    }
  }

  ignorePop(path: string) {
    if (HttpInterceptorService.ignoredPaths.includes(path)) {
      HttpInterceptorService.ignoredPaths = HttpInterceptorService.ignoredPaths.filter(p => p !== path);
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const l = this.overrideLanguage ? this.overrideLanguage : this.currentLanguage;
    const isLogout = request.url.includes('logout');
    let isIgnored = false;
    if (!isLogout) {
      // determine if the current error is meant to be sup
      const suppressedError = this.app.supresseedErrors.find(x => request.url.includes(x));
      if (suppressedError) {
        // remove the supressed error from the list
        this.app.supresseedErrors = this.app.supresseedErrors.filter(x => x !== suppressedError);
        isIgnored = true;
      }
    }
    const handled = isLogout || isIgnored ? request : request.clone({
      body: request.body ? I18nUtil.setObjectI18n(request.body, l) : undefined,
      setParams: {l},
    });
    return next.handle(handled).pipe(
      catchError(err => this.interceptError(request, next, err))
    );
  }

  interceptError(request: HttpRequest<any>, next: HttpHandler, err: any) {
    if (err instanceof HttpErrorResponse) {
      // force user to the login page when not logged in or token is expired
      if (request.url.includes('auth/users/loggedIn')) {
        if (HttpUtil.isNotLoggedIn(err, notLoggedInCode) || HttpUtil.hasStaleToken(err, authorizationMissingCode)) {
          sessionStorage.clear();
          this.ngAuthService.login();
          return;
        }
      }

      switch (err.status) {
        case 400:
          // when the logout call fails, clear session then kick to login screen
          if (request.url.match('logout')) {
            sessionStorage.clear();
            this.ngAuthService.login();
            return;
          } else {
            this.alertService.setAlert(
              'request',
              AlertType.error, err.error,
              'user_msg' in err.error ? err.error.user_msg : err.message,
              true
            );
          }
          break;
        case 401:
          if (!request.url.includes('ping')) {
            if (HttpUtil.isNotLoggedIn(err, notLoggedInCode) || HttpUtil.hasStaleToken(err, authorizationMissingCode)) {
              sessionStorage.clear();
              this.ngAuthService.login();
              return;
            } else {
              this.authService.ping().subscribe();
            }
          } else {
            this.ngAuthService.login();
          }
          break;
        default:
          if (err.error && 'user_msg' in err.error) {
            this.alertService.setAlert('request', AlertType.error, err.error,
              'user_msg' in err.error ? err.error.user_msg : err.message, true);
          } else {
            this.alertService.setAlert('request', err.error, err.statusText, err.message);
          }
          break;
      }
    }

    return throwError(err);
  }
}

