import {AbstractSequenceBenchmark} from '../abstract-sequence-benchmark';
import {WeatherDataProvider} from '../operations/data/provider/weather/weather-data-provider';
import {blackhole} from '../utils/benchmark-utils';

export class QueryMaxTemperature extends AbstractSequenceBenchmark {
    private readonly provider: WeatherDataProvider;

    constructor() {
        super();
        this.provider = WeatherDataProvider.instance();
    }

    name(): string {
        return 'Query Max Temperature Benchmark';
    }

    ix(): void {
        blackhole(this.ixOps.queryMaxTemperature(this.provider.asIx()));
    }

    lazy(): void {
        blackhole(this.lazyOps.queryMaxTemperature(this.provider.asLazy()));
    }

    lodash(): void {
        blackhole(this.lodashOps.queryMaxTemperature(this.provider.asLodash()));
    }

    sequency(): void {
        blackhole(this.sequencyOps.queryMaxTemperature(this.provider.asSequency()));
    }

    tinyield(): void {
        blackhole(this.tinyieldOps.queryMaxTemperature(this.provider.asQuery()));
    }

    underscore(): void {
        blackhole(this.underscoreOps.queryMaxTemperature(this.provider.asUnderscore()));
    }

    arrays(): void {
        blackhole(this.arrayOps.queryMaxTemperature(this.provider.asArray()));
    }
}
