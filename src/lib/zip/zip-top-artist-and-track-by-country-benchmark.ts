import {AbstractZipBenchmark} from './abstract-zip-benchmark';
import {blackhole} from '../utils/benchmark-utils';

export class ZipTopArtistAndTrackByCountryBenchmark extends AbstractZipBenchmark {
    name(): string {
        return 'Distinct Top Artist and Top Track by Country Benchmark';
    }

    ix(): void {
        this.ixOps.zipTopArtistAndTrackByCountry(this.ixUtils.getArtists(), this.ixUtils.getTracks()).forEach(blackhole);
    }

    lazy(): void {
        this.lazyOps
            .zipTopArtistAndTrackByCountry(this.lazyUtils.getArtists(), this.lazyUtils.getTracks())
            .toArray()
            .forEach(blackhole);
    }

    lodash(): void {
        this.lodashOps
            .zipTopArtistAndTrackByCountry(this.lodashUtils.getArtists(), this.lodashUtils.getTracks())
            .forEach(blackhole)
            .value();
    }

    tinyield(): void {
        this.tinyieldOps.zipTopArtistAndTrackByCountry(this.tinyieldUtils.getArtists(), this.tinyieldUtils.getTracks()).forEach(blackhole);
    }

    underscore(): void {
        this.underscoreOps
            .zipTopArtistAndTrackByCountry(this.underscoreUtils.getArtists(), this.underscoreUtils.getTracks())
            .forEach(blackhole)
            .value();
    }

    zipline(): void {
        this.ziplineOps.zipTopArtistAndTrackByCountry(this.ziplineUtils.getArtists(), this.ziplineUtils.getTracks()).forEach(blackhole);
    }
}
