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

export function zip<T, U>(a: T[], b: U[]): Pair<T, U>[] {
    const result: Pair<T, U>[] = [];
    const aIter = a[Symbol.iterator]();
    const bIter = b[Symbol.iterator]();
    let aCurr = aIter.next();
    let bCurr = bIter.next();
    while (!aCurr.done && !bCurr.done) {
        result.push(new Pair<T, U>(aCurr.value, bCurr.value));
        aCurr = aIter.next();
        bCurr = bIter.next();
    }
    return result;
}

export function distinct<T>(sequence: T[], by: (elem: T) => any): T[] {
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

export class ArrayOperations {
    public static readonly NAME = 'Arrays (Eager)';

    zipTopArtistAndTrackByCountry(artists: Pair<Country, Artist[]>[], tracks: Pair<Country, Track[]>[]): Triplet<Country, Artist, Track>[] {
        return distinct(
            zip(artists, tracks).map(pair => new Triplet(pair.left.left, pair.left.right[0], pair.right.right[0])),
            trio => trio.center.mbid
        );
    }

    artistsInTopTenWithTopTenTracksByCountry(
        artists: Pair<Country, Artist[]>[],
        tracks: Pair<Country, Track[]>[]
    ): Pair<Country, Artist[]>[] {
        return zip(artists, tracks)
            .map(pair => new Triplet(pair.left.left, pair.left.right, pair.right.right))
            .map(trio => {
                const topTenSongsArtistsNames = trio.right.filter((_, idx) => idx < TEN).map(pair => pair.artist.name);

                const selectedArtists = trio.center
                    .filter((_, idx) => idx < TEN)
                    .filter(artist => topTenSongsArtistsNames.indexOf(artist.name) !== -1);

                return new Pair<Country, Artist[]>(trio.left, selectedArtists);
            });
    }

    zipPrimeWithValue(numbers: number[], values: Value[]): Pair<number, Value>[] {
        return zip(numbers.filter(isPrime), values);
    }

    every<T, U>(a: T[], b: U[], predicate: (a: T, b: U) => boolean): boolean {
        return zip(a, b)
            .map(pair => predicate(pair.left, pair.right))
            .every(elem => elem);
    }

    find<T>(a: T[], b: T[], predicate: (a: T, b: T) => boolean): T {
        return zip(a, b)
            .map(pair => (predicate(pair.left, pair.right) ? pair.left : undefined))
            .find(elem => elem !== undefined);
    }

    isEveryEven(numbers: number[]): boolean {
        return numbers.every(isEven);
    }

    first(numbers: number[]): number {
        return numbers.find(isOdd);
    }

    flatMapAndReduce(input: number[][]): number {
        return input.flatMap(i => i).reduce((acc, curr) => acc + curr);
    }

    weatherTransitions(input: string[]): number {
        let isOddLine = false;
        let prev: string = undefined;
        return input
            .filter(s => s.charAt(0) !== '#') // Filter comments
            .slice(1) // Skip line: Not available
            .filter(() => {
                const result = isOddLine;
                isOddLine = !isOddLine;
                return result;
            }) // Filter hourly info
            .map(line => line.substring(14, 16))
            .filter(elem => {
                if (prev === undefined || prev !== elem) {
                    prev = elem;
                    return true;
                }
                return false;
            }).length;
    }

    queryMaxTemperature(input: string[]): number {
        let isOddLine = false;
        return Math.max(
            ...input
                .filter(s => s.charAt(0) !== '#') // Filter comments
                .slice(1) // Skip line: Not available
                .filter(() => {
                    const result = isOddLine;
                    isOddLine = !isOddLine;
                    return result;
                }) // Filter hourly info
                .map(line => Number(line.substring(14, 16)))
        );
    }

    queryNrOfDistinctTemperatures(input: string[]): number {
        let isOddLine = false;
        return input
            .filter(s => s.charAt(0) !== '#') // Filter comments
            .slice(1) // Skip line: Not available
            .filter(() => {
                const result = isOddLine;
                isOddLine = !isOddLine;
                return result;
            }) // Filter hourly info
            .map(line => Number(line.substring(14, 16)))
            .filter((value, index, array) => array.indexOf(value) === index).length; // distinct
    }
}
