import {AbstractBaseDataProvider} from '../abstract-base-data-provider';
import * as fs from 'fs';

export class WeatherDataProvider extends AbstractBaseDataProvider<string> {
    protected readonly data: string[];
    private static _INSTANCE: WeatherDataProvider;

    constructor() {
        super();
        this.data = fs
            .readFileSync(`${__dirname}/../../../../../assets/weather.csv`)
            .toString()
            .split('\n');
    }

    public static instance(): WeatherDataProvider {
        if (WeatherDataProvider._INSTANCE === undefined) {
            WeatherDataProvider._INSTANCE = new WeatherDataProvider();
        }
        return WeatherDataProvider._INSTANCE;
    }
}
