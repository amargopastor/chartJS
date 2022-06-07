export interface Countie {
    value: string;
    label: string;
    active: boolean;
    male: string;
    female: string;
    all: string;
  }

export interface CountiesList extends Array<Countie>{}
