import {AbstractZipBenchmark} from './abstract-zip-benchmark';
import {blackhole} from '../utils/benchmark-utils';

export class ArtistsInTopTenWithTopTenTracksByCountryBenchmark extends AbstractZipBenchmark {
    name(): string {
        return 'Artists who are in a Country\'s top ten who also have Tracks in the same Country\'s top ten Benchmark';
    }

    ix(): void {
        this.ixOps.artistsInTopTenWithTopTenTracksByCountry(this.ixUtils.getArtists(), this.ixUtils.getTracks()).forEach(blackhole);
    }

    lazy(): void {
        this.lazyOps
            .artistsInTopTenWithTopTenTracksByCountry(this.lazyUtils.getArtists(), this.lazyUtils.getTracks())
            .toArray()
            .forEach(blackhole);
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

    underscore(): void {
        this.underscoreOps
            .artistsInTopTenWithTopTenTracksByCountry(this.underscoreUtils.getArtists(), this.underscoreUtils.getTracks())
            .forEach(blackhole)
            .value();
    }

    zipline(): void {
        this.ziplineOps
            .artistsInTopTenWithTopTenTracksByCountry(this.ziplineUtils.getArtists(), this.ziplineUtils.getTracks())
            .forEach(blackhole);
    }

    annouce(): void {
        console.log(this.name(), 'ixOps - Start');
        this.ixOps.artistsInTopTenWithTopTenTracksByCountry(this.ixUtils.getArtists(), this.ixUtils.getTracks()).forEach(console.log);
        console.log(this.name(), 'ixOps - End\n');
        console.log(this.name(), 'lazyOps - Start');
        this.lazyOps
            .artistsInTopTenWithTopTenTracksByCountry(this.lazyUtils.getArtists(), this.lazyUtils.getTracks())
            .toArray()
            .forEach(console.log);
        console.log(this.name(), 'lazyOps - End\n');
        console.log(this.name(), 'lodashOps - Start');
        this.lodashOps
            .artistsInTopTenWithTopTenTracksByCountry(this.lodashUtils.getArtists(), this.lodashUtils.getTracks())
            .forEach(console.log);
        console.log(this.name(), 'lodashOps - End\n');
        console.log(this.name(), 'tinyieldOps - Start');
        this.tinyieldOps
            .artistsInTopTenWithTopTenTracksByCountry(this.tinyieldUtils.getArtists(), this.tinyieldUtils.getTracks())
            .forEach(console.log);
        console.log(this.name(), 'tinyieldOps - End\n');
        console.log(this.name(), 'underscoreOps - Start');
        this.underscoreOps
            .artistsInTopTenWithTopTenTracksByCountry(this.underscoreUtils.getArtists(), this.underscoreUtils.getTracks())
            .forEach(console.log);
        console.log(this.name(), 'underscoreOps - End\n');
        console.log(this.name(), 'ziplineOps - Start');
        this.ziplineOps
            .artistsInTopTenWithTopTenTracksByCountry(this.ziplineUtils.getArtists(), this.ziplineUtils.getTracks())
            .forEach(console.log);
        console.log(this.name(), 'ziplineOps - End\n');
    }
}
