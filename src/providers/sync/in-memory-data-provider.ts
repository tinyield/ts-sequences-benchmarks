import {IterableX} from 'ix/iterable';
import ArrayLikeSequence = LazyJS.ArrayLikeSequence;
import * as Lazy from 'lazy.js';

export class InMemoryDataProvider<T> {
    public static iterable<T>(data: T[]): IterableX<T> {
        return new InMemoryDataProvider(data).iterable();
    }

    public static generator<T>(data: T[]): IterableIterator<T> {
        return new InMemoryDataProvider(data).generator();
    }

    public static lazy<T>(data: T[]): ArrayLikeSequence<T> {
        return new InMemoryDataProvider(data).lazy();
    }

    private constructor(private readonly data: T[]) {}

    iterable(): IterableX<T> {
        return IterableX.of(...this.data);
    }

    *generator(): IterableIterator<T> {
        for (let i = 0; i < this.data.length; i++) {
            yield this.data[i];
        }
    }

    lazy(): ArrayLikeSequence<T> {
        return Lazy(this.data);
    }
}
