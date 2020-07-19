import {AbstractFindBenchmark} from './abstract-find-benchmark';
import {getCLIArguments, getCollectionSizeLabel} from '../utils/benchmark-cli-arguments';
import {NumberDataProvider} from '../operations/data/provider/number/number-data-provider';

export class FindStringBenchmark extends AbstractFindBenchmark<string> {
    private a: string[];
    private b: string[];
    private readonly provider: NumberDataProvider;

    private readonly size: number;

    constructor() {
        super();
        this.size = getCLIArguments().size;
        this.provider = new NumberDataProvider(this.size);
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
        this.a = this.provider.asArray().map(i => `${i}`);
        this.b = this.provider
            .asArray()
            .map(() => -1)
            .map(i => `${i}`);
    }

    update(): void {
        this.b[(this.index - 1) % this.size] = `${-1}`;
        this.b[this.index % this.size] = `${this.index % this.size}`;
    }
}
