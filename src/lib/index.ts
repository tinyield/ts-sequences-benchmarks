import {getBenchmarks} from './utils/benchmarks-loader';

getBenchmarks(process.argv).forEach(bench => bench.run());
