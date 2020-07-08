import {Track} from '../model/track/track';
import {Country} from '../model/country/country';
import {Pair} from '../model/pair';
import {Artist} from '../model/artist/artist';
import {OperationUtils} from './operation-utils';
import {Value} from '../model/wrapper/value';
import * as _ from 'underscore';
import {ARTISTS_DATA, COUNTRY_DATA, TRACKS_DATA} from '../data/utils/providers';

export class UnderscoreUtils extends OperationUtils {
    public getTracks(): _._Chain<Pair<Country, _._Chain<Track, Track[]>>, Pair<Country, _._Chain<Track, Track[]>>[]> {
        return COUNTRY_DATA.asUnderscore()
            .filter(elem => this.isNonEnglishSpeaking(elem))
            .filter(country => TRACKS_DATA.hasDataForCountry(country.name))
            .map(country => Pair.with(country, TRACKS_DATA.asUnderscore(country.name)));
    }

    public getArtists(): _._Chain<Pair<Country, _._Chain<Artist, Artist[]>>, Pair<Country, _._Chain<Artist, Artist[]>>[]> {
        return COUNTRY_DATA.asUnderscore()
            .filter(elem => this.isNonEnglishSpeaking(elem))
            .filter(country => ARTISTS_DATA.hasDataForCountry(country.name))
            .map(country => Pair.with(country, ARTISTS_DATA.asUnderscore(country.name)));
    }

    public isNonEnglishSpeaking(country: Country): boolean {
        return !_.chain(country.languages)
            .map(value => value.iso639_1)
            .some(elem => elem === 'en')
            .value();
    }

    getNumbers(): _._Chain<number, number[]> {
        return this.numbers.asUnderscore();
    }

    getEven(): _._Chain<number, number[]> {
        return this.even.asUnderscore();
    }

    getStrings(): _._Chain<string, string[]> {
        return this.numbers.asUnderscore().map(v => `${v}`);
    }

    getEvenExceptStart(): _._Chain<number, number[]> {
        return this.evenExceptStart.asUnderscore();
    }

    getEvenExceptMiddle(): _._Chain<number, number[]> {
        return this.evenExceptMiddle.asUnderscore();
    }

    getEvenExceptEnd(): _._Chain<number, number[]> {
        return this.evenExceptEnd.asUnderscore();
    }

    getValues(): _._Chain<Value, Value[]> {
        return this.values.asUnderscore();
    }

    getNested(): _._Chain<_._Chain<number, number[]>, _._Chain<number, number[]>[]> {
        return this.nested.asUnderscore();
    }
}
