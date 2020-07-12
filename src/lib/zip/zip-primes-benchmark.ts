import {AbstractZipBenchmark} from './abstract-zip-benchmark';
import {blackhole} from '../utils/benchmark-utils';
import {getCollectionSizeLabel} from '../utils/benchmark-cli-arguments';
import {forEach} from '../operations/utils/zipline-utils';

export class ZipPrimesBenchmark extends AbstractZipBenchmark {
    name(): string {
        return `Zip Primes with Values ${getCollectionSizeLabel()}`;
    }

    ix(): void {
        this.ixOps.zipPrimeWithValue(this.ixUtils.getNumbers(), this.ixUtils.getValues()).forEach(blackhole);
    }

    lazy(): void {
        this.lazyOps.zipPrimeWithValue(this.lazyUtils.getNumbers(), this.lazyUtils.getValues()).each(blackhole);
    }

    lodash(): void {
        this.lodashOps
            .zipPrimeWithValue(this.lodashUtils.getNumbers(), this.lodashUtils.getValues())
            .forEach(blackhole)
            .value();
    }

    tinyield(): void {
        this.tinyieldOps.zipPrimeWithValue(this.tinyieldUtils.getNumbers(), this.tinyieldUtils.getValues()).forEach(blackhole);
    }

    underscore(): void {
        this.underscoreOps
            .zipPrimeWithValue(this.underscoreUtils.getNumbers(), this.underscoreUtils.getValues())
            .forEach(blackhole)
            .value();
    }

    zipline(): void {
        forEach(this.ziplineOps.zipPrimeWithValue(this.ziplineUtils.getNumbers(), this.ziplineUtils.getValues()), blackhole);
    }
}
