import * as _ from 'lodash';

_.mixin({
    oddLines<T>(src: _.CollectionChain<T>): _.CollectionChain<T> {
        let isOddLine = false;
        return src.filter(() => {
            const result = isOddLine;
            isOddLine = !isOddLine;
            return result;
        });
    },
    collapse<T>(src: _.CollectionChain<T>): _.CollectionChain<T> {
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
