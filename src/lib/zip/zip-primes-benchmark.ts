import {blackhole, getSuite, options} from '../utils/benchmark-utils';
import {IterableX} from 'ix/iterable';
import {Pair} from '../common/model/pair';
import 'ix/add/iterable-operators/map';
import 'ix/add/iterable-operators/some';
import 'ix/add/iterable-operators/filter';
import 'ix/add/iterable-operators/zip';
import * as _ from 'lodash';
import * as __ from 'underscore';
import {Query} from 'tinyield4ts';
import * as Lazy from 'lazy.js';
import Sequence, {asSequence} from 'sequency';
import {ARRAYS, IX, LAZY, LODASH, SEQUENCY, TINYIELD, UNDERSCORE} from '../common/constants';
import {Value} from '../common/model/wrapper/value';
import {getCLIArguments, getCollectionSizeLabel} from '../utils/benchmark-cli-arguments';
import {Benchmark} from '../benchmark';
import {zip} from '../common/extensions/array-extensions';

export function isPrime(value: number): boolean {
    if (value <= 1) {
        return false;
    }
    if (value <= 3) {
        return true;
    }
    if (value % 2 === 0) {
        return false;
    }
    let i = 3;
    while (i * i <= value) {
        if (value % i === 0) {
            return false;
        }
        i += 2;
    }
    return true;
}

/**
 * ZipPrimesBenchmark
 * Benchmarks zipping a sequence of prime numbers with instances of the class Value.
 * <p>
 * Pipeline:
 * Sequence.of(1, 2, ..., n)
 * .filter(isPrime)
 * .zip(Sequence.of(new Value(1), new Value(2), ..., new Value(n)), Pair.with)
 * .forEach(bh.consume)
 */
export class ZipPrimesBenchmark implements Benchmark {
    /**
     * The size of the Sequence for this benchmark
     */
    public COLLECTION_SIZE: number;
    /**
     * The numbers data source used to benchmark
     * This data is instantiated using the getNumbers method.
     */
    public numbers: number[];

    /**
     * The values data source used to benchmark
     * This data is instantiated using the getNumbers method and mapping the numbers to Values.
     */
    public values: Value[];

    /**
     * Gets an {number[]} with size COLLECTION_SIZE
     *
     * @returns {number[]} of size COLLECTION_SIZE
     */
    getNumbers(): number[] {
        const numbers = [];
        for (let i = 0; i < this.COLLECTION_SIZE; i++) {
            numbers.push(i);
        }
        return numbers;
    }

    /**
     * Sets up the data sources to be used in this benchmark
     */
    setup(): void {
        this.COLLECTION_SIZE = getCLIArguments().size;
        this.numbers = this.getNumbers();
        this.values = this.getNumbers().map(i => new Value(i));
    }

    /**
     * Gets a {string} stating the name of this benchmark to better identify it
     * in the benchmark logs.
     *
     * @returns {string} that identifies this benchmark
     */
    name(): string {
        return `Zip Primes with Values ${getCollectionSizeLabel()}`;
    }

    /**
     * Filters the prime numbers {@external IterableX} from the numbers and then zips the resulting {@external IterableX}
     * sequence with the values
     *
     * @return a {@external IterableX} sequence of Pairs between prime numbers and values
     */
    ixPipeline(): IterableX<Pair<number, Value>> {
        return IterableX.of(...this.numbers)
            .filter(isPrime)
            .zip(IterableX.of(...this.values))
            .map(([elem1, elem2]) => new Pair(elem1, elem2));
    }

    /**
     * Filters the prime numbers {@external LazyJS.Sequence} from the numbers and then zips the resulting {@external LazyJS.Sequence}
     * sequence with the values
     *
     * @return a {@external LazyJS.Sequence} sequence of Pairs between prime numbers and values
     */
    lazyPipeline(): LazyJS.Sequence<Pair<number, Value>> {
        return (Lazy(this.numbers)
            .filter(isPrime)
            .zip(Lazy(this.values).toArray() as any) as any)
            .filter(([elem1, elem2]: any[]) => elem1 !== undefined && elem2 !== undefined)
            .map(([elem1, elem2]: any[]) => Pair.with(elem1, elem2));
    }

