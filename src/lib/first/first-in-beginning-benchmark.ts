import {AbstractSequenceBenchmark} from '../abstract-sequence-benchmark';
import {blackhole} from '../utils/benchmark-utils';
import {getCollectionSizeLabel} from '../utils/benchmark-cli-arguments';

export class FirstInBeginningBenchmark extends AbstractSequenceBenchmark {
    name(): string {
        return `First in Beginning ${getCollectionSizeLabel()}`;
    }

    ix(): void {
        blackhole(this.ixOps.first(this.ixUtils.getEvenExceptStart()));
    }

    lazy(): void {
        blackhole(this.lazyOps.first(this.lazyUtils.getEvenExceptStart()));
    }

    lodash(): void {
        blackhole(this.lodashOps.first(this.lodashUtils.getEvenExceptStart()));
    }

    tinyield(): void {
        blackhole(this.tinyieldOps.first(this.tinyieldUtils.getEvenExceptStart()));
    }

    underscore(): void {
        blackhole(this.underscoreOps.first(this.underscoreUtils.getEvenExceptStart()));
    }
}
