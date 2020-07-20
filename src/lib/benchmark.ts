export interface Benchmark {
    run(): void;
}

export interface SequenceBenchmark extends Benchmark {
    tinyield(): void;
    lazy(): void;
    lodash(): void;
    underscore(): void;
    ix(): void;
    arrays(): void;
}

export interface ZipBenchmark extends SequenceBenchmark {
    arrays(): void;
}
