import {blackhole} from '../utils/benchmark-utils';
import {AbstractZipBenchmark} from '../zip/abstract-zip-benchmark';
import {getCollectionSizeLabel} from '../utils/benchmark-cli-arguments';

export class EveryNumberBenchmark extends AbstractZipBenchmark {
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

    zipline(): void {
        blackhole(this.ziplineOps.every<number, number>(this.ziplineUtils.getNumbers(), this.ziplineUtils.getNumbers(), (a, b) => a === b));
    }
}
