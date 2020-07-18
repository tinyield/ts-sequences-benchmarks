import {Benchmark} from '../benchmark';
import {ZipTopArtistAndTrackByCountryBenchmark} from '../zip/zip-top-artist-and-track-by-country-benchmark';
import {ArtistsInTopTenWithTopTenTracksByCountryBenchmark} from '../zip/artists-in-top-ten-with-top-ten-tracks-by-country-benchmark';
import {ZipPrimesBenchmark} from '../zip/zip-primes-benchmark';
import {AllMatchBenchmark} from '../all.match/all-match-benchmark';
import {EveryClassBenchmark} from '../every/every-class-benchmark';
import {EveryNumberBenchmark} from '../every/every-number-benchmark';
import {EveryStringBenchmark} from '../every/every-string-benchmark';
import {FirstInBeginningBenchmark} from '../first/first-in-beginning-benchmark';
import {FirstInMiddleBenchmark} from '../first/first-in-middle-benchmark';
import {FirstInEndBenchmark} from '../first/first-in-end-benchmark';
import {FlatmapAndReduceBenchmark} from '../flatmap/flatmap-and-reduce-benchmark';
import {FindClassBenchmark} from '../find/find-class-benchmark';
import {FindFixedIndexBenchmark} from '../find/find-fixed-index-benchmark';
import {FindNumberBenchmark} from '../find/find-number-benchmark';
import {FindStringBenchmark} from '../find/find-string-benchmark';
import {BenchmarkCliArguments} from './benchmark-cli-arguments';
import {CollapseBenchmark} from '../collapse/collapse-benchmark';

enum Benchmarks {
    ARTISTS_IN_TOP_TEN_WITH_TOP_TEN_TRACKS_BY_COUNTRY_BENCHMARK = 'ArtistsInTopTenWithTopTenTracksByCountryBenchmark',
    ZIP_TOP_ARTIST_AND_TRACK_BY_COUNTRY_BENCHMARK = 'ZipTopArtistAndTrackByCountryBenchmark',
    FIRST_IN_BEGINNING_BENCHMARK = 'FirstInBeginningBenchmark',
    FLATMAP_AND_REDUCE_BENCHMARK = 'FlatmapAndReduceBenchmark',
    FIND_FIXED_INDEX_BENCHMARK = 'FindFixedIndexBenchmark',
    FIRST_IN_MIDDLE_BENCHMARK = 'FirstInMiddleBenchmark',
    EVERY_NUMBER_BENCHMARK = 'EveryNumberBenchmark',
    EVERY_STRING_BENCHMARK = 'EveryStringBenchmark',
    FIRST_IN_END_BENCHMARK = 'FirstInEndBenchmark',
    EVERY_CLASS_BENCHMARK = 'EveryClassBenchmark',
    FIND_NUMBER_BENCHMARK = 'FindNumberBenchmark',
    FIND_STRING_BENCHMARK = 'FindStringBenchmark',
    ZIP_PRIMES_BENCHMARK = 'ZipPrimesBenchmark',
    FIND_CLASS_BENCHMARK = 'FindClassBenchmark',
    ALL_MATCH_BENCHMARK = 'AllMatchBenchmark',
    COLLAPSE_BENCHMARK = 'CollapseBenchmark',
}

const BENCHMARK_NAMES = [
    Benchmarks.ARTISTS_IN_TOP_TEN_WITH_TOP_TEN_TRACKS_BY_COUNTRY_BENCHMARK,
    Benchmarks.ZIP_TOP_ARTIST_AND_TRACK_BY_COUNTRY_BENCHMARK,
    Benchmarks.FIRST_IN_BEGINNING_BENCHMARK,
    Benchmarks.FLATMAP_AND_REDUCE_BENCHMARK,
    Benchmarks.FIND_FIXED_INDEX_BENCHMARK,
    Benchmarks.FIRST_IN_MIDDLE_BENCHMARK,
    Benchmarks.EVERY_NUMBER_BENCHMARK,
    Benchmarks.EVERY_STRING_BENCHMARK,
    Benchmarks.FIRST_IN_END_BENCHMARK,
    Benchmarks.EVERY_CLASS_BENCHMARK,
    Benchmarks.FIND_NUMBER_BENCHMARK,
    Benchmarks.FIND_STRING_BENCHMARK,
    Benchmarks.FIND_CLASS_BENCHMARK,
    Benchmarks.ZIP_PRIMES_BENCHMARK,
    Benchmarks.ALL_MATCH_BENCHMARK,
    Benchmarks.COLLAPSE_BENCHMARK,
];
const BENCHMARK_DICTIONARY: {[key: string]: Benchmark} = {
    [Benchmarks.ARTISTS_IN_TOP_TEN_WITH_TOP_TEN_TRACKS_BY_COUNTRY_BENCHMARK]: new ArtistsInTopTenWithTopTenTracksByCountryBenchmark(),
    [Benchmarks.ZIP_TOP_ARTIST_AND_TRACK_BY_COUNTRY_BENCHMARK]: new ZipTopArtistAndTrackByCountryBenchmark(),
    [Benchmarks.ZIP_PRIMES_BENCHMARK]: new ZipPrimesBenchmark(),

    [Benchmarks.FLATMAP_AND_REDUCE_BENCHMARK]: new FlatmapAndReduceBenchmark(),
    [Benchmarks.ALL_MATCH_BENCHMARK]: new AllMatchBenchmark(),
    [Benchmarks.COLLAPSE_BENCHMARK]: new CollapseBenchmark(),

    [Benchmarks.FIRST_IN_BEGINNING_BENCHMARK]: new FirstInBeginningBenchmark(),
    [Benchmarks.FIRST_IN_MIDDLE_BENCHMARK]: new FirstInMiddleBenchmark(),
    [Benchmarks.FIRST_IN_END_BENCHMARK]: new FirstInEndBenchmark(),

    [Benchmarks.EVERY_NUMBER_BENCHMARK]: new EveryNumberBenchmark(),
    [Benchmarks.EVERY_STRING_BENCHMARK]: new EveryStringBenchmark(),
    [Benchmarks.EVERY_CLASS_BENCHMARK]: new EveryClassBenchmark(),

    [Benchmarks.FIND_FIXED_INDEX_BENCHMARK]: new FindFixedIndexBenchmark(),
    [Benchmarks.FIND_NUMBER_BENCHMARK]: new FindNumberBenchmark(),
    [Benchmarks.FIND_STRING_BENCHMARK]: new FindStringBenchmark(),
    [Benchmarks.FIND_CLASS_BENCHMARK]: new FindClassBenchmark(),
};

export function getBenchmarks(args: BenchmarkCliArguments): Benchmark[] {
    if (args === undefined || args.name === undefined || args.name.length === 0) {
        return BENCHMARK_NAMES.map(name => BENCHMARK_DICTIONARY[name]);
    }
    return BENCHMARK_NAMES.filter(name => name.toLowerCase().startsWith(args.name.toLowerCase())).map(name => BENCHMARK_DICTIONARY[name]);
}
