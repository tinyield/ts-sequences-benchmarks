import {AsyncFileDataProvider} from '../../providers/async/async-file-data-provider';
import {WEATHER_FILE} from './constants';
import {AsyncIterable} from 'ix/Ix';

export class AsyncPullWeatherService {
    constructor(private readonly source: AsyncIterable<string> = AsyncFileDataProvider.iterable(WEATHER_FILE)) {}

    get(): AsyncIterable<string> {
        return this.source;
    }

    max(): Promise<number> {
        return this.get()
            .filter(line => line.charAt(0) !== '#')
            .filter((value, index) => index % 2 === 0)
            .map(line => Number.parseInt(line.substring(14, 16), 10))
            .filter(value => !isNaN(value))
            .max();
    }
}
