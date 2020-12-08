export class Triplet<T, R, U> implements Object {
    public readonly right: U;
    public readonly left: T;
    public readonly center: R;

    constructor(left: T, center: R, right: U) {
        this.center = center;
        this.left = left;
        this.right = right;
    }

    toString(): string {
        return `Triplet{left: ${JSON.stringify(this.left)}, center: ${JSON.stringify(this.center)}, right: ${JSON.stringify(this.right)}}`;
    }
}
