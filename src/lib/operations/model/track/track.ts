import {Artist} from '../artist/artist';
import {Image} from '../artist/image';
import {Streamable} from './streamable';
import {Attr} from './attr';

export interface Track extends Object {
    name: string;
    duration: string;
    listeners: string;
    mbid: string;
    url: string;
    streamable: Streamable;
    artist: Artist;
    image: Image[];
    '@attr': Attr;
}
