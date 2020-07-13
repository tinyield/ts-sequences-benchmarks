import {getNumbers} from '../../generator/number-array-generator';
import {Query} from 'tinyield4ts';
import * as _ from 'lodash';
import * as __ from 'underscore';
import * as Lazy from 'lazy.js';
import {IterableX} from 'ix/iterable';
import 'ix/add/iterable-operators/map';
import Sequence, {asSequence, sequenceOf} from 'sequency';

export class NestedNumberDataProvider {
    protected readonly data: number[];

    constructor(size: number) {
        this.data = getNumbers(size);
    }

    asIx(): IterableX<IterableX<number>> {
        return IterableX.of(...this.data).map(elem => IterableX.of(elem));
    }

    asQuery(): Query<Query<number>> {
        return Query.of(this.data).map(elem => Query.of([elem]));
    }

    asLazy(): LazyJS.Sequence<LazyJS.Sequence<number>> {
        return Lazy(this.data).map(elem => Lazy([elem]));
    }

    asLodash(): _.CollectionChain<_.CollectionChain<number>> {
        return _.chain(this.data).map(elem => _.chain([elem]));
    }

    asUnderscore(): __._Chain<__._Chain<number, number[]>, __._Chain<number, number[]>[]> {
        return __.chain(this.data).map(elem => __.chain(elem)) as any;
    }
    asSequency(): Sequence<Sequence<number>> {
        return asSequence(this.data).map(elem => sequenceOf(elem));
    }
}
