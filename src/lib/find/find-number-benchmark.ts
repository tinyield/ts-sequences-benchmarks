import {AbstractFindBenchmark} from './abstract-find-benchmark';
import {getCLIArguments, getCollectionSizeLabel} from '../utils/benchmark-cli-arguments';
import {NumberDataProvider} from '../operations/data/provider/number/number-data-provider';

export class FindNumberBenchmark extends AbstractFindBenchmark<number> {
    private readonly size: number;
    private a: number[];
    private b: number[];
    private readonly provider: NumberDataProvider;

    constructor() {
        super();
        this.size = getCLIArguments().size;
        this.provider = new NumberDataProvider(this.size);
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
        this.a = this.provider.asArray();
        this.b = this.provider.asArray().map(() => -1);
    }

    update(): void {
        this.b[(this.index - 1) % this.size] = -1;
        this.b[this.index % this.size] = this.index % this.size;
    }
}
