import {WeatherDataSource} from '../../common/provider/weather/weather-data-source';
import {getSuite, options} from '../../utils/benchmark-utils';
import {Benchmark} from '../../benchmark';
import {IterableX} from 'ix/iterable';
import * as Lazy from 'lazy.js';
import * as _ from 'lodash';
import {asSequence} from 'sequency';
import {Query} from 'tinyield4ts';
import * as __ from 'underscore';

import 'ix/add/iterable-operators/filter';
import 'ix/add/iterable-operators/skip';
import 'ix/add/iterable-operators/map';
import 'ix/add/iterable-operators/max';
import {ARRAYS, IX, LAZY, LODASH, SEQUENCY, TINYIELD, UNDERSCORE} from '../../common/constants';

/* importing user-defined extensions of API's */
import {OddLinesIterable} from '../../common/extensions/ix-extensions';
import '../../common/extensions/lazy-extensions';
import '../../common/extensions/lodash-extensions';
import '../../common/extensions/sequency-extensions';
import '../../common/extensions/underscore-extensions';
import {oddLines} from '../../common/extensions/tinyield-extensions';

export class QueryMaxTemperature implements Benchmark {
    public src: WeatherDataSource;

    setup(): void {
        this.src = new WeatherDataSource();
    }

    name(): string {
        return 'Query Max Temperature Benchmark';
    }

    ix(): number {
        return IterableX.as(
            new OddLinesIterable(
                IterableX.of(...this.src.data)
                    .filter(s => s.charAt(0) !== '#') // Filter comments
                    .skip(1)
            )
        )
            .map(line => Number(line.substring(14, 16)))
            .max();
    }

    lazy(): number {
        return (Lazy(this.src.data)
            .filter(s => s.charAt(0) !== '#') // Filter comments
            .rest(1) as any) // Skip line: Not available
            .oddLines() // Filter hourly info
            .map((line: string) => Number(line.substring(14, 16)))
            .max();
    }

    lodash(): number {
        return (_.chain(this.src.data)
            .filter(s => s.charAt(0) !== '#')
            .drop(1) as any)
            .oddLines()
            .map((line: string) => Number(line.substring(14, 16)))
            .max()
            .value();
    }

    sequency(): number {
        return (asSequence(this.src.data)
            .filter(s => s.charAt(0) !== '#')
            .drop(1) as any) // Skip line: Not available
            .oddLines() // Filter hourly info
            .map((line: string) => Number(line.substring(14, 16)))
            .max();
    }

    tinyield(): number {
        return Query.of(this.src.data)
            .filter(s => s.charAt(0) !== '#') // Filter comments
            .skip(1) // Skip line: Not available
            .then(oddLines) // Filter hourly info
            .map(line => Number(line.substring(14, 16)))
            .max((a, b) => a - b);
    }

    underscore(): number {
        return (__.chain(this.src.data)
            .filter(s => s.charAt(0) !== '#')
            .drop(1) as any)
            .oddLines()
            .map((line: string) => Number(line.substring(14, 16)))
            .max()
            .value();
    }

    arrays(): number {
        let isOddLine = false;
        return Math.max(
            ...[...this.src.data]
                .filter(s => s.charAt(0) !== '#') // Filter comments
                .slice(1) // Skip line: Not available
                .filter(() => {
                    const result = isOddLine;
                    isOddLine = !isOddLine;
                    return result;
                }) // Filter hourly info
                .map(line => Number(line.substring(14, 16)))
        );
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
