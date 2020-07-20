import Benchmark, {Event, Options, Suite} from 'benchmark';
import {ResultExporter} from './result-exporter';
import {getCLIArguments} from './benchmark-cli-arguments';

function onComplete(result: Event): void {
    const message: string = result.target.toString();
    console.log(message);
    ResultExporter.instance().appendLine(message);
}

export function options(): Options {
    const args = getCLIArguments();
    return {
        onComplete,
        onError: console.error,
        minSamples: args.samples,
        minTime: args.time,
    };
}

export function blackhole<T>(elem: T): void {}

function getBaselinePerformanceComparison(target: Benchmark, baseline: Benchmark): string {
    return (Math.round((target.hz * 100) / baseline.hz) / 100).toFixed(2);
}

export function getSuite(name: string): Suite {
    const exporter = ResultExporter.instance();
    console.log(name);
    exporter.appendLine(name);
    const suite = new Suite(name);
    return suite
        .on('error', (evt: any) => console.log(evt))
        .on('complete', () => {
            const fastest: any[] = suite.filter('fastest').map((value: any) => value.name);
            const message = `[ ${fastest} ] is the fastest for [ ${name} ]`;
            const benchs = (suite as any) as Benchmark[];
            const tableRow = `
    <tr>
        <td class="Benchmark">${name}</td>
        <comment></comment>
        <td class="Underscore">${getBaselinePerformanceComparison(benchs[0], benchs[4])}</td>
        <td class="Tinyield">${getBaselinePerformanceComparison(benchs[1], benchs[4])}</td>
        <td class="Sequency">${getBaselinePerformanceComparison(benchs[2], benchs[4])}</td>
        <td class="Lodash">${getBaselinePerformanceComparison(benchs[3], benchs[4])}</td>
        <td class="Arrays">${getBaselinePerformanceComparison(benchs[4], benchs[4])}</td>
        <td class="Lazy.js">${getBaselinePerformanceComparison(benchs[5], benchs[4])}</td>
        <td class="IxJs">${getBaselinePerformanceComparison(benchs[6], benchs[4])}</td>
    </tr>
`;
            console.log(tableRow);
            exporter.appendLine(tableRow);
            console.log(message);
            exporter.appendLine(message);
        });
}
