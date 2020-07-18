import {Artist} from './model/artist/artist';
import {Query} from 'tinyield4ts';
import {Country} from './model/country/country';
import {Pair} from './model/pair';
import {Track} from './model/track/track';
import {Triplet} from './model/triplet';
import {TEN} from './common/constants';
import {Value} from './model/wrapper/value';
import {isPrime} from './utils/is-prime';
import {isEven} from './utils/is-even';
import {isOdd} from './utils/is-odd';
import {collapse, oddLines} from './extensions/tinyield-extensions';

export class TinyieldOperations {
    public static readonly NAME = 'Tinyield';

    zipTopArtistAndTrackByCountry(
        artists: Query<Pair<Country, Query<Artist>>>,
        tracks: Query<Pair<Country, Query<Track>>>
    ): Query<Triplet<Country, Artist, Track>> {
        return artists
            .zip(tracks, (pair1, pair2) => {
                return new Triplet(pair1.left, pair1.right.first(), pair2.right.first());
            })
            .distinctBy(trio => trio.center.mbid);
    }

    artistsInTopTenWithTopTenTracksByCountry(
        artists: Query<Pair<Country, Query<Artist>>>,
        tracks: Query<Pair<Country, Query<Track>>>
    ): Query<Pair<Country, Artist[]>> {
        return artists
            .zip(tracks, (pair1, pair2) => {
                return new Triplet(pair1.left, pair1.right, pair2.right);
            })
            .map(trio => {
                const topTenSongsArtistsNames = trio.right
                    .take(TEN)
                    .map(pair => pair.artist.name)
                    .toArray();

                const selectedArtists = trio.center
                    .take(TEN)
                    .filter(artist => topTenSongsArtistsNames.indexOf(artist.name) !== -1)
                    .toArray();

                return new Pair<Country, Artist[]>(trio.left, selectedArtists);
            });
    }

    zipPrimeWithValue(numbers: Query<number>, values: Query<Value>): Query<Pair<number, Value>> {
        return numbers.filter(isPrime).zip(values, (elem1, elem2) => new Pair(elem1, elem2));
    }

    isEveryEven(numbers: Query<number>): boolean {
        return numbers.allMatch(isEven);
    }

    first(numbers: Query<number>): number {
        return numbers.filter(isOdd).first();
    }

    every<T, U>(a: Query<T>, b: Query<U>, predicate: (a: T, b: U) => boolean): boolean {
        return a.zip(b, predicate).allMatch(elem => elem);
    }

    find<T>(a: Query<T>, b: Query<T>, predicate: (a: T, b: T) => boolean): T {
        return a
            .zip(b, (elem1, elem2) => (predicate(elem1, elem2) ? elem1 : undefined))
            .filter(elem => elem !== undefined)
            .first();
    }

    flatMapAndReduce(input: Query<Query<number>>): number {
        return input.flatMap(i => i).reduce((acc, curr) => acc + curr);
    }

    weatherTransitions(input: Query<string>): number {
        return input
            .filter(s => s.charAt(0) !== '#') // Filter comments
            .skip(1) // Skip line: Not available
            .then(oddLines) // Filter hourly info
            .map(line => line.substring(14, 16))
            .then(collapse)
            .count();
    }
}
