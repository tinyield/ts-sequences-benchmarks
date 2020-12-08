import {getSuite, options} from '../utils/benchmark-utils';
import {getCLIArguments, getCollectionSizeLabel} from '../utils/benchmark-cli-arguments';
import {ARRAYS, EVEN, IX, LAZY, LODASH, ODD, SEQUENCY, TINYIELD, UNDERSCORE} from '../common/constants';
import {IterableX} from 'ix/iterable';
import * as Lazy from 'lazy.js';
import * as _ from 'lodash';
import {Query} from 'tinyield4ts';
import {asSequence} from 'sequency';
import * as __ from 'underscore';
import {Benchmark} from '../benchmark';
import {isOdd} from './is-odd';
import 'ix/add/iterable-operators/filter';
import 'ix/add/iterable-operators/first';

/**
 * FirstInBeginningBenchmark
 * Benchmarks the usage of the `findFirst()` operator.
 * The match element is found in the first element.
 * <p>
 * Pipeline:
 * Sequence.of(ODD, EVEN, ..., EVEN )
 * .filter(isOdd)
 * .findFirst()
 */
export class FirstInBeginningBenchmark implements Benchmark {
    /**
     * The size of the Sequence for this benchmark
     */
    public COLLECTION_SIZE: number;

    /**
     * The data source used to benchmark
     * This data is instantiated using the getSource method.
     */
    public data: number[];

    /**
     * Prepares an array with a single ODD element in the beginning.
     *
     * @returns {number[]} the source array for this benchmark
     */
    getSource(): number[] {
        const numbers = [];
        for (let i = 0; i < this.COLLECTION_SIZE; i++) {
            numbers.push(EVEN);
        }
        numbers[0] = ODD;
        return numbers;
    }

    /**
     * Gets a {string} stating the name of this benchmark to better identify it
     * in the benchmark logs.
     *
     * @returns {string} that identifies this benchmark
     */
    name(): string {
        return `First in the Beginning ${getCollectionSizeLabel()}`;
    }

    /**
     * Sets up the data source to be used in this benchmark
     */
    setup(): void {
        this.COLLECTION_SIZE = getCLIArguments().size;
        this.data = this.getSource();
    }

    /**
     * Searches a {@external IterableX} sequence for an odd number
     *
     * @returns {number} the first odd number in the sequence or null if none exists
     */
    ix(): number {
        return IterableX.of(...this.data)
            .filter(isOdd)
            .first();
    }

    /**
     * Searches a {@external Lazy} sequence for an odd number
     *
     * @returns {number} the first odd number in the sequence or null if none exists
     */
    lazy(): number {
        return Lazy(this.data)
            .filter(isOdd)
            .first();
    }

    /**
     * Searches a {@external _.LoDashStatic} sequence for an odd number
     *
     * @returns {number} the first odd number in the sequence or null if none exists
     */
    lodash(): number {
        return _.chain(this.data)
            .filter(isOdd)
            .first()
            .value();
    }

    /**
     * Searches a {@external Query} sequence for an odd number
     *
     * @returns {number} the first odd number in the sequence or null if none exists
     */
    tinyield(): number {
        return Query.of(this.data)
            .filter(isOdd)
            .first();
    }

    /**
     * Searches a {@external Sequence} sequence for an odd number
     *
     * @returns {number} the first odd number in the sequence or null if none exists
     */
    sequency(): number {
        return asSequence(this.data)
            .filter(isOdd)
            .first();
    }

    /**
     * Searches a {@external __.UnderscoreStatic} sequence for an odd number
     *
     * @returns {number} the first odd number in the sequence or null if none exists
     */
    underscore(): number {
        return __.chain(this.data)
            .filter(isOdd)
            .first()
            .value();
    }

    /**
     * Searches a {@external Array} sequence for an odd number
     *
     * @returns {number} the first odd number in the sequence or null if none exists
     */
    arrays(): number {
        return [...this.data].find(isOdd);
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
