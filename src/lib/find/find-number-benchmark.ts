import {AbstractFindBenchmark} from './abstract-find-benchmark';
import {EvenSequenceDataProvider} from '../operations/data/provider/number/even-sequence-data-provider';
import {EVEN, ODD} from '../operations/common/constants';
import {getCLIArguments, getCollectionSizeLabel} from '../utils/benchmark-cli-arguments';
import {toArray} from '../operations/utils/zipline-utils';

export class FindNumberBenchmark extends AbstractFindBenchmark<number> {
    private readonly size: number;
    private a: number[];
    private b: number[];
    private readonly provider: EvenSequenceDataProvider;

    constructor() {
        super();
        this.size = getCLIArguments().size;
        this.provider = new EvenSequenceDataProvider(this.size);
        this.reset();
    }

    name(): string {
        return `Find Number ${getCollectionSizeLabel()}`;
    }

    getPredicate(): (a: number, b: number) => boolean {
        return (a: number, b: number) => a === b;
    }

    getSourceA(): number[] {
        return this.a;
    }

    getSourceB(): number[] {
        return this.b;
    }

    reset(): void {
        this.a = toArray(this.provider.asIterable());
        this.b = toArray(this.provider.asIterable());
    }

    update(): void {
        this.b[this.index % this.size] = ODD;
        this.b[(this.index - 1) % this.size] = EVEN;
    }
}
