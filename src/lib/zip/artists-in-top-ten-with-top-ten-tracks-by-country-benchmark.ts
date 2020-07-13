import {AbstractZipBenchmark} from './abstract-zip-benchmark';
import {blackhole} from '../utils/benchmark-utils';
import {forEach} from '../operations/utils/zipline-utils';

export class ArtistsInTopTenWithTopTenTracksByCountryBenchmark extends AbstractZipBenchmark {
    name(): string {
        return 'Artists who are in a Country\'s top ten who also have Tracks in the same Country\'s top ten Benchmark';
    }

    ix(): void {
        this.ixOps.artistsInTopTenWithTopTenTracksByCountry(this.ixUtils.getArtists(), this.ixUtils.getTracks()).forEach(blackhole);
    }

    lazy(): void {
        this.lazyOps.artistsInTopTenWithTopTenTracksByCountry(this.lazyUtils.getArtists(), this.lazyUtils.getTracks()).each(blackhole);
    }

    lodash(): void {
        this.lodashOps
            .artistsInTopTenWithTopTenTracksByCountry(this.lodashUtils.getArtists(), this.lodashUtils.getTracks())
            .forEach(blackhole)
            .value();
    }

    tinyield(): void {
        this.tinyieldOps
            .artistsInTopTenWithTopTenTracksByCountry(this.tinyieldUtils.getArtists(), this.tinyieldUtils.getTracks())
            .forEach(blackhole);
    }

    sequency(): void {
        this.sequencyOps
            .artistsInTopTenWithTopTenTracksByCountry(this.sequencyUtils.getArtists(), this.sequencyUtils.getTracks())
            .forEach(blackhole);
    }

    underscore(): void {
        this.underscoreOps
            .artistsInTopTenWithTopTenTracksByCountry(this.underscoreUtils.getArtists(), this.underscoreUtils.getTracks())
            .forEach(blackhole)
            .value();
    }

    zipline(): void {
        forEach(
            this.ziplineOps.artistsInTopTenWithTopTenTracksByCountry(this.ziplineUtils.getArtists(), this.ziplineUtils.getTracks()),
            blackhole
        );
    }
}
