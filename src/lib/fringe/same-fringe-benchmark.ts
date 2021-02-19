import {Value} from '../common/model/wrapper/value';
import {getCLIArguments, getCollectionSizeLabel} from '../utils/benchmark-cli-arguments';
import {IterableX} from 'ix/iterable';
import * as Lazy from 'lazy.js';
import * as _ from 'lodash';
import * as __ from 'underscore';
import {Advancer, Query, Traverser, Yield} from 'tinyield4ts';
import Sequence, {asSequence} from 'sequency';

import 'ix/add/iterable-operators/zip';
import 'ix/add/iterable-operators/map';
import 'ix/add/iterable-operators/every';
import {zip} from '../common/extensions/array-extensions';
import {Benchmark} from '../benchmark';
import {getSuite, options} from '../utils/benchmark-utils';
import {ARRAYS, IX, LAZY, LODASH, SEQUENCY, TINYIELD, UNDERSCORE} from '../common/constants';
import {BinaryTree} from './binary-tree';

export class SameFringeBenchmark implements Benchmark {
    /**
     * The size of the Sequence for this benchmark
     */
    public COLLECTION_SIZE: number;
    /**
     * The data source used to benchmark
     * This data is instantiated using the getValues method.
     */
    public data: BinaryTree<Value>;

    /**
     * Gets a {string} stating the name of this benchmark to better identify it
     * in the benchmark logs.
     *
     * @returns {string} that identifies this benchmark
     */
    name(): string {
        return `Same Fringe ${getCollectionSizeLabel()}`;
    }

    /**
     * Gets an {Value[]} with size COLLECTION_SIZE
     *
     * @returns {Value[]} of size COLLECTION_SIZE
     */
    public getValues(): Value[] {
        return Query.generate(() => Math.floor(Math.random() * 110456))
            .distinct()
            .take(this.COLLECTION_SIZE)
            .map(v => new Value(v))
            .toArray();
    }

    /**
     * Sets up the data source to be used in this benchmark
     */
    setup(): void {
        this.COLLECTION_SIZE = getCLIArguments().size;
        this.data = BinaryTree.of(this.getValues());
    }

    /**
     * Zips two sequences of {@external IterableX} together mapping the combination of each value to a boolean.
     *
     * @returns {boolean} true if all values in the zipped sequence are true, false otherwise.
     */
    ix(): boolean {
        return this.ixPipeline().every(elem => elem);
    }

    ixPipeline(): IterableX<boolean> {
        return IterableX.from(this.data)
            .zip(IterableX.from(this.data))
            .map(([elem1, elem2]) => elem1.text === elem2.text);
    }

    /**
     * Zips two sequences of {@external Lazy} together mapping the combination of each value to a boolean.
     *
     * @returns {boolean} true if all values in the zipped sequence are true, false otherwise.
     */
    lazy(): boolean {
        return this.lazyPipeline().every((elem: boolean) => elem);
    }

    lazyPipeline(): any {
        return (Lazy(Array.from(this.data)).zip(Array.from(this.data)) as any).map(([elem1, elem2]: Value[]) => elem1.text === elem2.text);
    }

    /**
     * Zips two sequences of {@external _.LoDashStatic} together mapping the combination of each value to a boolean.
     *
     * @returns {boolean} true if all values in the zipped sequence are true, false otherwise.
     */
    lodash(): boolean {
        return this.lodashPipeline()
            .every((elem: boolean) => elem)
            .value();
    }

    lodashPipeline(): any {
        return _.chain(Array.from(this.data)).zipWith(_.chain(Array.from(this.data)).value(), (elem1, elem2) => elem1.text === elem2.text);
    }

    /**
     * Zips two sequences of {@external Query} together mapping the combination of each value to a boolean.
     *
     * @returns {boolean} true if all values in the zipped sequence are true, false otherwise.
     */
    tinyield(): boolean {
        return this.tinyieldPipeline().allMatch(elem => elem);
    }

    tinyieldPipeline(): Query<boolean> {
        return this.getLeavesQuery(this.data).zip(this.getLeavesQuery(this.data), (elem1, elem2) => elem1.text === elem2.text);
    }

    /**
     * Zips two sequences of {@external Sequence} together mapping the combination of each value to a boolean.
     *
     * @returns {boolean} true if all values in the zipped sequence are true, false otherwise.
     */
    sequency(): boolean {
        return this.sequencyPipeline().all(elem => elem);
    }

    sequencyPipeline(): Sequence<boolean> {
        return asSequence(this.data)
            .zip(asSequence(this.data))
            .map(([elem1, elem2]) => elem1.text === elem2.text);
    }

    /**
     * Zips two sequences of {@external __.UnderscoreStatic} together mapping the combination of each value to a boolean.
     *
     * @returns {boolean} true if all values in the zipped sequence are true, false otherwise.
     */
    underscore(): boolean {
        return this.underscorePipeline()
            .every((elem: boolean) => elem)
            .value();
    }

    underscorePipeline(): any {
        return (__.chain(Array.from(this.data)).zip(__.chain(Array.from(this.data)).value()) as any).map(
            ([elem1, elem2]: Value[]) => elem1.text === elem2.text
        );
    }

    /**
     * Zips two sequences of {@external Array} together mapping the combination of each value to a boolean.
     *
     * @returns {boolean} true if all values in the zipped sequence are true, false otherwise.
     */
    arrays(): boolean {
        return this.arraysPipeline().every(elem => elem);
    }

    arraysPipeline(): boolean[] {
        return zip(Array.from(this.data), Array.from(this.data)).map(pair => pair.left.text === pair.right.text);
    }

    run(): void {
        this.setup();
        const opts = options();
        getSuite(this.name())
            .add(UNDERSCORE, () => this.underscore(), opts)
            .add(TINYIELD, () => this.tinyield(), opts)
            .add(SEQUENCY, () => this.sequency(), opts)
            .add(LODASH, () => this.lodash(), opts)
            .add(ARRAYS, () => this.arrays(), opts)
            .add(LAZY, () => this.lazy(), opts)
            .add(IX, () => this.ix(), opts)
            .run(options());
    }

    private getLeavesQuery(src: BinaryTree<Value>): Query<Value> {
        const trv: Traverser<Value> = yld => {
            if (src.isLeaf()) {
                yld(src.val);
            } else {
                if (src.left != undefined) {
                    this.getLeavesQuery(src.left).traverse(value => yld(value));
                }
                if (src.right != undefined) {
                    this.getLeavesQuery(src.right).traverse(value => yld(value));
                }
            }
        };
        const stack = [src];
        const adv: Advancer<Value> = yld => {
            const curr = this.advanceToLeaf(stack);
            if (curr != undefined) {
                yld(curr.val);
                return true;
            } else {
                return false;
            }
        };

        return new Query<Value>(
            {
                tryAdvance(yld: Yield<Value>): boolean {
                    return adv(yld);
                },
            },
            {
                traverse(yld: Yield<Value>): void {
                    trv(yld);
                },
            }
        );
    }

    private advanceToLeaf(stack: BinaryTree<Value>[]): BinaryTree<Value> {
        while (stack.length > 0) {
            const node = stack.pop();
            if (node.isLeaf()) {
                return node;
            }
            if (node.right != undefined) {
                stack.push(node.right);
            }
            if (node.left != undefined) {
                stack.push(node.left);
            }
        }
        return undefined;
    }
}
