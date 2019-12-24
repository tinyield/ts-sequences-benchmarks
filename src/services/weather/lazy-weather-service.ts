import 'ix/add/iterable-operators/filter';
import 'ix/add/iterable-operators/map';
import 'ix/add/iterable-operators/max';
import ArrayLikeSequence = LazyJS.ArrayLikeSequence;

export class LazyWeatherService {
    public static max(source: ArrayLikeSequence<string>): number {
        return source
            .filter(line => line.charAt(0) !== '#')
            .filter((value, index) => Number(index) % 2 === 0)
            .map(line => Number.parseInt(line.substring(14, 16), 10))
            .filter(value => !isNaN(value))
            .max();
    }
}
