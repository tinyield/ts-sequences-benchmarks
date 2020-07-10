import {AbstractSequenceBenchmark} from '../abstract-sequence-benchmark';
import {blackhole} from '../utils/benchmark-utils';
import {getCollectionSizeLabel} from '../utils/benchmark-cli-arguments';

export class FirstInEndBenchmark extends AbstractSequenceBenchmark {
    name(): string {
        return `First in End ${getCollectionSizeLabel()}`;
    }

    ix(): void {
        blackhole(this.ixOps.first(this.ixUtils.getEvenExceptEnd()));
    }

    lazy(): void {
        blackhole(this.lazyOps.first(this.lazyUtils.getEvenExceptEnd()));
    }

    lodash(): void {
        blackhole(this.lodashOps.first(this.lodashUtils.getEvenExceptEnd()));
    }

    tinyield(): void {
        blackhole(this.tinyieldOps.first(this.tinyieldUtils.getEvenExceptEnd()));
    }

    underscore(): void {
        blackhole(this.underscoreOps.first(this.underscoreUtils.getEvenExceptEnd()));
    }
}
