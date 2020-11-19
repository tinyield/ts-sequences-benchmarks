import {AbstractSequenceBenchmark} from '../abstract-sequence-benchmark';
import {WeatherDataProvider} from '../operations/data/provider/weather/weather-data-provider';
import {blackhole} from '../utils/benchmark-utils';

export class QueryNrOfDistinctTemperatures extends AbstractSequenceBenchmark {
    private readonly provider: WeatherDataProvider;

    constructor() {
        super();
        this.provider = WeatherDataProvider.instance();
    }

    name(): string {
        return 'Query Number of Distinct Temperatures Benchmark';
    }

    ix(): void {
        blackhole(this.ixOps.queryNrOfDistinctTemperatures(this.provider.asIx()));
    }

    lazy(): void {
        blackhole(this.lazyOps.queryNrOfDistinctTemperatures(this.provider.asLazy()));
    }

    lodash(): void {
        blackhole(this.lodashOps.queryNrOfDistinctTemperatures(this.provider.asLodash()));
    }

    sequency(): void {
        blackhole(this.sequencyOps.queryNrOfDistinctTemperatures(this.provider.asSequency()));
    }

    tinyield(): void {
        blackhole(this.tinyieldOps.queryNrOfDistinctTemperatures(this.provider.asQuery()));
    }

    underscore(): void {
        blackhole(this.underscoreOps.queryNrOfDistinctTemperatures(this.provider.asUnderscore()));
    }

    arrays(): void {
        blackhole(this.arrayOps.queryNrOfDistinctTemperatures(this.provider.asArray()));
    }
}
