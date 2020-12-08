import {expect} from 'chai';
import {
    ArtistsInTopTenWithTopTenTracksByCountryBenchmark,
    TEN,
} from '../../lib/zip/artists-in-top-ten-with-top-ten-tracks-by-country-benchmark';
import {Pair} from '../../lib/common/model/pair';
import {Country} from '../../lib/common/model/country/country';
import {Artist} from '../../lib/common/model/artist/artist';
import {distinct} from '../../lib/common/extensions/array-extensions';

describe('ArtistsInTopTenWithTopTenTracksByCountryBenchmark', () => {
    let instance: ArtistsInTopTenWithTopTenTracksByCountryBenchmark;

    beforeEach(() => (instance = new ArtistsInTopTenWithTopTenTracksByCountryBenchmark()));

    describe('when name() is called', () => {
        const expected = "Artists who are in a Country's top ten who also have Tracks in the same Country's top ten Benchmark";
        let actual: string;

        beforeEach(() => (actual = instance.name()));

        it('should report the name of the benchmark', () => {
            expect(actual).to.equal(expected);
        });
    });

    describe('when setup() is called', () => {
        const expected = 130;

        describe('when ix is called', () => {
            it('should return 130', () => {
                const actual: Pair<Country, Artist[]>[] = instance.ixPipeline().toArray();
                expect(actual.length).to.equal(expected);
                expect(distinct(actual, elem => elem.left.name).length).to.equal(actual.length);
                for (let i = 0; i < actual.length; i++) {
                    expect(actual[i].right.length).to.be.lessThan(TEN + 1);
                }
            });
        });

        describe('when lazy is called', () => {
            it('should return 130', () => {
                const actual: Pair<Country, Artist[]>[] = instance.lazyPipeline().toArray();
                expect(actual.length).to.equal(expected);
                expect(distinct(actual, elem => elem.left.name).length).to.equal(actual.length);
                for (let i = 0; i < actual.length; i++) {
                    expect(actual[i].right.length).to.be.lessThan(TEN + 1);
                }
            });
        });

        describe('when lodash is called', () => {
            it('should return 130', () => {
                const actual: Pair<Country, Artist[]>[] = instance
                    .lodashPipeline()
                    .toArray()
                    .value();
                expect(actual.length).to.equal(expected);
                expect(distinct(actual, elem => elem.left.name).length).to.equal(actual.length);
                for (let i = 0; i < actual.length; i++) {
                    expect(actual[i].right.length).to.be.lessThan(TEN + 1);
                }
            });
        });

        describe('when tinyield is called', () => {
            it('should return 130', () => {
                const actual: Pair<Country, Artist[]>[] = instance.tinyieldPipeline().toArray();
                expect(actual.length).to.equal(expected);
                expect(distinct(actual, elem => elem.left.name).length).to.equal(actual.length);
                for (let i = 0; i < actual.length; i++) {
                    expect(actual[i].right.length).to.be.lessThan(TEN + 1);
                }
            });
        });

        describe('when sequency is called', () => {
            it('should return 130', () => {
                const actual: Pair<Country, Artist[]>[] = instance.sequencyPipeline().toArray();
                expect(actual.length).to.equal(expected);
                expect(distinct(actual, elem => elem.left.name).length).to.equal(actual.length);
                for (let i = 0; i < actual.length; i++) {
                    expect(actual[i].right.length).to.be.lessThan(TEN + 1);
                }
            });
        });

        describe('when underscore is called', () => {
            it('should return 130', () => {
                const actual: Pair<Country, Artist[]>[] = instance
                    .underscorePipeline()
                    .toArray()
                    .value() as any;
                expect(actual.length).to.equal(expected);
                expect(distinct(actual, elem => elem.left.name).length).to.equal(actual.length);
                for (let i = 0; i < actual.length; i++) {
                    expect(actual[i].right.length).to.be.lessThan(TEN + 1);
                }
            });
        });

        describe('when arrays is called', () => {
            it('should return 130', () => {
                const actual: Pair<Country, Artist[]>[] = instance.arraysPipeline();
                expect(actual.length).to.equal(expected);
                expect(distinct(actual, elem => elem.left.name).length).to.equal(actual.length);
                for (let i = 0; i < actual.length; i++) {
                    expect(actual[i].right.length).to.be.lessThan(TEN + 1);
                }
            });
        });
    });
});
