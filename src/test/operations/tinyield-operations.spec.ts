import {Triplet} from '../../lib/operations/model/triplet';
import {Country} from '../../lib/operations/model/country/country';
import {Artist} from '../../lib/operations/model/artist/artist';
import {Track} from '../../lib/operations/model/track/track';
import {Pair} from '../../lib/operations/model/pair';
import {assertSameArray, getArtists, getCountries, getTracks} from '../utils/testing-utils';
import {TinyieldOperations} from '../../lib/operations/tinyield-operations';
import {Query} from 'tinyield4ts';
import {EVEN, ODD} from '../../lib/operations/common/constants';
import {Value} from '../../lib/operations/model/wrapper/value';
import {expect} from 'chai';
import {beforeEach, describe, it} from 'mocha';

function getCountriesPairedWithArtists(): Query<Pair<Country, Query<Artist>>> {
    const artists: Artist[] = getArtists();
    return Query.of(
        getCountries().map((country, index) => {
            return Pair.with(country, Query.of([artists[index % artists.length], artists[(index + 1) % artists.length]]));
        })
    );
}

function getCountriesPairedWithTracks(): Query<Pair<Country, Query<Track>>> {
    const tracks: Track[] = getTracks();
    return Query.of(
        getCountries().map((country, index) => {
            return Pair.with(country, Query.of([tracks[index % tracks.length], tracks[(index + 1) % tracks.length]]));
        })
    );
}

describe('TinyieldOperations', () => {
    let operations: TinyieldOperations;
    let numbers: number[];
    let countries: Country[];
    let artists: Artist[];
    let tracks: Track[];

    beforeEach(() => {
        numbers = [EVEN, EVEN, EVEN];
        countries = getCountries();
        artists = getArtists();
        tracks = getTracks();
        operations = new TinyieldOperations();
    });

    describe('when "zipTopArtistAndTrackByCountry" is called', () => {
        let expected: Triplet<Country, Artist, Track>[];
        let actual: Triplet<Country, Artist, Track>[];

        beforeEach(() => {
            expected = [
                new Triplet<Country, Artist, Track>(countries[0], artists[0], tracks[0]),
                new Triplet<Country, Artist, Track>(countries[1], artists[1], tracks[1]),
            ];
            actual = operations.zipTopArtistAndTrackByCountry(getCountriesPairedWithArtists(), getCountriesPairedWithTracks()).toArray();
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
            actual = operations
                .artistsInTopTenWithTopTenTracksByCountry(getCountriesPairedWithArtists(), getCountriesPairedWithTracks())
                .toArray();
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
            actual = operations.zipPrimeWithValue(Query.of(numbers), Query.of(numbers.map(n => new Value(n)))).toArray();
        });

        it('should return an array with the expected pairs', () => {
            expect(actual).to.not.be.undefined;
            assertSameArray(actual, expected, elem => elem.left + elem.right.text);
        });
    });

    describe('when "isEveryEven" is called', () => {
        describe('when every element is even', () => {
            let expected: boolean;
            let actual: boolean;

            beforeEach(() => {
                expected = true;
                actual = operations.isEveryEven(Query.of(numbers));
            });

            it('should return true', () => {
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(expected);
            });
        });

        describe('when not every element is even', () => {
            let expected: boolean;
            let actual: boolean;

            beforeEach(() => {
                expected = false;
                actual = operations.isEveryEven(Query.of([...numbers, ODD]));
            });

            it('should return false', () => {
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(expected);
            });
        });
    });

    describe('when "first" is called', () => {
        describe('when every element is even', () => {
            let actual: number;

            beforeEach(() => {
                actual = operations.first(Query.of(numbers));
            });

            it('should return undefined', () => {
                expect(actual).to.be.undefined;
            });
        });

        describe('when not every element is even', () => {
            let expected: number;
            let actual: number;

            beforeEach(() => {
                expected = ODD;
                actual = operations.first(Query.of([...numbers, ODD]));
            });

            it('should return ODD', () => {
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(expected);
            });
        });
    });

    describe('when "every" is called', () => {
        describe('when every element evaluates to true', () => {
            let expected: boolean;
            let actual: boolean;

            beforeEach(() => {
                expected = true;
                actual = operations.every(
                    Query.of(numbers),
                    Query.of(numbers).map(elem => new Value(elem)),
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
                    Query.of(numbers),
                    Query.of(numbers).map(elem => new Value(elem + 1)),
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
                actual = operations.find(Query.of(numbers), Query.of(numbers), (a, b) => a === b);
            });

            it('should return the matched element', () => {
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(expected);
            });
        });

        describe('when no element matches', () => {
            let actual: number;

            beforeEach(() => {
                actual = operations.find(Query.of(numbers), Query.of([ODD, ODD, ODD]), (a, b) => a === b);
            });

            it('should return undefined', () => {
                expect(actual).to.be.undefined;
            });
        });
    });

    describe('when "flatMapAndReduce" is called', () => {
        let expected: number;
        let actual: number;

        beforeEach(() => {
            expected = 6;
            actual = operations.flatMapAndReduce(Query.of(numbers.map(elem => Query.of([elem]))));
        });

        it('should return the sum of the elements', () => {
            expect(actual).to.not.be.undefined;
            expect(actual).to.equal(expected);
        });
    });
});
