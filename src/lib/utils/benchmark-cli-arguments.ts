import * as yargs from 'yargs';

export interface BenchmarkCliArguments {
    samples: number;
    output: string;
    name: string;
    size: number;
    time: number;
}

const argv = yargs
    .usage('Usage: $0')
    .describe('name', 'Name of the benchmark(s) to run. \n(e.g: "First" will run all benchmarks with their name starting with "First")')
    .describe('size', 'The collection size used in the benchmark, if supported \n(e.g. 1000)')
    .describe('output', 'The filename in which to write the results. \n(e.g "results.txt")')
    .describe('samples', 'The minimum sample size required to perform statistical analysis. \n(e.g 10)')
    .describe('time', 'The time needed to reduce the percent uncertainty of measurement to 1% (secs) \n(e.g 10)')
    .help('h')
    .alias('h', 'help')
    .alias('n', 'name')
    .alias('s', 'size')
    .alias('i', 'samples')
    .alias('t', 'time')
    .default<BenchmarkCliArguments>({
        size: 1000,
        name: undefined,
        output: undefined,
        samples: 100,
        time: 1,
    })
    .alias('o', 'output').argv;

export function getCLIArguments(): BenchmarkCliArguments {
    return argv;
}

export function getCollectionSizeLabel(): string {
    if (getCLIArguments().size !== undefined) {
        return `with a collection size of ${getCLIArguments().size} elements`;
    }
    return '';
}
