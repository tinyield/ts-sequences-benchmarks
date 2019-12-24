import {Event, Options, Suite} from 'benchmark';

export function assert(actual: number, expected: number): void {
    if (actual !== expected) {
        console.error(`expected: ${expected} but got ${actual} instead`);
    }
}

export class BenchmarkUtils {
    public static options(): Options {
        return {
            onComplete: BenchmarkUtils.onComplete,
            onError: console.error,
            minSamples: 100,
        };
    }

    public static asyncOptions(): Options {
        return Object.assign({}, BenchmarkUtils.options(), {defer: true});
    }

    private static onComplete(result: Event): void {
        console.log(result.target.toString());
    }

    public static getSuite(): Suite {
        const suite = new Suite();
        return suite
            .on('cicle', (evt: any) => console.log(String(evt.target)))
            .on('error', (evt: any) => console.log(evt))
            .on('complete', () =>
                console.log(
                    'Fastest is ',
                    suite.filter('fastest').map((value: any) => value.name)
                )
            );
    }
}
