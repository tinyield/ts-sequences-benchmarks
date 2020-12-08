import {Pair} from '../model/pair';

export function zip<T, U>(a: T[], b: U[]): Pair<T, U>[] {
    const result: Pair<T, U>[] = [];
    const aIter = a[Symbol.iterator]();
    const bIter = b[Symbol.iterator]();
    let aCurr = aIter.next();
    let bCurr = bIter.next();
    while (!aCurr.done && !bCurr.done) {
        result.push(new Pair<T, U>(aCurr.value, bCurr.value));
        aCurr = aIter.next();
        bCurr = bIter.next();
    }
    return result;
}

export function distinct<T>(sequence: T[], by: (elem: T) => any): T[] {
    const distinctKeys = new Set<any>();
    return sequence.filter(elem => {
        const key = by(elem);
        if (!distinctKeys.has(key)) {
            distinctKeys.add(key);
            return true;
        }
        return false;
    });
}
