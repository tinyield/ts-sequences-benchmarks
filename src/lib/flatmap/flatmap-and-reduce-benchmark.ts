import {getSuite, options} from '../utils/benchmark-utils';
import {getCLIArguments, getCollectionSizeLabel} from '../utils/benchmark-cli-arguments';
import {IterableX} from 'ix/iterable';
import * as Lazy from 'lazy.js';
import * as _ from 'lodash';
import {Query} from 'tinyield4ts';
import {asSequence} from 'sequency';
import * as __ from 'underscore';

import 'ix/add/iterable-operators/flatmap';
import 'ix/add/iterable-operators/reduce';
import {ARRAYS, IX, LAZY, LODASH, SEQUENCY, TINYIELD, UNDERSCORE} from '../common/constants';
import {Benchmark} from '../benchmark';

export class FlatmapAndReduceBenchmark implements Benchmark {
    /**
     * The size of the Sequence for this benchmark
     */
    public COLLECTION_SIZE: number;
    /**
     * The data source used to benchmark
     * This data is instantiated using the getAllEven method.
     */
    public data: number[][];

    /**
     * Gets a {string} stating the name of this benchmark to better identify it
     * in the benchmark logs.
     *
     * @returns {string} that identifies this benchmark
     */
    name(): string {
        return `Flatmap and Reduce ${getCollectionSizeLabel()}`;
    }

    /**
     * Creates a nested array of a single number each
     *
     * @returns {number[][]} the nested numbers array
     */
    getNestedNumbers(): number[][] {
        const numbers = [];
        for (let i = 0; i < this.COLLECTION_SIZE; i++) {
            numbers.push([i]);
        }
        return numbers;
    }

    /**
     * Creates a nested sequence mapped by two mappers, one for the inner sequence and one for the outer sequence
     *
     * @param {(n: number[]) => T} toSequence the mapper to create the inner sequence out of a {number[]}
     * @param {(n: T[]) => U} toNestedSequence the mapper to create the outer sequence out of a T[]
     * @returns {U}
     */
    getNestedSequence<T, U>(toSequence: (n: number[]) => T, toNestedSequence: (n: T[]) => U): U {
        return toNestedSequence(this.data.map(toSequence));
    }

    /**
     * Sets up the data source to be used in this benchmark
     */
    setup(): void {
        this.COLLECTION_SIZE = getCLIArguments().size;
        this.data = this.getNestedNumbers();
    }

    /**
     * Maps the nested {@external IterableX} sequence into a number {@external IterableX} and reduces it
     * by summing all values.
     *
     * @returns {number} the sum of all values
     */
    ix(): number {
        return this.getNestedSequence(
            n => IterableX.of(...n),
            n => IterableX.of(...n)
        )
            .flatMap(i => i)
            .reduce((acc, curr) => acc + curr);
    }

    /**
     * Maps the nested {@external Lazy} sequence into a number {@external Lazy} and reduces it
     * by summing all values.
     *
     * @returns {number} the sum of all values
     */
    lazy(): number {
        return this.getNestedSequence(Lazy, Lazy)
            .flatten()
            .reduce((acc, curr) => acc + curr);
    }

    /**
     * Maps the nested {@external _.LoDashStatic} sequence into a number {@external _.LoDashStatic} and reduces it
     * by summing all values.
     *
     * @returns {number} the sum of all values
     */
    lodash(): number {
        return this.getNestedSequence(
            n => _.chain(n),
            n => _.chain(n)
        )
            .flatMap(i => i.value())
            .reduce((acc, curr) => acc + curr)
            .value();
    }

    /**
     * Maps the nested {@external Query} sequence into a number {@external Query} and reduces it
     * by summing all values.
     *
     * @returns {number} the sum of all values
     */
    tinyield(): number {
        return this.getNestedSequence(Query.of, Query.of)
            .flatMap(i => i)
            .reduce((acc, curr) => acc + curr);
    }

    /**
     * Maps the nested {@external Sequence} sequence into a number {@external Sequence} and reduces it
     * by summing all values.
     *
     * @returns {number} the sum of all values
     */
    sequency(): number {
        return this.getNestedSequence(asSequence, asSequence)
            .flatMap(i => i)
            .reduce((acc, curr) => acc + curr);
    }

    /**
     * Maps the nested {@external _.UnderscoreStatic} sequence into a number {@external _.UnderscoreStatic} and reduces it
     * by summing all values.
     *
     * @returns {number} the sum of all values
     */
    underscore(): number {
        return this.getNestedSequence(
            n => __.chain(n),
            n => __.chain(n)
        )
            .flatten()
            .map(i => i.value())
            .flatten()
            .reduce<number>((acc, curr) => acc + curr)
            .value();
    }

    /**
     * Maps the nested {@external Array} sequence into a number {@external Array} and reduces it
     * by summing all values.
     *
     * @returns {number} the sum of all values
     */
    arrays(): number {
        return this.getNestedSequence(
            n => [...n],
            n => [...n]
        )
            .flatMap(i => i)
            .reduce((acc, curr) => acc + curr);
    }

    run(): void {
        this.setup();
        const opts = options();
        getSuite(this.name())
            .add(UNDERSCORE, () => this.underscore(), opts)
            .add(TINYIELD, () => this.tinyield(), opts)
            .add(SEQUENCY, () => this.sequency(), opts)
            .add(LODASH, () => this.lodash(), opts)
            .add(ARRAYS, () => this.arrays(), opts)
            .add(LAZY, () => this.lazy(), opts)
            .add(IX, () => this.ix(), opts)
            .run(options());
    }
}
