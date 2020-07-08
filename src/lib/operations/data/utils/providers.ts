import {ArtistsDataProvider} from '../provider/last.fm/artists-data-provider';
import {TracksDataProvider} from '../provider/last.fm/tracks-data-provider';
import {CountriesDataProvider} from '../provider/rest.countries/countries-data-provider';

export const COUNTRY_DATA = CountriesDataProvider.instance();
export const ARTISTS_DATA = ArtistsDataProvider.instance(COUNTRY_DATA);
export const TRACKS_DATA = TracksDataProvider.instance(COUNTRY_DATA);
