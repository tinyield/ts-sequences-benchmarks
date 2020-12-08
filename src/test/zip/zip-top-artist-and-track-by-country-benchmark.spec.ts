import {expect} from 'chai';
import {Country} from '../../lib/common/model/country/country';
import {Artist} from '../../lib/common/model/artist/artist';
import {distinct} from '../../lib/common/extensions/array-extensions';
import {ZipTopArtistAndTrackByCountryBenchmark} from '../../lib/zip/zip-top-artist-and-track-by-country-benchmark';
import {Triplet} from '../../lib/common/model/triplet';
import {Track} from '../../lib/common/model/track/track';

describe('ZipTopArtistAndTrackByCountryBenchmark', () => {
    let instance: ZipTopArtistAndTrackByCountryBenchmark;

    beforeEach(() => (instance = new ZipTopArtistAndTrackByCountryBenchmark()));

    describe('when name() is called', () => {
        const expected = 'Distinct Top Artist and Top Track by Country Benchmark';
        let actual: string;

        beforeEach(() => (actual = instance.name()));

        it('should report the name of the benchmark', () => {
            expect(actual).to.equal(expected);
        });
    });

    describe('when setup() is called', () => {
        const expected = 32;

        describe('when ix is called', () => {
            it('should return 32', () => {
                const actual: Triplet<Country, Artist, Track>[] = instance.ixPipeline().toArray();
                expect(actual.length).to.equal(expected);
                expect(distinct(actual, elem => elem.left.name).length).to.equal(actual.length);
                expect(distinct(actual, elem => elem.center.name).length).to.equal(actual.length);
            });
        });

        describe('when lazy is called', () => {
            it('should return 32', () => {
                const actual: Triplet<Country, Artist, Track>[] = instance.lazyPipeline().toArray();
                expect(actual.length).to.equal(expected);
                expect(distinct(actual, elem => elem.left.name).length).to.equal(actual.length);
                expect(distinct(actual, elem => elem.center.name).length).to.equal(actual.length);
            });
        });

        describe('when lodash is called', () => {
            it('should return 32', () => {
                const actual: Triplet<Country, Artist, Track>[] = instance
                    .lodashPipeline()
                    .toArray()
                    .value();
                expect(actual.length).to.equal(expected);
                expect(distinct(actual, elem => elem.left.name).length).to.equal(actual.length);
                expect(distinct(actual, elem => elem.center.name).length).to.equal(actual.length);
            });
        });

        describe('when tinyield is called', () => {
            it('should return 32', () => {
                const actual: Triplet<Country, Artist, Track>[] = instance.tinyieldPipeline().toArray();
                expect(actual.length).to.equal(expected);
                expect(distinct(actual, elem => elem.left.name).length).to.equal(actual.length);
                expect(distinct(actual, elem => elem.center.name).length).to.equal(actual.length);
            });
        });

        describe('when sequency is called', () => {
            it('should return 32', () => {
                const actual: Triplet<Country, Artist, Track>[] = instance.sequencyPipeline().toArray();
                expect(actual.length).to.equal(expected);
                expect(distinct(actual, elem => elem.left.name).length).to.equal(actual.length);
                expect(distinct(actual, elem => elem.center.name).length).to.equal(actual.length);
            });
        });

        describe('when underscore is called', () => {
            it('should return 32', () => {
                const actual: Triplet<Country, Artist, Track>[] = instance
                    .underscorePipeline()
                    .toArray()
                    .value() as any;
                expect(actual.length).to.equal(expected);
                expect(distinct(actual, elem => elem.left.name).length).to.equal(actual.length);
                expect(distinct(actual, elem => elem.center.name).length).to.equal(actual.length);
            });
        });

        describe('when arrays is called', () => {
            it('should return 32', () => {
                const actual: Triplet<Country, Artist, Track>[] = instance.arraysPipeline();
                expect(actual.length).to.equal(expected);
                expect(distinct(actual, elem => elem.left.name).length).to.equal(actual.length);
                expect(distinct(actual, elem => elem.center.name).length).to.equal(actual.length);
            });
        });
    });
});
