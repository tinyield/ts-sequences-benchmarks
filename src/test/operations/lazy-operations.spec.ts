import {Triplet} from '../../lib/operations/model/triplet';
import {Country} from '../../lib/operations/model/country/country';
import {Artist} from '../../lib/operations/model/artist/artist';
import {Track} from '../../lib/operations/model/track/track';
import {Pair} from '../../lib/operations/model/pair';
import {assertSameArray, getArtists, getCountries, getTracks} from '../utils/testing-utils';
import {LazyOperations} from '../../lib/operations/lazy-operations';
import * as Lazy from 'lazy.js';

function getCountriesPairedWithArtists(): LazyJS.ArrayLikeSequence<Pair<Country, LazyJS.ArrayLikeSequence<Artist>>> {
    const artists: Artist[] = getArtists();
    return Lazy(
        getCountries().map((country, index) => {
            return Pair.with(country, Lazy([artists[index % artists.length], artists[(index + 1) % artists.length]]));
        })
    );
}

function getCountriesPairedWithTracks(): LazyJS.ArrayLikeSequence<Pair<Country, LazyJS.ArrayLikeSequence<Track>>> {
    const tracks: Track[] = getTracks();
    return Lazy(
        getCountries().map((country, index) => {
            return Pair.with(country, Lazy([tracks[index % tracks.length], tracks[(index + 1) % tracks.length]]));
        })
    );
}

describe('LazyOperations', () => {
    let operations: LazyOperations;
    let countries: Country[];
    let artists: Artist[];
    let tracks: Track[];

    beforeEach(() => {
        countries = getCountries();
        artists = getArtists();
        tracks = getTracks();
        operations = new LazyOperations();
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
            expect(actual).toBeDefined();
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
            expect(actual).toBeDefined();
            assertSameArray(actual, expected, elem => elem.left.name + elem.right.map(e => e.mbid).join(''));
        });
    });
});
