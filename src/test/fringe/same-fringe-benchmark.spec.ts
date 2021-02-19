import {expect} from 'chai';
import {Value} from '../../lib/common/model/wrapper/value';
import {SameFringeBenchmark} from '../../lib/fringe/same-fringe-benchmark';
import {BinaryTree} from '../../lib/fringe/binary-tree';

describe('SameFringeBenchmark', () => {
    let instance: SameFringeBenchmark;

    beforeEach(() => (instance = new SameFringeBenchmark()));

    describe('when name() is called', () => {
        const expected = 'Same Fringe ';
        let actual: string;

        beforeEach(() => (actual = instance.name()));

        it('should report the name of the benchmark', () => {
            expect(actual).to.contain(expected);
        });
    });

    describe('when setup() is called', () => {
        beforeEach(() => instance.setup());

        it('should set data', () => {
            expect(instance.data).to.not.be.undefined;
        });

        describe('when getValues() is called', () => {
            let actual: Value[];
            beforeEach(() => (actual = instance.getValues()));
            it('should return a Value[] with COLLECTION_SIZE', () => {
                expect(actual).to.be.an('array');
                expect(actual.length).to.equal(instance.COLLECTION_SIZE);
            });
        });

        describe('when data is set', () => {
            beforeEach(() => {
                instance.data = BinaryTree.of([
                    new Value(5),
                    new Value(2),
                    new Value(8),
                    new Value(1),
                    new Value(3),
                    new Value(4),
                    new Value(9),
                    new Value(6),
                    new Value(7),
                    new Value(10),
                ]);
            });

            describe('when ix is called', () => {
                it('should return true', () => expect(instance.ix()).to.be.true);
                it('should have 4 elements', () => expect(instance.ixPipeline().count()).to.be.equal(4));
            });

            describe('when lazy is called', () => {
                it('should return true', () => expect(instance.lazy()).to.be.true);
                it('should have 4 elements', () => expect(instance.lazyPipeline().size()).to.be.equal(4));
            });

            describe('when lodash is called', () => {
                it('should return true', () => expect(instance.lodash()).to.be.true);
                it('should have 4 elements', () =>
                    expect(
                        instance
                            .lodashPipeline()
                            .size()
                            .value()
                    ).to.be.equal(4));
            });

            describe('when tinyield is called', () => {
                it('should return true', () => expect(instance.tinyield()).to.be.true);
                it('should have 4 elements', () => expect(instance.tinyieldPipeline().count()).to.be.equal(4));
            });

            describe('when sequency is called', () => {
                it('should return true', () => expect(instance.sequency()).to.be.true);
                it('should have 4 elements', () => expect(instance.sequencyPipeline().count()).to.be.equal(4));
            });

            describe('when underscore is called', () => {
                it('should return true', () => expect(instance.underscore()).to.be.true);
                it('should have 4 elements', () =>
                    expect(
                        instance
                            .underscorePipeline()
                            .size()
                            .value()
                    ).to.be.equal(4));
            });

            describe('when arrays is called', () => {
                it('should return true', () => expect(instance.arrays()).to.be.true);
                it('should have 4 elements', () => expect(instance.arraysPipeline().length).to.be.equal(4));
            });
        });
    });
});
