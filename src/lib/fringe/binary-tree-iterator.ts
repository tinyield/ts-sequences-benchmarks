import {Comparable} from './comparable';
import {BinaryTree} from './binary-tree';

export class BinaryTreeIterator<T extends Comparable<T>> implements Iterator<T> {
    private readonly stack: BinaryTree<T>[];
    private current: BinaryTree<T>;

    constructor(src: BinaryTree<T>) {
        this.current = undefined;
        this.stack = [src];
    }

    next(...args: [] | [undefined]): IteratorResult<T, any> {
        if (this.current == undefined) {
            this.current = this.advanceToLeaf();
            if (this.current == undefined) {
                return {
                    done: true,
                    value: undefined,
                };
            }
        }
        const aux = this.current;
        this.current = undefined;
        return {
            value: aux.val,
        };
    }

    private advanceToLeaf(): BinaryTree<T> {
        while (this.stack.length > 0) {
            const node = this.stack.pop();
            if (node.isLeaf()) {
                return node;
            }
            if (node.right != undefined) {
                this.stack.push(node.right);
            }
            if (node.left != undefined) {
                this.stack.push(node.left);
            }
        }
        return undefined;
    }
}
