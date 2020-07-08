import {Event, Options, Suite} from 'benchmark';

function onComplete(result: Event): void {
    console.log(result.target.toString());
}

export function options(samples = 300, time = 5): Options {
    return {
        onComplete,
        onError: console.error,
        minSamples: samples,
        minTime: undefined,
    };
}

export function blackhole<T>(elem: T): void {}

export function getSuite(name: string): Suite {
    console.log(name);
    const suite = new Suite(name);
    return suite
        .on('cicle', (evt: any) => {
            console.log(String(evt.target));
        })
        .on('error', (evt: any) => console.log(evt))
        .on('complete', () => {
            const fastest: any[] = suite.filter('fastest').map((value: any) => value.name);
            console.log(`Fastest for [ ${name} ] is [ ${fastest} ] \n`);
        });
}
