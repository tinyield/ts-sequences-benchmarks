export class Pair<T, U> {
    public readonly right: U;
    public readonly left: T;

    constructor(left: T, right: U) {
        this.left = left;
        this.right = right;
    }

    static with<T, U>(left: T, right: U): Pair<T, U> {
        return new Pair<T, U>(left, right);
    }
}
