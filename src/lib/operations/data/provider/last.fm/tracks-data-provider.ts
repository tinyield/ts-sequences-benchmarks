import {AbstractCountryBasedDataProvider} from '../abstract country-based-data-provider';
import {CountriesDataProvider} from '../rest.countries/countries-data-provider';
import {Track} from '../../../model/track/track';
import {loadData} from './utils';

export class TracksDataProvider extends AbstractCountryBasedDataProvider<Track> {
    private static _INSTANCE: TracksDataProvider;
    protected readonly data: {[key: string]: Track[]};

    private constructor(provider: CountriesDataProvider) {
        super();
        this.data = provider
            .asQuery()
            .map(country => loadData<Track>('tracks', country))
            .reduce(Object.assign, {});
    }

    public static instance(provider: CountriesDataProvider): TracksDataProvider {
        if (TracksDataProvider._INSTANCE === undefined) {
            TracksDataProvider._INSTANCE = new TracksDataProvider(provider);
        }
        return TracksDataProvider._INSTANCE;
    }
}
