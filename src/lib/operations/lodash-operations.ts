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
import * as _ from 'lodash';

export class LodashOperations {
    public static readonly NAME = 'Lodash';

    zipTopArtistAndTrackByCountry(
        artists: _.CollectionChain<Pair<Country, _.CollectionChain<Artist>>>,
        tracks: _.CollectionChain<Pair<Country, _.CollectionChain<Track>>>
    ): _.CollectionChain<Triplet<Country, Artist, Track>> {
        return artists
            .zipWith(tracks.value(), (pair1, pair2) => {
                return new Triplet(pair1.left, pair1.right.first().value(), pair2.right.first().value());
            })
            .uniqBy(elem => elem.center.mbid);
    }

    artistsInTopTenWithTopTenTracksByCountry(
        artists: _.CollectionChain<Pair<Country, _.CollectionChain<Artist>>>,
        tracks: _.CollectionChain<Pair<Country, _.CollectionChain<Track>>>
    ): _.CollectionChain<Pair<Country, Artist[]>> {
        return artists
            .zipWith(tracks.value(), (pair1, pair2) => {
                return new Triplet(pair1.left, pair1.right, pair2.right);
            })
            .map(trio => {
                const topTenSongsArtistsNames = trio.right
                    .take(TEN)
                    .map(pair => pair.artist.name)
                    .toArray()
                    .value();

                const selectedArtists = trio.center
                    .take(TEN)
                    .filter(artist => topTenSongsArtistsNames.indexOf(artist.name) !== -1)
                    .toArray()
                    .value();

                return new Pair<Country, Artist[]>(trio.left, selectedArtists);
            });
    }

    zipPrimeWithValue(numbers: _.CollectionChain<number>, values: _.CollectionChain<Value>): _.CollectionChain<Pair<number, Value>> {
        return numbers.filter(isPrime).zipWith(values.value(), (elem1, elem2) => new Pair(elem1, elem2));
    }

    isEveryEven(numbers: _.CollectionChain<number>): boolean {
        return numbers.every(isEven).value();
    }

    first(numbers: _.CollectionChain<number>): number {
        return numbers
            .filter(isOdd)
            .first()
            .value();
    }

    every<T, U>(a: _.CollectionChain<T>, b: _.CollectionChain<U>, predicate: (a: T, b: U) => boolean): boolean {
        return a
            .zipWith(b.value(), predicate)
            .every(elem => elem)
            .value();
    }

    find<T>(a: _.CollectionChain<T>, b: _.CollectionChain<T>, predicate: (a: T, b: T) => boolean): T {
        return a
            .zipWith(b.value(), (elem1, elem2) => (predicate(elem1, elem2) ? elem1 : undefined))
            .filter(elem => elem !== undefined)
            .first()
            .value() as T;
    }

    flatMapAndReduce(input: _.CollectionChain<_.CollectionChain<number>>): number {
        return input
            .flatMap(i => i.value())
            .reduce((acc, curr) => acc + curr)
            .value();
    }
}
