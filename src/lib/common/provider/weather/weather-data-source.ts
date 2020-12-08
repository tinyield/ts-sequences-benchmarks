import * as fs from 'fs';

export class WeatherDataSource {
    public readonly data: string[];

    constructor() {
        this.data = fs
            .readFileSync(`${__dirname}/../../../../assets/weather.csv`)
            .toString()
            .split('\n');
    }
}
