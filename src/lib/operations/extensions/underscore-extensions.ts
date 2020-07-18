import * as _ from 'underscore';

_.mixin({
    oddLines<T>(src: _._Chain<T, T[]>): _._Chain<T, T[]> {
        let isOddLine = false;
        return src.filter(() => {
            const result = isOddLine;
            isOddLine = !isOddLine;
            return result;
        });
    },
    collapse<T>(src: _._Chain<T, T[]>): _._Chain<T, T[]> {
        let prev: T = undefined;
        return src.filter(value => {
            if (prev === undefined || prev !== value) {
                prev = value;
                return true;
            }
            return false;
        });
    },
});
