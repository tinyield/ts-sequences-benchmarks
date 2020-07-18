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
        return Query.of(this.getData());
    }

    asArray(): T[] {
        return this.getData();
    }

    asIx(): IterableX<T> {
        return IterableX.of(...this.getData());
    }

    asLazy(): LazyJS.Sequence<T> {
        return Lazy(this.getData());
    }

    asLodash(): _.CollectionChain<T> {
        return _.chain(this.getData());
    }

    asUnderscore(): __._Chain<T, T[]> {
        return __.chain(this.getData());
    }

    asSequency(): Sequence<T> {
        return asSequence(this.getData());
    }

    private getData(): T[] {
        return [...this.data];
    }
}
