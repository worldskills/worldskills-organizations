import {I18nModel} from '@worldskills/worldskills-angular-lib';

const langCodeNameMap: Map<string, string> = new Map<string, string>([
  ['en', 'English'],
  ['de', 'German'],
  ['fr', 'French'],
  ['pt_BR', 'Brazilian Portuguese']
]);

export function langCodeToName(langCode: string): string {
  return langCodeNameMap.has(langCode) ? langCodeNameMap.get(langCode) : langCode;
}

export function instanceOfI18nModel(object: any): object is I18nModel {
  return typeof object === 'object' && object.hasOwnProperty('lang_code') && object.hasOwnProperty('text');
}

export function setObjectI18n(object: any, langCode: string) {
  if (typeof object === 'object') {
    if (Array.isArray(object)) {
      for (let i = 0; i < object.length; i++) {
        if (instanceOfI18nModel(object[i])) {
          object[i].lang_code = langCode;
        } else {
          object[i] = setObjectI18n(object[i], langCode);
        }
      }
    } else {
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          if (instanceOfI18nModel(object[key])) {
            object[key].lang_code = langCode;
          } else {
            object[key] = setObjectI18n(object[key], langCode);
          }
        }
      }
    }
  }
  return object;
}
