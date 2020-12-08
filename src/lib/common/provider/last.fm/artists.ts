import {Artist} from '../../model/artist/artist';
import {Countries} from '../rest.countries/countries';
import {loadData} from './utils';

export class Artists {
    public readonly data: {[key: string]: Artist[]};

    constructor(provider: Countries) {
        this.data = provider.data.map(country => loadData<Artist>('artists', country)).reduce(Object.assign, {});
    }

    hasDataForCountry(country: string): boolean {
        return this.data[country] !== undefined && this.data[country].length > 0;
    }
}
