import {blackhole} from '../utils/benchmark-utils';
import {AbstractSequenceBenchmark} from '../abstract-sequence-benchmark';

export class ZipTopArtistAndTrackByCountryBenchmark extends AbstractSequenceBenchmark {
    name(): string {
        return 'Distinct Top Artist and Top Track by Country Benchmark';
    }

    ix(): void {
        this.ixOps.zipTopArtistAndTrackByCountry(this.ixUtils.getArtists(), this.ixUtils.getTracks()).forEach(blackhole);
    }

    lazy(): void {
        this.lazyOps.zipTopArtistAndTrackByCountry(this.lazyUtils.getArtists(), this.lazyUtils.getTracks()).each(blackhole);
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

    sequency(): void {
        this.sequencyOps.zipTopArtistAndTrackByCountry(this.sequencyUtils.getArtists(), this.sequencyUtils.getTracks()).forEach(blackhole);
    }

    underscore(): void {
        this.underscoreOps
            .zipTopArtistAndTrackByCountry(this.underscoreUtils.getArtists(), this.underscoreUtils.getTracks())
            .forEach(blackhole)
            .value();
    }

    arrays(): void {
        this.arrayOps.zipTopArtistAndTrackByCountry(this.arrayUtils.getArtists(), this.arrayUtils.getTracks()).forEach(blackhole);
    }
}
