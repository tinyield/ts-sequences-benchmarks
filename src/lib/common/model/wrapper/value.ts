export class Value {
    public readonly value: number;
    public readonly text: string;

    constructor(value: number) {
        this.value = value;
        this.text = `${value}`
            .split('')
            .reverse()
            .join('');
    }
}
