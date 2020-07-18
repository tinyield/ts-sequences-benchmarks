import {blackhole} from '../utils/benchmark-utils';
import {getCollectionSizeLabel} from '../utils/benchmark-cli-arguments';
import {AbstractSequenceBenchmark} from '../abstract-sequence-benchmark';

export class EveryNumberBenchmark extends AbstractSequenceBenchmark {
    name(): string {
        return `Every Number ${getCollectionSizeLabel()}`;
    }

    ix(): void {
        blackhole(this.ixOps.every<number, number>(this.ixUtils.getNumbers(), this.ixUtils.getNumbers(), (a, b) => a === b));
    }

    lazy(): void {
        blackhole(this.lazyOps.every<number, number>(this.lazyUtils.getNumbers(), this.lazyUtils.getNumbers(), (a, b) => a === b));
    }

    lodash(): void {
        blackhole(this.lodashOps.every<number, number>(this.lodashUtils.getNumbers(), this.lodashUtils.getNumbers(), (a, b) => a === b));
    }

    tinyield(): void {
        blackhole(
            this.tinyieldOps.every<number, number>(this.tinyieldUtils.getNumbers(), this.tinyieldUtils.getNumbers(), (a, b) => a === b)
        );
    }

    sequency(): void {
        blackhole(this.sequencyOps.every(this.sequencyUtils.getNumbers(), this.sequencyUtils.getNumbers(), (a, b) => a === b));
    }

    underscore(): void {
        blackhole(
            this.underscoreOps.every<number, number>(
                this.underscoreUtils.getNumbers(),
                this.underscoreUtils.getNumbers(),
                (a, b) => a === b
            )
        );
    }
}
