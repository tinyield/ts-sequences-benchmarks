import {expect} from 'chai';
import {FindFixedIndexBenchmark} from '../../lib/find/find-fixed-index-benchmark';

describe('FindFixedIndexBenchmark', () => {
    let instance: FindFixedIndexBenchmark;

    beforeEach(() => (instance = new FindFixedIndexBenchmark()));

    describe('when name() is called', () => {
        const expected = 'Find Fixed Index ';
        let actual: string;

        beforeEach(() => (actual = instance.name()));

        it('should report the name of the benchmark', () => {
            expect(actual).to.contain(expected);
        });
    });

    describe('when setup() is called', () => {
        beforeEach(() => instance.setup());

        it('should set a and b arrays', () => {
            expect(instance.a).to.be.an('array');
            expect(instance.b).to.be.an('array');
        });

        describe('when getNumbers() is called', () => {
            let actual: number[];
            beforeEach(() => (actual = instance.getNumbers()));
            it('should return a number[] with COLLECTION_SIZE', () => {
                expect(actual).to.be.an('array');
                expect(actual.length).to.equal(instance.COLLECTION_SIZE);
            });
        });

        describe('when ix is called', () => {
            it('should return the matched element', () => {
                const actual: number = instance.ix();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(instance.getMatchIndex());
            });
        });

        describe('when lazy is called', () => {
            it('should return the matched element', () => {
                const actual: number = instance.lazy();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(instance.getMatchIndex());
            });
        });

        describe('when lodash is called', () => {
            it('should return the matched element', () => {
                const actual: number = instance.lodash();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(instance.getMatchIndex());
            });
        });

        describe('when tinyield is called', () => {
            it('should return the matched element', () => {
                const actual: number = instance.tinyield();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(instance.getMatchIndex());
            });
        });

        describe('when sequency is called', () => {
            it('should return the matched element', () => {
                const actual: number = instance.sequency();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(instance.getMatchIndex());
            });
        });

        describe('when underscore is called', () => {
            it('should return the matched element', () => {
                const actual: number = instance.underscore();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(instance.getMatchIndex());
            });
        });

        describe('when arrays is called', () => {
            it('should return the matched element', () => {
                const actual: number = instance.arrays();
                expect(actual).to.not.be.undefined;
                expect(actual).to.equal(instance.getMatchIndex());
            });
        });
    });
});
