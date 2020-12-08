import {blackhole, getSuite, options} from '../utils/benchmark-utils';
import {IterableX} from 'ix/iterable';
import {Pair} from '../common/model/pair';
import {Country} from '../common/model/country/country';
import {Artist} from '../common/model/artist/artist';
import {Countries} from '../common/provider/rest.countries/countries';
import {Artists} from '../common/provider/last.fm/artists';
import {Tracks} from '../common/provider/last.fm/tracks';
import 'ix/add/iterable-operators/map';
import 'ix/add/iterable-operators/some';
import 'ix/add/iterable-operators/filter';
import 'ix/add/iterable-operators/zip';
import 'ix/add/iterable-operators/toarray';
import {distinct, zip} from '../common/extensions/array-extensions';
import {Triplet} from '../common/model/triplet';
import * as Lazy from 'lazy.js';
import {Track} from '../common/model/track/track';
import * as _ from 'lodash';
import * as __ from 'underscore';
import {Query} from 'tinyield4ts';
import Sequence, {asSequence} from 'sequency';
import {ARRAYS, IX, LAZY, LODASH, SEQUENCY, TINYIELD, UNDERSCORE} from '../common/constants';
import {Benchmark} from '../benchmark';

/**
 * ZipTopArtistAndTrackByCountryBenchmark
 * Benchmarks creating two different sequences, one consisting of the top 50 Artists
 * (provided by [Last.fm](https://www.last.fm/api/)) of each non english speaking
 * country (provided by [REST Countries](https://restcountries.eu/)) and the other
 * the exact same thing but for the top 50 Tracks.
 * Then zipping both sequences into a Trio of Country, First Artist and First Track and
 * retrieving the distinct elements by Artist.
 * <p>
 * Pipelines:
 * * Sequence of Artists:
 * * * Sequence.of(countries)
 * * * .filter(isNonEnglishSpeaking)
 * * * .filter(hasArtists)
 * * * .map(Pair.of(country, artists));
 * <p>
 * * Sequence of Tracks:
 * * * Sequence.of(countries)
 * * * .filter(isNonEnglishSpeaking)
 * * * .filter(hasTracks)
 * * * .map(Pair.of(country, tracks));
 * <p>
 * * Pipeline:
 * * * artistsByCountry.zip(tracksByCountry, Trio.of(country, topArtist, topTrack))
 * * * .distinctBy(artist)
 * * * .forEach(bh.consume)
 */
export class ZipTopArtistAndTrackByCountryBenchmark implements Benchmark {
    /**
     * Provider for the Country data
     */
    readonly countries = new Countries();

    /**
     * Provider for the Artist data by country
     */
    readonly artists = new Artists(this.countries);

    /**
     * Provider for the Track data by country
     */
    readonly tracks = new Tracks(this.countries);

    /**
     * Gets a {string} stating the name of this benchmark to better identify it
     * in the benchmark logs.
     *
     * @returns {string} that identifies this benchmark
     */
    name(): string {
        return 'Distinct Top Artist and Top Track by Country Benchmark';
    }

    /**
     * Takes two {@external IterableX}s and zips them into a Trio of Country, First Artist and First Track,
     * and filters the resulting sequence by distinct Artists
     *
     * @return A {@external IterableX} consisting of Trios of Country, First Artist and First Track
     * filtered to have only distinct artists
     */
    ixPipeline(): IterableX<Triplet<Country, Artist, Track>> {
        const isNonEnglishSpeaking = (country: Country) =>
            !IterableX.of(...country.languages)
                .map(value => value.iso639_1)
                .some(elem => elem === 'en');

        const artistsByCountry = IterableX.of(...this.countries.data)
            .filter(elem => isNonEnglishSpeaking(elem))
            .filter(country => this.artists.hasDataForCountry(country.name))
            .map(country => Pair.with(country, IterableX.of(...this.artists.data[country.name])));

        const tracksByCountry = IterableX.of(...this.countries.data)
            .filter(elem => isNonEnglishSpeaking(elem))
            .filter(country => this.tracks.hasDataForCountry(country.name))
            .map(country => Pair.with(country, IterableX.of(...this.tracks.data[country.name])));

        return artistsByCountry
            .zip(tracksByCountry)
            .map(value => new Triplet(value[0].left, value[0].right.first(), value[1].right.first()))
            .distinct(trio => trio.center.mbid);
    }

