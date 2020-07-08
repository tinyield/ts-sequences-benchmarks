import {Country} from './model/country/country';
import {Pair} from './model/pair';
import {Track} from './model/track/track';
import {Triplet} from './model/triplet';
import {TEN} from './common/constants';
import {Value} from './model/wrapper/value';
import {isPrime} from './utils/is-prime';
import {isEven} from './utils/is-even';
import {isOdd} from './utils/is-odd';
import {Artist} from './model/artist/artist';

function zip<T, U>(a: LazyJS.Sequence<T>, b: LazyJS.Sequence<U>): LazyJS.Sequence<Pair<T, U>> {
    return (a as LazyJS.Sequence<any>).zip(b.toArray()).map((value: any) => new Pair<T, U>(value[0], value[1]));
}

function distinct<T>(sequence: LazyJS.Sequence<T>, by: (elem: T) => any) {
    const distinctKeys = new Set<any>();
    return sequence.filter(elem => {
        const key = by(elem);
        if (!distinctKeys.has(key)) {
            distinctKeys.add(key);
            return true;
        }
        return false;
    });
}

export class LazyOperations {
    public static readonly NAME = 'Lazy.js';

    zipTopArtistAndTrackByCountry(
        artists: LazyJS.Sequence<Pair<Country, LazyJS.Sequence<Artist>>>,
        tracks: LazyJS.Sequence<Pair<Country, LazyJS.Sequence<Track>>>
    ): LazyJS.Sequence<Triplet<Country, Artist, Track>> {
        return distinct(
            zip<Pair<Country, LazyJS.Sequence<Artist>>, Pair<Country, LazyJS.Sequence<Track>>>(artists, tracks).map(elem => {
                return new Triplet(elem.left.left, elem.left.right.first(), elem.right.right.first());
            }),
            elem => elem.center.mbid
        );
    }

    artistsInTopTenWithTopTenTracksByCountry(
        artists: LazyJS.Sequence<Pair<Country, LazyJS.Sequence<Artist>>>,
        tracks: LazyJS.Sequence<Pair<Country, LazyJS.Sequence<Track>>>
    ): LazyJS.Sequence<Pair<Country, Artist[]>> {
        return zip<Pair<Country, LazyJS.Sequence<Artist>>, Pair<Country, LazyJS.Sequence<Track>>>(artists, tracks)
            .map(elem => {
                return new Triplet(elem.left.left, elem.left.right, elem.right.right);
            })
            .map(trio => {
                const topTenSongsArtistsNames = trio.right
                    .first(TEN)
                    .map(pair => pair.artist.name)
                    .toArray();

                const selectedArtists = trio.center
                    .first(TEN)
                    .filter(artist => topTenSongsArtistsNames.indexOf(artist.name) !== -1)
                    .toArray();

                return new Pair<Country, Artist[]>(trio.left, selectedArtists);
            });
    }

    zipPrimeWithValue(numbers: LazyJS.Sequence<number>, values: LazyJS.Sequence<Value>): LazyJS.Sequence<Pair<number, Value>> {
        return zip(numbers.filter(isPrime), values);
    }

    isEveryEven(numbers: LazyJS.Sequence<number>): boolean {
        return numbers.every(isEven);
    }

    first(numbers: LazyJS.Sequence<number>): number {
        return numbers.filter(isOdd).first();
    }

    every<T, U>(a: LazyJS.Sequence<T>, b: LazyJS.Sequence<U>, predicate: (a: T, b: U) => boolean): boolean {
        return zip(a, b)
            .map(value => predicate(value.left, value.right))
            .every(elem => elem);
    }

    find<T>(a: LazyJS.Sequence<T>, b: LazyJS.Sequence<T>, predicate: (a: T, b: T) => boolean): T {
        return zip(a, b)
            .map(value => (predicate(value.left, value.right) ? value.left : undefined))
            .filter(elem => elem !== undefined)
            .first();
    }

    flatMapAndReduce(input: LazyJS.Sequence<LazyJS.Sequence<number>>): number {
        return input.flatten().reduce((acc, curr) => acc + curr);
    }
}
