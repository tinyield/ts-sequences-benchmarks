import {WeatherDataSource} from '../common/provider/weather/weather-data-source';
import {getSuite, options} from '../utils/benchmark-utils';
import {Benchmark} from '../benchmark';
import {IterableX} from 'ix/iterable';
import * as Lazy from 'lazy.js';
import * as _ from 'lodash';
import {asSequence} from 'sequency';
import {Query} from 'tinyield4ts';
import * as __ from 'underscore';

import 'ix/add/iterable-operators/filter';
import 'ix/add/iterable-operators/skip';
import 'ix/add/iterable-operators/map';
import 'ix/add/iterable-operators/count';
import {ARRAYS, IX, LAZY, LODASH, SEQUENCY, TINYIELD, UNDERSCORE} from '../common/constants';

/* importing user-defined extensions of API's */
import {CollapseIterable, OddLinesIterable} from '../common/extensions/ix-extensions';
import '../common/extensions/lazy-extensions';
import '../common/extensions/lodash-extensions';
import '../common/extensions/sequency-extensions';
import {collapse, oddLines} from '../common/extensions/tinyield-extensions';
import '../common/extensions/underscore-extensions';

export class QueryNrOfTemperatureTransitions implements Benchmark {
    public src: WeatherDataSource;

    setup(): void {
        this.src = new WeatherDataSource();
    }

    name(): string {
        return 'Query Number of Temperature Transitions Benchmark';
    }

    ix(): number {
        return IterableX.as(
            new CollapseIterable(
                IterableX.as(
                    new OddLinesIterable(
                        IterableX.of(...this.src.data)
                            .filter(s => s.charAt(0) !== '#') // Filter comments
                            .skip(1)
                    )
                ).map(line => line.substring(14, 16))
            )
        ).count();
    }

    lazy(): number {
        return (Lazy(this.src.data)
            .filter(s => s.charAt(0) !== '#') // Filter comments
            .rest(1) as any) // Skip line: Not available
            .oddLines() // Filter hourly info
            .map((line: string) => line.substring(14, 16))
            .collapse()
            .size();
    }

    lodash(): number {
        return ((_.chain(this.src.data)
            .filter(s => s.charAt(0) !== '#')
            .drop(1) as any)
            .oddLines()
            .map((line: string) => line.substring(14, 16))
            .collapse() as _.CollectionChain<string>)
            .size()
            .value();
    }

    sequency(): number {
        return (asSequence(this.src.data)
            .filter(s => s.charAt(0) !== '#')
            .drop(1) as any) // Skip line: Not available
            .oddLines() // Filter hourly info
            .map((line: string) => line.substring(14, 16))
            .collapse()
            .count();
    }

    tinyield(): number {
        return Query.of(this.src.data)
            .filter(s => s.charAt(0) !== '#') // Filter comments
            .skip(1) // Skip line: Not available
            .then(oddLines) // Filter hourly info
            .map(line => line.substring(14, 16))
            .then(collapse)
            .count();
    }

    underscore(): number {
        return ((__.chain(this.src.data)
            .filter(s => s.charAt(0) !== '#')
            .drop(1) as any)
            .oddLines()
            .map((line: string) => line.substring(14, 16))
            .collapse() as __._Chain<string, string[]>)
            .size()
            .value();
    }

    arrays(): number {
        let isOddLine = false;
        let prev: string = undefined;
        return [...this.src.data]
            .filter(s => s.charAt(0) !== '#') // Filter comments
            .slice(1) // Skip line: Not available
            .filter(() => {
                const result = isOddLine;
                isOddLine = !isOddLine;
                return result;
            }) // Filter hourly info
            .map(line => line.substring(14, 16))
            .filter(elem => {
                if (prev === undefined || prev !== elem) {
                    prev = elem;
                    return true;
                }
                return false;
            }).length;
    }

    run(): void {
        this.setup();
        const opts = options();
        getSuite(this.name())
            .add(UNDERSCORE, () => this.underscore(), opts)
            .add(TINYIELD, () => this.tinyield(), opts)
            .add(SEQUENCY, () => this.sequency(), opts)
            .add(LODASH, () => this.lodash(), opts)
            .add(ARRAYS, () => this.arrays(), opts)
            .add(LAZY, () => this.lazy(), opts)
            .add(IX, () => this.ix(), opts)
            .run(options());
    }
}
