import {Comparable} from './comparable';
import {BinaryTreeIterator} from './binary-tree-iterator';

export class BinaryTree<T extends Comparable<T>> implements Iterable<T> {
    public left: BinaryTree<T>;
    public right: BinaryTree<T>;
    public val: T;

    constructor(val: T, left: BinaryTree<T>, right: BinaryTree<T>) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

    public static instance<U extends Comparable<U>>(val: U): BinaryTree<U> {
        return new BinaryTree<U>(val, undefined, undefined);
    }

    public static of<U extends Comparable<U>>(values: Iterable<U>): BinaryTree<U> {
        const iterator = values[Symbol.iterator]();
        let val = iterator.next();
        if (!val.done) {
            const tree = BinaryTree.instance<U>(val.value);
            while (!(val = iterator.next()).done) {
                tree.insert(val.value);
            }
            return tree;
        }
        return undefined;
    }

    public insert(value: T): void {
        const cmp = value.compareTo(this.val);
        if (cmp === 0) {
            throw new Error('Same data!');
        }
        if (cmp < 0) {
            if (this.left === undefined) {
                this.left = BinaryTree.instance<T>(value);
            } else {
                this.left.insert(value);
            }
        } else {
            if (this.right === undefined) {
                this.right = BinaryTree.instance<T>(value);
            } else {
                this.right.insert(value);
            }
        }
    }

    public isLeaf(): boolean {
        return this.left == undefined && this.right == undefined;
    }

    [Symbol.iterator](): Iterator<T> {
        return new BinaryTreeIterator(this);
    }
}
