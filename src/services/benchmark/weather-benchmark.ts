import {assert, BenchmarkUtils} from './benchmark-utils';
import {AsyncPushWeatherService} from '../weather/async-push-weather-service';
import {AsyncPullWeatherService} from '../weather/async-pull-weather-service';
import {AsyncInMemoryDataProvider} from '../../providers/async/async-in-memory-data-provider';
import {AsyncFileDataProvider} from '../../providers/async/async-file-data-provider';
import {WEATHER_FILE} from '../weather/constants';
import {InMemoryDataProvider} from '../../providers/sync/in-memory-data-provider';
import {FileDataProvider} from '../../providers/sync/file-data-provider';
import {GeneratorWeatherService} from '../weather/generator-weather-service';
import {IterableWeatherService} from '../weather/iterable-weather-service';
import {LazyWeatherService} from '../weather/lazy-weather-service';
import {TinyieldWeatherService} from '../weather/tinyield-weather-service';

export class WeatherBenchmark {
    public static benchmarkMaxAsync(): Promise<void> {
        const expected = 27;
        const options = BenchmarkUtils.asyncOptions();
        const provider = new AsyncInMemoryDataProvider(AsyncFileDataProvider.observable(WEATHER_FILE));
        console.log('setting up...');
        return provider.hasLoadedData().then(() => {
            console.log('setup complete!\n\n');
            return new Promise(resolve =>
                BenchmarkUtils.getSuite()
                    .add(
                        'Async Push Sequence',
                        (deferred: any) =>
                            new AsyncPushWeatherService(provider.observable()).max().then(actual => {
                                assert(actual, expected);
                                deferred.resolve();
                            }),
                        options
                    )
                    .add(
                        'Async Pull Sequence',
                        (deferred: any) =>
                            new AsyncPullWeatherService(provider.iterable()).max().then(actual => {
                                assert(actual, expected);
                                deferred.resolve();
                            }),
                        options
                    )
                    .add(
                        'Tinyield Sequence',
                        (deferred: any) => {
                            assert(new TinyieldWeatherService(provider.tinyield()).max(), expected);
                            deferred.resolve();
                        },
                        options
                    )
                    .on('complete', () => resolve())
                    .run(options)
            );
        });
    }

    public static benchmarkMax(): void {
        console.log('setting up...');
        const expected = 27;
        const options = BenchmarkUtils.options();
        const data = FileDataProvider.get(WEATHER_FILE);
        console.log('setup complete!\n\n');

        BenchmarkUtils.getSuite()
            .add('Generator Sequence', () => assert(GeneratorWeatherService.max(InMemoryDataProvider.generator(data)), expected), options)
            .add('Iterable Sequence', () => assert(IterableWeatherService.max(InMemoryDataProvider.iterable(data)), expected), options)
            .add('Lazy Sequence', () => assert(LazyWeatherService.max(InMemoryDataProvider.lazy(data)), expected), options)
            .run(options);
    }
}
