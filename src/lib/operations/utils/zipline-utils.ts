import {Track} from '../model/track/track';
import {Country} from '../model/country/country';
import {Pair} from '../model/pair';
import {Artist} from '../model/artist/artist';
import {OperationUtils} from './operation-utils';
import {Value} from '../model/wrapper/value';
import {ARTISTS_DATA, COUNTRY_DATA, TRACKS_DATA} from '../data/utils/providers';

export function* filter<T>(source: Iterator<T>, predicate: (elem: T) => boolean): Iterator<T> {
    let iteration = source.next();
    while (!iteration.done) {
        if (predicate(iteration.value)) {
            yield iteration.value;
        }
        iteration = source.next();
    }
}

export function* take<T>(source: Iterator<T>, n: number): Iterator<T> {
    let iteration = source.next();
    let i = 0;
    while (!iteration.done && i < n) {
        yield iteration.value;
        iteration = source.next();
        i++;
    }
}

export function* map<T, U>(source: Iterator<T>, mapper: (elem: T) => U): Iterator<U> {
    let iteration = source.next();
    while (!iteration.done) {
        yield mapper(iteration.value);
        iteration = source.next();
    }
}

export function forEach<T>(source: Iterator<T>, consumer: (elem: T) => void): void {
    let iteration = source.next();
    while (!iteration.done) {
        consumer(iteration.value);
        iteration = source.next();
    }
}

export function toArray<T>(source: Iterator<T>): T[] {
    let iteration = source.next();
    const arr = [];
    while (!iteration.done) {
        arr.push(iteration.value);
        iteration = source.next();
    }
    return arr;
}

export class ZiplineUtils extends OperationUtils {
    public getTracks(): Iterator<Pair<Country, Iterator<Track>>> {
        return map(
            filter(
                filter(COUNTRY_DATA.asIterable(), elem => this.isNonEnglishSpeaking(elem)),
                country => TRACKS_DATA.hasDataForCountry(country.name)
            ),
            country => Pair.with(country, TRACKS_DATA.asIterable(country.name))
        );
    }

    public getArtists(): Iterator<Pair<Country, Iterator<Artist>>> {
        return map(
            filter(
                filter(COUNTRY_DATA.asIterable(), elem => this.isNonEnglishSpeaking(elem)),
                country => ARTISTS_DATA.hasDataForCountry(country.name)
            ),
            country => Pair.with(country, ARTISTS_DATA.asIterable(country.name))
        );
    }

    public isNonEnglishSpeaking(country: Country): boolean {
        return country.languages.map(lang => lang.iso639_1).find(elem => elem === 'en') === undefined;
    }

    getNumbers(): Iterator<number> {
        return this.numbers.asIterable();
    }

    getEven(): Iterator<number> {
        return this.even.asIterable();
    }

    getStrings(): Iterator<string> {
        return map(this.numbers.asIterable(), v => `${v}`);
    }

    getEvenExceptStart(): Iterator<number> {
        return this.evenExceptStart.asIterable();
    }

    getEvenExceptMiddle(): Iterator<number> {
        return this.evenExceptMiddle.asIterable();
    }

    getEvenExceptEnd(): Iterator<number> {
        return this.evenExceptEnd.asIterable();
    }

    getValues(): Iterator<Value> {
        return this.values.asIterable();
    }
}
