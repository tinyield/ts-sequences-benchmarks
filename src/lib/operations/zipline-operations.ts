import {Artist} from './model/artist/artist';
import {Country} from './model/country/country';
import {Pair} from './model/pair';
import {Track} from './model/track/track';
import {Triplet} from './model/triplet';
import {TEN} from './common/constants';
import {Value} from './model/wrapper/value';
import {isPrime} from './utils/is-prime';
import {filter, map, take, toArray} from './utils/zipline-utils';

export function every<T>(source: Iterator<T>, predicate: (elem: T) => boolean): boolean {
    let iteration = source.next();
    while (!iteration.done) {
        if (!predicate(iteration.value)) {
            return false;
        }
        iteration = source.next();
    }
    return true;
}

export function* zip<T, U>(a: Iterator<T>, b: Iterator<U>): Iterator<Pair<T, U>> {
    let aIteration = a.next();
    let bIteration = b.next();
    while (!aIteration.done && !bIteration.done) {
        yield new Pair<T, U>(aIteration.value, bIteration.value);
        aIteration = a.next();
        bIteration = b.next();
    }
}

export function distinct<T>(sequence: Iterator<T>, by: (elem: T) => any): Iterator<T> {
    const distinctKeys = new Set<any>();
    return filter(sequence, elem => {
        const key = by(elem);
        if (!distinctKeys.has(key)) {
            distinctKeys.add(key);
            return true;
        }
        return false;
    });
}

export class ZiplineOperations {
    public static readonly NAME = 'Zipline';

    zipTopArtistAndTrackByCountry(
        artists: Iterator<Pair<Country, Iterator<Artist>>>,
        tracks: Iterator<Pair<Country, Iterator<Track>>>
    ): Iterator<Triplet<Country, Artist, Track>> {
        return distinct(
            map(zip(artists, tracks), pair => new Triplet(pair.left.left, pair.left.right.next().value, pair.right.right.next().value)),
            trio => trio.center.mbid
        );
    }

    artistsInTopTenWithTopTenTracksByCountry(
        artists: Iterator<Pair<Country, Iterator<Artist>>>,
        tracks: Iterator<Pair<Country, Iterator<Track>>>
    ): Iterator<Pair<Country, Iterator<Artist>>> {
        return map(
            map(zip(artists, tracks), pair => new Triplet(pair.left.left, pair.left.right, pair.right.right)),
            trio => {
                const topTenSongsArtistsNames = toArray(map(take(trio.right, TEN), pair => pair.artist.name));

                const selectedArtists = filter(take(trio.center, TEN), artist => topTenSongsArtistsNames.indexOf(artist.name) !== -1);

                return new Pair<Country, Iterator<Artist>>(trio.left, selectedArtists);
            }
        );
    }

    zipPrimeWithValue(numbers: Iterator<number>, values: Iterator<Value>): Iterator<Pair<number, Value>> {
        return zip(filter(numbers, isPrime), values);
    }

    every<T, U>(a: Iterator<T>, b: Iterator<U>, predicate: (a: T, b: U) => boolean): boolean {
        return every(
            map(zip(a, b), pair => predicate(pair.left, pair.right)),
            elem => elem
        );
    }

    find<T>(a: Iterator<T>, b: Iterator<T>, predicate: (a: T, b: T) => boolean): T {
        return filter(
            map(zip(a, b), pair => (predicate(pair.left, pair.right) ? pair.left : undefined)),
            elem => elem !== undefined
        ).next().value;
    }
}
