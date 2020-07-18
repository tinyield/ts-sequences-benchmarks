export interface Benchmark {
    run(): void;
}

export interface SequenceBenchmark extends Benchmark {
    tinyield(): void;
    lazy(): void;
    lodash(): void;
    underscore(): void;
    ix(): void;
}
