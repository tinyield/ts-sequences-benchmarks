import {blackhole} from '../utils/benchmark-utils';
import {AbstractZipBenchmark} from '../zip/abstract-zip-benchmark';

export class EveryStringBenchmark extends AbstractZipBenchmark {
    name(): string {
        return 'Every String';
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

    underscore(): void {
        blackhole(
            this.underscoreOps.every<string, string>(
                this.underscoreUtils.getStrings(),
                this.underscoreUtils.getStrings(),
                (a, b) => a === b
            )
        );
    }

    zipline(): void {
        blackhole(this.ziplineOps.every<string, string>(this.ziplineUtils.getStrings(), this.ziplineUtils.getStrings(), (a, b) => a === b));
    }
}
