import {AbstractFindBenchmark} from './abstract-find-benchmark';
import {EvenSequenceDataProvider} from '../operations/data/provider/number/even-sequence-data-provider';
import {EVEN, ODD} from '../operations/common/constants';
import {getCLIArguments, getCollectionSizeLabel} from '../utils/benchmark-cli-arguments';
import {toArray} from '../operations/utils/zipline-utils';

export class FindStringBenchmark extends AbstractFindBenchmark<string> {
    private a: string[];
    private b: string[];
    private readonly provider: EvenSequenceDataProvider;

    private readonly size: number;

    constructor() {
        super();
        this.size = getCLIArguments().size;
        this.provider = new EvenSequenceDataProvider(this.size);
        this.reset();
    }

    name(): string {
        return `Find String ${getCollectionSizeLabel()}`;
    }

    getPredicate(): (a: string, b: string) => boolean {
        return (a: string, b: string) => a === b;
    }

    getSourceA(): string[] {
        return this.a;
    }

    getSourceB(): string[] {
        return this.b;
    }

    reset(): void {
        this.a = toArray(this.provider.asIterable()).map(i => `${i}`);
        this.b = toArray(this.provider.asIterable()).map(i => `${i}`);
    }

    update(): void {
        this.b[this.index % this.size] = `${ODD}`;
        this.b[(this.index - 1) % this.size] = `${EVEN}`;
    }
}
