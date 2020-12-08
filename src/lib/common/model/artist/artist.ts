import {Image} from './image';

export interface Artist extends Object {
    name: string;
    listeners: string;
    mbid: string;
    url: string;
    streamable: string;
    image: Image[];
}
