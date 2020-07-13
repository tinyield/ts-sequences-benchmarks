import {Track} from '../model/track/track';
import {Country} from '../model/country/country';
import {Pair} from '../model/pair';
import {Artist} from '../model/artist/artist';
import {OperationUtils} from './operation-utils';
import {Value} from '../model/wrapper/value';
import {ARTISTS_DATA, COUNTRY_DATA, TRACKS_DATA} from '../data/utils/providers';
import Sequence, {asSequence} from 'sequency';

export class SequencyUtils extends OperationUtils {
    public getTracks(): Sequence<Pair<Country, Sequence<Track>>> {
        return COUNTRY_DATA.asSequency()
            .filter(elem => this.isNonEnglishSpeaking(elem))
            .filter(country => TRACKS_DATA.hasDataForCountry(country.name))
            .map(country => Pair.with(country, TRACKS_DATA.asSequency(country.name)));
    }

    public getArtists(): Sequence<Pair<Country, Sequence<Artist>>> {
        return COUNTRY_DATA.asSequency()
            .filter(elem => this.isNonEnglishSpeaking(elem))
            .filter(country => ARTISTS_DATA.hasDataForCountry(country.name))
            .map(country => Pair.with(country, ARTISTS_DATA.asSequency(country.name)));
    }

    public isNonEnglishSpeaking(country: Country): boolean {
        return asSequence(country.languages)
            .map(lang => lang.iso639_1)
            .none(elem => elem === 'en');
    }

    getNumbers(): Sequence<number> {
        return this.numbers.asSequency();
    }

    getEven(): Sequence<number> {
        return this.even.asSequency();
    }

    getStrings(): Sequence<string> {
        return this.numbers.asSequency().map(v => `${v}`);
    }

    getEvenExceptStart(): Sequence<number> {
        return this.evenExceptStart.asSequency();
    }

    getEvenExceptMiddle(): Sequence<number> {
        return this.evenExceptMiddle.asSequency();
    }

    getEvenExceptEnd(): Sequence<number> {
        return this.evenExceptEnd.asSequency();
    }

    getValues(): Sequence<Value> {
        return this.values.asSequency();
    }

    getNested(): Sequence<Sequence<number>> {
        return this.nested.asSequency();
    }
}
