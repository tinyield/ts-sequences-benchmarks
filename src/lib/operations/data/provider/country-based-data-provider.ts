import {Query} from 'tinyield4ts';
import * as _ from 'lodash';
import * as __ from 'underscore';
import {IterableX} from 'ix/iterable';

export interface CountryBasedDataProvider<T> {
    hasDataForCountry(country: string): boolean;

    asLodash(country: string): _.CollectionChain<T>;
    asUnderscore(country: string): __._Chain<T, T[]>;
    asLazy(country: string): LazyJS.Sequence<T>;
    asArray(country: string): T[];
    asIx(country: string): IterableX<T>;
    asQuery(country: string): Query<T>;
}
