import {Query} from 'tinyield4ts';
import {IterableX} from 'ix/iterable';
import * as _ from 'lodash';
import * as __ from 'underscore';

export interface SequenceDataProvider<T> {
    asLodash(): _.CollectionChain<T>;

    asUnderscore(): __._Chain<T, T[]>;

    asLazy(): LazyJS.Sequence<T>;

    asIterable(): Iterator<T>;

    asIx(): IterableX<T>;

    asQuery(): Query<T>;
}
