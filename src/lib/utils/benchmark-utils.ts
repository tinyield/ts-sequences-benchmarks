import {Event, Options, Suite} from 'benchmark';
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
            console.log(message);
            exporter.appendLine(message);
        });
}
