import {SequenceDataProvider} from './sequence-data-provider';
import {Query} from 'tinyield4ts';
import {IterableX} from 'ix/iterable';
import * as Lazy from 'lazy.js';
import * as _ from 'lodash';
import * as __ from 'underscore';
import Sequence, {asSequence} from 'sequency';

export abstract class AbstractBaseDataProvider<T> implements SequenceDataProvider<T> {
    protected abstract readonly data: T[];

    asQuery(): Query<T> {
        return Query.of(this.asArray());
    }

    asIterable(): Iterator<T> {
        return this.asArray()[Symbol.iterator]();
    }

    asIx(): IterableX<T> {
        return IterableX.of(...this.asArray());
    }

    asLazy(): LazyJS.Sequence<T> {
        return Lazy(this.asArray());
    }

    asLodash(): _.CollectionChain<T> {
        return _.chain(this.asArray());
    }

    asUnderscore(): __._Chain<T, T[]> {
        return __.chain(this.asArray());
    }

    asSequency(): Sequence<T> {
        return asSequence(this.asArray());
    }

    asArray(): T[] {
        return [...this.data];
    }
}
