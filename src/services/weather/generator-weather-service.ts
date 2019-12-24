export class GeneratorWeatherService {
    public static max(generator: IterableIterator<string>): number {
        let result: number;
        let index = 0;
        let current;
        while (!(current = generator.next()).done) {
            if (current.value.charAt(0) !== '#') {
                if (index % 2 === 0) {
                    const value = Number.parseInt(current.value.substring(14, 16), 10);
                    if (!isNaN(value) && (!result || result < value)) {
                        result = value;
                    }
                }
                index++;
            }
        }
        return result;
    }
}
