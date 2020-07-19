import {AbstractFindBenchmark} from './abstract-find-benchmark';
import {Value} from '../operations/model/wrapper/value';
import {getCLIArguments, getCollectionSizeLabel} from '../utils/benchmark-cli-arguments';
import {NumberDataProvider} from '../operations/data/provider/number/number-data-provider';

export class FindClassBenchmark extends AbstractFindBenchmark<Value> {
    private a: Value[];
    private b: Value[];
    private readonly provider: NumberDataProvider;

    private readonly size: number;

    constructor() {
        super();
        this.size = getCLIArguments().size;
        this.provider = new NumberDataProvider(this.size);
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
        this.b = this.provider
            .asArray()
            .map(() => -1)
            .map(i => new Value(i));
    }

    update(): void {
        this.b[(this.index - 1) % this.size] = new Value(-1);
        this.b[this.index % this.size] = new Value(this.index % this.size);
    }
}
