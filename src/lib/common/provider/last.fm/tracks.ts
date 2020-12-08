import {Countries} from '../rest.countries/countries';
import {Track} from '../../model/track/track';
import {loadData} from './utils';

export class Tracks {
    public readonly data: {[key: string]: Track[]};

    constructor(provider: Countries) {
        this.data = provider.data.map(country => loadData<Track>('tracks', country)).reduce(Object.assign, {});
    }

    hasDataForCountry(country: string): boolean {
        return this.data[country] !== undefined && this.data[country].length > 0;
    }
}
