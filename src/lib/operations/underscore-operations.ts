import {Artist} from './model/artist/artist';
import {Country} from './model/country/country';
import {Pair} from './model/pair';
import {Track} from './model/track/track';
import {Triplet} from './model/triplet';
import {TEN} from './common/constants';
import {Value} from './model/wrapper/value';
import {isPrime} from './utils/is-prime';
import {isEven} from './utils/is-even';
import {isOdd} from './utils/is-odd';
import * as _ from 'underscore';
import './extensions/underscore-extensions';

function zip<T, U>(a: _._Chain<T, T[]>, b: _._Chain<U, U[]>): _._Chain<Pair<T, U>, Pair<T, U>[]> {
    return (a as _._Chain<any, any[]>).zip(b.value()).map(([elem1, elem2]: any) => new Pair<T, U>(elem1, elem2));
}

export class UnderscoreOperations {
    public static readonly NAME = 'Underscore';

    zipTopArtistAndTrackByCountry(
        artists: _._Chain<Pair<Country, _._Chain<Artist, Artist[]>>, Pair<Country, _._Chain<Artist, Artist[]>>[]>,
        tracks: _._Chain<Pair<Country, _._Chain<Track, Track[]>>, Pair<Country, _._Chain<Track, Track[]>>[]>
    ): _._Chain<Triplet<Country, Artist, Track>, Triplet<Country, Artist, Track>[]> {
        return zip(artists, tracks)
            .map(pair => {
                return new Triplet(pair.left.left, pair.left.right.first().value(), pair.right.right.first().value());
            })
            .unique(trio => trio.center.mbid) as any;
    }

    artistsInTopTenWithTopTenTracksByCountry(
        artists: _._Chain<Pair<Country, _._Chain<Artist, Artist[]>>, Pair<Country, _._Chain<Artist, Artist[]>>[]>,
        tracks: _._Chain<Pair<Country, _._Chain<Track, Track[]>>, Pair<Country, _._Chain<Track, Track[]>>[]>
    ): _._Chain<Pair<Country, Artist[]>, Pair<Country, Artist[]>[]> {
        return zip(artists, tracks)
            .map(pair => {
                return new Triplet(pair.left.left, pair.left.right, pair.right.right);
            })
            .map(trio => {
                const topTenSongsArtistsNames = trio.right
                    .take(TEN)
                    .map(pair => pair.artist.name)
                    .value();

                const selectedArtists = trio.center
                    .take(TEN)
                    .filter(artist => topTenSongsArtistsNames.indexOf(artist.name) !== -1)
                    .value();

                return new Pair<Country, Artist[]>(trio.left, selectedArtists);
            });
    }

    zipPrimeWithValue(
        numbers: _._Chain<number, number[]>,
        values: _._Chain<Value, Value[]>
    ): _._Chain<Pair<number, Value>, Pair<number, Value>[]> {
        return zip(numbers.filter(isPrime), values);
    }

    isEveryEven(numbers: _._Chain<number, number[]>): boolean {
        return numbers.every(isEven).value();
    }

    first(numbers: _._Chain<number, number[]>): number {
        return numbers
            .filter(isOdd)
            .first()
            .value();
    }

    every<T, U>(a: _._Chain<T, T[]>, b: _._Chain<U, U[]>, predicate: (a: T, b: U) => boolean): boolean {
        return zip(a, b)
            .map(pair => predicate(pair.left, pair.right))
            .every(elem => elem)
            .value();
    }

    find<T>(a: _._Chain<T, T[]>, b: _._Chain<T, T[]>, predicate: (a: T, b: T) => boolean): T {
        return zip(a, b)
            .map(pair => (predicate(pair.left, pair.right) ? pair.left : undefined))
            .filter(elem => elem !== undefined)
            .first()
            .value();
    }

    flatMapAndReduce(input: _._Chain<_._Chain<number, number[]>, _._Chain<number, number[]>[]>): number {
        return input
            .flatten()
            .map(i => i.value())
            .flatten()
            .reduce<number>((acc, curr) => acc + curr)
            .value();
    }

    weatherTransitions(input: _._Chain<string, string[]>): number {
        return ((input.filter(s => s.charAt(0) !== '#').drop(1) as any)
            .oddLines()
            .map((line: string) => line.substring(14, 16))
            .collapse() as _._Chain<string, string[]>)
            .size()
            .value();
    }

    queryMaxTemperature(input: _._Chain<string, string[]>): number {
        return (input.filter(s => s.charAt(0) !== '#').drop(1) as any)
            .oddLines()
            .map((line: string) => Number(line.substring(14, 16)))
            .max()
            .value();
    }

    queryNrOfDistinctTemperatures(input: _._Chain<string, string[]>): number {
        return (input.filter(s => s.charAt(0) !== '#').drop(1) as any)
            .oddLines()
            .map((line: string) => Number(line.substring(14, 16)))
            .uniq()
            .size()
            .value();
    }
}