    /**
     * Filters the prime numbers {@external _.CollectionChain} from the numbers and then zips the resulting {@external _.CollectionChain}
     * sequence with the values
     *
     * @return a {@external _.CollectionChain} sequence of Pairs between prime numbers and values
     */
    lodashPipeline(): _.CollectionChain<Pair<number, Value>> {
        return _.chain(this.numbers)
            .filter(isPrime)
            .zip(_.chain(this.values).value())
            .filter(([elem1, elem2]: any[]) => elem1 !== undefined && elem2 !== undefined)
            .map(([elem1, elem2]: any[]) => Pair.with(elem1, elem2));
    }

    /**
     * Filters the prime numbers {@external Query} from the numbers and then zips the resulting {@external Query}
     * sequence with the values
     *
     * @return a {@external Query} sequence of Pairs between prime numbers and values
     */
    tinyieldPipeline(): Query<Pair<number, Value>> {
        return Query.of(this.numbers)
            .filter(isPrime)
            .zip(Query.of(this.values), (elem1, elem2) => new Pair(elem1, elem2));
    }

    /**
     * Filters the prime numbers {@external Sequence} from the numbers and then zips the resulting {@external Sequence}
     * sequence with the values
     *
     * @return a {@external Sequence} sequence of Pairs between prime numbers and values
     */
    sequencyPipeline(): Sequence<Pair<number, Value>> {
        return asSequence(this.numbers)
            .filter(isPrime)
            .zip(asSequence(this.values))
            .map(([elem1, elem2]) => new Pair(elem1, elem2));
    }

    /**
     * Filters the prime numbers {@external __._Chain} from the numbers and then zips the resulting {@external __._Chain}
     * sequence with the values
     *
     * @return a {@external __._Chain} sequence of Pairs between prime numbers and values
     */
    underscorePipeline(): __._Chain<Pair<number, Value>, Pair<number, Value>[]> {
        return (__.chain(this.numbers)
            .filter(isPrime)
            .zip(__.chain(this.values).value()) as any)
            .filter(([elem1, elem2]: any[]) => elem1 !== undefined && elem2 !== undefined)
            .map(([elem1, elem2]: any[]) => Pair.with(elem1, elem2));
    }

    /**
     * Filters the prime numbers {@external Array} from the numbers and then zips the resulting {@external Array}
     * sequence with the values
     *
     * @return a {@external Array} sequence of Pairs between prime numbers and values
     */
    arraysPipeline(): Pair<number, Value>[] {
        return zip([...this.numbers].filter(isPrime), [...this.values]);
    }

    /**
     * Runs this benchmark using {@link IterableX}s in it's pipeline using a blackhole to evaluate traversal performance
     */
    ix(): void {
        this.ixPipeline().forEach(blackhole);
    }

    /**
     * Runs this benchmark using {@link LazyJS.Sequence}s in it's pipeline using a blackhole to evaluate traversal performance
     */
    lazy(): void {
        this.lazyPipeline().each(blackhole);
    }

    /**
     * Runs this benchmark using {@link _.CollectionChain}s in it's pipeline using a blackhole to evaluate traversal performance
     */
    lodash(): void {
        this.lodashPipeline()
            .forEach(blackhole)
            .value();
    }

    /**
     * Runs this benchmark using {@link Query}s in it's pipeline using a blackhole to evaluate traversal performance
     */
    tinyield(): void {
        this.tinyieldPipeline().forEach(blackhole);
    }

    /**
     * Runs this benchmark using {@link Sequence}s in it's pipeline using a blackhole to evaluate traversal performance
     */
    sequency(): void {
        this.sequencyPipeline().forEach(blackhole);
    }

    /**
     * Runs this benchmark using {@link __._Chain}s in it's pipeline using a blackhole to evaluate traversal performance
     */
    underscore(): void {
        this.underscorePipeline()
            .forEach(blackhole)
            .value();
    }

    /**
     * Runs this benchmark using {@link Array}s in it's pipeline using a blackhole to evaluate traversal performance
     */
    arrays(): void {
        this.arraysPipeline().forEach(blackhole);
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
