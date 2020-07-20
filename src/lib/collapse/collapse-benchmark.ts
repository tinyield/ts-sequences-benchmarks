import {AbstractSequenceBenchmark} from '../abstract-sequence-benchmark';
import {WeatherDataProvider} from '../operations/data/provider/weather/weather-data-provider';
import {blackhole} from '../utils/benchmark-utils';

export class CollapseBenchmark extends AbstractSequenceBenchmark {
    private readonly provider: WeatherDataProvider;

    constructor() {
        super();
        this.provider = WeatherDataProvider.instance();
    }

    name(): string {
        return 'Collapse Benchmark';
    }

    ix(): void {
        blackhole(this.ixOps.weatherTransitions(this.provider.asIx()));
    }

    lazy(): void {
        blackhole(this.lazyOps.weatherTransitions(this.provider.asLazy()));
    }

    lodash(): void {
        blackhole(this.lodashOps.weatherTransitions(this.provider.asLodash()));
    }

    sequency(): void {
        blackhole(this.sequencyOps.weatherTransitions(this.provider.asSequency()));
    }

    tinyield(): void {
        blackhole(this.tinyieldOps.weatherTransitions(this.provider.asQuery()));
    }

    underscore(): void {
        blackhole(this.underscoreOps.weatherTransitions(this.provider.asUnderscore()));
    }

    arrays(): void {
        blackhole(this.arrayOps.weatherTransitions(this.provider.asArray()));
    }
}
