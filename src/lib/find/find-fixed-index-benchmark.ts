import {ARRAYS, IX, LAZY, LODASH, SEQUENCY, TINYIELD, UNDERSCORE} from '../common/constants';
import {getCLIArguments, getCollectionSizeLabel} from '../utils/benchmark-cli-arguments';
import {IterableX} from 'ix/iterable';
import * as Lazy from 'lazy.js';
import * as _ from 'lodash';
import {Query} from 'tinyield4ts';
import {asSequence} from 'sequency';
import * as __ from 'underscore';
import {zip} from '../common/extensions/array-extensions';
import {getSuite, options} from '../utils/benchmark-utils';
import {Benchmark} from '../benchmark';
import 'ix/add/iterable-operators/zip';
import 'ix/add/iterable-operators/map';
import 'ix/add/iterable-operators/filter';
import 'ix/add/iterable-operators/first';

/**
 * FindFixedIndexBenchmark
 * The `find` between two sequences is an operation that, based on a user defined
 * predicate, finds two elements that match, returning one of them in the process.
 * <p>
 * For this benchmark the matching element will be on a fixed index, using the
 * following criteria:
 * * For collections with more than 100 elements, the matching index will correspond
 * to COLLECTION_SIZE / 100.
 * (e.g: for a COLLECTION_SIZE of 100K the pipeline will match with the 1000th element)
 * <p>
 * * Otherwise, the matching index will correspond to COLLECTION_SIZE / 10.
 * (e.g: for a COLLECTION_SIZE of 100 elements the pipeline will match with the 10th element)
 * <p>
 * Pipeline:
 * Sequence.of(1, 2,...)
 * .zip(Sequence.of(1, 2,...), (elem1, elem2) => elem1 === elem2 ? elem1 : undefined)
 * .filter(elem => elem !== undefined)
 * .first();
 */
export class FindFixedIndexBenchmark implements Benchmark {
    /**
     * The size of the Sequence for this benchmark
     */
    public COLLECTION_SIZE: number;

    /**
     * An array containing numbers initiated with integers from 0 to COLLECTION_SIZE
     */
    public a: number[];

    /**
     * An array containing numbers initiated with -1
     */
    public b: number[];

    /**
     * Gets an {number[]} with size COLLECTION_SIZE
     *
     * @returns {number[]} of size COLLECTION_SIZE
     */
    public getNumbers(matcher = false): number[] {
        const values = [];
        for (let i = 0; i < this.COLLECTION_SIZE; i++) {
            values.push(matcher ? this.getMatchIndex() : i);
        }
        return values;
    }

    /**
     * Gets a {string} stating the name of this benchmark to better identify it
     * in the benchmark logs.
     *
     * @returns {string} that identifies this benchmark
     */
    name(): string {
        return `Find Fixed Index ${getCollectionSizeLabel()}`;
    }

    /**
     * Calculates the match index between sequences based on the COLLECTION_SIZE requested
     *
     * @returns {number} the match index
     */
    public getMatchIndex(): number {
        let matchIndex = this.COLLECTION_SIZE / 100;
        if (this.COLLECTION_SIZE < 100) {
            matchIndex = this.COLLECTION_SIZE / 10;
        }
        return matchIndex;
    }

    /**
     * Sets up the data sources to be used in this benchmark
     */
    setup() {
        this.COLLECTION_SIZE = getCLIArguments().size;
        this.a = this.getNumbers();
        this.b = this.getNumbers(true);
    }

    /**
     * Zips two sequences of {@external IterableX} together, comparing zipped element's values to let any through
     * if a match is made or null otherwise
     *
     * @returns {number} the found number if a match was found, null otherwise.
     */
    ix(): number {
        return IterableX.of(...this.a)
            .zip(IterableX.of(...this.b))
            .map(([elem1, elem2]) => (elem1 === elem2 ? elem1 : undefined))
            .filter(elem => elem !== undefined)
            .first();
    }

    /**
     * Zips two sequences of {@external Lazy} together, comparing zipped element's values to let any through
     * if a match is made or null otherwise
     *
     * @returns {number} the found number if a match was found, null otherwise.
     */
    lazy(): number {
        return (Lazy(this.a).zip(this.b) as any)
            .map(([elem1, elem2]: number[]) => (elem1 === elem2 ? elem1 : undefined))
            .filter((elem: number) => elem !== undefined)
            .first();
    }

    /**
     * Zips two sequences of {@external _.LoDashStatic} together, comparing zipped element's values to let any through
     * if a match is made or null otherwise
     *
     * @returns {number} the found number if a match was found, null otherwise.
     */
    lodash(): number {
        return _.chain(this.a)
            .zipWith(_.chain(this.b).value(), (elem1, elem2) => (elem1 === elem2 ? elem1 : undefined))
            .filter(elem => elem !== undefined)
            .first()
            .value();
    }

    /**
     * Zips two sequences of {@external Query} together, comparing zipped element's values to let any through
     * if a match is made or null otherwise
     *
     * @returns {number} the found number if a match was found, null otherwise.
     */
    tinyield(): number {
        return Query.of(this.a)
            .zip(Query.of(this.b), (elem1, elem2) => (elem1 === elem2 ? elem1 : undefined))
            .filter(elem => elem !== undefined)
            .first();
    }

    /**
     * Zips two sequences of {@external Sequence} together, comparing zipped element's values to let any through
     * if a match is made or null otherwise
     *
     * @returns {number} the found number if a match was found, null otherwise.
     */
    sequency(): number {
        return asSequence(this.a)
            .zip(asSequence(this.b))
            .map(([elem1, elem2]) => (elem1 === elem2 ? elem1 : undefined))
            .filter(elem => elem !== undefined)
            .first();
    }

    /**
     * Zips two sequences of {@external __.UnderscoreStatic} together, comparing zipped element's values to let any through
     * if a match is made or null otherwise
     *
     * @returns {number} the found number if a match was found, null otherwise.
     */
    underscore(): number {
        return (__.chain(this.a).zip(__.chain(this.b).value()) as any)
            .map(([elem1, elem2]: number[]) => (elem1 === elem2 ? elem1 : undefined))
            .filter((elem: number) => elem !== undefined)
            .first()
            .value();
    }

    /**
     * Zips two sequences of {@external Array} together, comparing zipped element's values to let any through
     * if a match is made or null otherwise
     *
     * @returns {number} the found number if a match was found, null otherwise.
     */
    arrays(): number {
        return zip([...this.a], [...this.b])
            .map(pair => (pair.left === pair.right ? pair.left : undefined))
            .find(elem => elem !== undefined);
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
