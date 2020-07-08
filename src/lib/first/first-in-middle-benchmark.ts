import {AbstractSequenceBenchmark} from '../abstract-sequence-benchmark';
import {blackhole} from '../utils/benchmark-utils';

export class FirstInMiddleBenchmark extends AbstractSequenceBenchmark {
    name(): string {
        return 'First in Middle';
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

    underscore(): void {
        blackhole(this.underscoreOps.first(this.underscoreUtils.getEvenExceptMiddle()));
    }
}
