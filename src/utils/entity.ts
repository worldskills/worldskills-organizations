import {AuthEntity} from '../types/entity';

export function flatten<T extends { children?: Array<any> } = AuthEntity>(entities: Array<T>): Array<T> {
  return entities.reduce((acc, entity) => entity.children ? [...acc, entity, ...entity.children] : [...acc, entity], []);
}
