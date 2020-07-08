import {AbstractSequenceBenchmark} from '../abstract-sequence-benchmark';
import {ZipBenchmark} from '../benchmark';
import {Suite} from 'benchmark';
import {ZiplineOperations} from '../operations/zipline-operations';
import {options} from '../utils/benchmark-utils';

export abstract class AbstractZipBenchmark extends AbstractSequenceBenchmark implements ZipBenchmark {
    protected readonly ziplineOps: ZiplineOperations;
    abstract zipline(): void;

    constructor() {
        super();
        this.ziplineOps = new ZiplineOperations();
    }

    protected getSuite(): Suite {
        return super.getSuite().add(ZiplineOperations.NAME, () => this.zipline(), options());
    }
}
