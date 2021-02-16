import {Comparable} from '../../../fringe/comparable';

export class Value implements Comparable<Value> {
    public readonly value: number;
    public readonly text: string;

    constructor(value: number) {
        this.value = value;
        this.text = `${value}`
            .split('')
            .reverse()
            .join('');
    }

    compareTo(other: Value): number {
        return this.value - other.value;
    }
}