    /**
     * Takes two {@external LazyJS.Sequence}s and zips them into a Trio of Country, First Artist and First Track,
     * and filters the resulting sequence by distinct Artists
     *
     * @return A {@external LazyJS.Sequence} consisting of Trios of Country, First Artist and First Track
     * filtered to have only distinct artists
     */
    lazyPipeline(): LazyJS.Sequence<Triplet<Country, Artist, Track>> {
        const isNonEnglishSpeaking = (country: Country) =>
            !Lazy(country.languages)
                .map(value => value.iso639_1)
                .some(elem => elem === 'en');

        const artistsByCountry = Lazy(this.countries.data)
            .filter(elem => isNonEnglishSpeaking(elem))
            .filter(country => this.artists.hasDataForCountry(country.name))
            .map(country => Pair.with(country, Lazy(this.artists.data[country.name])));

        const tracksByCountry = Lazy(this.countries.data)
            .filter(elem => isNonEnglishSpeaking(elem))
            .filter(country => this.tracks.hasDataForCountry(country.name))
            .map(country => Pair.with(country, Lazy(this.tracks.data[country.name])));

        return (artistsByCountry.zip(tracksByCountry.toArray() as any) as any)
            .map(([left, right]: Pair<Country, LazyJS.Sequence<any>>[]) => new Triplet(left.left, left.right.first(), right.right.first()))
            .uniq((elem: Triplet<Country, Artist, Track>) => elem.center.mbid);
    }

    /**
     * Takes two {@external _.CollectionChain}s and zips them into a Trio of Country, First Artist and First Track,
     * and filters the resulting sequence by distinct Artists
     *
     * @return A {@external _.CollectionChain} consisting of Trios of Country, First Artist and First Track
     * filtered to have only distinct artists
     */
    lodashPipeline(): _.CollectionChain<Triplet<Country, Artist, Track>> {
        const isNonEnglishSpeaking = (country: Country) =>
            !_.chain(country.languages)
                .map(value => value.iso639_1)
                .some(elem => elem === 'en')
                .value();

        const artistsByCountry = _.chain(this.countries.data)
            .filter(elem => isNonEnglishSpeaking(elem))
            .filter(country => this.artists.hasDataForCountry(country.name))
            .map(country => Pair.with(country, _.chain(this.artists.data[country.name])));

        const tracksByCountry = _.chain(this.countries.data)
            .filter(elem => isNonEnglishSpeaking(elem))
            .filter(country => this.tracks.hasDataForCountry(country.name))
            .map(country => Pair.with(country, _.chain(this.tracks.data[country.name])));

        return artistsByCountry
            .zipWith(tracksByCountry.value(), (pair1, pair2) => {
                return new Triplet(pair1.left, pair1.right.first().value(), pair2.right.first().value());
            })
            .uniqBy(elem => elem.center.mbid);
    }

    /**
     * Takes two {@external Query}s and zips them into a Trio of Country, First Artist and First Track,
     * and filters the resulting sequence by distinct Artists
     *
     * @return A {@external Query} consisting of Trios of Country, First Artist and First Track
     * filtered to have only distinct artists
     */
    tinyieldPipeline(): Query<Triplet<Country, Artist, Track>> {
        const isNonEnglishSpeaking = (country: Country) =>
            Query.of(country.languages)
                .map(value => value.iso639_1)
                .noneMatch(elem => elem === 'en');

        const artistsByCountry = Query.of(this.countries.data)
            .filter(elem => isNonEnglishSpeaking(elem))
            .filter(country => this.artists.hasDataForCountry(country.name))
            .map(country => Pair.with(country, Query.of(this.artists.data[country.name])));

        const tracksByCountry = Query.of(this.countries.data)
            .filter(elem => isNonEnglishSpeaking(elem))
            .filter(country => this.tracks.hasDataForCountry(country.name))
            .map(country => Pair.with(country, Query.of(this.tracks.data[country.name])));

        return artistsByCountry
            .zip(tracksByCountry, (pair1, pair2) => {
                return new Triplet(pair1.left, pair1.right.first(), pair2.right.first());
            })
            .distinctBy(trio => trio.center.mbid);
    }

    /**
     * Takes two {@external Sequence}s and zips them into a Trio of Country, First Artist and First Track,
     * and filters the resulting sequence by distinct Artists
     *
     * @return A {@external Sequence} consisting of Trios of Country, First Artist and First Track
     * filtered to have only distinct artists
     */
    sequencyPipeline(): Sequence<Triplet<Country, Artist, Track>> {
        const isNonEnglishSpeaking = (country: Country) =>
            asSequence(country.languages)
                .map(value => value.iso639_1)
                .none(elem => elem === 'en');

        const artistsByCountry = asSequence(this.countries.data)
            .filter(elem => isNonEnglishSpeaking(elem))
            .filter(country => this.artists.hasDataForCountry(country.name))
            .map(country => Pair.with(country, asSequence(this.artists.data[country.name])));

        const tracksByCountry = asSequence(this.countries.data)
            .filter(elem => isNonEnglishSpeaking(elem))
            .filter(country => this.tracks.hasDataForCountry(country.name))
            .map(country => Pair.with(country, asSequence(this.tracks.data[country.name])));

        return artistsByCountry
            .zip(tracksByCountry)
            .map(([pair1, pair2]) => {
                return new Triplet(pair1.left, pair1.right.first(), pair2.right.first());
            })
            .distinctBy(trio => trio.center.mbid);
    }

