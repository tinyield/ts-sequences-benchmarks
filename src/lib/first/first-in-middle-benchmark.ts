import {AbstractSequenceBenchmark} from '../abstract-sequence-benchmark';
import {blackhole} from '../utils/benchmark-utils';
import {getCollectionSizeLabel} from '../utils/benchmark-cli-arguments';

export class FirstInMiddleBenchmark extends AbstractSequenceBenchmark {
    name(): string {
        return `First in Middle ${getCollectionSizeLabel()}`;
    }

    ix(): void {
        blackhole(this.ixOps.first(this.ixUtils.getEvenExceptMiddle()));
    }

    lazy(): void {
        blackhole(this.lazyOps.first(this.lazyUtils.getEvenExceptMiddle()));
    }

    lodash(): void {
        blackhole(this.lodashOps.first(this.lodashUtils.getEvenExceptMiddle()));
    }

    tinyield(): void {
        blackhole(this.tinyieldOps.first(this.tinyieldUtils.getEvenExceptMiddle()));
    }

    sequency(): void {
        blackhole(this.sequencyOps.first(this.sequencyUtils.getEvenExceptMiddle()));
    }

    underscore(): void {
        blackhole(this.underscoreOps.first(this.underscoreUtils.getEvenExceptMiddle()));
    }

    arrays(): void {
        blackhole(this.arrayOps.first(this.arrayUtils.getEvenExceptMiddle()));
    }
}
