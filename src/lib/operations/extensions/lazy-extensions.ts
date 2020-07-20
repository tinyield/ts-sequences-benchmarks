import * as Lazy from 'lazy.js';

const lazy = Lazy as any;
lazy.Sequence.define(['oddLines'], {
    each(fn: any) {
        let isOddLine = false;
        let j = 0;
        return this.parent.each((e: any, i: number) => {
            const aux = isOddLine;
            isOddLine = !isOddLine;
            if (aux) {
                j++;
                return fn(e, j);
            }
        });
    },
});

lazy.Sequence.define(['collapse'], {
    each(fn: any) {
        let prev: any = undefined;
        let j = 0;
        return this.parent.each((e: any, i: number) => {
            if (prev === undefined || prev !== e) {
                j++;
                prev = e;
                return fn(e, j);
            }
        });
    },
});
