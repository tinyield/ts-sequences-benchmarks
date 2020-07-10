import {getBenchmarks} from './utils/benchmarks-loader';
import {getCLIArguments} from './utils/benchmark-cli-arguments';
import {ResultExporter} from './utils/result-exporter';

const argv = getCLIArguments();

getBenchmarks(argv).forEach(bench => bench.run());

if (argv.output !== undefined) {
    ResultExporter.instance().writeTo(argv.output);
}