    /**
     * Takes two {@external __._Chain}s and zips them into a Trio of Country, First Artist and First Track,
     * and filters the resulting sequence by distinct Artists
     *
     * @return A {@external __._Chain} consisting of Trios of Country, First Artist and First Track
     * filtered to have only distinct artists
     */
    underscorePipeline(): __._Chain<Triplet<Country, Artist, Track>, Triplet<Country, Artist, Track>[]> {
        const isNonEnglishSpeaking = (country: Country) =>
            !__.chain(country.languages)
                .map(value => value.iso639_1)
                .some(elem => elem === 'en')
                .value();

        const artistsByCountry = __.chain(this.countries.data)
            .filter(elem => isNonEnglishSpeaking(elem))
            .filter(country => this.artists.hasDataForCountry(country.name))
            .map(country => Pair.with(country, __.chain(this.artists.data[country.name])));

        const tracksByCountry = __.chain(this.countries.data)
            .filter(elem => isNonEnglishSpeaking(elem))
            .filter(country => this.tracks.hasDataForCountry(country.name))
            .map(country => Pair.with(country, __.chain(this.tracks.data[country.name])));

        return (artistsByCountry.zip(tracksByCountry.value()) as any)
            .map(([pair1, pair2]: Pair<Country, any>[]) => {
                return new Triplet(pair1.left, pair1.right.first().value(), pair2.right.first().value());
            })
            .unique((trio: Triplet<Country, Artist, Track>) => trio.center.mbid) as any;
    }

    /**
     * Takes two {@external Array}s and zips them into a Trio of Country, First Artist and First Track,
     * and filters the resulting sequence by distinct Artists
     *
     * @return A {@external Array} consisting of Trios of Country, First Artist and First Track
     * filtered to have only distinct artists
     */
    arraysPipeline(): Triplet<Country, Artist, Track>[] {
        const isNonEnglishSpeaking = (country: Country) =>
            [...country.languages].map(value => value.iso639_1).find(elem => elem === 'en') === undefined;

        const artistsByCountry = [...this.countries.data]
            .filter(elem => isNonEnglishSpeaking(elem))
            .filter(country => this.artists.hasDataForCountry(country.name))
            .map(country => Pair.with(country, [...this.artists.data[country.name]]));

        const tracksByCountry = [...this.countries.data]
            .filter(elem => isNonEnglishSpeaking(elem))
            .filter(country => this.tracks.hasDataForCountry(country.name))
            .map(country => Pair.with(country, [...this.tracks.data[country.name]]));

        return distinct(
            zip(artistsByCountry, tracksByCountry).map(pair => new Triplet(pair.left.left, pair.left.right[0], pair.right.right[0])),
            trio => trio.center.mbid
        );
    }

    /**
     * Runs this benchmark using {@link IterableX}s in it's pipeline using a blackhole to evaluate traversal performance
     */
    ix(): void {
        this.ixPipeline().forEach(blackhole);
    }

    /**
     * Runs this benchmark using {@link LazyJS.Sequence}s in it's pipeline using a blackhole to evaluate traversal performance
     */
    lazy(): void {
        this.lazyPipeline().each(blackhole);
    }

    /**
     * Runs this benchmark using {@link _.CollectionChain}s in it's pipeline using a blackhole to evaluate traversal performance
     */
    lodash(): void {
        this.lodashPipeline()
            .forEach(blackhole)
            .value();
    }

    /**
     * Runs this benchmark using {@link Query}s in it's pipeline using a blackhole to evaluate traversal performance
     */
    tinyield(): void {
        this.tinyieldPipeline().forEach(blackhole);
    }

    /**
     * Runs this benchmark using {@link Sequence}s in it's pipeline using a blackhole to evaluate traversal performance
     */
    sequency(): void {
        this.sequencyPipeline().forEach(blackhole);
    }

    /**
     * Runs this benchmark using {@link __._Chain}s in it's pipeline using a blackhole to evaluate traversal performance
     */
    underscore(): void {
        this.underscorePipeline()
            .forEach(blackhole)
            .value();
    }

    /**
     * Runs this benchmark using {@link Array}s in it's pipeline using a blackhole to evaluate traversal performance
     */
    arrays(): void {
        this.arraysPipeline().forEach(blackhole);
    }

    run(): void {
        const opts = options();
        getSuite(this.name())
            .add(UNDERSCORE, () => this.underscore(), opts)
            .add(TINYIELD, () => this.tinyield(), opts)
            .add(SEQUENCY, () => this.sequency(), opts)
            .add(LODASH, () => this.lodash(), opts)
            .add(ARRAYS, () => this.arrays(), opts)
            .add(LAZY, () => this.lazy(), opts)
            .add(IX, () => this.ix(), opts)
            .run(options());
    }
}
