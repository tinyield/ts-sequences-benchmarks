import {Track} from '../model/track/track';
import {Country} from '../model/country/country';
import {Pair} from '../model/pair';
import {Artist} from '../model/artist/artist';
import {OperationUtils} from './operation-utils';
import {Value} from '../model/wrapper/value';
import * as _ from 'lodash';
import {ARTISTS_DATA, COUNTRY_DATA, TRACKS_DATA} from '../data/utils/providers';

export class LodashUtils extends OperationUtils {
    public getTracks(): _.CollectionChain<Pair<Country, _.CollectionChain<Track>>> {
        return COUNTRY_DATA.asLodash()
            .filter(elem => this.isNonEnglishSpeaking(elem))
            .filter(country => TRACKS_DATA.hasDataForCountry(country.name))
            .map(country => Pair.with(country, TRACKS_DATA.asLodash(country.name)));
    }

    public getArtists(): _.CollectionChain<Pair<Country, _.CollectionChain<Artist>>> {
        return COUNTRY_DATA.asLodash()
            .filter(elem => this.isNonEnglishSpeaking(elem))
            .filter(country => ARTISTS_DATA.hasDataForCountry(country.name))
            .map(country => Pair.with(country, ARTISTS_DATA.asLodash(country.name)));
    }

    public isNonEnglishSpeaking(country: Country): boolean {
        return !_.chain(country.languages)
            .map(value => value.iso639_1)
            .some(elem => elem === 'en')
            .value();
    }

    getNumbers(): _.CollectionChain<number> {
        return this.numbers.asLodash();
    }

    getEven(): _.CollectionChain<number> {
        return this.even.asLodash();
    }

    getStrings(): _.CollectionChain<string> {
        return this.numbers.asLodash().map(v => `${v}`);
    }

    getEvenExceptStart(): _.CollectionChain<number> {
        return this.evenExceptStart.asLodash();
    }

    getEvenExceptMiddle(): _.CollectionChain<number> {
        return this.evenExceptMiddle.asLodash();
    }

    getEvenExceptEnd(): _.CollectionChain<number> {
        return this.evenExceptEnd.asLodash();
    }

    getValues(): _.CollectionChain<Value> {
        return this.values.asLodash();
    }

    getNested(): _.CollectionChain<_.CollectionChain<number>> {
        return this.nested.asLodash();
    }
}
