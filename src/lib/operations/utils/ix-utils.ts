import {Track} from '../model/track/track';
import {Country} from '../model/country/country';
import {Pair} from '../model/pair';
import {Artist} from '../model/artist/artist';
import {OperationUtils} from './operation-utils';
import {Value} from '../model/wrapper/value';
import {filter, IterableX, map} from 'ix/iterable';
import 'ix/add/iterable-operators/some';
import {ARTISTS_DATA, COUNTRY_DATA, TRACKS_DATA} from '../data/utils/providers';

export class IxUtils extends OperationUtils {
    public getTracks(): IterableX<Pair<Country, IterableX<Track>>> {
        return COUNTRY_DATA.asIx().pipe(
            source => filter(source, elem => this.isNonEnglishSpeaking(elem)),
            source => filter(source, country => TRACKS_DATA.hasDataForCountry(country.name)),
            source => map(source, country => Pair.with(country, TRACKS_DATA.asIx(country.name)))
        );
    }

    public getArtists(): IterableX<Pair<Country, IterableX<Artist>>> {
        return COUNTRY_DATA.asIx().pipe(
            source => filter(source, elem => this.isNonEnglishSpeaking(elem)),
            source => filter(source, country => ARTISTS_DATA.hasDataForCountry(country.name)),
            source => map(source, country => Pair.with(country, ARTISTS_DATA.asIx(country.name)))
        );
    }

    public isNonEnglishSpeaking(country: Country): boolean {
        return !IterableX.of(...country.languages)
            .pipe(source => map(source, value => value.iso639_1))
            .some(elem => elem === 'en');
    }

    getNumbers(): IterableX<number> {
        return this.numbers.asIx();
    }

    getStrings(): IterableX<string> {
        return this.numbers.asIx().map(v => `${v}`);
    }

    getEven(): IterableX<number> {
        return this.even.asIx();
    }

    getEvenExceptStart(): IterableX<number> {
        return this.evenExceptStart.asIx();
    }

    getEvenExceptMiddle(): IterableX<number> {
        return this.evenExceptMiddle.asIx();
    }

    getEvenExceptEnd(): IterableX<number> {
        return this.evenExceptEnd.asIx();
    }

    getValues(): IterableX<Value> {
        return this.values.asIx();
    }

    getNested(): IterableX<IterableX<number>> {
        return this.nested.asIx();
    }
}
