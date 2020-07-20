import {Query} from 'tinyield4ts';
import {CountryBasedDataProvider} from './country-based-data-provider';
import {IterableX} from 'ix/iterable';
import * as _ from 'lodash';
import * as __ from 'underscore';
import * as Lazy from 'lazy.js';
import Sequence, {asSequence} from 'sequency';

export abstract class AbstractCountryBasedDataProvider<T> implements CountryBasedDataProvider<T> {
    protected abstract readonly data: {[key: string]: T[]};

    hasDataForCountry(country: string): boolean {
        return this.data[country] !== undefined && this.data[country].length > 0;
    }

    asQuery(country: string): Query<T> {
        return Query.of(this.asArray(country));
    }

    asIterable(country: string): Iterator<T> {
        return this.asArray(country)[Symbol.iterator]();
    }

    asIx(country: string): IterableX<T> {
        return IterableX.of(...this.data[country]);
    }

    asLazy(country: string): LazyJS.Sequence<T> {
        return Lazy(this.asArray(country));
    }

    asLodash(country: string): _.CollectionChain<T> {
        return _.chain(this.asArray(country));
    }

    asUnderscore(country: string): __._Chain<T, T[]> {
        return __.chain(this.asArray(country));
    }

    asSequency(country: string): Sequence<T> {
        return asSequence(this.asArray(country));
    }

    asArray(country: string): T[] {
        return [...this.data[country]];
    }
}
