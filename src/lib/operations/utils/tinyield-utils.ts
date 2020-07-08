import {Track} from '../model/track/track';
import {Country} from '../model/country/country';
import {Pair} from '../model/pair';
import {Query} from 'tinyield4ts';
import {Artist} from '../model/artist/artist';
import {OperationUtils} from './operation-utils';
import {Value} from '../model/wrapper/value';
import {ARTISTS_DATA, COUNTRY_DATA, TRACKS_DATA} from '../data/utils/providers';

export class TinyieldUtils extends OperationUtils {
    public getTracks(): Query<Pair<Country, Query<Track>>> {
        return COUNTRY_DATA.asQuery()
            .filter(elem => this.isNonEnglishSpeaking(elem))
            .filter(country => TRACKS_DATA.hasDataForCountry(country.name))
            .map(country => Pair.with(country, TRACKS_DATA.asQuery(country.name)));
    }

    public getArtists(): Query<Pair<Country, Query<Artist>>> {
        return COUNTRY_DATA.asQuery()
            .filter(elem => this.isNonEnglishSpeaking(elem))
            .filter(country => ARTISTS_DATA.hasDataForCountry(country.name))
            .map(country => Pair.with(country, ARTISTS_DATA.asQuery(country.name)));
    }

    public isNonEnglishSpeaking(country: Country): boolean {
        return Query.of(country.languages)
            .map(lang => lang.iso639_1)
            .noneMatch(elem => elem === 'en');
    }

    getNumbers(): Query<number> {
        return this.numbers.asQuery();
    }

    getEven(): Query<number> {
        return this.even.asQuery();
    }

    getStrings(): Query<string> {
        return this.numbers.asQuery().map(v => `${v}`);
    }

    getEvenExceptStart(): Query<number> {
        return this.evenExceptStart.asQuery();
    }

    getEvenExceptMiddle(): Query<number> {
        return this.evenExceptMiddle.asQuery();
    }

    getEvenExceptEnd(): Query<number> {
        return this.evenExceptEnd.asQuery();
    }

    getValues(): Query<Value> {
        return this.values.asQuery();
    }

    getNested(): Query<Query<number>> {
        return this.nested.asQuery();
    }
}
