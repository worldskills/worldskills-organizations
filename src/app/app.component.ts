import {Component, OnInit} from '@angular/core';
import {AuthService, AuthStatus} from '../services/auth/auth.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {combineLatest, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {BreadcrumbService} from '@worldskills/worldskills-angular-lib';
import {LocaleContextService} from '../services/locale-context/locale-context.service';
import {environment} from '../environments/environment';
import {ILanguageModel} from '@worldskills/worldskills-angular-lib/lib/models/ilanguage';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  static showBreadcrumbs = new Subject<boolean>();
  date;
  authStatus: AuthStatus;
  showBreadcrumb = true;
  languages: Array<ILanguageModel>;
  language: ILanguageModel;
  languageLock: boolean;
  isStaging = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private breadcrumb: BreadcrumbService,
    private translateService: TranslateService,
    private localeContextService: LocaleContextService,
  ) {
    this.date = new Date();
    this.breadcrumb.homeItemRoute = '/members';
    this.breadcrumb.targetOutlet = 'primary';
    this.breadcrumb.breadcrumbs = [];
    this.breadcrumb.build(this.route.root);
  }

  ngOnInit(): void {
    AppComponent.showBreadcrumbs.subscribe(showBreadcrumb => setTimeout(() => (this.showBreadcrumb = showBreadcrumb)));
    this.authService.authStatus.subscribe(authStatus => (this.authStatus = authStatus));
    combineLatest([
      this.authService.authStatus,
      this.router.events.pipe(filter<NavigationEnd>(event => event instanceof NavigationEnd))
    ]).subscribe(([authStatus, routerEvent]) => {
      const url = routerEvent.url;
      const queryParamMap = this.router.parseUrl(url).queryParamMap;
      const target = queryParamMap.has('returnUrl') ? queryParamMap.get('returnUrl') : undefined;
      if (url === '/' || target) {
        if (authStatus.authenticated) {
          this.router.navigate(['members']);
        } else if (!authStatus.isLoggedIn) {
          this.authService.login();
        }
      }
    });
    this.languages = this.localeContextService.languages;
    combineLatest([this.localeContextService.subject, this.localeContextService.lock])
      .subscribe(([language, lock]) =>
        setTimeout(() => {
          this.languageLock = lock;
          this.language = lock ? this.localeContextService.lockedLanguage : language;
        })
      );
    this.isStaging = !environment.production;
  }

  changeLanguage(language) {
    this.localeContextService.changeLanguage(language);
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout().subscribe({
      complete: () => {
        window.location.reload();
      }
    });
  }
}
