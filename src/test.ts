// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import {getTestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {Observable, of} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {Pipe, PipeTransform} from '@angular/core';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false }
}
);

export class TranslateServiceStub {

  public get(key: any): any {
    return of(key);
  }

  public use(lang: string): Observable<any> {
    return of(lang);
  }
}

export const TranslateServiceTestingProvider = {provide: TranslateService, useClass: TranslateServiceStub};

@Pipe({name: 'translate'})
export class TranslationMockPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}
