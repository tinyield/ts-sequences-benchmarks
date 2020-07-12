import {AbstractFindBenchmark} from './abstract-find-benchmark';
import {EvenSequenceDataProvider} from '../operations/data/provider/number/even-sequence-data-provider';
import {ODD} from '../operations/common/constants';
import {getCLIArguments, getCollectionSizeLabel} from '../utils/benchmark-cli-arguments';
import {toArray} from '../operations/utils/zipline-utils';

export class FindFixedIndexBenchmark extends AbstractFindBenchmark<number> {
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
        return `Find Fixed Index ${getCollectionSizeLabel()}`;
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
        this.b[this.getMatchIndex()] = ODD;
    }

    update(): void {
        // do nothing
    }

    private getMatchIndex(): number {
        let matchIndex = this.size / 100;
        if (this.size < 100) {
            matchIndex = this.size / 10;
        }
        return matchIndex;
    }
}
