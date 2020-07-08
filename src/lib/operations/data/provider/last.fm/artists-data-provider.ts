import {Artist} from '../../../model/artist/artist';
import {AbstractCountryBasedDataProvider} from '../abstract country-based-data-provider';
import {CountriesDataProvider} from '../rest.countries/countries-data-provider';
import {loadData} from './utils';

export class ArtistsDataProvider extends AbstractCountryBasedDataProvider<Artist> {
    private static _INSTANCE: ArtistsDataProvider;
    protected readonly data: {[key: string]: Artist[]};

    private constructor(provider: CountriesDataProvider) {
        super();
        this.data = provider
            .asQuery()
            .map(country => loadData<Artist>('artists', country))
            .reduce(Object.assign, {});
    }

    public static instance(provider: CountriesDataProvider): ArtistsDataProvider {
        if (ArtistsDataProvider._INSTANCE === undefined) {
            ArtistsDataProvider._INSTANCE = new ArtistsDataProvider(provider);
        }
        return ArtistsDataProvider._INSTANCE;
    }
}
