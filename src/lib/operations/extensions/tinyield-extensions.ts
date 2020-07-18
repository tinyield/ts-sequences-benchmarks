import {Query, Traverser} from 'tinyield4ts';

export function oddLines<T>(src: Query<T>): Traverser<T> {
    return yld => {
        let isOddLine = false;
        src.traverse(item => {
            if (isOddLine) {
                yld(item);
            }
            isOddLine = !isOddLine;
        });
    };
}

export function collapse<T>(src: Query<T>): Traverser<T> {
    return yld => {
        let prev: T = undefined;
        src.traverse(item => {
            if (prev === undefined || prev !== item) {
                prev = item;
                yld(prev);
            }
        });
    };
}
