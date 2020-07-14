import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AlertService, AlertType, AuthService} from '@worldskills/worldskills-angular-lib';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  private static ignoredPaths: Array<string> = [];

  constructor(private router: Router, private authService: AuthService, private alertService: AlertService) {
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

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap({
      error: (event: HttpErrorResponse) => {
        if (!req.url.startsWith('/assets/') && !HttpInterceptorService.ignoredPaths.includes(req.url)) {
          if (event.status === 404) {
            this.router.navigateByUrl('/not-found', {skipLocationChange: true});
          } else if (event.status === 403) {
            this.authService.login();
          } else if (event.status === 400) {
            this.alertService.setAlert('request', AlertType.error, event.error, undefined,
              'user_msg' in event.error ? event.error.user_msg : event.message, true);
          } else {
            if (event.error && 'user_msg' in event.error) {
              this.alertService.setAlert('request', AlertType.error, event.error, undefined,
                'user_msg' in event.error ? event.error.user_msg : event.message, true);
            } else {
              this.alertService.setError('request', event.error, event.statusText, event.message);
            }
          }
        }
      }
    }));
  }


}
