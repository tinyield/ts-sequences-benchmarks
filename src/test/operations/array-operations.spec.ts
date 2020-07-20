import {ArrayOperations} from '../../lib/operations/array-operations';
import {Triplet} from '../../lib/operations/model/triplet';
import {Country} from '../../lib/operations/model/country/country';
import {Artist} from '../../lib/operations/model/artist/artist';
import {Track} from '../../lib/operations/model/track/track';
import {Pair} from '../../lib/operations/model/pair';
import {assertSameArray, getArtists, getCountries, getTracks} from '../utils/testing-utils';
import {expect} from 'chai';
import {beforeEach, describe, it} from 'mocha';
import {Value} from '../../lib/operations/model/wrapper/value';
import {EVEN, ODD} from '../../lib/operations/common/constants';
import {toArray} from '../../lib/operations/utils/array-utils';

function getCountriesPairedWithArtists(): Iterator<Pair<Country, Iterator<Artist>>> {
    const artists: Artist[] = getArtists();
    return getCountries()
        .map((country, index) => {
            return Pair.with(country, [artists[index % artists.length], artists[(index + 1) % artists.length]][Symbol.iterator]());
        })
        [Symbol.iterator]();
}

function getCountriesPairedWithTracks(): Iterator<Pair<Country, Iterator<Track>>> {
    const tracks: Track[] = getTracks();
    return getCountries()
        .map((country, index) => {
            return Pair.with(country, [tracks[index % tracks.length], tracks[(index + 1) % tracks.length]][Symbol.iterator]());
        })
        [Symbol.iterator]();
}

describe('ZiplineOperations', () => {
    let operations: ArrayOperations;
    let numbers: number[];
    let countries: Country[];
    let artists: Artist[];
    let tracks: Track[];

    beforeEach(() => {
        numbers = [EVEN, EVEN, EVEN];
        countries = getCountries();
        artists = getArtists();
        tracks = getTracks();
        operations = new ArrayOperations();
    });

    describe('when "zipTopArtistAndTrackByCountry" is called', () => {
        let expected: Triplet<Country, Artist, Track>[];
        let actual: Triplet<Country, Artist, Track>[];

        beforeEach(() => {
            expected = [
                new Triplet<Country, Artist, Track>(countries[0], artists[0], tracks[0]),
                new Triplet<Country, Artist, Track>(countries[1], artists[1], tracks[1]),
            ];
            actual = toArray(operations.zipTopArtistAndTrackByCountry(getCountriesPairedWithArtists(), getCountriesPairedWithTracks()));
        });

        it('should return an array with the expected trios', () => {
            expect(actual).to.not.be.undefined;
            assertSameArray(actual, expected, elem => elem.left.name + elem.center.mbid + elem.right.mbid);
        });
    });

    describe('when "artistsInTopTenWithTopTenTracksByCountry" is called', () => {
        let expected: Pair<Country, Artist[]>[];
        let actual: Pair<Country, Artist[]>[];

        beforeEach(() => {
            expected = [
                new Pair<Country, Artist[]>(countries[0], [artists[0], artists[1]]),
                new Pair<Country, Artist[]>(countries[1], [artists[1], artists[0]]),
                new Pair<Country, Artist[]>(countries[2], [artists[0], artists[1]]),
                new Pair<Country, Artist[]>(countries[3], [artists[1], artists[0]]),
            ];
            actual = toArray(
                operations.artistsInTopTenWithTopTenTracksByCountry(getCountriesPairedWithArtists(), getCountriesPairedWithTracks())
            ).map(elem => Pair.with(elem.left, toArray(elem.right)));
        });

        it('should return an array with the expected pairs', () => {
            expect(actual).to.not.be.undefined;
            assertSameArray(actual, expected, elem => elem.left.name + elem.right.map(e => e.mbid).join(''));
        });
    });

    describe('when "zipPrimeWithValue" is called', () => {
        let expected: Pair<number, Value>[];
        let actual: Pair<number, Value>[];

        beforeEach(() => {
            expected = numbers.map(n => Pair.with(n, new Value(n)));
            actual = toArray(operations.zipPrimeWithValue(numbers[Symbol.iterator](), numbers.map(n => new Value(n))[Symbol.iterator]()));
        });

        it('should return an array with the expected pairs', () => {
            expect(actual).to.not.be.undefined;
            assertSameArray(actual, expected, elem => elem.left + elem.right.text);
        });
    });

    describe('when "every" is called', () => {
        describe('when every element evaluates to true', () => {
            let expected: boolean;
            let actual: boolean;

            beforeEach(() => {
                expected = true;
                actual = operations.every(
                    numbers[Symbol.iterator](),
                    numbers.map(elem => new Value(elem))[Symbol.iterator](),
                    (a, b) => a === b.value
                );
            });

            it('should return true', () => {
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(expected);
            });
        });

        describe('when not every element evaluates to true', () => {
            let expected: boolean;
            let actual: boolean;

            beforeEach(() => {
                expected = false;
                actual = operations.every(
                    numbers[Symbol.iterator](),
                    numbers.map(elem => new Value(elem + 1))[Symbol.iterator](),
                    (a, b) => a === b.value
                );
            });

            it('should return false', () => {
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(expected);
            });
        });
    });

    describe('when "find" is called', () => {
        describe('when a element matches', () => {
            let expected: number;
            let actual: number;

            beforeEach(() => {
                expected = EVEN;
                actual = operations.find(numbers[Symbol.iterator](), numbers[Symbol.iterator](), (a, b) => a === b);
            });

            it('should return the matched element', () => {
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(expected);
            });
        });

        describe('when no element matches', () => {
            let actual: number;

            beforeEach(() => {
                actual = operations.find(numbers[Symbol.iterator](), [ODD, ODD, ODD][Symbol.iterator](), (a, b) => a === b);
            });

            it('should return undefined', () => {
                expect(actual).to.be.undefined;
            });
        });
    });
});
