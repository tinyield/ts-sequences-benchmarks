import {Track} from '../model/track/track';
import {Country} from '../model/country/country';
import {Pair} from '../model/pair';
import {Artist} from '../model/artist/artist';
import {OperationUtils} from './operation-utils';
import {Value} from '../model/wrapper/value';
import * as Lazy from 'lazy.js';
import {ARTISTS_DATA, COUNTRY_DATA, TRACKS_DATA} from '../data/utils/providers';

export class LazyUtils extends OperationUtils {
    public getTracks(): LazyJS.Sequence<Pair<Country, LazyJS.Sequence<Track>>> {
        return COUNTRY_DATA.asLazy()
            .filter(elem => this.isNonEnglishSpeaking(elem))
            .filter(country => TRACKS_DATA.hasDataForCountry(country.name))
            .map(country => Pair.with(country, TRACKS_DATA.asLazy(country.name)));
    }

    public getArtists(): LazyJS.Sequence<Pair<Country, LazyJS.Sequence<Artist>>> {
        return COUNTRY_DATA.asLazy()
            .filter(elem => this.isNonEnglishSpeaking(elem))
            .filter(country => ARTISTS_DATA.hasDataForCountry(country.name))
            .map(country => Pair.with(country, ARTISTS_DATA.asLazy(country.name)));
    }

    public isNonEnglishSpeaking(country: Country): boolean {
        return !Lazy(country.languages)
            .map(value => value.iso639_1)
            .some(elem => elem === 'en');
    }

    getNumbers(): LazyJS.Sequence<number> {
        return this.numbers.asLazy();
    }

    getEven(): LazyJS.Sequence<number> {
        return this.even.asLazy();
    }

    getStrings(): LazyJS.Sequence<string> {
        return this.numbers.asLazy().map(v => `${v}`);
    }

    getEvenExceptStart(): LazyJS.Sequence<number> {
        return this.evenExceptStart.asLazy();
    }

    getEvenExceptMiddle(): LazyJS.Sequence<number> {
        return this.evenExceptMiddle.asLazy();
    }

    getEvenExceptEnd(): LazyJS.Sequence<number> {
        return this.evenExceptEnd.asLazy();
    }

    getValues(): LazyJS.Sequence<Value> {
        return this.values.asLazy();
    }

    getNested(): LazyJS.Sequence<LazyJS.Sequence<number>> {
        return this.nested.asLazy();
    }
}
