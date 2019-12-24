import {AsyncFileDataProvider} from '../../providers/async/async-file-data-provider';
import {Observable} from 'rxjs';
import {filter, map, reduce} from 'rxjs/operators';
import {WEATHER_FILE} from './constants';

export class AsyncPushWeatherService {
    constructor(private readonly source: Observable<string> = AsyncFileDataProvider.observable(WEATHER_FILE)) {}

    get(): Observable<string> {
        return this.source;
    }

    max(): Promise<number> {
        return this.get()
            .pipe(
                filter(line => line.charAt(0) !== '#'),
                filter((value, index) => index % 2 === 0),
                map(line => Number.parseInt(line.substring(14, 16), 10)),
                filter(value => !isNaN(value)),
                reduce((previous, current) => {
                    if (previous > current) {
                        return previous;
                    } else {
                        return current;
                    }
                }, 0)
            )
            .toPromise();
    }
}
