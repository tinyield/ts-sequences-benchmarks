import {AsyncFileDataProvider} from '../../providers/async/async-file-data-provider';
import {WEATHER_FILE} from './constants';
import {NumberTinyield, Tinyield} from 'tinyield4ts';

export class TinyieldWeatherService {
    constructor(private readonly source: Tinyield<string> = AsyncFileDataProvider.tinyield(WEATHER_FILE)) {}

    get(): Tinyield<string> {
        return this.source;
    }

    max(): number {
        let odd = false;
        return NumberTinyield.from(
            this.get()
                .filter(line => line.charAt(0) !== '#')
                .filter(() => {
                    odd = !odd;
                    return odd;
                })
                .map(line => Number.parseInt(line.substring(14, 16), 10))
                .filter(value => !isNaN(value))
        ).max();
    }
}
