import {AbstractBaseDataProvider} from '../abstract-base-data-provider';
import {Country} from '../../../model/country/country';
import * as countries from '../../../../../assets/countries.json';

export class CountriesDataProvider extends AbstractBaseDataProvider<Country> {
    protected readonly data: Country[];
    private static _INSTANCE: CountriesDataProvider;

    private constructor() {
        super();
        this.data = countries;
    }

    public static instance(): CountriesDataProvider {
        if (CountriesDataProvider._INSTANCE === undefined) {
            CountriesDataProvider._INSTANCE = new CountriesDataProvider();
        }
        return CountriesDataProvider._INSTANCE;
    }
}
