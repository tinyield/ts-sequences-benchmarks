import {getCLIArguments, getCollectionSizeLabel} from '../utils/benchmark-cli-arguments';
import {ARRAYS, EVEN, IX, LAZY, LODASH, SEQUENCY, TINYIELD, UNDERSCORE} from '../common/constants';
import {IterableX} from 'ix/iterable';
import * as Lazy from 'lazy.js';
import * as _ from 'lodash';
import {Query} from 'tinyield4ts';
import {asSequence} from 'sequency';
import * as __ from 'underscore';
import {Benchmark} from '../benchmark';
import {getSuite, options} from '../utils/benchmark-utils';
import 'ix/add/iterable-operators/every';

/**
 * Checks whether or not a number is an even value
 *
 * @param {number} value the number to check
 * @returns {boolean} true if the Integer is even, false otherwise
 */
export function isEven(value: number): boolean {
    return value % 2 === 0;
}

/**
 * AllMatchBenchmark
 * Benchmarks the `allMatch()` operation in the different sequence types.
 * <p>
 * Pipeline:
 * Sequence.of(EVEN, EVEN, ..., EVEN )
 * .allMatch(isEven)
 */
export class AllMatchBenchmark implements Benchmark {
    /**
     * The size of the Sequence for this benchmark
     */
    public COLLECTION_SIZE: number;
    /**
     * The data source used to benchmark
     * This data is instantiated using the getAllEven method.
     */
    public data: number[];

    /**
     * Gets a {string} stating the name of this benchmark to better identify it
     * in the benchmark logs.
     *
     * @returns {string} that identifies this benchmark
     */
    name(): string {
        return `All match ${getCollectionSizeLabel()}`;
    }

    /**
     * Gets an {number[]} filled with the constant EVEN and of size COLLECTION_SIZE
     *
     * @returns {number[]} of size COLLECTION_SIZE filled with the constant EVEN
     */
    public getAllEven(): number[] {
        const numbers = [];
        for (let i = 0; i < this.COLLECTION_SIZE; i++) {
            numbers.push(EVEN);
        }
        return numbers;
    }

    /**
     * Sets up the data source to be used in this benchmark
     */
    setup(): void {
        this.COLLECTION_SIZE = getCLIArguments().size;
        this.data = this.getAllEven();
    }

    /**
     * Checks if every number in a sequence is Even, using {@external IterableX}
     *
     * @returns {boolean} whether every number is even or not
     */
    ix(): boolean {
        return IterableX.of(...this.data).every(isEven);
    }

    /**
     * Checks if every number in a sequence is Even, using {@external Lazy}
     *
     * @returns {boolean} whether every number is even or not
     */
    lazy(): boolean {
        return Lazy(this.data).every(isEven);
    }

    /**
     * Checks if every number in a sequence is Even, using {@external _.LoDashStatic}
     *
     * @returns {boolean} whether every number is even or not
     */
    lodash(): boolean {
        return _.chain(this.data)
            .every(isEven)
            .value();
    }

    /**
     * Checks if every number in a sequence is Even, using {@external Query}
     *
     * @returns {boolean} whether every number is even or not
     */
    tinyield(): boolean {
        return Query.of(this.data).allMatch(isEven);
    }

    /**
     * Checks if every number in a sequence is Even, using {@external Sequence}
     *
     * @returns {boolean} whether every number is even or not
     */
    sequency(): boolean {
        return asSequence(this.data).all(isEven);
    }

    /**
     * Checks if every number in a sequence is Even, using {@external _.UnderscoreStatic}
     *
     * @returns {boolean} whether every number is even or not
     */
    underscore(): boolean {
        return __.chain(this.data)
            .every(isEven)
            .value();
    }

    /**
     * Checks if every number in a sequence is Even, using {@external Array}
     *
     * @returns {boolean} whether every number is even or not
     */
    arrays(): boolean {
        return [...this.data].every(isEven);
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
