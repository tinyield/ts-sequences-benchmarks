import {Country} from '../../lib/operations/model/country/country';
import {Language} from '../../lib/operations/model/country/language';
import {Artist} from '../../lib/operations/model/artist/artist';
import {Track} from '../../lib/operations/model/track/track';
import {expect} from 'chai';

class Mock<T> {
    // tslint:disable-next-line:variable-name
    readonly Object: T;

    constructor(partial: Partial<T>) {
        this.Object = partial as T;
    }
}

export function assertSameArray<T>(actual: T[], expected: T[], id: (elem: T) => any = elem => elem): void {
    expect(actual.length).to.equal(expected.length);
    for (let i = 0; i < actual.length; i++) {
        expect(id(actual[i])).to.equal(id(expected[i]));
    }
}

export function getCountries(): Country[] {
    return [
        new Mock<Country>({
            name: 'Portugal',
            languages: [new Mock<Language>({iso639_1: 'pt'}).Object],
            toString: () => 'pt',
        }).Object,
        new Mock<Country>({
            name: 'United Kingdom',
            languages: [new Mock<Language>({iso639_1: 'en'}).Object],
        }).Object,
        new Mock<Country>({
            name: 'Spain',
            languages: [new Mock<Language>({iso639_1: 'es'}).Object],
        }).Object,
        new Mock<Country>({
            name: 'France',
            languages: [new Mock<Language>({iso639_1: 'fr'}).Object],
        }).Object,
    ];
}

export function getArtists(): Artist[] {
    return [
        new Mock<Artist>({
            name: 'Artic Monkeys',
            mbid: 'Artic Monkeys',
        }).Object,
        new Mock<Artist>({
            name: 'Foo Fighters',
            mbid: 'Foo Fighters',
        }).Object,
    ];
}

export function getTracks(): Track[] {
    const artists: Artist[] = getArtists();
    return [
        new Mock<Track>({
            name: '505',
            artist: artists[0],
        }).Object,
        new Mock<Track>({
            name: 'Walk',
            artist: artists[1],
        }).Object,
    ];
}
