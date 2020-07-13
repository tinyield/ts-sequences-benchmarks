import {Artist} from './model/artist/artist';
import Sequence from 'sequency';
import {Country} from './model/country/country';
import {Pair} from './model/pair';
import {Track} from './model/track/track';
import {Triplet} from './model/triplet';
import {TEN} from './common/constants';
import {Value} from './model/wrapper/value';
import {isPrime} from './utils/is-prime';
import {isEven} from './utils/is-even';
import {isOdd} from './utils/is-odd';

export class SequencyOperations {
    public static readonly NAME = 'Sequency';

    zipTopArtistAndTrackByCountry(
        artists: Sequence<Pair<Country, Sequence<Artist>>>,
        tracks: Sequence<Pair<Country, Sequence<Track>>>
    ): Sequence<Triplet<Country, Artist, Track>> {
        return artists
            .zip(tracks)
            .map(([pair1, pair2]) => {
                return new Triplet(pair1.left, pair1.right.first(), pair2.right.first());
            })
            .distinctBy(trio => trio.center.mbid);
    }

    artistsInTopTenWithTopTenTracksByCountry(
        artists: Sequence<Pair<Country, Sequence<Artist>>>,
        tracks: Sequence<Pair<Country, Sequence<Track>>>
    ): Sequence<Pair<Country, Artist[]>> {
        return artists
            .zip(tracks)
            .map(([pair1, pair2]) => {
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

    zipPrimeWithValue(numbers: Sequence<number>, values: Sequence<Value>): Sequence<Pair<number, Value>> {
        return numbers
            .filter(isPrime)
            .zip(values)
            .map(([elem1, elem2]) => new Pair(elem1, elem2));
    }

    isEveryEven(numbers: Sequence<number>): boolean {
        return numbers.all(isEven);
    }

    first(numbers: Sequence<number>): number {
        return numbers.filter(isOdd).firstOrNull();
    }

    every<T, U>(a: Sequence<T>, b: Sequence<U>, predicate: (a: T, b: U) => boolean): boolean {
        return a
            .zip(b)
            .map(([elem1, elem2]) => predicate(elem1, elem2))
            .all(elem => elem);
    }

    find<T>(a: Sequence<T>, b: Sequence<T>, predicate: (a: T, b: T) => boolean): T {
        return a
            .zip(b)
            .map(([elem1, elem2]) => (predicate(elem1, elem2) ? elem1 : undefined))
            .filter(elem => elem !== undefined)
            .firstOrNull();
    }

    flatMapAndReduce(input: Sequence<Sequence<number>>): number {
        return input.flatMap(i => i).reduce((acc, curr) => acc + curr);
    }
}
