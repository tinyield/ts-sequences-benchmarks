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

enum Benchmarks {
    ZIP_TOP_ARTIST_AND_TRACK_BY_COUNTRY_BENCHMARK = 'ZipTopArtistAndTrackByCountryBenchmark',
    ARTISTS_IN_TOP_TEN_WITH_TOP_TEN_TRACKS_BY_COUNTRY_BENCHMARK = 'ArtistsInTopTenWithTopTenTracksByCountryBenchmark',
    ZIP_PRIMES_BENCHMARK = 'ZipPrimesBenchmark',
    ALL_MATCH_BENCHMARK = 'AllMatchBenchmark',
    EVERY_CLASS_BENCHMARK = 'EveryClassBenchmark',
    EVERY_NUMBER_BENCHMARK = 'EveryNumberBenchmark',
    EVERY_STRING_BENCHMARK = 'EveryStringBenchmark',
    FIRST_IN_BEGINNING_BENCHMARK = 'FirstInBeginningBenchmark',
    FIRST_IN_MIDDLE_BENCHMARK = 'FirstInMiddleBenchmark',
    FIRST_IN_END_BENCHMARK = 'FirstInEndBenchmark',
    FLATMAP_AND_REDUCE_BENCHMARK = 'FlatmapAndReduceBenchmark',
}

const BENCHMARK_NAMES = [
    Benchmarks.ZIP_TOP_ARTIST_AND_TRACK_BY_COUNTRY_BENCHMARK,
    Benchmarks.ARTISTS_IN_TOP_TEN_WITH_TOP_TEN_TRACKS_BY_COUNTRY_BENCHMARK,
    Benchmarks.ZIP_PRIMES_BENCHMARK,
    Benchmarks.ALL_MATCH_BENCHMARK,
    Benchmarks.EVERY_CLASS_BENCHMARK,
    Benchmarks.EVERY_NUMBER_BENCHMARK,
    Benchmarks.EVERY_STRING_BENCHMARK,
    Benchmarks.FIRST_IN_BEGINNING_BENCHMARK,
    Benchmarks.FIRST_IN_MIDDLE_BENCHMARK,
    Benchmarks.FIRST_IN_END_BENCHMARK,
    Benchmarks.FLATMAP_AND_REDUCE_BENCHMARK,
];
const BENCHMARK_DICTIONARY: {[key: string]: Benchmark} = {
    [Benchmarks.ZIP_TOP_ARTIST_AND_TRACK_BY_COUNTRY_BENCHMARK]: new ZipTopArtistAndTrackByCountryBenchmark(),
    [Benchmarks.ARTISTS_IN_TOP_TEN_WITH_TOP_TEN_TRACKS_BY_COUNTRY_BENCHMARK]: new ArtistsInTopTenWithTopTenTracksByCountryBenchmark(),
    [Benchmarks.ZIP_PRIMES_BENCHMARK]: new ZipPrimesBenchmark(),
    [Benchmarks.ALL_MATCH_BENCHMARK]: new AllMatchBenchmark(),
    [Benchmarks.EVERY_CLASS_BENCHMARK]: new EveryClassBenchmark(),
    [Benchmarks.EVERY_NUMBER_BENCHMARK]: new EveryNumberBenchmark(),
    [Benchmarks.EVERY_STRING_BENCHMARK]: new EveryStringBenchmark(),
    [Benchmarks.FIRST_IN_BEGINNING_BENCHMARK]: new FirstInBeginningBenchmark(),
    [Benchmarks.FIRST_IN_MIDDLE_BENCHMARK]: new FirstInMiddleBenchmark(),
    [Benchmarks.FIRST_IN_END_BENCHMARK]: new FirstInEndBenchmark(),
    [Benchmarks.FLATMAP_AND_REDUCE_BENCHMARK]: new FlatmapAndReduceBenchmark(),
};

export function getBenchmarks(args: string[]): Benchmark[] {
    if (args === undefined || args.length <= 2) {
        return BENCHMARK_NAMES.map(name => BENCHMARK_DICTIONARY[name]);
    }
    return args
        .filter((arg, idx) => idx > 1 && arg !== undefined && arg.length > 0)
        .map(arg => BENCHMARK_NAMES.find(name => name.toLowerCase().startsWith(arg.toLowerCase())))
        .map(name => BENCHMARK_DICTIONARY[name]);
}
