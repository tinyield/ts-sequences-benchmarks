import {blackhole} from '../utils/benchmark-utils';
import {getCollectionSizeLabel} from '../utils/benchmark-cli-arguments';
import {AbstractSequenceBenchmark} from '../abstract-sequence-benchmark';

export class EveryStringBenchmark extends AbstractSequenceBenchmark {
    name(): string {
        return `Every String ${getCollectionSizeLabel()}`;
    }

    ix(): void {
        blackhole(this.ixOps.every<string, string>(this.ixUtils.getStrings(), this.ixUtils.getStrings(), (a, b) => a === b));
    }

    lazy(): void {
        blackhole(this.lazyOps.every<string, string>(this.lazyUtils.getStrings(), this.lazyUtils.getStrings(), (a, b) => a === b));
    }

    lodash(): void {
        blackhole(this.lodashOps.every<string, string>(this.lodashUtils.getStrings(), this.lodashUtils.getStrings(), (a, b) => a === b));
    }

    tinyield(): void {
        blackhole(
            this.tinyieldOps.every<string, string>(this.tinyieldUtils.getStrings(), this.tinyieldUtils.getStrings(), (a, b) => a === b)
        );
    }

    sequency(): void {
        blackhole(this.sequencyOps.every(this.sequencyUtils.getStrings(), this.sequencyUtils.getStrings(), (a, b) => a === b));
    }

    underscore(): void {
        blackhole(
            this.underscoreOps.every<string, string>(
                this.underscoreUtils.getStrings(),
                this.underscoreUtils.getStrings(),
                (a, b) => a === b
            )
        );
    }
}
