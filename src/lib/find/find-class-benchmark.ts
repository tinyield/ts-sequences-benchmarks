import {AbstractFindBenchmark} from './abstract-find-benchmark';
import {EvenSequenceDataProvider} from '../operations/data/provider/number/even-sequence-data-provider';
import {EVEN, ODD} from '../operations/common/constants';
import {Value} from '../operations/model/wrapper/value';
import {getCLIArguments, getCollectionSizeLabel} from '../utils/benchmark-cli-arguments';

export class FindClassBenchmark extends AbstractFindBenchmark<Value> {
    private a: Value[];
    private b: Value[];
    private readonly provider: EvenSequenceDataProvider;

    private readonly size: number;

    constructor() {
        super();
        this.size = getCLIArguments().size;
        this.provider = new EvenSequenceDataProvider(this.size);
        this.reset();
    }

    name(): string {
        return `Find Class ${getCollectionSizeLabel()}`;
    }

    getPredicate(): (a: Value, b: Value) => boolean {
        return (a: Value, b: Value) => a.value === b.value;
    }

    getSourceA(): Value[] {
        return this.a;
    }

    getSourceB(): Value[] {
        return this.b;
    }

    reset(): void {
        this.a = this.provider.asArray().map(i => new Value(i));
        this.b = this.provider.asArray().map(i => new Value(i));
    }

    update(): void {
        this.b[this.index % this.size] = new Value(ODD);
        this.b[(this.index - 1) % this.size] = new Value(EVEN);
    }
}
