import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {ILanguageModel} from '@worldskills/worldskills-angular-lib/lib/models/ilanguage';

@Injectable({
  providedIn: 'root'
})
export class LocaleContextService {

  private locked: boolean;
  subject = new ReplaySubject<ILanguageModel>(1);
  lock = new ReplaySubject<boolean>(1);
  lockedLanguage: ILanguageModel;

  constructor(private translateService: TranslateService) {
    this.lock.subscribe(locked => (this.locked = locked));
    this.subject.subscribe(language => this.translateService.use(language.code));
    this.subject.next(this.defaultLanguage);
    this.lock.next(false);
  }

  changeLanguage(language: ILanguageModel) {
    this.subject.next(language);
  }

  lockLanguage(language: ILanguageModel = null) {
    if (!this.locked) {
      this.lockedLanguage = language || this.defaultLanguage;
      this.lock.next(true);
    }
  }

  unlockLanguage() {
    if (this.locked) {
      this.lock.next(false);
    }
  }

  get languages(): Array<ILanguageModel> {
    return [
      {code: 'en', name: 'English'},
      {code: 'de', name: 'Deutsch'},
      {code: 'fr', name: 'Français'},
      {code: 'nl', name: 'Nederlands'},
    ];
  }

  get defaultLanguage() {
    return this.languages[0];
  }

}
