import Sequence, {extendSequence} from 'sequency';

export class SequencyExtensions<T> {
    oddLines(this: Sequence<T>): Sequence<T> {
        let isOddLine = false;
        return this.filter(() => {
            const result = isOddLine;
            isOddLine = !isOddLine;
            return result;
        });
    }

    skip(this: Sequence<T>, n: number): Sequence<T> {
        return this.filterIndexed(i => i >= n);
    }

    collapse(this: Sequence<T>): Sequence<T> {
        let prev: T = undefined;
        return this.filter(value => {
            if (prev === undefined || prev !== value) {
                prev = value;
                return true;
            }
            return false;
        });
    }
}

extendSequence(SequencyExtensions);
