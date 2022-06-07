import { CountiesList } from './countie';

// eslint-disable-next-line no-unused-vars
type FnFilter = (filterAreas: [string]) => boolean;

export interface DataContextInterface {
  counties: CountiesList;
  applyFilter: FnFilter;
}
