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
import {IterableX, zip} from 'ix/iterable';
import 'ix/add/iterable-operators/distinct';
import 'ix/add/iterable-operators/toarray';
import 'ix/add/iterable-operators/flatmap';
import 'ix/add/iterable-operators/filter';
import 'ix/add/iterable-operators/reduce';
import 'ix/add/iterable-operators/first';
import 'ix/add/iterable-operators/every';
import 'ix/add/iterable-operators/take';
import 'ix/add/iterable-operators/map';
import 'ix/add/iterable-operators/skip';
import 'ix/add/iterable-operators/max';
import 'ix/add/iterable-operators/count';
import 'ix/add/iterable-operators/expand';
import './extensions/ix-extensions.js';
import {CollapseIterable, OddLinesIterable} from './extensions/ix-extensions';

export class IxOperations {
    public static readonly NAME = 'Ix';

    zipTopArtistAndTrackByCountry(
        artists: IterableX<Pair<Country, IterableX<Artist>>>,
        tracks: IterableX<Pair<Country, IterableX<Track>>>
    ): IterableX<Triplet<Country, Artist, Track>> {
        return zip(artists, tracks)
            .map(value => new Triplet(value[0].left, value[0].right.first(), value[1].right.first()))
            .distinct(trio => trio.center.mbid);
    }

    artistsInTopTenWithTopTenTracksByCountry(
        artists: IterableX<Pair<Country, IterableX<Artist>>>,
        tracks: IterableX<Pair<Country, IterableX<Track>>>
    ): IterableX<Pair<Country, Artist[]>> {
        return zip(artists, tracks)
            .map(value => {
                return new Triplet(value[0].left, value[0].right, value[1].right);
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

    zipPrimeWithValue(numbers: IterableX<number>, values: IterableX<Value>): IterableX<Pair<number, Value>> {
        return zip(numbers.filter(isPrime), values).map(([elem1, elem2]) => new Pair(elem1, elem2));
    }

    isEveryEven(numbers: IterableX<number>): boolean {
        return numbers.every(isEven);
    }

    first(numbers: IterableX<number>): number {
        return numbers.filter(isOdd).first();
    }

    every<T, U>(a: IterableX<T>, b: IterableX<U>, predicate: (a: T, b: U) => boolean): boolean {
        return zip(a, b)
            .map(([elem1, elem2]) => predicate(elem1, elem2))
            .every(elem => elem);
    }

    find<T>(a: IterableX<T>, b: IterableX<T>, predicate: (a: T, b: T) => boolean): T {
        return zip(a, b)
            .map(([elem1, elem2]) => (predicate(elem1, elem2) ? elem1 : undefined))
            .filter(elem => elem !== undefined)
            .first();
    }

    flatMapAndReduce(input: IterableX<IterableX<number>>): number {
        return input.flatMap(i => i).reduce((acc, curr) => acc + curr);
    }

    weatherTransitions(input: IterableX<string>): number {
        return IterableX.as(
            new CollapseIterable(
                IterableX.as(
                    new OddLinesIterable(
                        input
                            .filter(s => s.charAt(0) !== '#') // Filter comments
                            .skip(1)
                    )
                ).map(line => line.substring(14, 16))
            )
        ).count();
    }

    queryMaxTemperature(input: IterableX<string>): number {
        return IterableX.as(
            new OddLinesIterable(
                input
                    .filter(s => s.charAt(0) !== '#') // Filter comments
                    .skip(1)
            )
        )
            .map(line => Number(line.substring(14, 16)))
            .max();
    }

    queryNrOfDistinctTemperatures(input: IterableX<string>): number {
        return IterableX.as(
            new OddLinesIterable(
                input
                    .filter(s => s.charAt(0) !== '#') // Filter comments
                    .skip(1)
            )
        )
            .map((line: string) => Number(line.substring(14, 16)))
            .distinct()
            .count();
    }
}
