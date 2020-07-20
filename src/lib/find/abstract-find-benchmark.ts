import {Suite} from 'benchmark';
import {IterableX} from 'ix/iterable';
import * as Lazy from 'lazy.js';
import * as _ from 'lodash';
import * as __ from 'underscore';
import {Query} from 'tinyield4ts';
import {blackhole} from '../utils/benchmark-utils';
import {asSequence} from 'sequency';
import {AbstractSequenceBenchmark} from '../abstract-sequence-benchmark';

export abstract class AbstractFindBenchmark<T> extends AbstractSequenceBenchmark {
    protected index: number;

    constructor() {
        super();
        this.index = 0;
    }

    abstract getSourceA(): T[];

    abstract getSourceB(): T[];

    abstract getPredicate(): (a: T, b: T) => boolean;

    abstract update(): void;

    reset(): void {
        this.index = 0;
    }

    iterate(): void {
        this.update();
        this.index++;
    }

    ix(): void {
        this.iterate();
        blackhole(this.ixOps.find(IterableX.of(...this.getSourceA()), IterableX.of(...this.getSourceB()), this.getPredicate()));
    }

    lazy(): void {
        this.iterate();
        blackhole(this.lazyOps.find(Lazy(this.getSourceA()), Lazy(this.getSourceB()), this.getPredicate()));
    }

    lodash(): void {
        this.iterate();
        blackhole(this.lodashOps.find(_.chain(this.getSourceA()), _.chain(this.getSourceB()), this.getPredicate()));
    }

    tinyield(): void {
        this.iterate();
        blackhole(this.tinyieldOps.find(Query.of(this.getSourceA()), Query.of(this.getSourceB()), this.getPredicate()));
    }

    sequency(): void {
        this.iterate();
        blackhole(this.sequencyOps.find(asSequence(this.getSourceA()), asSequence(this.getSourceB()), this.getPredicate()));
    }

    underscore(): void {
        this.iterate();
        blackhole(this.underscoreOps.find(__.chain(this.getSourceA()), __.chain(this.getSourceB()), this.getPredicate()));
    }

    arrays(): void {
        this.iterate();
        blackhole(this.arrayOps.find(this.getSourceA(), this.getSourceB(), this.getPredicate()));
    }

    protected getSuite(): Suite {
        return super.getSuite().on('cycle', () => this.reset());
    }
}
