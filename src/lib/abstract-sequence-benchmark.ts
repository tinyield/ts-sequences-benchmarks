import {SequenceBenchmark} from './benchmark';
import {getSuite, options} from './utils/benchmark-utils';
import {TinyieldOperations} from './operations/tinyield-operations';
import {Suite} from 'benchmark';
import {UnderscoreOperations} from './operations/underscore-operations';
import {LodashOperations} from './operations/lodash-operations';
import {LazyOperations} from './operations/lazy-operations';
import {IxOperations} from './operations/ix-operations';
import {TinyieldUtils} from './operations/utils/tinyield-utils';
import {IxUtils} from './operations/utils/ix-utils';
import {LazyUtils} from './operations/utils/lazy-utils';
import {UnderscoreUtils} from './operations/utils/underscore-utils';
import {LodashUtils} from './operations/utils/lodash-utils';
import {SequencyOperations} from './operations/sequency-operations';
import {SequencyUtils} from './operations/utils/sequency-utils';

export abstract class AbstractSequenceBenchmark implements SequenceBenchmark {
    protected readonly underscoreOps: UnderscoreOperations;
    protected readonly tinyieldOps: TinyieldOperations;
    protected readonly sequencyOps: SequencyOperations;
    protected readonly lodashOps: LodashOperations;
    protected readonly lazyOps: LazyOperations;
    protected readonly ixOps: IxOperations;

    protected readonly underscoreUtils: UnderscoreUtils;
    protected readonly tinyieldUtils: TinyieldUtils;
    protected readonly sequencyUtils: SequencyUtils;
    protected readonly lodashUtils: LodashUtils;
    protected readonly lazyUtils: LazyUtils;
    protected readonly ixUtils: IxUtils;

    constructor() {
        this.underscoreOps = new UnderscoreOperations();
        this.tinyieldOps = new TinyieldOperations();
        this.sequencyOps = new SequencyOperations();
        this.lodashOps = new LodashOperations();
        this.lazyOps = new LazyOperations();
        this.ixOps = new IxOperations();

        this.underscoreUtils = new UnderscoreUtils();
        this.tinyieldUtils = new TinyieldUtils();
        this.sequencyUtils = new SequencyUtils();
        this.lodashUtils = new LodashUtils();
        this.lazyUtils = new LazyUtils();
        this.ixUtils = new IxUtils();
    }

    abstract underscore(): void;

    abstract tinyield(): void;

    abstract sequency(): void;

    abstract lodash(): void;

    abstract lazy(): void;

    abstract ix(): void;

    abstract name(): string;

    run(): void {
        this.getSuite().run(options());
    }

    protected getSuite(): Suite {
        const opts = options();
        return getSuite(this.name())
            .add(UnderscoreOperations.NAME, () => this.underscore(), opts)
            .add(TinyieldOperations.NAME, () => this.tinyield(), opts)
            .add(SequencyOperations.NAME, () => this.sequency(), opts)
            .add(LodashOperations.NAME, () => this.lodash(), opts)
            .add(LazyOperations.NAME, () => this.lazy(), opts)
            .add(IxOperations.NAME, () => this.ix(), opts);
    }
}
