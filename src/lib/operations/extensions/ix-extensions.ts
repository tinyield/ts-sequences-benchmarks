import {IterableX} from 'ix/iterable';

export class OddLinesIterable<T> implements Iterable<T> {
    private readonly source: IterableX<T>;

    constructor(source: IterableX<T>) {
        this.source = source;
    }

    *[Symbol.iterator]() {
        const it = this.source[Symbol.iterator]();
        let isOddLine = false;
        for (let next = it.next(); !next.done; next = it.next()) {
            if (isOddLine) {
                yield next.value;
            }
            isOddLine = !isOddLine;
        }
    }
}

// tslint:disable-next-line:max-classes-per-file
export class CollapseIterable<T> implements Iterable<T> {
    private readonly source: IterableX<T>;

    constructor(source: IterableX<T>) {
        this.source = source;
    }

    *[Symbol.iterator]() {
        let prev: T = undefined;
        const it = this.source[Symbol.iterator]();
        for (let next = it.next(); !next.done; next = it.next()) {
            if (prev === undefined || prev !== next.value) {
                prev = next.value;
                yield prev;
            }
        }
    }
}
