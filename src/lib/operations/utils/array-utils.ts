import {Track} from '../model/track/track';
import {Country} from '../model/country/country';
import {Pair} from '../model/pair';
import {Artist} from '../model/artist/artist';
import {OperationUtils} from './operation-utils';
import {Value} from '../model/wrapper/value';
import {ARTISTS_DATA, COUNTRY_DATA, TRACKS_DATA} from '../data/utils/providers';

export class ArrayUtils extends OperationUtils {
    public getTracks(): Pair<Country, Track[]>[] {
        return COUNTRY_DATA.asArray()
            .filter(elem => this.isNonEnglishSpeaking(elem))
            .filter(country => TRACKS_DATA.hasDataForCountry(country.name))
            .map(country => Pair.with(country, TRACKS_DATA.asArray(country.name)));
    }

    public getArtists(): Pair<Country, Artist[]>[] {
        return COUNTRY_DATA.asArray()
            .filter(elem => this.isNonEnglishSpeaking(elem))
            .filter(country => ARTISTS_DATA.hasDataForCountry(country.name))
            .map(country => Pair.with(country, ARTISTS_DATA.asArray(country.name)));
    }

    public isNonEnglishSpeaking(country: Country): boolean {
        return country.languages.map(lang => lang.iso639_1).find(elem => elem === 'en') === undefined;
    }

    getNumbers(): number[] {
        return this.numbers.asArray();
    }

    getEven(): number[] {
        return this.even.asArray();
    }

    getStrings(): string[] {
        return this.numbers.asArray().map(v => `${v}`);
    }

    getEvenExceptStart(): number[] {
        return this.evenExceptStart.asArray();
    }

    getEvenExceptMiddle(): number[] {
        return this.evenExceptMiddle.asArray();
    }

    getEvenExceptEnd(): number[] {
        return this.evenExceptEnd.asArray();
    }

    getValues(): Value[] {
        return this.values.asArray();
    }

    getNested(): number[][] {
        return this.nested.asArray();
    }
}
