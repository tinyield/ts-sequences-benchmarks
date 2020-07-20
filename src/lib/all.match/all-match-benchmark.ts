import {AbstractSequenceBenchmark} from '../abstract-sequence-benchmark';
import {blackhole} from '../utils/benchmark-utils';
import {getCollectionSizeLabel} from '../utils/benchmark-cli-arguments';

export class AllMatchBenchmark extends AbstractSequenceBenchmark {
    name(): string {
        return `All match ${getCollectionSizeLabel()}`;
    }

    ix(): void {
        blackhole(this.ixOps.isEveryEven(this.ixUtils.getEven()));
    }

    lazy(): void {
        blackhole(this.lazyOps.isEveryEven(this.lazyUtils.getEven()));
    }

    lodash(): void {
        blackhole(this.lodashOps.isEveryEven(this.lodashUtils.getEven()));
    }

    tinyield(): void {
        blackhole(this.tinyieldOps.isEveryEven(this.tinyieldUtils.getEven()));
    }

    sequency(): void {
        blackhole(this.sequencyOps.isEveryEven(this.sequencyUtils.getEven()));
    }

    underscore(): void {
        blackhole(this.underscoreOps.isEveryEven(this.underscoreUtils.getEven()));
    }

    arrays() {
        blackhole(this.arrayOps.isEveryEven(this.arrayUtils.getEven()));
    }
}
