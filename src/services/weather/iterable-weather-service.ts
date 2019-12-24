import {IterableX} from 'ix/iterable';
import 'ix/add/iterable-operators/filter';
import 'ix/add/iterable-operators/map';
import 'ix/add/iterable-operators/max';

export class IterableWeatherService {
    public static max(source: IterableX<string>): number {
        return source
            .filter(line => line.charAt(0) !== '#')
            .filter((value, index) => index % 2 === 0)
            .map(line => Number.parseInt(line.substring(14, 16), 10))
            .filter(value => !isNaN(value))
            .max();
    }
}
