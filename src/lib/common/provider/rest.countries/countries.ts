import {Country} from '../../model/country/country';
import * as countries from '../../../../assets/countries.json';

export class Countries {
    public readonly data: Country[];

    constructor() {
        this.data = countries;
    }
}
